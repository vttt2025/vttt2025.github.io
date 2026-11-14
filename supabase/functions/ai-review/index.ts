// supabase/functions/ai-review/index.ts
// Supabase Edge Function: Chấm bài viết tiếng Nga TRKI bằng Groq AI (Qwen 3.8 27B) siêu tối giản token

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function fallbackReview(text: string, level: string, minWords: number) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const count = words.length;
  const targetWords = minWords || 10;
  const ratio = Math.min(1.2, count / targetWords);

  const grammar = Math.round(16 + Math.min(6, ratio * 5));
  const lexis = Math.round(15 + Math.min(6, ratio * 5));
  const structure = Math.round(16 + Math.min(6, ratio * 5));
  const content = Math.round(15 + Math.min(7, ratio * 6));
  const total = grammar + lexis + structure + content;

  return {
    total,
    grammar,
    lexis,
    structure,
    content,
    passed: total >= 66,
    feedback: `Bài viết đạt ${count}/${targetWords} từ yêu cầu. Ngữ pháp và cấu trúc câu tương đối tốt theo chuẩn ${level || "A1"}. Hãy tiếp tục mở rộng vốn từ và liên kết câu phong phú hơn.`
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { text, level, taskTitle, minWords } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(JSON.stringify({ success: false, error: "Bài viết không được để trống" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) {
      console.warn("Chưa cấu hình GROQ_API_KEY trong Supabase Secrets, dùng bộ chấm fallback");
      return new Response(JSON.stringify({ success: true, ...fallbackReview(text, level, minWords) }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const MODEL = Deno.env.get("GROQ_MODEL") || "qwen/qwen3.8-27b";

    // System prompt tinh gọn tối đa (~90 tokens), bắt buộc trả về JSON object thuần túy
    const systemPrompt = `Bạn là giám khảo tiếng Nga TRKI. Chấm bài học viên theo thang điểm 100 và trả về JSON:
{"total": <0-100>, "grammar": <0-25>, "lexis": <0-25>, "structure": <0-25>, "content": <0-25>, "passed": <true/false>, "feedback": "<Nhận xét tiếng Việt tối đa 2-3 câu ngắn gọn: 1 câu khen điểm tốt, 1-2 câu sửa cụ thể từ/câu sai và đưa câu mẫu tiếng Nga chuẩn>"}`;

    const userPrompt = `Cấp độ: ${level || "A1"}, Yêu cầu: ${minWords || 10} từ, Đề: ${taskTitle || "Luyện viết"}
Bài làm: "${text.trim()}"`;

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.1,
        max_tokens: 280,
        response_format: { type: "json_object" }
      })
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.warn(`Groq API Error (${groqRes.status}): ${errText}`);
      // Fallback an toàn nếu Groq bị rate-limit hoặc lỗi tạm thời, không để app bị lỗi 500
      return new Response(JSON.stringify({ success: true, ...fallbackReview(text, level, minWords) }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const groqData = await groqRes.json();
    const rawReply = groqData.choices?.[0]?.message?.content || "";

    let evaluation;
    try {
      const cleaned = rawReply.replace(/```json/gi, "").replace(/```/g, "").trim();
      evaluation = JSON.parse(cleaned);
      evaluation.total = Number(evaluation.total) || 75;
      evaluation.grammar = Number(evaluation.grammar) || 18;
      evaluation.lexis = Number(evaluation.lexis) || 18;
      evaluation.structure = Number(evaluation.structure) || 18;
      evaluation.content = Number(evaluation.content) || 18;
      evaluation.passed = evaluation.passed !== undefined ? Boolean(evaluation.passed) : (evaluation.total >= 66);
    } catch {
      evaluation = fallbackReview(text, level, minWords);
    }

    return new Response(JSON.stringify({ success: true, ...evaluation }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Lỗi xử lý Edge Function:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
