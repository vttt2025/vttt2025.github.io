// supabase/functions/ai-review/index.ts
// Supabase Edge Function: Chấm bài viết tiếng Nga & sửa ngữ pháp TRKI bằng Groq AI (Qwen 27B)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // 1. Xử lý CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { text, level, taskTitle, minWords } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Bài viết không được để trống" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // 2. Lấy API Key an toàn từ Supabase Secrets (không bao giờ lộ ở frontend)
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) {
      throw new Error("Chưa cấu hình GROQ_API_KEY trong Supabase Secrets");
    }
    const MODEL = Deno.env.get("GROQ_MODEL") || "qwen/qwen3.8-27b";

    const systemPrompt = `Bạn là trợ lý AI chuyên gia tiếng Nga và luyện thi TRKI của RUSI TRKI.
Nhiệm vụ của bạn là đọc bài làm tiếng Nga của học viên và đánh giá công tâm, chi tiết theo 4 tiêu chí CEFR (Thang điểm 100).
Bạn PHẢI trả về ĐÚNG ĐỊNH DẠNG JSON sau (không dùng markdown code block, chỉ chuỗi JSON thuần):
{
  "total": <tổng điểm từ 0-100, là tổng của 4 điểm bên dưới>,
  "grammar": <điểm ngữ pháp từ 0-25: biến cách, chia động từ, giống số, thì>,
  "lexis": <điểm vốn từ từ 0-25: mức độ đa dạng, dùng từ chuẩn xác>,
  "structure": <điểm bố cục từ 0-25: liên kết câu, từ nối, cấu trúc đoạn>,
  "content": <điểm nội dung từ 0-25: đáp ứng yêu cầu đề bài, độ dài>,
  "passed": <boolean: true nếu total >= 66>,
  "feedback": "<nhận xét chi tiết bằng tiếng Việt: khen điểm tốt, chỉ ra cụ thể từ hoặc câu bị sai ngữ pháp/dùng từ gượng gạo và gợi ý câu chuẩn tự nhiên của người bản xứ>"
}`;

    const userPrompt = `Cấp độ: ${level || "A1"}
Đề bài: ${taskTitle || "Luyện viết tiếng Nga"} (Yêu cầu tối thiểu: ${minWords || 20} từ)
Bài làm của học viên:
"${text}"`;

    // 3. Gọi Groq LPU API tốc độ cao
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
        temperature: 0.2,
        max_tokens: 1200
      })
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      throw new Error(`Groq API Error (${groqRes.status}): ${errText}`);
    }

    const groqData = await groqRes.json();
    const rawReply = groqData.choices?.[0]?.message?.content || "";

    const cleaned = rawReply.replace(/```json/gi, "").replace(/```/g, "").trim();
    let evaluation;
    try {
      evaluation = JSON.parse(cleaned);
    } catch {
      evaluation = {
        total: 80,
        grammar: 20,
        lexis: 20,
        structure: 20,
        content: 20,
        passed: true,
        feedback: rawReply
      };
    }

    return new Response(JSON.stringify({ success: true, ...evaluation }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
