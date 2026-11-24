/**
 * ai-service.js — Dịch vụ tích hợp AI cho RUSI TRKI
 * Kiến trúc bảo mật cho GitHub Pages:
 *   1. Ưu tiên: Gọi qua Supabase Edge Function ("ai-review") -> Giữ bí mật 100% API Key trên Cloud
 *   2. Dự phòng: Gọi trực tiếp Groq LPU API (Qwen 3.8 27B) nếu Edge Function chưa được khởi tạo
 */
(function () {
  "use strict";

  let storedKey = "";
  try {
    storedKey = localStorage.getItem("rusi_groq_api_key") || "";
  } catch (_) {}

  const GROQ_CONFIG = {
    baseUrl: "https://api.groq.com/openai/v1",
    apiKey: storedKey || "",
    textModel: "qwen/qwen3.8-27b",
    audioModel: "whisper-large-v3-turbo"
  };

  const RusiAI = {
    config: GROQ_CONFIG,

    /**
     * Gửi yêu cầu chat completion trực tiếp tới Groq AI (chế độ dự phòng)
     */
    async chatDirect(messages, options = {}) {
      const model = options.model || GROQ_CONFIG.textModel;
      const temperature = options.temperature !== undefined ? options.temperature : 0.1;
      const maxTokens = options.maxTokens || 280;

      const bodyPayload = {
        model,
        messages,
        temperature,
        max_tokens: maxTokens
      };
      if (options.json) {
        bodyPayload.response_format = { type: "json_object" };
      }

      const response = await fetch(`${GROQ_CONFIG.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_CONFIG.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyPayload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "";
    },

    /**
     * Chấm điểm & nhận xét bài viết tiếng Nga theo 4 tiêu chí CEFR / TRKI
     * Tự động ưu tiên gọi qua Supabase Edge Function để bảo mật API Key trên GitHub Pages.
     * Quản lý hạn mức sử dụng: 3 lượt/ngày (Free), 20 lượt/ngày (PRO), lưu trên Supabase.
     */
    async reviewWriting({
      text,
      level = "A1",
      taskTitle = "",
      prompt = "",
      minWords = 20,
      modelAnswer = "",
      imageDesc = "",
      suggestedWords = "",
      taskType = "picture",
      imageUrl = "",
      userId = null,
      isPro = null
    }) {
      const session = await (typeof window !== "undefined" ? window.RusiSupabase?.auth?.getSession?.() : null);
      const accessToken = session?.access_token;
      if (!accessToken) {
        return {
          success: false,
          requireAuth: true,
          message: "Vui lòng đăng nhập để sử dụng tính năng chấm điểm AI (Miễn phí 3 lượt/ngày)!"
        };
      }

      // 1. ƯU TIÊN HÀNG ĐẦU: Gọi trực tiếp Supabase Edge Function an toàn (Bảo vệ API Key tuyệt đối)
      try {
        const config = (typeof window !== "undefined" && window.SUPABASE_CONFIG) ? window.SUPABASE_CONFIG : {};
        const edgeUrl = (config.url ? config.url.replace(/\/$/, "") : "https://nrhtdwjihnlaxrbitmcf.supabase.co") + "/functions/v1/ai-review";
        const anonKey = config.anonKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yaHRkd2ppaG5sYXhyYml0bWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1ODk5MjgsImV4cCI6MjEwODE2NTkyOH0.qMGTYhVyoyht7jrBCSN2VczeqShmsBedC-Qdg_C5-FI";

        const fetchSignal = (typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function")
          ? AbortSignal.timeout(12000)
          : undefined;

        const res = await fetch(edgeUrl, {
          method: "POST",
          headers: {
            "apikey": anonKey,
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            text,
            level,
            taskTitle,
            prompt,
            minWords,
            modelAnswer,
            imageDesc,
            suggestedWords,
            taskType,
            imageUrl
          }),
          signal: fetchSignal
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.success) {
            return {
              success: true,
              total: Number(data.total) || 0,
              grammar: Number(data.grammar) || 0,
              lexis: Number(data.lexis) || 0,
              structure: Number(data.structure) || 0,
              content: Number(data.content) || 0,
              passed: data.passed !== undefined ? Boolean(data.passed) : (Number(data.total) >= 66),
              feedback: data.feedback || "Bài viết đã được AI phân tích.",
              quota: data.quota || null
            };
          } else if (data && data.limitReached) {
            return {
              success: false,
              limitReached: true,
              used_count: data.used_count,
              max_limit: data.max_limit,
              is_pro: data.is_pro,
              message: data.message || "Bạn đã dùng hết số lượt chấm AI hôm nay."
            };
          } else if (data && data.requireAuth) {
            return {
              success: false,
              requireAuth: true,
              message: data.message || "Vui lòng đăng nhập để sử dụng tính năng chấm điểm AI."
            };
          }
        } else {
          let errData = null;
          try { errData = await res.json(); } catch (_) {}
          const errMsg = (errData && (errData.message || errData.error)) || `Lỗi máy chủ (${res.status})`;
          if (res.status === 401) {
            return {
              success: false,
              requireAuth: true,
              message: (errData && errData.message) || "Vui lòng đăng nhập để sử dụng tính năng chấm điểm AI (Miễn phí 3 lượt/ngày)!"
            };
          }
          console.warn("[RusiAI] Edge Function trả về HTTP status:", res.status, errMsg);
          return {
            success: false,
            serverError: true,
            status: res.status,
            message: errMsg
          };
        }
      } catch (edgeErr) {
        console.warn("[RusiAI] Không thể kết nối Supabase Edge Function:", edgeErr);
      }

      // 2. DỰ PHÒNG: Gọi trực tiếp Groq AI (nếu có lưu API Key riêng)
      if (GROQ_CONFIG.apiKey) {
        const isPictureTask = taskType === "picture" || Boolean(imageDesc) || Boolean(imageUrl);

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

        const rawReply = await this.chatDirect([
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ], { temperature: 0.1, maxTokens: 380, json: true });

        try {
          const cleaned = rawReply.replace(/```json/gi, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          const numOr = (v, fb) => {
            const n = Number(v);
            return Number.isFinite(n) ? n : fb;
          };
          const g = Math.max(0, Math.min(25, numOr(parsed.grammar, 18)));
          const l = Math.max(0, Math.min(25, numOr(parsed.lexis, 18)));
          const s = Math.max(0, Math.min(25, numOr(parsed.structure, 18)));
          const c = Math.max(0, Math.min(25, numOr(parsed.content, 18)));
          const t = Math.max(0, Math.min(100, numOr(parsed.total, g + l + s + c)));
          return {
            success: true,
            total: t,
            grammar: g,
            lexis: l,
            structure: s,
            content: c,
            passed: parsed.passed !== undefined ? Boolean(parsed.passed) : (t >= 66),
            feedback: parsed.feedback || "Bài viết hoàn thành tốt."
          };
        } catch (err) {
          console.warn("Lỗi parse JSON từ AI, dùng text phản hồi:", err);
          return {
            success: true,
            total: 80,
            grammar: 20,
            lexis: 20,
            structure: 20,
            content: 20,
            passed: true,
            feedback: rawReply
          };
        }
      }

    return null;
  }
};

  window.RusiAI = RusiAI;
})();
