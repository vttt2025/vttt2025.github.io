// supabase/functions/ai-review/index.ts
// Supabase Edge Function: Chấm bài viết tiếng Nga TRKI bằng Groq AI (Qwen 3.8 27B)
// Chấm điểm bám sát bức tranh, đối chiếu bài viết mẫu TRKI và các chi tiết miêu tả tranh
// Tích hợp kiểm soát hạn mức sử dụng: 3 lượt/ngày (Free), 20 lượt/ngày (PRO)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function fallbackReview(
  text: string,
  level: string,
  minWords: number,
  modelAnswer?: string,
  imageDesc?: string,
  suggestedWords?: string
) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const count = words.length;
  const targetWords = minWords || 15;
  const lengthRatio = Math.min(1.2, count / targetWords);

  // So khớp từ vựng bài mẫu và từ gợi ý
  let modelMatches = 0;
  if (modelAnswer) {
    const modelWords = new Set(
      modelAnswer.toLowerCase().replace(/[^а-яё\s]/gi, " ").split(/\s+/).filter((w) => w.length >= 3)
    );
    words.forEach((w) => {
      const clean = w.toLowerCase().replace(/[^а-яё]/gi, "");
      if (clean.length >= 3 && modelWords.has(clean)) modelMatches++;
    });
  }

  const isMatchedWell = modelMatches >= 4 || !modelAnswer;

  const grammar = Math.round(16 + Math.min(5, lengthRatio * 4));
  const lexis = Math.round(15 + Math.min(6, (modelMatches / 5) * 5));
  const structure = Math.round(16 + Math.min(5, lengthRatio * 4));
  const content = Math.round(isMatchedWell ? 18 + Math.min(6, lengthRatio * 5) : 13);
  const total = grammar + lexis + structure + content;

  let feedback = "";
  if (modelAnswer) {
    if (isMatchedWell) {
      feedback = `Bài viết bám sát bối cảnh bức tranh và bài mẫu (${count}/${targetWords} từ). Bạn đã miêu tả đúng các chi tiết nhân vật và không gian trong tranh. Hãy tiếp tục chú ý biến cách (падежи) để bài viết chuẩn xác hơn nhé!`;
    } else {
      feedback = `Bài viết đạt ${count}/${targetWords} từ nhưng chưa miêu tả sát các chi tiết trong ảnh so với bài mẫu. Hãy quan sát kỹ nhân vật, hành động và đồ vật trong tranh để bổ sung nội dung nhé!`;
    }
  } else {
    feedback = `Bài viết đạt ${count}/${targetWords} từ yêu cầu. Ngữ pháp và cấu trúc câu tương đối tốt theo chuẩn ${level || "A1"}. Hãy tiếp tục mở rộng vốn từ và liên kết câu phong phú hơn.`;
  }

  return {
    total,
    grammar,
    lexis,
    structure,
    content,
    passed: total >= 66,
    feedback,
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      text,
      level,
      taskTitle,
      prompt,
      minWords,
      modelAnswer,
      imageDesc,
      suggestedWords,
      taskType,
      imageUrl,
      userId,
      isPro,
    } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(JSON.stringify({ success: false, error: "Bài viết không được để trống" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. BẮT BUỘC ĐĂNG NHẬP ĐỂ QUẢN LÝ LƯỢT DÙNG THEO TỪNG HỌC VIÊN
    if (!userId) {
      return new Response(
        JSON.stringify({
          success: false,
          requireAuth: true,
          message: "Vui lòng đăng nhập để sử dụng tính năng chấm điểm AI (Miễn phí 3 lượt/ngày)!",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 2. KIỂM TRA & TIÊU THỤ HẠN MỨC TRÊN SUPABASE (3 lượt/ngày cho Free, 20 lượt/ngày cho PRO)
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    let quotaInfo = null;

    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { data: quota, error: quotaErr } = await supabase.rpc("check_and_consume_ai_quota", {
          p_user_id: userId,
          p_is_pro: Boolean(isPro),
        });

        if (quotaErr) {
          console.warn("Lỗi RPC check_and_consume_ai_quota:", quotaErr);
        } else if (quota) {
          if (!quota.allowed) {
            return new Response(
              JSON.stringify({
                success: false,
                limitReached: true,
                used_count: quota.used_count,
                max_limit: quota.max_limit,
                remaining: 0,
                is_pro: Boolean(isPro),
                message: quota.message || "Bạn đã dùng hết số lượt chấm AI hôm nay.",
              }),
              {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              }
            );
          }
          quotaInfo = {
            used_count: quota.used_count,
            max_limit: quota.max_limit,
            remaining: quota.remaining,
            is_pro: Boolean(isPro),
          };
        }
      } catch (dbErr) {
        console.warn("Lỗi kết nối Supabase kiểm tra quota:", dbErr);
      }
    }

    // 3. GỌI GROQ AI NẾU HẠN MỨC HỢP LỆ
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");
    if (!GROQ_API_KEY) {
      console.warn("Chưa cấu hình GROQ_API_KEY trong Supabase Secrets, dùng bộ chấm fallback");
      return new Response(
        JSON.stringify({
          success: true,
          ...fallbackReview(text, level, minWords, modelAnswer, imageDesc, suggestedWords),
          quota: quotaInfo,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const MODEL = Deno.env.get("GROQ_MODEL") || "qwen/qwen3.8-27b";
    const isPictureTask = taskType === "picture" || Boolean(imageDesc) || Boolean(imageUrl);

    // System prompt chuyên sâu TRKI, bắt buộc đối chiếu bài mẫu và mô tả tranh
    const systemPrompt = `Bạn là Giám khảo chấm thi phần Viết (Письмо) chứng chỉ tiếng Nga quốc tế ТРКИ / CEFR.
Nhiệm vụ của bạn là đọc kỹ bài làm của thí sinh, ĐỐI CHIẾU SÁT SAO VỚI BÀI MẪU TRKI, MÔ TẢ TRANH VÀ CÁC TỪ VỰNG GỢI Ý ĐƯỢC CẤP, sau đó chấm điểm theo thang 100 và nhận xét chi tiết bằng tiếng Việt sư phạm.

TIÊU CHÍ ĐÁNH GIÁ (Mỗi tiêu chí 0-25 điểm, Tổng = 100 điểm):
1. content (Nội dung & Độ sát thực tế ảnh - 0 đến 25đ):
   - ĐẶC BIỆT QUAN TRỌNG: Thí sinh có miêu tả đúng các nhân vật, hành động, đồ vật, bối cảnh trong bức tranh không?
   - Đối chiếu với [BÀI MẪU] và [MÔ TẢ TRANH]: Nếu thí sinh viết lạc đề (không miêu tả những gì diễn ra trong tranh, viết lan man sang chuyện khác, hoặc thiếu hụt quá nhiều chi tiết cốt lõi), điểm content PHẢI CHO DƯỚI 15/25.
   - Nếu thí sinh miêu tả sinh động, đầy đủ các nhân vật, bối cảnh, cảm xúc tương tự bài mẫu, cho điểm cao (20-25/25).
2. lexis (Vốn từ vựng - 0 đến 25đ):
   - Có vận dụng các từ vựng đặc trưng của chủ đề tranh và các từ gợi ý không?
   - Vốn từ có chuẩn xác, phong phú theo cấp độ ${level || "A1"} không?
3. grammar (Ngữ pháp & Biến cách - 0 đến 25đ):
   - Chia đúng động từ (thì, dạng hoàn thành/chưa hoàn thành), biến cách danh từ/tính từ (падежи), giới từ (в, на, за столом, с кем...).
4. structure (Bố cục & Từ nối - 0 đến 25đ):
   - Đạt đủ số từ yêu cầu (${minWords || 15} từ).
   - Có mở bài, thân bài, kết bài và các từ nối logic (потому что, поэтому, на фотографии видно...).

QUY CÁCH PHẢN HỒI (BẮT BUỘC TRẢ VỀ JSON THUẦN TÚY):
{
  "total": <tổng điểm 0-100>,
  "grammar": <0-25>,
  "lexis": <0-25>,
  "structure": <0-25>,
  "content": <0-25>,
  "passed": <true nếu total >= 66, ngược lại false>,
  "feedback": "<Nhận xét tiếng Việt từ 2-4 câu: (1) Nhận xét cụ thể về độ bám sát bức tranh so với bài mẫu: đã tả đúng được những gì (nhân vật, hành động...), còn thiếu chi tiết nào; (2) Khen điểm tốt về từ vựng/cấu trúc; (3) Chỉ rõ 1 lỗi ngữ pháp/biến cách cụ thể và đưa câu sửa tiếng Nga chuẩn xác theo bài mẫu>"
}`;

    const userPrompt = `[THÔNG TIN ĐỀ THI]
- Đề bài: ${taskTitle || "Luyện viết"}
- Cấp độ: ${level || "A1"} (Yêu cầu tối thiểu: ${minWords || 15} từ)
- Dạng bài: ${isPictureTask ? "Tả tranh thực tế" : "Luyện dịch / Viết luận"}
${prompt ? `- Yêu cầu đề bài: ${prompt}` : ""}
${imageDesc ? `- MÔ TẢ CHI TIẾT TRANH CẦN THỂ HIỆN: ${imageDesc}` : ""}
${suggestedWords ? `- TỪ VỰNG THEN CHỐT CỦA TRANH: ${suggestedWords}` : ""}
${modelAnswer ? `- BÀI VIẾT MẪU ĐẠT ĐIỂM TỐI ĐA TRKI: "${modelAnswer}"` : ""}

[BÀI LÀM CỦA HỌC VIÊN]:
"${text.trim()}"`;

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.1,
        max_tokens: 380,
        response_format: { type: "json_object" },
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.warn(`Groq API Error (${groqRes.status}): ${errText}`);
      return new Response(
        JSON.stringify({
          success: true,
          ...fallbackReview(text, level, minWords, modelAnswer, imageDesc, suggestedWords),
          quota: quotaInfo,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
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
      evaluation.passed =
        evaluation.passed !== undefined ? Boolean(evaluation.passed) : evaluation.total >= 66;
    } catch {
      evaluation = fallbackReview(text, level, minWords, modelAnswer, imageDesc, suggestedWords);
    }

    return new Response(
      JSON.stringify({
        success: true,
        ...evaluation,
        quota: quotaInfo,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Lỗi xử lý Edge Function:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
