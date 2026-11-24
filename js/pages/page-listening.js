/**
 * RUSI TRKI — page-listening.js
 * Phân hệ trang: initListeningPage
 * Chuẩn Modular Architecture (0-Egress & Clean Code)
 */

function initListeningPage() {
  const host = el("#listenHost");
  if (!host) return;

  const LEVELS = [
    ["A1", "Sơ cấp"],
    ["A2", "Cơ bản"],
    ["B1", "Trung cấp"],
    ["B2", "Trung cấp cao"],
    ["C1", "Cao cấp"],
    ["C2", "Thành thạo"]
  ];

  const MODE_INFO = {
    comprehension: {
      title: "Nghe hiểu",
      subtitle: "Luyện nghe hội thoại, đoạn văn và trả lời câu hỏi trắc nghiệm",
      icon: "headphones"
    },
    dictation: {
      title: "Nghe chép chính tả",
      subtitle: "Nghe từng câu, rèn luyện bắt âm chuẩn và gõ lại tiếng Nga chính xác",
      icon: "edit-3"
    }
  };

  const LESSON_COVERS = {
    airport: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80",
    shop: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80",
    dorm: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    cafe: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    campus: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    metro: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    interview: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
  };
  const DEFAULT_LISTENING_COVER = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80";

  let currentMode = "comprehension";
  let currentLevel = "A1";
  let currentSpeed = 1.0;
  let showSub = true;
  let currentLesson = null;
  let cloudListening = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("listening:all") : null;
  /**
   * BỘ TẠO SÓNG ÂM REALTIME THEO ÂM THANH THỰC (RUSI REALTIME AUDIO WAVEFORM)
   * - Hoàn toàn không phụ thuộc CDN bên ngoài
   * - Độ phân giải Retina siêu nét qua HTML5 Canvas
   * - Lên xuống động 60fps theo ngữ điệu, âm tiết, nguyên âm và từ vựng tiếng Nga đang phát
   * - Thanh tiến độ mượt mà quét qua từng câu, hỗ trợ tua và phát lại khi nhấn vào sóng âm
   */
  /**
   * BỘ TẠO SÓNG ÂM REALTIME CAO CẤP (RUSI 60–100 BARS INTERACTIVE WAVEFORM ENGINE)
   * - Hiển thị 60–100 thanh sóng âm thanh theo chiều ngang (tự động điều chỉnh theo chiều rộng)
   * - Mỗi thanh có chiều cao khác nhau theo dữ liệu giải mã âm thanh hoặc mô phỏng âm vị tiếng Nga nhất quán
   * - Đầu thanh bo tròn hoàn hảo (rounded bars) với khoảng cách nhỏ đồng đều
   * - Sóng đã phát: màu xanh dương #4598FF
   * - Sóng chưa phát: màu xám #626B79
   * - Màu xanh di chuyển chính xác theo tiến độ phát thực tế
   * - Hỗ trợ tua đến vị trí bất kỳ bằng nhấp chuột hoặc kéo cảm ứng
   * - Khi phát hết audio, toàn bộ waveform chuyển sang màu đã phát (#4598FF)
   */
  const audioPeaksCache = new Map();

  const extractAudioPeaks = async (url, count) => {
    if (!url) return null;
    const key = `${url}:${count}`;
    if (audioPeaksCache.has(key)) return audioPeaksCache.get(key);
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      const actx = new AudioCtx();
      const resp = await fetch(url);
      if (!resp.ok) return null;
      const buf = await resp.arrayBuffer();
      const audioBuf = await actx.decodeAudioData(buf);
      const data = audioBuf.getChannelData(0);
      const blockSize = Math.floor(data.length / count);
      const peaks = new Float32Array(count);
      let maxPeak = 0.0001;

      for (let i = 0; i < count; i++) {
        let sum = 0;
        const start = i * blockSize;
        const end = Math.min(data.length, start + blockSize);
        for (let j = start; j < end; j++) {
          sum += Math.abs(data[j]);
        }
        const amp = sum / (end - start);
        peaks[i] = amp;
        if (amp > maxPeak) maxPeak = amp;
      }
      for (let i = 0; i < count; i++) {
        peaks[i] = Math.max(0.14, Math.min(0.96, (peaks[i] / maxPeak) * 0.95));
      }
      try { actx.close(); } catch (_) {}
      audioPeaksCache.set(key, peaks);
      return peaks;
    } catch (_) {
      return null;
    }
  };

  const generateConsistentWaveform = (text, count) => {
    const clean = (text || "").trim();
    const profile = new Float32Array(count);
    if (!clean || count <= 0) {
      profile.fill(0.18);
      return profile;
    }

    // Bộ sinh số giả ngẫu nhiên có định hướng (deterministic PRNG) theo hạt giống chuỗi
    // Đảm bảo cùng một câu tiếng Nga luôn có vân sóng âm thanh thực tế nhất quán 100%
    const hashSeed = (str) => {
      let h = 2166136261;
      for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return h >>> 0;
    };
    const baseSeed = hashSeed(clean);
    const pseudoRand = (i) => {
      const s = (baseSeed + i * 374761393) ^ 0x5bf03635;
      const x = Math.sin(s) * 43758.5453;
      return x - Math.floor(x);
    };

    // Tách các từ trong câu thoại
    const words = clean.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      profile.fill(0.18);
      return profile;
    }

    const RUSSIAN_VOWELS = new Set(["а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"]);
    const RUSSIAN_SONORANTS = new Set(["р", "л", "м", "н", "й"]);

    // Phân bổ thanh sóng cho từng từ + khoảng dừng hơi thở tự nhiên giữa các từ
    const pauseBarsPerWord = Math.max(2, Math.min(4, Math.floor(count / (words.length * 5.5))));
    const totalPauses = (words.length - 1) * pauseBarsPerWord;
    const availableBarsForWords = Math.max(words.length * 3, count - totalPauses);

    const totalWordLength = words.reduce((acc, w) => acc + Math.max(2, w.length), 0);
    const wordBarAllocations = words.map((w) => {
      const share = Math.max(2, w.length) / totalWordLength;
      return Math.max(3, Math.round(share * availableBarsForWords));
    });

    // Cân đối lại tổng số bar khớp chính xác với `count`
    let allocatedTotal = wordBarAllocations.reduce((a, b) => a + b, 0) + totalPauses;
    while (allocatedTotal > count) {
      let maxIdx = 0;
      for (let j = 1; j < wordBarAllocations.length; j++) {
        if (wordBarAllocations[j] > wordBarAllocations[maxIdx]) maxIdx = j;
      }
      if (wordBarAllocations[maxIdx] > 3) {
        wordBarAllocations[maxIdx]--;
        allocatedTotal--;
      } else break;
    }
    while (allocatedTotal < count) {
      let minIdx = 0;
      for (let j = 1; j < wordBarAllocations.length; j++) {
        if (wordBarAllocations[j] < wordBarAllocations[minIdx]) minIdx = j;
      }
      wordBarAllocations[minIdx]++;
      allocatedTotal++;
    }

    // Khởi tạo biên độ âm học tự nhiên cho từng thanh sóng (Acoustic Envelope)
    let curBar = 0;
    words.forEach((word, wIdx) => {
      const wBars = wordBarAllocations[wIdx];
      const cleanWord = word.replace(/[.,!?;:«»""'']/g, "").toLowerCase();
      const hasComma = /[,;—\-]/.test(word);

      // Nhận diện nguyên âm & trọng âm giả định trong từ
      const vowelIndices = [];
      for (let c = 0; c < cleanWord.length; c++) {
        if (RUSSIAN_VOWELS.has(cleanWord[c])) vowelIndices.push(c);
      }
      const stressIdx = vowelIndices.length > 0 ? vowelIndices[Math.floor(vowelIndices.length / 2)] : 0;

      for (let b = 0; b < wBars && curBar < count; b++) {
        const normInWord = b / Math.max(1, wBars - 1);
        const charPos = Math.min(cleanWord.length - 1, Math.floor(normInWord * cleanWord.length));
        const ch = cleanWord[charPos] || "";

        // Năng lượng ngữ âm theo âm tiết tiếng Nga
        let baseEnergy = 0.35;
        if (RUSSIAN_VOWELS.has(ch)) {
          const isStressed = charPos === stressIdx;
          baseEnergy = isStressed ? 0.90 : 0.74;
        } else if (RUSSIAN_SONORANTS.has(ch)) {
          baseEnergy = 0.52;
        } else {
          baseEnergy = 0.36;
        }

        // Vòm âm thanh tự nhiên của từ (syllabic envelope)
        const wordEnvelope = Math.sin(normInWord * Math.PI);
        const syllableHarmonic = Math.sin(normInWord * Math.PI * Math.max(1, vowelIndices.length)) * 0.14;

        // Vi dao động tự nhiên của dây thanh âm người thật (organic micro-texture)
        const microJitter = (pseudoRand(curBar) - 0.5) * 0.16;

        // Ngữ điệu tổng thể câu nói (Intonation declination)
        const globalNorm = curBar / Math.max(1, count - 1);
        const globalEnvelope = 0.68 + 0.32 * Math.sin(Math.pow(globalNorm, 0.75) * Math.PI);

        let amp = (baseEnergy * 0.72 + wordEnvelope * 0.28 + syllableHarmonic + microJitter) * globalEnvelope;
        amp = Math.max(0.12, Math.min(0.96, amp));

        profile[curBar] = amp;
        curBar++;
      }

      // Khoảng nghỉ tự nhiên giữa 2 từ (Pause valley)
      if (wIdx < words.length - 1) {
        const pauseLen = hasComma ? pauseBarsPerWord + 2 : pauseBarsPerWord;
        for (let p = 0; p < pauseLen && curBar < count; p++) {
          const pauseJitter = pseudoRand(curBar) * 0.05;
          profile[curBar] = 0.09 + pauseJitter;
          curBar++;
        }
      }
    });

    while (curBar < count) {
      profile[curBar] = 0.09 + pseudoRand(curBar) * 0.04;
      curBar++;
    }

    // Làm mượt nhẹ 1 lượt để thanh sóng chuyển tiếp êm ái như phòng thu chuyên nghiệp
    const smoothed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const prev = profile[Math.max(0, i - 1)];
      const cur = profile[i];
      const next = profile[Math.min(count - 1, i + 1)];
      smoothed[i] = prev * 0.18 + cur * 0.64 + next * 0.18;
    }
    return smoothed;
  };

  const createRealtimeWaveform = (wrapEl, options = {}) => {
    if (!wrapEl) return null;
    wrapEl.innerHTML = "";

    const canvas = document.createElement("canvas");
    canvas.className = "lis-dict-realtime-canvas";
    wrapEl.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const isSelectedCompWaveform = wrapEl.id === "compWaveformWrap";

    // Live Time Badge
    const timeBadge = document.createElement("span");
    timeBadge.className = "lis-dict-wave-time-badge";
    timeBadge.textContent = "0:00 / 0:00";
    wrapEl.appendChild(timeBadge);

    const formatTime = (sec) => {
      const s = Math.max(0, Math.floor(sec || 0));
      const m = Math.floor(s / 60);
      const r = s % 60;
      return m + ":" + (r < 10 ? "0" : "") + r;
    };

    const estimateDuration = (txt) => {
      if (!txt) return 3.0;
      const wCount = txt.trim().split(/\s+/).length;
      const cCount = txt.length;
      return Math.max(1.2, Math.min(25, (cCount * 95 + wCount * 110 + 200) / 1000));
    };

    let isPlaying = false;
    let isCompleted = false;
    let animId = null;
    let durationSec = 3.0;
    let startTime = 0;
    let spokenText = "";
    let audioUrl = null;
    let activeCharIndex = -1;
    let currentProgress = 0;
    let targetProgress = 0;
    let width = 0;
    let height = 0;
    let hoverX = -1;

    let barCount = 95;
    let profile = new Float32Array(barCount);

    const computeBarCount = (w) => {
      if (isSelectedCompWaveform) {
        return Math.max(48, Math.min(120, Math.floor(w / 6.2)));
      }
      return Math.max(65, Math.min(180, Math.floor(w / 4.4)));
    };

    const updateProfile = async () => {
      if (audioUrl) {
        const realPeaks = await extractAudioPeaks(audioUrl, barCount);
        if (realPeaks && realPeaks.length === barCount) {
          profile = realPeaks;
          return;
        }
      }
      profile = generateConsistentWaveform(spokenText, barCount);
    };

    const updateTimeDisplay = () => {
      const curSec = currentProgress * durationSec;
      timeBadge.textContent = `${formatTime(curSec)} / ${formatTime(durationSec)}`;
    };

    const resize = () => {
      const rect = wrapEl.getBoundingClientRect();
      width = Math.max(120, Math.floor(rect.width || wrapEl.clientWidth || 400));
      height = Math.max(48, Math.floor(rect.height || wrapEl.clientHeight || 74));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      barCount = computeBarCount(width);
      updateProfile();
      updateTimeDisplay();
    };

    resize();
    let resizeObserver = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => resize());
      resizeObserver.observe(wrapEl);
    }

    const handleSeek = (clientX) => {
      const rect = wrapEl.getBoundingClientRect();
      if (!rect.width) return;
      const clickX = clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      targetProgress = pct;
      currentProgress = pct;
      isCompleted = (pct >= 0.995);
      startTime = Date.now() - (pct * durationSec * 1000);
      updateTimeDisplay();
      if (typeof options.onSeek === "function") {
        options.onSeek(pct);
      }
    };

    wrapEl.onclick = (e) => {
      handleSeek(e.clientX);
    };

    let isSeeking = false;
    wrapEl.onpointerdown = (e) => {
      isSeeking = true;
      handleSeek(e.clientX);
      try { wrapEl.setPointerCapture(e.pointerId); } catch (_) {}
    };

    wrapEl.onpointermove = (e) => {
      const rect = wrapEl.getBoundingClientRect();
      hoverX = e.clientX - rect.left;
      if (isSeeking) {
        handleSeek(e.clientX);
      }
    };

    const endSeek = (e) => {
      if (isSeeking) {
        isSeeking = false;
        try { wrapEl.releasePointerCapture(e.pointerId); } catch (_) {}
      }
    };
    wrapEl.onpointerup = endSeek;
    wrapEl.onpointercancel = endSeek;
    wrapEl.onmouseleave = () => {
      hoverX = -1;
    };

    const draw = () => {
      if (!ctx || width <= 0 || height <= 0) {
        animId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      const centerY = height / 2;
      const maxH = isSelectedCompWaveform
        ? Math.max(22, Math.min(40, height * 0.6))
        : Math.max(26, Math.min(48, height * 0.72));
      const minH = isSelectedCompWaveform ? 3 : 4;

      const isDark = document.documentElement.getAttribute("data-theme") === "dark" || (typeof State !== "undefined" && State.theme === "dark");
      const colorPlayed = isSelectedCompWaveform
        ? (isDark ? "#7cb7ff" : "#2468b4")
        : (isDark ? "#60a5fa" : "#1757a6");
      const colorActive = isSelectedCompWaveform
        ? (isDark ? "#b7d7ff" : "#174f91")
        : (isDark ? "#93c5fd" : "#2563eb");
      const colorUnplayed = isSelectedCompWaveform
        ? (isDark ? "rgba(226, 232, 240, 0.22)" : "rgba(100, 116, 139, 0.24)")
        : (isDark ? "rgba(255, 255, 255, 0.18)" : "rgba(100, 116, 139, 0.30)");

      const now = Date.now();

      if (isPlaying && durationSec > 0 && !isCompleted) {
        const elapsed = (now - startTime) / 1000;
        const timeProgress = Math.min(1.0, elapsed / durationSec);
        if (targetProgress > 0) {
          targetProgress = Math.max(targetProgress, timeProgress);
        } else {
          targetProgress = timeProgress;
        }
        currentProgress += (targetProgress - currentProgress) * 0.22;
        if (currentProgress >= 0.995 && timeProgress >= 1.0) {
          currentProgress = 1.0;
          isCompleted = true;
          isPlaying = false;
        }
        updateTimeDisplay();
      }

      if (!isSelectedCompWaveform) {
        // Trục tâm sóng âm thanh (Center Acoustic Baseline)
        ctx.save();
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(23, 87, 166, 0.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();
        ctx.restore();
      }

      const step = width / barCount;
      const gap = isSelectedCompWaveform
        ? Math.max(2, Math.min(3.2, step * 0.48))
        : Math.max(1.2, Math.min(1.9, step * 0.38));
      const barWidth = Math.max(1.8, step - gap);
      const radius = Math.min(barWidth / 2, isSelectedCompWaveform ? 3 : 2);

      // Vẽ toàn bộ các thanh sóng với biên độ ổn định, chân thực (không bị co giãn méo mó)
      for (let i = 0; i < barCount; i++) {
        const barNorm = (i + 0.5) / barCount;
        const isPassed = isCompleted || currentProgress >= 1.0 || barNorm <= currentProgress;
        const dist = Math.abs(barNorm - currentProgress);

        const val = profile[i] !== undefined ? profile[i] : 0.22;
        const barH = Math.max(minH, minH + val * (maxH - minH));
        const x = i * step + gap / 2;
        const y = centerY - barH / 2;

        if (dist < 0.018 && isPlaying && !isCompleted) {
          ctx.fillStyle = colorActive;
        } else {
          ctx.fillStyle = isPassed ? colorPlayed : colorUnplayed;
        }

        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(x, y, barWidth, barH, radius);
        } else {
          ctx.rect(x, y, barWidth, barH);
        }
        ctx.fill();
      }

      // Con trỏ quét sóng siêu mượt (Studio Glowing Playhead)
      if (isPlaying && currentProgress > 0 && currentProgress < 1.0) {
        const headX = currentProgress * width;
        const headH = Math.min(height - 10, maxH + 6);
        const headY = centerY - headH / 2;

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = isSelectedCompWaveform ? colorActive : "#ffffff";
        ctx.shadowColor = isSelectedCompWaveform
          ? "transparent"
          : (isDark ? "rgba(147, 197, 253, 0.85)" : "rgba(37, 99, 235, 0.75)");
        ctx.shadowBlur = isSelectedCompWaveform ? 0 : 6;
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(headX - 1.1, headY, 2.2, headH, 1.1);
        } else {
          ctx.rect(headX - 1.1, headY, 2.2, headH);
        }
        ctx.fill();
        ctx.restore();
      }

      // Đường dẫn & tooltip hiển thị thời gian khi rê chuột (Hover scrub)
      if (hoverX >= 0 && hoverX <= width) {
        const hoverPct = Math.max(0, Math.min(1, hoverX / width));
        const hoverSec = hoverPct * durationSec;
        const hoverTimeStr = formatTime(hoverSec);

        ctx.save();
        ctx.strokeStyle = isSelectedCompWaveform
          ? (isDark ? "rgba(183, 215, 255, 0.52)" : "rgba(23, 79, 145, 0.42)")
          : (isDark ? "rgba(147, 197, 253, 0.45)" : "rgba(23, 87, 166, 0.35)");
        ctx.lineWidth = 1;
        ctx.setLineDash(isSelectedCompWaveform ? [] : [2, 2]);
        ctx.beginPath();
        ctx.moveTo(hoverX, centerY - 20);
        ctx.lineTo(hoverX, centerY + 20);
        ctx.stroke();

        // Tooltip thời gian bay theo con trỏ
        ctx.setLineDash([]);
        ctx.font = "600 10px Inter, sans-serif";
        const textW = ctx.measureText(hoverTimeStr).width;
        const tipW = textW + 10;
        const tipH = 16;
        const tipX = Math.max(4, Math.min(width - tipW - 4, hoverX - tipW / 2));
        const tipY = 4;

        ctx.fillStyle = isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(15, 31, 56, 0.88)";
        if (typeof ctx.roundRect === "function") {
          ctx.beginPath();
          ctx.roundRect(tipX, tipY, tipW, tipH, 4);
          ctx.fill();
        } else {
          ctx.fillRect(tipX, tipY, tipW, tipH);
        }

        ctx.fillStyle = "#ffffff";
        ctx.textBaseline = "middle";
        ctx.fillText(hoverTimeStr, tipX + 5, tipY + tipH / 2);
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return {
      setSpokenText: (text, soundUrl = null) => {
        spokenText = text || "";
        audioUrl = soundUrl || null;
        durationSec = estimateDuration(spokenText);
        currentProgress = 0;
        targetProgress = 0;
        isCompleted = false;
        updateProfile();
        updateTimeDisplay();
      },
      start: (text, estDuration = 3.0, soundUrl = null) => {
        isPlaying = true;
        isCompleted = false;
        spokenText = text || "";
        audioUrl = soundUrl || null;
        durationSec = Math.max(0.9, estDuration || estimateDuration(spokenText));
        startTime = Date.now();
        currentProgress = 0;
        targetProgress = 0;
        activeCharIndex = 0;
        updateProfile();
        updateTimeDisplay();
      },
      updateBoundary: (charIndex, charLength = 0) => {
        activeCharIndex = charIndex;
        if (spokenText && spokenText.length > 0) {
          const ratio = Math.max(0, Math.min(0.98, charIndex / spokenText.length));
          targetProgress = Math.max(targetProgress, ratio);
        }
      },
      setProgress: (pct) => {
        currentProgress = Math.max(0, Math.min(1, pct));
        targetProgress = currentProgress;
        isCompleted = (currentProgress >= 0.995);
        startTime = Date.now() - (currentProgress * durationSec * 1000);
        updateTimeDisplay();
      },
      seek: (pct) => {
        currentProgress = Math.max(0, Math.min(1, pct));
        targetProgress = currentProgress;
        isCompleted = (currentProgress >= 0.995);
        startTime = Date.now() - (currentProgress * durationSec * 1000);
        updateTimeDisplay();
      },
      resume: () => {
        if (currentProgress >= 0.995) {
          currentProgress = 0;
          targetProgress = 0;
          isCompleted = false;
        }
        startTime = Date.now() - (currentProgress * durationSec * 1000);
        isPlaying = true;
        isCompleted = false;
        updateTimeDisplay();
      },
      pause: () => {
        isPlaying = false;
      },
      complete: () => {
        isPlaying = false;
        currentProgress = 1.0;
        targetProgress = 1.0;
        isCompleted = true;
        updateTimeDisplay();
      },
      stop: (keepComplete = false) => {
        isPlaying = false;
        if (!keepComplete && !isCompleted) {
          currentProgress = 0;
          targetProgress = 0;
        }
        activeCharIndex = -1;
        updateTimeDisplay();
      },
      destroy: () => {
        isPlaying = false;
        if (animId) cancelAnimationFrame(animId);
        if (resizeObserver) resizeObserver.disconnect();
        wrapEl.innerHTML = "";
      }
    };
  };

  const icon = (name, size) => window.RusiIcons ? RusiIcons.get(name, { size }) : "";
  const lessonImage = (l) => l.image || l.image_url || LESSON_COVERS[l.category] || DEFAULT_LISTENING_COVER;

  const getListeningLessons = () => {
    if (cloudListening && cloudListening.length) return cloudListening;
    if (typeof window !== "undefined" && window.LISTENING_LESSONS && window.LISTENING_LESSONS.length) return window.LISTENING_LESSONS;
    if (typeof LISTENING_LESSONS !== "undefined" && Array.isArray(LISTENING_LESSONS) && LISTENING_LESSONS.length) return LISTENING_LESSONS;
    return [];
  };

  const loadCloudListening = async () => {
    // 0-Egress rule: Nạp từ RAM/IndexedDB/CDN JSON trước, bỏ qua truy vấn Supabase nếu đã có dữ liệu
    if (window.RusiDataLoader && !window.RusiDataLoader.isLoaded("LISTENING_LESSONS")) {
      await window.RusiDataLoader.load("LISTENING_LESSONS");
      if (window.LISTENING_LESSONS && window.LISTENING_LESSONS.length > 0) {
        if (!currentLesson && !document.body.classList.contains("in-workspace")) {
          renderListeningCards();
        }
        return;
      }
    }
    if (window.LISTENING_LESSONS && window.LISTENING_LESSONS.length > 0) return;
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.listening.getAll();
        if (remote && remote.length) {
          cloudListening = remote;
          console.log(`[Supabase] Đã tải ${remote.length} bài nghe từ Database!`);
          if (!currentLesson && !document.body.classList.contains("in-workspace")) {
            renderListeningCards();
          }
        }
      } catch (err) {
        console.warn("[Supabase] Lỗi tải bài nghe từ cloud:", err);
      }
    }
  };
  loadCloudListening();

  const filteredLessons = () => {
    const all = getListeningLessons();
    return all.filter((l) => {
      if (l.level !== currentLevel) return false;
      if (currentMode === "dictation") {
        return Array.isArray(l.dictation) && l.dictation.length > 0;
      }
      return true;
    });
  };

  const renderListeningCards = () => {
    const gridHost = host.querySelector("#lisCardsGrid");
    if (!gridHost) return;

    host.querySelectorAll(".listening-mode-card").forEach((button) => {
      const active = button.dataset.mode === currentMode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    host.querySelectorAll(".listening-level-tab").forEach((button) => {
      const active = button.dataset.level === currentLevel;
      button.classList.toggle("active", active);
      button.classList.toggle("level-tab-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });

    const all = getListeningLessons();
    LEVELS.forEach(([level]) => {
      const count = all.filter((l) => {
        if (l.level !== level) return false;
        if (currentMode === "dictation") {
          return Array.isArray(l.dictation) && l.dictation.length > 0;
        }
        return true;
      }).length;
      const countNode = host.querySelector(`[data-listening-count="${level}"]`);
      if (countNode) countNode.textContent = count;
    });

    const items = filteredLessons();
    if (!items.length) {
      gridHost.innerHTML = `
        <div class="writing-empty-state listening-empty-state">
          <span class="writing-empty-icon listening-empty-icon">${icon(MODE_INFO[currentMode].icon, 34)}</span>
          <h3>Chưa có bài ${MODE_INFO[currentMode].title.toLowerCase()} ở cấp ${currentLevel}</h3>
          <p>Hãy chọn một cấp độ khác để tiếp tục luyện tập.</p>
        </div>
      `;
      return;
    }

    gridHost.innerHTML = items.map((l) => {
      const isDone = currentMode === "comprehension"
        ? (Progress.doneList("listenDone").includes(l.id + "_comp") || Progress.doneList("listenDone").includes(l.id + "_check") || Progress.doneList("listenDone").includes(l.id + "_video"))
        : (Array.isArray(l.dictation) && l.dictation.length > 0 && l.dictation.every((_, i) => Progress.doneList("listenDone").includes(l.id + "_dict_" + i)));
      const isPro = Boolean(l.is_pro_only || l.is_pro);
      const isUnlocked = !isPro || (typeof Monetization !== "undefined" && Monetization.isPro());
      const qCount = (l.questions && l.questions.length) ? l.questions.length : (l.lines && l.lines.length) ? l.lines.length : 4;
      const dictCount = (l.dictation && l.dictation.length) || 0;
      const countLabel = currentMode === "comprehension" ? `${qCount} câu hỏi` : `${dictCount} câu chính tả`;
      const actionLabel = isDone ? "Đã hoàn thành" : (currentMode === "comprehension" ? "Vào luyện nghe hiểu" : "Vào chép chính tả");

      const getListeningIconKey = (item) => {
        const cat = ((item.category || "") + " " + (item.id || "")).toLowerCase();
        if (cat.includes("airport") || cat.includes("plane")) return "plane";
        if (cat.includes("cafe") || cat.includes("coffee")) return "coffee";
        if (cat.includes("metro") || cat.includes("train")) return "train";
        if (cat.includes("city") || cat.includes("hotel")) return "building-2";
        if (cat.includes("interview") || cat.includes("work") || cat.includes("job")) return "briefcase";
        if (cat.includes("weather")) return "sun";
        if (cat.includes("shopping") || cat.includes("shop")) return "shopping-cart";
        if (cat.includes("restaurant") || cat.includes("food")) return "utensils";
        if (item.icon && window.RusiIcons && RusiIcons.has && RusiIcons.has(item.icon)) return item.icon;
        return currentMode === "dictation" ? "edit-3" : "headphones";
      };

      const iconKey = getListeningIconKey(l);
      const iconSvg = window.RusiIcons ? RusiIcons.get(iconKey, { size: 24 }) : icon("headphones", 24);

      return `
        <!-- GIAO DIỆN THẺ TỐI GIẢN CHUẨN MỚI .rusi-card-compact (Đồng bộ từ vựng, dùng 100% SVG RusiIcons) -->
        <article class="rusi-card rusi-card-compact listening-topic-card ${isDone ? 'topic-completed' : ''} ${isPro ? 'topic-pro' : ''} ${isPro && !isUnlocked ? 'topic-locked' : ''}" data-listen-id="${esc(l.id)}">
          <div class="rusi-card-header">
            <div class="rusi-card-icon" style="background:rgba(23,87,166,0.08);color:var(--primary)">
              ${iconSvg}
            </div>
            <div class="rusi-card-header-main">
              <div class="rusi-card-title-row">
                <h3 class="rusi-card-ru" title="${esc(l.title)} · ${esc(l.vi || "")}">${esc(l.title)}</h3>
                ${isDone ? `
                  <span class="topic-status topic-status-completed" style="flex-shrink:0">
                    ${icon("check", 12)} Hoàn thành
                  </span>
                ` : isPro ? `
                  <span class="topic-status topic-status-pro" style="flex-shrink:0">PRO</span>
                ` : ""}
              </div>
              <div class="rusi-card-subinfo">
                <span>${l.level}</span>
                <span class="rusi-card-sep">•</span>
                <span class="rusi-card-count">${countLabel}</span>
              </div>
            </div>
          </div>

          <div class="rusi-card-footer topic-footer" style="margin-top:auto;padding-top:10px;justify-content:flex-end">
            <div class="topic-footer-actions">
              ${isPro && !isUnlocked ? `
                <span class="topic-pro-lock-icon" title="Nội dung dành cho học viên PRO" aria-label="Khóa PRO">
                  ${icon("lock-pro", 16) || icon("lock", 16)}
                </span>
              ` : `
                <button type="button" class="btn-listen-action topic-text-btn" data-listen-id="${esc(l.id)}" title="${actionLabel}">
                  ${actionLabel} ${icon("arrow-right", 14)}
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join("");

    const openLesson = (card) => {
      const id = card.dataset.listenId;
      if (typeof window.requireAuth === "function" && !window.requireAuth("listening.html?id=" + encodeURIComponent(id || ""))) return;
      const lesson = all.find((x) => x.id === id);
      if (!lesson) return;
      const isPro = Boolean(lesson.is_pro_only || lesson.is_pro);
      if (isPro && !Monetization.isPro()) {
        Monetization.showProGateModal(
          "Nội dung nghe dành cho PRO",
          "Nâng cấp lên gói PRO để mở khóa toàn bộ bài luyện nghe trung & nâng cao kèm audio chất lượng cao."
        );
        return;
      }
      if (currentMode === "dictation") {
        openDictationWorkspace(lesson);
      } else {
        openComprehensionWorkspace(lesson);
      }
    };

    gridHost.querySelectorAll(".listening-topic-card").forEach((card) => {
      card.onclick = () => openLesson(card);
      card.onkeydown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLesson(card);
        }
      };
    });
    gridHost.querySelectorAll(".btn-listen-action, .topic-circle-btn").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const card = btn.closest(".listening-topic-card");
        if (card) openLesson(card);
      };
    });
  };

  const renderHub = () => {
    if (window.setRusiDeepUrl) {
      window.setRusiDeepUrl('/listening');
    }
    document.body.classList.remove("in-workspace");
    currentLesson = null;
    host.innerHTML = `
      <section class="writing-hub listening-hub" id="listeningHub">
        <header class="writing-hub-header listening-hub-header">
          <h1>Chọn cách bạn muốn luyện nghe</h1>
          <p>Chinh phục kỹ năng nghe tiếng Nga qua phương pháp nghe hiểu toàn diện và chép chính tả.</p>
        </header>

        <div class="writing-mode-grid listening-mode-grid" aria-label="Chọn dạng luyện nghe">
          ${Object.entries(MODE_INFO).map(([key, info]) => `
            <button type="button" class="writing-mode-card listening-mode-card ${key === currentMode ? "active" : ""}" data-mode="${key}" aria-pressed="${key === currentMode}">
              <span class="writing-mode-icon listening-mode-icon">${icon(info.icon, 28)}</span>
              <span class="writing-mode-copy listening-mode-copy">
                <strong>${info.title}</strong>
                <small>${info.subtitle}</small>
              </span>
              <span class="writing-mode-arrow listening-mode-arrow">${icon("arrow-right", 18)}</span>
            </button>
          `).join("")}
        </div>

        <div class="level-tabs writing-level-tabs listening-level-tabs" role="tablist" aria-label="Lọc bài nghe theo cấp độ" id="lisLevelTabs">
          ${LEVELS.map(([level, label]) => `
            <button type="button" class="level-tab writing-level-tab listening-level-tab ${level === currentLevel ? "level-tab-active active" : ""}" data-level="${level}" role="tab" aria-selected="${level === currentLevel ? "true" : "false"}">
              <span class="level-code">${level}</span>
              <small>${label}</small>
              <span class="level-tab-count" data-listening-count="${level}">0</span>
            </button>
          `).join("")}
        </div>

        <div class="writing-topic-grid listening-topic-grid" id="lisCardsGrid"></div>
      </section>
    `;

    host.querySelectorAll(".listening-mode-card").forEach((button) => {
      button.onclick = () => {
        currentMode = button.dataset.mode;
        renderListeningCards();
      };
    });

    host.querySelectorAll(".listening-level-tab").forEach((button) => {
      button.onclick = () => {
        currentLevel = button.dataset.level;
        renderListeningCards();
      };
    });

    renderListeningCards();
  };

  const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const openListeningWorkspace = (lesson, initialMode = "video") => {
    currentLesson = lesson;
    let activeMode = initialMode;
    const initializedModes = {};
    let currentSpeakTimer = null;

    document.body.classList.add("in-workspace");
    window.scrollTo({ top: 0, behavior: "smooth" });

    host.innerHTML = `
      <!-- STICKY TOP BACK BAR -->
      <div class="rusi-workspace-back-bar">
        <button type="button" class="rusi-back-btn" id="btnBackLisList" title="Quay lại danh sách bài nghe" aria-label="Quay lại danh sách bài nghe">
          ${window.RusiIcons ? RusiIcons.get("arrow-left", { size: 18 }) : "←"}
        </button>
        <div class="rusi-workspace-info">
          <span class="rusi-workspace-title">${window.RusiIcons ? RusiIcons.get(lesson.icon || "headphones", { size: 22 }) : ""} ${esc(lesson.title)}</span>
        </div>
        <div class="rusi-workspace-controls" style="display:flex;align-items:center;gap:8px;margin-left:auto;flex-wrap:wrap">
          <div class="speed-pills">
            <button class="speed-pill ${currentSpeed === 0.75 ? "active" : ""}" data-sp="0.75">0.75x</button>
            <button class="speed-pill ${currentSpeed === 1.0 ? "active" : ""}" data-sp="1.0">1.0x</button>
            <button class="speed-pill ${currentSpeed === 1.25 ? "active" : ""}" data-sp="1.25">1.25x</button>
          </div>
          <button class="btn btn-outline btn-sm rusi-top-btn" id="btnToggleSub" title="${showSub ? "Ẩn dịch nghĩa" : "Hiện dịch nghĩa"}">${window.RusiIcons ? RusiIcons.get("languages", { size: 15 }) : ""} <span class="btn-text">${showSub ? "Ẩn dịch" : "Dịch nghĩa"}</span></button>
          <button class="btn btn-primary btn-sm rusi-top-btn" id="lisPlayAll" title="Nghe toàn bài">${window.RusiIcons ? RusiIcons.get("play-control", { size: 16 }) : ""} <span class="btn-text">Nghe toàn bài</span></button>
        </div>
      </div>

      <div class="workspace" style="max-width:1080px;margin:0 auto">
        <div class="tabs" id="lisTabs" style="justify-content:center;margin:0 0 20px;flex-wrap:wrap">
          <button class="tab ${activeMode === "video" ? "active" : ""}" data-m="video">${window.RusiIcons ? RusiIcons.get("film", { size: 14 }) : ""} Shadowing Video (1-5 phút)</button>
          <button class="tab ${activeMode === "full" ? "active" : ""}" data-m="full">Nghe Full</button>
          <button class="tab ${activeMode === "blank" ? "active" : ""}" data-m="blank">Điền Từ</button>
          <button class="tab ${activeMode === "dict" ? "active" : ""}" data-m="dict">Nghe Chép Chính Tả</button>
          <button class="tab ${activeMode === "check" ? "active" : ""}" data-m="check">Trắc Nghiệm Check</button>
        </div>

        <div id="modeBody">
          <div id="lisPane_video" class="lis-mode-panel lis-mode-panel-video"></div>
          <div id="lisPane_full" class="lis-mode-panel hidden-pane"></div>
          <div id="lisPane_blank" class="lis-mode-panel hidden-pane"></div>
          <div id="lisPane_dict" class="lis-mode-panel hidden-pane"></div>
          <div id="lisPane_check" class="lis-mode-panel hidden-pane"></div>
        </div>
      </div>
    `;

    // Unified translation toggling function - updates DOM in-place without touching video iframe
    const setTranslationVisible = (visible) => {
      showSub = visible;
      const topSubBtn = host.querySelector("#btnToggleSub");
      if (topSubBtn) topSubBtn.textContent = showSub ? "Ẩn dịch nghĩa" : "Hiện dịch nghĩa";

      const videoSubBtn = host.querySelector("#btnToggleSubTrans");
      if (videoSubBtn) videoSubBtn.innerHTML = showSub ? ((window.RusiIcons ? RusiIcons.get("eye", { size: 14 }) : "") + " Ẩn dịch") : ((window.RusiIcons ? RusiIcons.get("eye", { size: 14 }) : "") + " Hiện dịch");

      const subVi = host.querySelector("#rusiSubVi");
      if (subVi) {
        subVi.classList.toggle("hidden", !showSub);
        subVi.style.display = showSub ? "" : "none";
      }

      const curVi = host.querySelector("#rusiCurVi");
      if (curVi) {
        curVi.classList.toggle("hidden", !showSub);
        curVi.style.display = showSub ? "" : "none";
      }

      host.querySelectorAll(".rusi-item-vi").forEach((el) => {
        el.classList.toggle("hidden", !showSub);
        el.style.display = showSub ? "" : "none";
      });

      host.querySelectorAll(".line-vi").forEach((el) => {
        el.classList.toggle("hidden", !showSub);
        el.style.display = showSub ? "" : "none";
      });
    };

    // Mode switching function - switches active tab and panel without destroying video iframe
    const switchMode = (newMode) => {
      activeMode = newMode;
      host.querySelectorAll("#lisTabs [data-m]").forEach((b) => {
        b.classList.toggle("active", b.dataset.m === newMode);
      });

      const paneVideo = host.querySelector("#lisPane_video");
      const paneFull = host.querySelector("#lisPane_full");
      const paneBlank = host.querySelector("#lisPane_blank");
      const paneDict = host.querySelector("#lisPane_dict");
      const paneCheck = host.querySelector("#lisPane_check");

      // Video panel is kept mounted off-screen so YouTube player state is NOT lost and does not reset to start
      if (paneVideo) {
        if (newMode === "video") {
          paneVideo.classList.remove("panel-hidden-video");
          paneVideo.style.display = "";
          paneVideo.style.position = "";
          paneVideo.style.left = "";
          paneVideo.style.top = "";
          paneVideo.style.width = "";
          paneVideo.style.height = "";
          paneVideo.style.overflow = "";
          paneVideo.style.opacity = "";
          paneVideo.style.pointerEvents = "";
          paneVideo.style.visibility = "";
        } else {
          paneVideo.classList.add("panel-hidden-video");
          paneVideo.style.position = "absolute";
          paneVideo.style.left = "-9999px";
          paneVideo.style.top = "-9999px";
          paneVideo.style.width = "1px";
          paneVideo.style.height = "1px";
          paneVideo.style.overflow = "hidden";
          paneVideo.style.opacity = "0";
          paneVideo.style.pointerEvents = "none";
          paneVideo.style.visibility = "hidden";
        }
      }

      if (paneFull) {
        paneFull.classList.toggle("hidden-pane", newMode !== "full");
        paneFull.style.display = newMode === "full" ? "block" : "none";
        if (newMode === "full" && !initializedModes.full) {
          modeFull(paneFull, lesson);
          initializedModes.full = true;
        }
      }

      if (paneBlank) {
        paneBlank.classList.toggle("hidden-pane", newMode !== "blank");
        paneBlank.style.display = newMode === "blank" ? "block" : "none";
        if (newMode === "blank" && !initializedModes.blank) {
          modeBlank(paneBlank, lesson);
          initializedModes.blank = true;
        }
      }

      if (paneDict) {
        paneDict.classList.toggle("hidden-pane", newMode !== "dict");
        paneDict.style.display = newMode === "dict" ? "block" : "none";
        if (newMode === "dict" && !initializedModes.dict) {
          modeDict(paneDict, lesson);
          initializedModes.dict = true;
        }
      }

      if (paneCheck) {
        paneCheck.classList.toggle("hidden-pane", newMode !== "check");
        paneCheck.style.display = newMode === "check" ? "block" : "none";
        if (newMode === "check" && !initializedModes.check) {
          modeCheck(paneCheck, lesson);
          initializedModes.check = true;
        }
      }
    };

    // Back button
    el("#btnBackLisList").onclick = () => {
      if (window._rusiShadowKeyHandler) {
        window.removeEventListener("keydown", window._rusiShadowKeyHandler);
        window._rusiShadowKeyHandler = null;
      }
      if (currentSpeakTimer) {
        clearTimeout(currentSpeakTimer);
        currentSpeakTimer = null;
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      renderHub();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Tab buttons
    host.querySelectorAll("#lisTabs [data-m]").forEach((b) => {
      b.addEventListener("click", () => {
        switchMode(b.dataset.m);
      });
    });

    // Speed pills in header
    host.querySelectorAll(".ws-head [data-sp]").forEach((b) => {
      b.addEventListener("click", () => {
        currentSpeed = parseFloat(b.dataset.sp);
        host.querySelectorAll(".ws-head [data-sp]").forEach((s) => s.classList.remove("active"));
        b.classList.add("active");

        // Sync with video speed pills if present
        host.querySelectorAll(".btn-yt-sp").forEach((s) => {
          s.classList.toggle("active", parseFloat(s.dataset.sp) === currentSpeed);
        });

        const iframe = host.querySelector("#lisYtIframe");
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(JSON.stringify({
            event: "command",
            func: "setPlaybackRate",
            args: [currentSpeed]
          }), "*");
        }

        toast(`Tốc độ đọc: ${currentSpeed}x`);
      });
    });

    // Subtitle toggle button in ws-head
    const subBtn = el("#btnToggleSub");
    if (subBtn) {
      subBtn.onclick = () => {
        setTranslationVisible(!showSub);
      };
    }

    // Play all button
    el("#lisPlayAll").onclick = () => {
      const full = lesson.lines.map((l) => l.ru).join(" ");
      speak(full, "ru-RU", currentSpeed);
    };

    // Initialize initial mode
    const paneVideo = host.querySelector("#lisPane_video");
    modeVideo(paneVideo, lesson, setTranslationVisible, () => activeMode);
    initializedModes.video = true;

    if (activeMode !== "video") {
      switchMode(activeMode);
    }
  };

  const modeVideo = (mb, lesson, setTranslationVisible, getActiveMode) => {
    // Default video segments (1-5 min) per level
    const defaultVideos = {
      A1: { youtubeId: "e6lFvAQp0LE", startSec: 15, endSec: 195, durationLabel: "3 phút (180 giây)" },
      A2: { youtubeId: "e6lFvAQp0LE", startSec: 200, endSec: 380, durationLabel: "3 phút (180 giây)" },
      B1: { youtubeId: "e6lFvAQp0LE", startSec: 390, endSec: 570, durationLabel: "3 phút (180 giây)" },
      B2: { youtubeId: "e6lFvAQp0LE", startSec: 15, endSec: 255, durationLabel: "4 phút (240 giây)" }
    };

    const vConfig = lesson.video || defaultVideos[lesson.level] || defaultVideos.A1;
    const ytId = vConfig.youtubeId || "e6lFvAQp0LE";
    const start = vConfig.startSec || 15;
    const end = vConfig.endSec || 195;
    const durationLabel = vConfig.durationLabel || `${Math.round((end - start) / 60)} phút`;

    const videoQuestions = (lesson.video && lesson.video.questions) || [
      {
        q: `1. Trong đoạn video giao tiếp "${lesson.title}", nhân vật chính đang ở tình huống nào?`,
        options: [
          lesson.vi || "Tình huống giao tiếp tiếng Nga đời thường",
          "Thảo luận về thời sự quốc tế và khoa học vũ trụ",
          "Hướng dẫn công thức nấu món súp truyền thống Nga",
          "Tham quan triển lãm nghệ thuật cổ điển Ermitage"
        ],
        a: 0,
        explain: `Bối cảnh chính của bài nghe là: ${lesson.vi}`
      },
      {
        q: `2. Trong đoạn hội thoại có xuất hiện câu thoại nào dưới đây?`,
        options: [
          lesson.lines[0]?.ru || "Здравствуйте! Скажите, пожалуйста...",
          "Я совершенно не понимаю ни слова по-русски.",
          "Вчера в Москве была очень снежная погода.",
          "Поезд дальнего следования отправляется через час."
        ],
        a: 0,
        explain: `Nhân vật bắt đầu cuộc trao đổi với câu: "${lesson.lines[0]?.ru || "Здравствуйте!"}"`
      },
      {
        q: `3. Từ vựng hoặc cụm từ trọng tâm nào được nhấn mạnh trong đoạn băng?`,
        options: [
          lesson.blanks?.[0]?.blank ? `Cụm từ liên quan đến: "${lesson.blanks[0].blank}"` : (lesson.lines[1]?.ru || "Hỏi thông tin và cảm ơn lịch sự"),
          "Du hành thám hiểm sao Hỏa bằng tên lửa",
          "Đổi tiền ngoại tệ tại chi nhánh ngân hàng",
          "Thủ tục cấp visa du lịch dài hạn"
        ],
        a: 0,
        explain: `Từ khóa then chốt được dùng nhiều lần trong bối cảnh giao tiếp này.`
      }
    ];

    // State for RUSI Shadowing Studio
    let activeSentenceIdx = 0;
    const totalSentences = lesson.lines.length;
    const scores = {};
    let localSpeed = currentSpeed || 1.0;
    let repeatCount = 1;
    let isRecRunning = false;
    let currentSpeakTimer = null;

    // Load saved scores
    for (let i = 0; i < totalSentences; i++) {
      const savedScore = STORE.get("lis_shadow_" + lesson.id + "_" + i, null);
      if (savedScore !== null) scores[i] = savedScore;
    }

    const getPassedCount = () => Object.values(scores).filter((s) => s >= 70).length;

    const curLine = lesson.lines[0] || { ru: "", vi: "", who: "" };
    const curScore = scores[0];
    const passedCount = getPassedCount();
    const progressPct = Math.round((passedCount / totalSentences) * 100);

    // Render RUSI-style 2-column layout ONCE - video iframe is NEVER re-created on interactions
    mb.innerHTML = `
      <div class="rusi-shadow-studio">
        <!-- 2-COLUMN STUDIO WORKSPACE -->
        <div class="rusi-shadow-grid">
          <!-- LEFT COLUMN: VIDEO + ACTIVE SENTENCE CARD + QUIZ -->
          <div class="rusi-shadow-left-col">
            <!-- YOUTUBE VIDEO 16:9 CONTAINER WITH SUBTITLE OVERLAY -->
            <div class="rusi-shadow-video-wrap">
              <iframe
                id="lisYtIframe"
                src="https://www.youtube-nocookie.com/embed/${ytId}?start=${start}&end=${end}&enablejsapi=1&rel=0&modestbranding=1"
                title="Russian Shadowing Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>

              <!-- SUBTITLE OVERLAY (RUSI style) -->
              <div class="rusi-shadow-sub-overlay" id="rusiSubOverlay">
                <p class="sub-ru ru" id="rusiSubRu">${esc(curLine.ru)}</p>
                <p class="sub-vi ${showSub && curLine.vi ? "" : "hidden"}" id="rusiSubVi">${esc(curLine.vi || "")}</p>
              </div>
            </div>

            <!-- VIDEO CONTROLS STRIP -->
            <div class="rusi-video-meta-bar">
              <div class="rusi-meta-left">
                <span class="rusi-meta-pill" style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 14 }) : ""} Thời lượng: <b>${durationLabel}</b></span>
                <span class="rusi-meta-pill text-primary">${window.RusiIcons ? RusiIcons.get("target", { size: 14 }) : ""} Giọng Moscow chuẩn</span>
              </div>
              <div class="rusi-meta-right">
                <span class="rusi-speed-label">Tốc độ:</span>
                <div class="speed-pills">
                  <button type="button" class="speed-pill btn-yt-sp ${localSpeed === 0.75 ? "active" : ""}" data-sp="0.75">0.75x</button>
                  <button type="button" class="speed-pill btn-yt-sp ${localSpeed === 1.0 ? "active" : ""}" data-sp="1.0">1.0x</button>
                  <button type="button" class="speed-pill btn-yt-sp ${localSpeed === 1.25 ? "active" : ""}" data-sp="1.25">1.25x</button>
                </div>
                <button type="button" class="btn btn-outline btn-sm" id="btnToggleSubTrans">
                  ${showSub ? ((window.RusiIcons ? RusiIcons.get("eye", { size: 14 }) : "") + " Ẩn dịch") : ((window.RusiIcons ? RusiIcons.get("eye", { size: 14 }) : "") + " Hiện dịch")}
                </button>
              </div>
            </div>

            <!-- ACTIVE SENTENCE PRACTICE CARD (SHADOWING HERO) -->
            <div class="rusi-sentence-card" id="rusiActiveCard">
              <div class="rusi-sentence-card-head">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                  <span class="rusi-badge-sentence" id="rusiCurSentenceIdx">Câu 1 / ${totalSentences}</span>
                  <span class="rusi-speaker-pill" id="rusiCurSpeaker" style="display:inline-flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : ""} ${esc(curLine.who)}</span>
                  <span id="rusiCurScoreBadgeWrap">
                    ${curScore !== undefined ? `
                      <span class="rusi-score-badge ${curScore >= 70 ? "pass" : "retry"}">
                        ${curScore >= 70 ? `Đạt ${curScore}%` : `${curScore}% (luyện lại)`}
                      </span>
                    ` : ""}
                  </span>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                  <div class="rusi-repeat-group" title="Số lần tự lặp khi nghe câu">
                    <span style="font-size:0.75rem;color:var(--muted);font-weight:600">Lặp:</span>
                    <button type="button" class="rusi-repeat-btn ${repeatCount === 1 ? "active" : ""}" data-rep="1">1×</button>
                    <button type="button" class="rusi-repeat-btn ${repeatCount === 2 ? "active" : ""}" data-rep="2">2×</button>
                    <button type="button" class="rusi-repeat-btn ${repeatCount === 3 ? "active" : ""}" data-rep="3">3×</button>
                  </div>
                </div>
              </div>

              <!-- SENTENCE RUSSIAN & VIETNAMESE TEXT -->
              <div class="rusi-sentence-text-box">
                <h3 class="rusi-active-ru ru" id="rusiCurRu">${esc(curLine.ru)}</h3>
                <p class="rusi-active-vi ${showSub && curLine.vi ? "" : "hidden"}" id="rusiCurVi">${esc(curLine.vi || "")}</p>
              </div>

              <!-- WAVEFORM AUDIO BOX -->
              <div id="shadowWaveBox" class="waveform-box">
                <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
                <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
                <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
                <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
              </div>

              <!-- SHADOWING ACTIONS: PLAY AUDIO & MIC BUTTON -->
              <div class="rusi-sentence-actions">
                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
                  <button type="button" class="btn btn-primary" id="btnPlayActiveLine">
                    <span>${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : ""} Nghe câu</span>
                  </button>
                  <button type="button" class="mic-btn" id="btnMicActiveLine" title="Bấm để nói và nhận diện chấm điểm (R)">${window.RusiIcons ? RusiIcons.get("mic-speaking", { size: 20 }) : ""}</button>
                  <div class="rusi-mic-status" id="rusiMicStatus">
                    ${curScore !== undefined ? `Điểm gần nhất: <b>${curScore}%</b>` : `Bấm nút <b>Micro</b> và đọc nhại lại câu tiếng Nga`}
                  </div>
                </div>

                <div id="rusiScoreRingWrap">
                  ${curScore !== undefined ? `
                    <div class="score-ring ${curScore >= 80 ? "" : curScore >= 50 ? "mid" : "low"}" title="Độ chính xác">${curScore}%</div>
                  ` : ""}
                </div>
              </div>

              <!-- RECOGNITION HEARD BOX (FEEDBACK) -->
              <div id="rusiHeardFeedback" class="rusi-heard-box hidden"></div>
            </div>

            <!-- VIDEO QUIZ COMPREHENSION (Giữ nguyên vẹn 100% nội dung câu hỏi) -->
            <div class="lis-video-quiz-box" style="margin-top:20px">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px">
                <div>
                  <h3 style="margin:0 0 4px;font-size:1.15rem;display:flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("brain", { size: 18 }) : ""} Bài trắc nghiệm kiểm tra sau khi xem video</h3>
                  <p style="margin:0;font-size:0.85rem;color:var(--muted)">Xem kỹ đoạn trích video trên và chọn đáp án đúng nhất cho các câu hỏi sau:</p>
                </div>
                <div id="videoQuizScore" class="rusi-meta-pill" style="font-weight:700;color:var(--primary)">
                  Tiến độ: 0/${videoQuestions.length} câu
                </div>
              </div>

              <div class="lis-video-questions-list">
                ${videoQuestions.map((q, qIdx) => `
                  <div class="lis-video-q-card" data-q-idx="${qIdx}">
                    <div class="lis-video-q-title">${esc(q.q)}</div>
                    <div class="lis-video-opt-list">
                      ${q.options.map((opt, optIdx) => `
                        <button type="button" class="lis-video-opt-btn" data-opt-idx="${optIdx}">
                          <span style="font-weight:700;color:var(--muted)">${String.fromCharCode(65 + optIdx)}.</span>
                          <span>${esc(opt)}</span>
                        </button>
                      `).join("")}
                    </div>
                    <div class="lis-video-feedback hidden"></div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>

          <!-- RIGHT COLUMN: SENTENCES LIST (RUSI SIDE PANEL) -->
          <div class="rusi-shadow-right-col">
            <div class="rusi-side-header">
              <div>
                <h4 style="margin:0;font-size:0.95rem;font-weight:700;display:flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("copy-clipboard", { size: 16 }) : ""} Danh sách câu</h4>
                <span style="font-size:0.75rem;color:var(--muted)">Bấm câu để luyện ngay</span>
              </div>
              <div class="rusi-side-counter">
                Đã đạt: <b id="rusiSidePassed" class="text-primary">${passedCount}</b>/${totalSentences}
              </div>
            </div>

            <!-- MINI PROGRESS BAR -->
            <div class="rusi-side-progress-bar">
              <div class="rusi-side-progress-fill" id="rusiProgressFill" style="width: ${progressPct}%"></div>
            </div>

            <!-- SCROLLABLE SENTENCE LIST -->
            <div class="rusi-sentence-scroll-list" id="rusiSentenceList">
              ${lesson.lines.map((l, idx) => {
                const sScore = scores[idx];
                const isActive = idx === 0;
                return `
                  <button type="button" class="rusi-sentence-item ${isActive ? "active" : ""}" data-sentence-idx="${idx}">
                    <div class="rusi-item-idx ${isActive ? "active" : ""}">#${idx + 1}</div>
                    <div class="rusi-item-body">
                      <div class="rusi-item-speaker">${esc(l.who)}</div>
                      <div class="rusi-item-ru ru">${esc(l.ru)}</div>
                      <div class="rusi-item-vi ${showSub && l.vi ? "" : "hidden"}">${esc(l.vi || "")}</div>
                    </div>
                    <div class="rusi-item-status">
                      ${sScore !== undefined ? `
                        <span class="rusi-mini-score ${sScore >= 70 ? "pass" : "retry"}">${sScore}%</span>
                      ` : `
                        <span class="rusi-mini-play">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : ""}</span>
                      `}
                    </div>
                  </button>
                `;
              }).join("")}
            </div>
          </div>
        </div>

        <!-- STICKY BOTTOM TOOLBAR (RUSI style) -->
        <div class="rusi-shadow-bottom-bar">
          <div class="rusi-bot-left">
            <button type="button" class="btn btn-outline btn-sm" id="btnPrevSentence" disabled>
              ← Câu trước
            </button>
          </div>

          <div class="rusi-bot-center">
            <button type="button" class="btn btn-primary btn-sm" id="btnBottomPlay">
              ${window.RusiIcons ? RusiIcons.get("volume-high", { size: 16 }) : ""} Nghe lại (Space)
            </button>
            <button type="button" class="btn btn-soft btn-sm" id="btnBottomMic">
              ${window.RusiIcons ? RusiIcons.get("mic-speaking", { size: 16 }) : ""} Luyện nói (R)
            </button>
            <button type="button" class="btn btn-primary btn-sm" id="btnNextSentence" ${totalSentences <= 1 ? "disabled" : ""}>
              Câu tiếp theo →
            </button>
          </div>

          <div class="rusi-bot-right">
            <div class="rusi-shortcuts-hint">
              <kbd>Space</kbd> Nghe · <kbd>R</kbd> Mic · <kbd>←</kbd> <kbd>→</kbd> Chuyển câu
            </div>
          </div>
        </div>
      </div>
    `;

    // Play active sentence with repeat and waveform animation
    const playCurrentSentence = () => {
      const curLine = lesson.lines[activeSentenceIdx];
      if (!curLine) return;
      const waveBox = mb.querySelector("#shadowWaveBox");
      if (waveBox) waveBox.classList.add("active");

      if (currentSpeakTimer) {
        clearTimeout(currentSpeakTimer);
        currentSpeakTimer = null;
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      let remainingRepeats = repeatCount;
      const doSpeak = () => {
        speak(curLine.ru, "ru-RU", localSpeed);
        remainingRepeats--;
        if (remainingRepeats > 0) {
          currentSpeakTimer = setTimeout(doSpeak, 1800);
        } else {
          currentSpeakTimer = setTimeout(() => {
            if (waveBox) waveBox.classList.remove("active");
            currentSpeakTimer = null;
          }, 1500);
        }
      };
      doSpeak();
    };

    // Select sentence and update UI in place (zero lag, zero iframe reload)
    const selectSentence = (idx, autoPlay = true) => {
      if (idx < 0 || idx >= totalSentences) return;
      activeSentenceIdx = idx;
      const curLine = lesson.lines[activeSentenceIdx] || lesson.lines[0];
      const curScore = scores[activeSentenceIdx];

      // Update active card elements in place without touching iframe
      const idxEl = mb.querySelector("#rusiCurSentenceIdx");
      if (idxEl) idxEl.textContent = `Câu ${activeSentenceIdx + 1} / ${totalSentences}`;

      const speakerEl = mb.querySelector("#rusiCurSpeaker");
      if (speakerEl) speakerEl.innerHTML = (window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : "") + " " + esc(curLine.who);

      const badgeWrap = mb.querySelector("#rusiCurScoreBadgeWrap");
      if (badgeWrap) {
        badgeWrap.innerHTML = curScore !== undefined ? `
          <span class="rusi-score-badge ${curScore >= 70 ? "pass" : "retry"}">
            ${curScore >= 70 ? `Đạt ${curScore}%` : `${curScore}% (luyện lại)`}
          </span>
        ` : "";
      }

      const ruEl = mb.querySelector("#rusiCurRu");
      if (ruEl) ruEl.textContent = curLine.ru;

      const viEl = mb.querySelector("#rusiCurVi");
      if (viEl) {
        viEl.textContent = curLine.vi || "";
        viEl.classList.toggle("hidden", !showSub || !curLine.vi);
      }

      const subRu = mb.querySelector("#rusiSubRu");
      if (subRu) subRu.textContent = curLine.ru;

      const subVi = mb.querySelector("#rusiSubVi");
      if (subVi) {
        subVi.textContent = curLine.vi || "";
        subVi.classList.toggle("hidden", !showSub || !curLine.vi);
      }

      const micStatus = mb.querySelector("#rusiMicStatus");
      if (micStatus) {
        micStatus.innerHTML = curScore !== undefined ? `Điểm gần nhất: <b>${curScore}%</b>` : `Bấm nút <b>Micro</b> và đọc nhại lại câu tiếng Nga`;
      }

      const scoreRingWrap = mb.querySelector("#rusiScoreRingWrap");
      if (scoreRingWrap) {
        scoreRingWrap.innerHTML = curScore !== undefined ? `
          <div class="score-ring ${curScore >= 80 ? "" : curScore >= 50 ? "mid" : "low"}" title="Độ chính xác">${curScore}%</div>
        ` : "";
      }

      const heardBox = mb.querySelector("#rusiHeardFeedback");
      if (heardBox) {
        heardBox.classList.add("hidden");
        heardBox.innerHTML = "";
      }

      const waveBox = mb.querySelector("#shadowWaveBox");
      if (waveBox) waveBox.classList.remove("active");

      // Bottom bar buttons
      const btnPrev = mb.querySelector("#btnPrevSentence");
      if (btnPrev) btnPrev.disabled = activeSentenceIdx === 0;

      const btnNext = mb.querySelector("#btnNextSentence");
      if (btnNext) btnNext.disabled = activeSentenceIdx === totalSentences - 1;

      // Sentence list highlight
      mb.querySelectorAll(".rusi-sentence-item").forEach((item) => {
        const itemIdx = parseInt(item.dataset.sentenceIdx, 10);
        const isAct = itemIdx === activeSentenceIdx;
        item.classList.toggle("active", isAct);
        const numBox = item.querySelector(".rusi-item-idx");
        if (numBox) numBox.classList.toggle("active", isAct);
      });

      const list = mb.querySelector("#rusiSentenceList");
      const activeItem = mb.querySelector(`.rusi-sentence-item[data-sentence-idx="${activeSentenceIdx}"]`);
      if (list && activeItem) {
        const itemTop = activeItem.offsetTop - list.offsetTop;
        list.scrollTo({ top: Math.max(0, itemTop - 20), behavior: "smooth" });
      }

      if (currentSpeakTimer) {
        clearTimeout(currentSpeakTimer);
        currentSpeakTimer = null;
      }

      if (autoPlay) {
        playCurrentSentence();
      }
    };

    // Microphone shadowing recording & evaluation
    const triggerMicShadowing = () => {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) {
        toast("Trình duyệt không hỗ trợ nhận dạng giọng nói — hãy dùng Chrome hoặc Edge.");
        return;
      }
      if (isRecRunning) return;

      const curLine = lesson.lines[activeSentenceIdx];
      if (!curLine) return;

      const micBtn = mb.querySelector("#btnMicActiveLine");
      const bottomMicBtn = mb.querySelector("#btnBottomMic");
      const micStatus = mb.querySelector("#rusiMicStatus");
      const waveBox = mb.querySelector("#shadowWaveBox");
      const heardBox = mb.querySelector("#rusiHeardFeedback");
      const scoreRingWrap = mb.querySelector("#rusiScoreRingWrap");

      isRecRunning = true;
      if (micBtn) micBtn.classList.add("rec");
      if (bottomMicBtn) bottomMicBtn.classList.add("btn-danger");
      if (waveBox) waveBox.classList.add("active");
      if (micStatus) micStatus.innerHTML = (window.RusiIcons ? RusiIcons.get("mic-speaking", { size: 14 }) : "") + " <i>Đang nghe... hãy đọc to câu tiếng Nga trên</i>";

      const rec = new SR();
      rec.lang = "ru-RU";
      rec.interimResults = false;
      rec.maxAlternatives = 3;

      rec.onresult = (ev) => {
        const heard = ev.results[0][0].transcript;
        const sim = similarity(heard, curLine.ru);

        scores[activeSentenceIdx] = sim;
        STORE.set("lis_shadow_" + lesson.id + "_" + activeSentenceIdx, sim);

        if (scoreRingWrap) {
          scoreRingWrap.innerHTML = `<div class="score-ring ${sim >= 80 ? "" : sim >= 50 ? "mid" : "low"}" title="Độ chính xác">${sim}%</div>`;
        }

        if (heardBox) {
          heardBox.classList.remove("hidden");
          heardBox.innerHTML = `
            <div style="font-size:0.85rem">
              AI nghe được: <b style="color:var(--text)">"${esc(heard)}"</b>
              <span class="rusi-sim-pill ${sim >= 70 ? "pass" : "retry"}">${sim}% khớp</span>
            </div>
          `;
        }

        if (micStatus) {
          micStatus.innerHTML = sim >= 70 ?
            `${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : ""} <b style="color:var(--green)">Xuất sắc! Đạt ${sim}%</b>` :
            `${window.RusiIcons ? RusiIcons.get("alert-triangle", { size: 16 }) : ""} <b>Đạt ${sim}%</b> — nghe lại và thử phát âm rõ hơn nhé`;
        }

        // Award XP if first time passed
        if (sim >= 70) {
          const passKey = lesson.id + "_shadow_" + activeSentenceIdx;
          if (!Progress.doneList("listenDone").includes(passKey)) {
            Progress.markDone("listenDone", passKey);
            Progress.addXp(10);
            toast("Tuyệt vời! Phát âm chuẩn (+10 XP)");
          }
        }

        // Update active sentence score badge in card head
        const badgeWrap = mb.querySelector("#rusiCurScoreBadgeWrap");
        if (badgeWrap) {
          badgeWrap.innerHTML = `
            <span class="rusi-score-badge ${sim >= 70 ? "pass" : "retry"}">
              ${sim >= 70 ? `Đạt ${sim}%` : `${sim}% (luyện lại)`}
            </span>
          `;
        }

        // Update side panel counters
        const passedCount = getPassedCount();
        const sidePassedEl = mb.querySelector("#rusiSidePassed");
        const progFill = mb.querySelector("#rusiProgressFill");
        if (sidePassedEl) sidePassedEl.textContent = passedCount;
        if (progFill) progFill.style.width = Math.round((passedCount / totalSentences) * 100) + "%";

        // Update active item status in list
        const activeListItem = mb.querySelector(`.rusi-sentence-item[data-sentence-idx="${activeSentenceIdx}"] .rusi-item-status`);
        if (activeListItem) {
          activeListItem.innerHTML = `<span class="rusi-mini-score ${sim >= 70 ? "pass" : "retry"}">${sim}%</span>`;
        }
      };

      rec.onerror = (err) => {
        console.warn("SpeechRec error:", err);
        if (micStatus) micStatus.innerHTML = (window.RusiIcons ? RusiIcons.get("alert-triangle", { size: 14 }) : "") + " Chưa nhận diện được âm thanh. Hãy thử lại.";
      };

      rec.onend = () => {
        isRecRunning = false;
        if (micBtn) micBtn.classList.remove("rec");
        if (bottomMicBtn) bottomMicBtn.classList.remove("btn-danger");
        if (waveBox) waveBox.classList.remove("active");
      };

      try {
        rec.start();
      } catch (err) {
        isRecRunning = false;
        if (micBtn) micBtn.classList.remove("rec");
        if (bottomMicBtn) bottomMicBtn.classList.remove("btn-danger");
        if (waveBox) waveBox.classList.remove("active");
      }
    };

    // Bind all interactive events
    const bindShadowingEvents = () => {
      // Play sentence button
      const btnPlay = mb.querySelector("#btnPlayActiveLine");
      if (btnPlay) btnPlay.onclick = () => playCurrentSentence();

      const btnBottomPlay = mb.querySelector("#btnBottomPlay");
      if (btnBottomPlay) btnBottomPlay.onclick = () => playCurrentSentence();

      // Mic buttons
      const btnMic = mb.querySelector("#btnMicActiveLine");
      if (btnMic) btnMic.onclick = () => triggerMicShadowing();

      const btnBottomMic = mb.querySelector("#btnBottomMic");
      if (btnBottomMic) btnBottomMic.onclick = () => triggerMicShadowing();

      // Prev / Next buttons
      const btnPrev = mb.querySelector("#btnPrevSentence");
      if (btnPrev) btnPrev.onclick = () => selectSentence(activeSentenceIdx - 1);

      const btnNext = mb.querySelector("#btnNextSentence");
      if (btnNext) btnNext.onclick = () => selectSentence(activeSentenceIdx + 1);

      // Repeat buttons
      mb.querySelectorAll(".rusi-repeat-btn").forEach((btn) => {
        btn.onclick = () => {
          repeatCount = parseInt(btn.dataset.rep, 10);
          mb.querySelectorAll(".rusi-repeat-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          toast(`Tự động lặp lại: ${repeatCount} lần`);
        };
      });

      // Speed pills
      mb.querySelectorAll(".btn-yt-sp").forEach((btn) => {
        btn.onclick = () => {
          localSpeed = parseFloat(btn.dataset.sp);
          currentSpeed = localSpeed;
          mb.querySelectorAll(".btn-yt-sp").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");

          // Sync with header speed pills
          host.querySelectorAll(".ws-head [data-sp]").forEach((s) => {
            s.classList.toggle("active", parseFloat(s.dataset.sp) === localSpeed);
          });

          const iframe = mb.querySelector("#lisYtIframe");
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(JSON.stringify({
              event: "command",
              func: "setPlaybackRate",
              args: [localSpeed]
            }), "*");
          }
          toast(`Tốc độ phát: ${localSpeed}x`);
        };
      });

      // Toggle translation button in video bar
      const btnSub = mb.querySelector("#btnToggleSubTrans");
      if (btnSub) {
        btnSub.onclick = () => {
          setTranslationVisible(!showSub);
        };
      }

      // Sentence list item click
      mb.querySelectorAll(".rusi-sentence-item").forEach((item) => {
        item.onclick = () => {
          const sIdx = parseInt(item.dataset.sentenceIdx, 10);
          selectSentence(sIdx, true);
        };
      });

      // Quiz comprehension evaluation
      let answeredCount = 0;
      let correctCount = 0;
      const scorePill = mb.querySelector("#videoQuizScore");

      mb.querySelectorAll(".lis-video-q-card").forEach((card, qIdx) => {
        const qData = videoQuestions[qIdx];
        const optBtns = card.querySelectorAll(".lis-video-opt-btn");
        const fbBox = card.querySelector(".lis-video-feedback");

        optBtns.forEach((btn) => {
          btn.onclick = () => {
            if (card.dataset.answered === "true") return;
            card.dataset.answered = "true";
            answeredCount++;

            const selectedIdx = parseInt(btn.dataset.optIdx, 10);
            const isCorrect = selectedIdx === qData.a;

            if (isCorrect) {
              btn.classList.add("correct");
              correctCount++;
            } else {
              btn.classList.add("wrong");
              optBtns[qData.a]?.classList.add("correct");
            }

            if (fbBox) {
              fbBox.classList.remove("hidden");
              fbBox.style.background = isCorrect ? "#ecfdf5" : "#fef2f2";
              fbBox.style.color = isCorrect ? "#065f46" : "#991b1b";
              fbBox.style.border = isCorrect ? "1px solid #10b981" : "1px solid #ef4444";
              fbBox.innerHTML = `
                <div style="font-weight:700;margin-bottom:2px;display:flex;align-items:center;gap:4px">${isCorrect ? `${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""} Chính xác!` : `${window.RusiIcons ? RusiIcons.get("x", { size: 14 }) : ""} Chưa chính xác!`}</div>
                <div>${esc(qData.explain)}</div>
              `;
            }

            if (scorePill) {
              scorePill.textContent = `Đúng: ${correctCount}/${answeredCount} (Tổng ${videoQuestions.length} câu)`;
            }

            if (answeredCount === videoQuestions.length) {
              const pct = (correctCount / videoQuestions.length) * 100;
              if (pct >= 60) {
                const key = lesson.id + "_video";
                if (!Progress.doneList("listenDone").includes(key)) {
                  Progress.addXp(20);
                  Progress.markDone("listenDone", key);
                }
                toast(`Xuất sắc! Bạn trả lời đúng ${correctCount}/${videoQuestions.length} câu (+20 XP)!`);
              } else {
                toast(`Bạn đạt ${correctCount}/${videoQuestions.length} câu. Hãy xem lại video để hiểu rõ hơn nhé!`);
              }
            }
          };
        });
      });
    };

    // Keyboard navigation handler (RUSI shortcuts)
    const handleKeyNav = (e) => {
      if (typeof getActiveMode === "function" && getActiveMode() !== "video") return;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName) || e.target.isContentEditable) return;
      if (e.code === "Space") {
        e.preventDefault();
        playCurrentSentence();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        triggerMicShadowing();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (activeSentenceIdx > 0) selectSentence(activeSentenceIdx - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (activeSentenceIdx < totalSentences - 1) selectSentence(activeSentenceIdx + 1);
      }
    };

    if (window._rusiShadowKeyHandler) {
      window.removeEventListener("keydown", window._rusiShadowKeyHandler);
      window._rusiShadowKeyHandler = null;
    }
    window._rusiShadowKeyHandler = handleKeyNav;
    window.addEventListener("keydown", handleKeyNav);

    // Initial event binding
    bindShadowingEvents();
  };

  const modeFull = (mb, lesson) => {
    mb.innerHTML = lesson.lines
      .map(
        (l) => `
      <div class="dialogue-line">
        <span class="who">${esc(l.who)}</span>
        <span class="line-ru ru">${esc(l.ru)}
          <button class="btn btn-outline btn-sm speak-line" style="margin-left:8px;padding:2px 10px">${window.RusiIcons ? RusiIcons.get("volume-high", { size: 14 }) : ""}</button>
        </span>
        <span class="line-vi ${showSub && l.vi ? "" : "hidden"}">${esc(l.vi || "")}</span>
      </div>`
      )
      .join("");
    mb.querySelectorAll(".speak-line").forEach((btn, i) => {
      btn.onclick = () => speak(lesson.lines[i].ru, "ru-RU", currentSpeed);
    });
  };

  const modeBlank = (mb, lesson) => {
    if (!Array.isArray(lesson.blanks) || lesson.blanks.length === 0) {
      mb.innerHTML = `<div class="empty-state">Bài này chưa có phần điền từ.</div>`;
      return;
    }
    mb.innerHTML =
      lesson.blanks
        .map(
          (b, i) => `
      <div class="quiz-q">
        <p class="q-text ru">${esc(b.before)}
          <input class="blank-input" data-i="${i}" autocomplete="off" placeholder="?">
        ${esc(b.after)}</p>
        <p style="color:var(--muted);font-size:.85rem;display:flex;align-items:center;gap:4px">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 14 }) : ""} Gợi ý: ${esc(b.hint)}</p>
      </div>`
        )
        .join("") +
      `<button class="btn btn-primary" id="checkBlanks">Kiểm tra kết quả</button>`;
    el("#checkBlanks").onclick = () => {
      let ok = 0;
      mb.querySelectorAll(".blank-input").forEach((inp) => {
        const target = lesson.blanks[+inp.dataset.i].blank.toLowerCase();
        const val = inp.value.toLowerCase().replace(/[.,!?]/g, "").trim();
        const good = val && similarity(val, target) >= 70;
        inp.classList.toggle("ok", good);
        inp.classList.toggle("bad", !good);
        if (good) ok++;
      });
      if (ok === lesson.blanks.length) {
        if (!Progress.doneList("listenDone").includes(lesson.id + "_blank")) Progress.addXp(15);
        Progress.markDone("listenDone", lesson.id + "_blank");
        toast("Xuất sắc! Điền đúng 100% (+15 XP)");
      } else {
        toast(`${ok}/${lesson.blanks.length} đúng — nghe lại nhé!`);
      }
    };
  };

  /* =====================================================================
   * GIAO DIỆN CHÉP CHÍNH TẢ 3/7 WORKSPACE HIỆN ĐẠI (AUDIO SÓNG ÂM & CLOZE INPUT)
   * ===================================================================== */
  const DICT_SENTENCE_VOCAB_DB = {
    "Вот, пожалуйста.": [
      { ru: "пожалуйста", vi: "xin vui lòng, không có gì", pos: "межд.", stress: "пожа́луйста" },
      { ru: "вот", vi: "đây, này", pos: "част.", stress: "вот" }
    ],
    "У вас есть багаж?": [
      { ru: "багаж", vi: "hành lý ký gửi", pos: "сущ.", stress: "бага́ж" },
      { ru: "есть", vi: "có, hiện hữu", pos: "гл.", stress: "есть" }
    ],
    "Спасибо! А где паспортный контроль?": [
      { ru: "паспортный контроль", vi: "kiểm tra hộ chiếu", pos: "сущ.", stress: "па́спортный контро́ль" },
      { ru: "паспорт", vi: "hộ chiếu", pos: "сущ.", stress: "па́спорт" },
      { ru: "спасибо", vi: "cảm ơn", pos: "межд.", stress: "спаси́бо" }
    ],
    "Сколько стоит этот сыр?": [
      { ru: "стоить", vi: "có giá, trị giá", pos: "гл.", stress: "сто́ить" },
      { ru: "сыр", vi: "phô mai", pos: "сущ.", stress: "сыр" }
    ],
    "Скажите, а рыба свежая?": [
      { ru: "свежий", vi: "tươi mới, tươi sống", pos: "прил.", stress: "све́жий" },
      { ru: "рыба", vi: "cá", pos: "сущ.", stress: "ры́ба" }
    ],
    "Спасибо, возьму!": [
      { ru: "взять", vi: "lấy, mua", pos: "гл. св", stress: "взять" },
      { ru: "спасибо", vi: "cảm ơn", pos: "межд.", stress: "спаси́бо" }
    ],
    "Мой ключ номер 412.": [
      { ru: "ключ", vi: "chìa khóa", pos: "сущ.", stress: "ключ" },
      { ru: "номер", vi: "số phòng", pos: "сущ.", stress: "но́мер" }
    ],
    "Прачечная на цокольном этаже.": [
      { ru: "прачечная", vi: "phòng giặt là", pos: "сущ.", stress: "пра́чечная" },
      { ru: "этаж", vi: "tầng gác", pos: "сущ.", stress: "эта́ж" }
    ],
    "Спасибо за информацию!": [
      { ru: "информация", vi: "thông tin", pos: "сущ.", stress: "информа́ция" },
      { ru: "спасибо", vi: "cảm ơn", pos: "межд.", stress: "спаси́бо" }
    ],
    "Вам помочь определиться?": [
      { ru: "определиться", vi: "quyết định, lựa chọn", pos: "гл.", stress: "определи́ться" },
      { ru: "помочь", vi: "giúp đỡ", pos: "гл.", stress: "помо́чь" }
    ],
    "Да, пожалуйста, блинчики с семгой.": [
      { ru: "блинчики", vi: "bánh blini Nga", pos: "сущ. мн.", stress: "бли́нчики" },
      { ru: "сёмга", vi: "cá hồi", pos: "сущ.", stress: "сёмга" }
    ],
    "С вас 480 рублей.": [
      { ru: "рубль", vi: "đồng Rúp Nga", pos: "сущ.", stress: "рубль" }
    ],
    "Где оформить читательский билет?": [
      { ru: "оформить", vi: "làm thủ tục, đăng ký", pos: "гл. св", stress: "офо́рмить" },
      { ru: "читательский билет", vi: "thẻ thư viện", pos: "сущ.", stress: "чита́тельский биле́т" }
    ],
    "Учебники выдаются на один семестр.": [
      { ru: "учебник", vi: "sách giáo trình", pos: "сущ.", stress: "уче́бник" },
      { ru: "семестр", vi: "học kỳ", pos: "сущ.", stress: "семе́стр" }
    ],
    "Справка о стипендии на втором этаже.": [
      { ru: "стипендия", vi: "học bổng", pos: "сущ.", stress: "стипе́ндия" },
      { ru: "справка", vi: "giấy xác nhận", pos: "сущ.", stress: "спра́вка" }
    ],
    "Осторожно, двери закрываются.": [
      { ru: "осторожно", vi: "cẩn thận, chú ý", pos: "нар.", stress: "осторо́жно" },
      { ru: "двери", vi: "cửa tàu, cửa ra vào", pos: "сущ. мн.", stress: "две́ри" },
      { ru: "закрываться", vi: "đóng lại", pos: "гл.", stress: "закрыва́ются" }
    ],
    "Следующая станция — “Театральная”.": [
      { ru: "следующий", vi: "tiếp theo, kế tiếp", pos: "прил.", stress: "сле́дующий" },
      { ru: "станция", vi: "nhà ga tàu điện", pos: "сущ.", stress: "ста́нция" }
    ],
    "Переход на Замоскворецкую линию.": [
      { ru: "переход", vi: "lối chuyển tuyến", pos: "сущ.", stress: "перехо́д" },
      { ru: "линия", vi: "tuyến đường metro", pos: "сущ.", stress: "ли́ния" }
    ],
    "Юрий Гагарин совершил первый космический полет.": [
      { ru: "космический", vi: "thuộc vũ trụ", pos: "прил.", stress: "косми́ческий" },
      { ru: "полет", vi: "chuyến bay", pos: "сущ.", stress: "полёт" },
      { ru: "совершить", vi: "thực hiện", pos: "гл. св", stress: "соверши́ть" }
    ],
    "Путь человечества открылся благодаря исследователям.": [
      { ru: "человечество", vi: "nhân loại, loài người", pos: "сущ.", stress: "челове́чество" },
      { ru: "исследователь", vi: "nhà thám hiểm, nghiên cứu", pos: "сущ.", stress: "иссле́дователь" },
      { ru: "благодаря", vi: "nhờ vào (+Cách 3)", pos: "предл.", stress: "благодаря́" }
    ],
    "Космонавт готов лететь к далеким мирам.": [
      { ru: "космонавт", vi: "nhà du hành vũ trụ", pos: "сущ.", stress: "космона́вт" },
      { ru: "мир", vi: "thế giới, vũ trụ", pos: "сущ.", stress: "мир" },
      { ru: "далекий", vi: "xa xôi, xa xăm", pos: "прил.", stress: "далёкий" }
    ]
  };

  const getSentenceVocab = (sentenceText, lesson, lineIdx) => {
    const trimmed = (sentenceText || "").trim();

    // 1. Ưu tiên lấy từ vựng liên kết chính xác từ từ điển vocabularies qua bảng listening_lesson_vocab
    if (lesson && Array.isArray(lesson.vocab_items) && lesson.vocab_items.length > 0) {
      const matchedFromDb = lesson.vocab_items
        .filter((item) => {
          if (!item || !item.vocab) return false;
          if (typeof lineIdx === "number" && item.line_index !== null && item.line_index !== undefined) {
            return item.line_index === lineIdx;
          }
          const word = (item.vocab.word_normalized || item.vocab.word_with_stress || "").toLowerCase();
          return word && trimmed.toLowerCase().includes(word);
        })
        .map((item) => ({
          ru: item.vocab.word_normalized || item.vocab.word_with_stress,
          stress: item.vocab.word_with_stress || item.vocab.word_normalized,
          vi: item.vocab.meaning_vi,
          pos: item.vocab.pos || "слов.",
          audio: item.vocab.audio_url || null
        }));

      if (matchedFromDb.length > 0) {
        return matchedFromDb;
      }
    }

    if (DICT_SENTENCE_VOCAB_DB[trimmed]) {
      return DICT_SENTENCE_VOCAB_DB[trimmed];
    }
    // Tìm đối chiếu trong blanks của bài
    const matched = [];
    if (Array.isArray(lesson.blanks)) {
      lesson.blanks.forEach((b) => {
        if (b.blank && trimmed.toLowerCase().includes(b.blank.toLowerCase())) {
          matched.push({
            ru: b.blank,
            vi: b.hint || "Từ khóa trong câu",
            pos: "слов.",
            stress: b.blank
          });
        }
      });
    }
    if (matched.length > 0) return matched;

    // Trích xuất các từ có độ dài >= 4
    const words = trimmed.replace(/[.,!?;:«»""'']/g, "").split(/\s+/).filter(w => w.length >= 4);
    if (words.length > 0) {
      return words.slice(0, 2).map(w => ({
        ru: w,
        vi: "Từ vựng trong bài",
        pos: "слов.",
        stress: w
      }));
    }
    return [{ ru: trimmed.split(/\s+/)[0] || "слово", vi: "Từ trong câu", pos: "слов.", stress: trimmed.split(/\s+/)[0] || "слово" }];
  };

  /* =====================================================================
   * KHÔNG GIAN LUYỆN NGHE HIỂU (COMPREHENSION WORKSPACE)
   * Bố cục 3/7: 3 phần menu câu hỏi bên trái, 7 phần phát audio & trắc nghiệm
   * ===================================================================== */
  const openComprehensionWorkspace = (lesson) => {
    if (window.setRusiDeepUrl && lesson) {
      window.setRusiDeepUrl('/listening/bai_hoc/' + encodeURIComponent(lesson.id || lesson.code));
    }
    if (typeof window.requireAuth === "function" && !window.requireAuth("listening.html?id=" + encodeURIComponent((lesson && lesson.id) || ""))) return;
    currentLesson = lesson;
    document.body.classList.add("in-workspace");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const questions = (Array.isArray(lesson.questions) && lesson.questions.length > 0)
      ? lesson.questions
      : [
          {
            q: "Nội dung chính của đoạn hội thoại là gì?",
            options: ["Chào hỏi và làm quen", "Hỏi đường và đi lại", "Mua sắm trong cửa hàng", "Ở sân bay làm thủ tục"],
            a: 0,
            exp: "Dựa vào các câu chào hỏi và giới thiệu của nhân vật."
          }
        ];

    const lines = Array.isArray(lesson.lines) ? lesson.lines : [];

    const userAnswers = {};      // qIdx -> selected option index
    let isPlaying = false;
    let currentSpeed = 1.0;
    let currentLineIdx = -1;
    let playTimeout = null;
    let animFrameId = null;
    let showTranscript = false;
    let isSubmitted = false;
    let compWaveform = null;

    // Tính toán thời lượng từng dòng và toàn bài hội thoại
    const calcLineDurSec = (text, spd) => {
      if (!text) return 1.5;
      return Math.max(1.8, (text.length * 115 + (text.split(/[.,?!—;:]/).length - 1) * 260) / (spd * 1000));
    };

    const PAUSE_GAP_SEC = 0.55;
    let timeline = [];
    let totalDurationSec = 3.0;
    let currentTimeSec = 0;
    let playbackStartTimestamp = 0;
    let playbackBaseTimeSec = 0;

    let compNativeAudio = null;
    const recomputeTimeline = () => {
      timeline = [];
      let acc = 0;
      lines.forEach((ln, idx) => {
        const t = ln ? (ln.text_ru || ln.ru || "") : "";
        const start = (typeof ln.start_sec === "number") ? ln.start_sec : acc;
        const dur = (typeof ln.end_sec === "number" && typeof ln.start_sec === "number" && ln.end_sec > ln.start_sec)
          ? (ln.end_sec - ln.start_sec)
          : calcLineDurSec(t, currentSpeed);
        const end = (typeof ln.end_sec === "number") ? ln.end_sec : (start + dur);
        timeline.push({
          idx,
          start,
          dur,
          end,
          text: t,
          line: ln
        });
        acc = end + PAUSE_GAP_SEC;
      });
      totalDurationSec = (lesson.duration_seconds && lesson.duration_seconds > 0)
        ? lesson.duration_seconds
        : Math.max(3.0, acc);
    };
    recomputeTimeline();

    const updatePlaybackUI = () => {
      const playerCard = host.querySelector("#compPlayerCard");
      if (playerCard) playerCard.classList.toggle("is-playing", isPlaying);

      const playBtn = host.querySelector("#btnCompPlay");
      if (playBtn) {
        playBtn.innerHTML = isPlaying ? icon("pause-control", 24) : icon("play-control", 24);
        playBtn.title = isPlaying ? "Tạm dừng" : "Phát bài nghe";
        playBtn.setAttribute("aria-label", isPlaying ? "Tạm dừng" : "Phát bài nghe");
      }

      host.querySelectorAll(".lis-comp-dialogue-line").forEach(lineEl => {
        const lineIdx = Number(lineEl.dataset.lineIdx);
        lineEl.classList.toggle("is-active", lineIdx === currentLineIdx);
      });
    };

    const stopSpeechAndTimers = () => {
      if (compNativeAudio) {
        try { compNativeAudio.pause(); } catch (_) {}
      }
      if (playTimeout) {
        clearTimeout(playTimeout);
        playTimeout = null;
      }
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch (_) {}
      }
    };

    const pauseAudio = () => {
      if (!isPlaying) return;
      if (compNativeAudio && !compNativeAudio.paused) {
        try {
          compNativeAudio.pause();
          currentTimeSec = compNativeAudio.currentTime;
        } catch (_) {}
      } else {
        const elapsed = (Date.now() - playbackStartTimestamp) / 1000;
        currentTimeSec = Math.min(totalDurationSec, playbackBaseTimeSec + elapsed);
      }
      isPlaying = false;
      stopSpeechAndTimers();
      if (compWaveform) compWaveform.pause();
      updatePlaybackUI();
    };

    const stopAudio = () => {
      isPlaying = false;
      currentTimeSec = 0;
      currentLineIdx = -1;
      if (compNativeAudio) {
        try {
          compNativeAudio.pause();
          compNativeAudio.currentTime = 0;
        } catch (_) {}
      }
      stopSpeechAndTimers();
      if (compWaveform) compWaveform.stop();
      updatePlaybackUI();
    };

    const playFromTime = (targetSec) => {
      stopSpeechAndTimers();
      recomputeTimeline();

      let sec = Math.max(0, targetSec);
      if (sec >= totalDurationSec - 0.1) {
        currentTimeSec = totalDurationSec;
        isPlaying = false;
        currentLineIdx = -1;
        if (compWaveform) compWaveform.complete();
        updatePlaybackUI();
        return;
      }

      currentTimeSec = sec;
      isPlaying = true;
      playbackStartTimestamp = Date.now();
      playbackBaseTimeSec = sec;

      if (compWaveform) {
        const allRuText = lines.map(l => l.text_ru || l.ru || "").join(" ");
        compWaveform.start(allRuText, totalDurationSec, lesson.audio_url || null);
        compWaveform.seek(currentTimeSec / totalDurationSec);
      }

      // Tìm câu thoại tương ứng với thời điểm hiện tại
      let foundSeg = null;
      let inGap = false;
      for (let i = 0; i < timeline.length; i++) {
        const seg = timeline[i];
        if (currentTimeSec >= seg.start && currentTimeSec <= seg.end) {
          foundSeg = seg;
          break;
        }
        if (currentTimeSec > seg.end && (i === timeline.length - 1 || currentTimeSec < timeline[i + 1].start)) {
          foundSeg = seg;
          inGap = true;
          break;
        }
      }

      if (!foundSeg && timeline.length > 0) {
        foundSeg = timeline[0];
        currentTimeSec = 0;
        playbackBaseTimeSec = 0;
        playbackStartTimestamp = Date.now();
      }

      const startProgressTicker = () => {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        const tick = () => {
          if (!isPlaying) return;
          const cur = (compNativeAudio && !compNativeAudio.paused)
            ? compNativeAudio.currentTime
            : Math.min(totalDurationSec, playbackBaseTimeSec + (Date.now() - playbackStartTimestamp) / 1000);
          currentTimeSec = cur;
          if (compWaveform) compWaveform.setProgress(cur / totalDurationSec);

          for (let i = 0; i < timeline.length; i++) {
            if (cur >= timeline[i].start && cur <= timeline[i].end + PAUSE_GAP_SEC) {
              if (currentLineIdx !== timeline[i].idx) {
                currentLineIdx = timeline[i].idx;
                updatePlaybackUI();
              }
              break;
            }
          }

          if (cur >= totalDurationSec) {
            isPlaying = false;
            currentLineIdx = -1;
            if (compWaveform) compWaveform.complete();
            updatePlaybackUI();
            return;
          }
          animFrameId = requestAnimationFrame(tick);
        };
        animFrameId = requestAnimationFrame(tick);
      };

      startProgressTicker();

      if (lesson.audio_url) {
        try {
          if (!compNativeAudio) {
            compNativeAudio = new Audio(lesson.audio_url);
          }
          compNativeAudio.playbackRate = currentSpeed;
          const applyTime = () => { try { compNativeAudio.currentTime = currentTimeSec; } catch (_) {} };
          if (compNativeAudio.readyState >= 1) {
            applyTime();
          } else {
            compNativeAudio.addEventListener("loadedmetadata", applyTime, { once: true });
          }
          compNativeAudio.play().catch(() => {});
          compNativeAudio.onended = () => {
            isPlaying = false;
            currentLineIdx = -1;
            if (compWaveform) compWaveform.complete();
            updatePlaybackUI();
          };
          updatePlaybackUI();
          return;
        } catch (_) {}
      }

      const playSegmentFrom = (segIndex, charOffset = 0) => {
        if (!isPlaying || segIndex >= timeline.length) {
          isPlaying = false;
          currentLineIdx = -1;
          if (compWaveform) compWaveform.complete();
          updatePlaybackUI();
          return;
        }

        const seg = timeline[segIndex];
        currentLineIdx = seg.idx;
        updatePlaybackUI();

        const fullText = seg.text || "";
        let textToSpeak = fullText;
        if (charOffset > 0 && charOffset < fullText.length) {
          textToSpeak = fullText.slice(charOffset).trim();
        }

        if (!textToSpeak) {
          playTimeout = setTimeout(() => {
            if (isPlaying) playSegmentFrom(segIndex + 1, 0);
          }, PAUSE_GAP_SEC * 1000);
          return;
        }

        if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis) {
          try { window.speechSynthesis.cancel(); } catch (_) {}
          const u = new SpeechSynthesisUtterance(textToSpeak);
          u.lang = "ru-RU";
          u.rate = currentSpeed;
          if (typeof pickVoice === "function") {
            const v = pickVoice("ru-RU");
            if (v) u.voice = v;
          }
          u.onend = () => {
            if (isPlaying) {
              playTimeout = setTimeout(() => {
                if (isPlaying) playSegmentFrom(segIndex + 1, 0);
              }, PAUSE_GAP_SEC * 1000);
            }
          };
          u.onerror = () => {
            if (isPlaying) {
              playTimeout = setTimeout(() => {
                if (isPlaying) playSegmentFrom(segIndex + 1, 0);
              }, PAUSE_GAP_SEC * 1000);
            }
          };
          window.speechSynthesis.speak(u);
        } else {
          const fallbackDur = Math.max(1200, (textToSpeak.length * 85) / currentSpeed);
          playTimeout = setTimeout(() => {
            if (isPlaying) playSegmentFrom(segIndex + 1, 0);
          }, fallbackDur + PAUSE_GAP_SEC * 1000);
        }
      };

      if (foundSeg) {
        if (inGap) {
          const waitMs = Math.max(50, ((foundSeg.end + PAUSE_GAP_SEC) - currentTimeSec) * 1000);
          playTimeout = setTimeout(() => {
            if (isPlaying) playSegmentFrom(foundSeg.idx + 1, 0);
          }, waitMs);
        } else {
          const segPassed = Math.max(0, currentTimeSec - foundSeg.start);
          const frac = Math.min(1.0, segPassed / foundSeg.dur);
          let charOffset = Math.floor(frac * (foundSeg.text.length || 0));
          if (charOffset > 0) {
            const spaceIdx = foundSeg.text.indexOf(" ", charOffset);
            if (spaceIdx !== -1 && spaceIdx < foundSeg.text.length - 2) {
              charOffset = spaceIdx + 1;
            }
          }
          playSegmentFrom(foundSeg.idx, charOffset);
        }
      }
      updatePlaybackUI();
    };

    const initCompWaveform = () => {
      const wrap = host.querySelector("#compWaveformWrap");
      if (!wrap) return;
      if (compWaveform) {
        try { compWaveform.destroy(); } catch (_) {}
        compWaveform = null;
      }
      compWaveform = createRealtimeWaveform(wrap, {
        onSeek: (pct) => {
          const targetSec = pct * totalDurationSec;
          playFromTime(targetSec);
        }
      });
      if (compWaveform) {
        const allRuText = lines.map(l => l.ru || "").join(" ");
        compWaveform.start(allRuText, totalDurationSec);
        compWaveform.pause();
      }
    };

    // Helper cập nhật thanh tiến độ câu hỏi và sidebar
    const updateSidebarProgress = () => {
      const answeredCount = Object.keys(userAnswers).length;
      const correctCount = isSubmitted 
        ? questions.filter((q, i) => userAnswers[i] === q.a).length 
        : 0;
      const total = questions.length || 1;
      const pct = isSubmitted 
        ? Math.round((correctCount / total) * 100)
        : Math.round((answeredCount / total) * 100);

      const textNode = host.querySelector("#compSidebarDoneText");
      if (textNode) {
        textNode.textContent = isSubmitted 
          ? `${correctCount}/${questions.length} câu đúng`
          : `${answeredCount}/${questions.length} câu đã làm`;
      }
      const fillNode = host.querySelector("#compSidebarDoneFill");
      if (fillNode) fillNode.style.width = `${pct}%`;

      questions.forEach((q, i) => {
        const itemEl = host.querySelector(`.lis-dict-sentence-item[data-q-idx="${i}"]`);
        if (itemEl) {
          const isAns = userAnswers[i] !== undefined;
          const isCorr = isSubmitted && (userAnswers[i] === q.a);
          itemEl.classList.toggle("is-done", isAns);
          itemEl.classList.toggle("is-correct-item", isSubmitted && isCorr);
          itemEl.classList.toggle("is-wrong-item", isSubmitted && isAns && !isCorr);
          const statusIcon = itemEl.querySelector(".lis-dict-sentence-status");
          if (statusIcon) {
            statusIcon.innerHTML = isSubmitted 
              ? (isCorr ? icon("check-circle-correct", 17) : icon("alert-triangle", 17))
              : (isAns ? icon("check", 16) : icon("arrow-right", 16));
          }
        }
      });
    };

    const renderQuizQuestion = () => {
      const quizCard = host.querySelector("#compQuizCard");
      if (!quizCard) return;

      const answeredCount = Object.keys(userAnswers).length;
      const correctCount = isSubmitted 
        ? questions.filter((q, i) => userAnswers[i] === q.a).length 
        : 0;
      const pct = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
      const isPass = pct >= 70;
      const allLessonsInLevel = (typeof getListeningLessons === "function" ? getListeningLessons() : []).filter(l => l.level === (lesson.level || "A1"));
      const curIdx = allLessonsInLevel.findIndex(l => l.id === lesson.id);
      const nextLesson = (curIdx >= 0 && curIdx < allLessonsInLevel.length - 1) ? allLessonsInLevel[curIdx + 1] : null;

      let html = "";

      // 2. KHI ĐÃ NỘP BÀI: BANNER TỔNG KẾT KẾT QUẢ ĐẦY ĐỦ
      if (isSubmitted) {
        html += `
          <div class="lis-comp-result-box ${isPass ? 'is-pass' : 'is-fail'}">
            <div class="lis-comp-result-icon">${isPass ? (window.RusiIcons ? RusiIcons.get("trophy-reward", { size: 36 }) : "🎉") : (window.RusiIcons ? RusiIcons.get("target", { size: 36 }) : "💪")}</div>
            <div class="lis-comp-result-info">
              <h3 class="lis-comp-result-title">
                ${isPass ? "Xuất sắc! Bạn đã vượt qua bài nghe hiểu" : "Cố lên! Hãy xem lại giải thích chi tiết bên dưới để ôn tập"}
              </h3>
              <p class="lis-comp-result-sub">
                Kết quả: <strong>${correctCount}/${questions.length} câu đúng</strong> (${pct}%) · ${isPass ? "Đã ghi nhận hoàn thành bài học" : "Chưa đạt 70%, hãy thử lại"}
              </p>
            </div>
            <div class="lis-comp-result-actions">
              <button type="button" class="btn btn-outline" id="btnCompRetry">
                ${icon("rotate-ccw", 16)} Làm lại bài này
              </button>
              ${nextLesson ? `
                <button type="button" class="btn btn-primary" id="btnCompGoNextLesson">
                  Bài tiếp theo: ${esc(nextLesson.title)} ${icon("arrow-right", 16)}
                </button>
              ` : `
                <button type="button" class="btn btn-primary" id="btnCompDoneBack">
                  ${icon("check-circle-correct", 16)} Hoàn tất & Quay về
                </button>
              `}
            </div>
          </div>
        `;
      }

      // 3. HIỂN THỊ TẤT CẢ CÁC CÂU HỎI TRẮC NGHIỆM
      html += `<div class="lis-comp-questions-container">`;
      questions.forEach((q, qi) => {
        const selectedOpt = userAnswers[qi];
        const isAns = selectedOpt !== undefined;
        const isCorr = isSubmitted && (selectedOpt === q.a);

        html += `
          <div class="lis-comp-question-block ${isSubmitted ? (isCorr ? 'is-correct-block' : 'is-wrong-block') : ''}" id="compQBlock_${qi}" data-q-idx="${qi}">
            <div class="lis-comp-q-header">
              <span class="lis-comp-q-badge">CÂU ${qi + 1} / ${questions.length}</span>
            </div>

            <h3 class="lis-comp-question-title">${esc(q.q)}</h3>

            <div class="lis-comp-options-list">
              ${q.options.map((opt, optIdx) => {
                const isSelected = selectedOpt === optIdx;
                const isRightOption = optIdx === q.a;
                let optCls = "";
                if (isSubmitted) {
                  if (isRightOption) optCls = "is-correct";
                  else if (isSelected) optCls = "is-wrong";
                } else if (isSelected) {
                  optCls = "is-selected";
                }

                return `
                  <button type="button" 
                          class="lis-comp-option-btn ${optCls}" 
                          data-q-idx="${qi}" 
                          data-opt-idx="${optIdx}" 
                          ${isSubmitted ? "disabled" : ""}>
                    <span class="lis-comp-option-letter">${["A", "B", "C", "D"][optIdx] || (optIdx + 1)}</span>
                    <span class="lis-comp-option-text">${esc(opt)}</span>
                    <span class="lis-comp-option-check">
                      ${isSubmitted && isRightOption ? icon("check-circle-correct", 18) : isSubmitted && isSelected ? icon("alert-triangle", 18) : ""}
                    </span>
                  </button>
                `;
              }).join("")}
            </div>

            <!-- GIẢI THÍCH ĐÁP ÁN (HIỆN KHI ĐÃ NỘP BÀI) -->
            ${isSubmitted ? `
              <div class="lis-comp-explanation ${isCorr ? 'is-pass' : 'is-fail'}">
                <strong>${isCorr ? "✓ Giải thích: " : `✕ Đáp án đúng là [${["A","B","C","D"][q.a] || (q.a + 1)}] ${esc(q.options[q.a])}: `}</strong>
                ${esc(q.explanation || q.exp || (isCorr ? "Bạn đã nắm bắt rất chuẩn thông tin từ audio." : "Căn cứ vào nội dung thông tin được phát trong bài nghe."))}
              </div>
            ` : ""}
          </div>
        `;
      });
      html += `</div>`;

      // 4. THANH NỘP BÀI Ở DƯỚI CÙNG (SUBMIT BAR)
      if (!isSubmitted) {
        html += `
          <div class="lis-comp-submit-bar">
            <div class="lis-comp-submit-info">
              <span class="lis-comp-submit-badge">${icon("check-circle-correct", 16)}</span>
              <span>Đã hoàn thành <strong id="compBottomCountText">${answeredCount}</strong>/${questions.length} câu</span>
            </div>
            <button type="button" class="btn btn-primary lis-comp-submit-btn" id="btnCompSubmitAll" ${answeredCount === 0 ? "disabled" : ""}>
              ${icon("send", 16) || icon("check", 16)} <span>Nộp bài</span>
            </button>
          </div>
        `;
      }

      quizCard.innerHTML = html;

      // GẮN SỰ KIỆN CHO CÁC PHÍM CHỌN ĐÁP ÁN
      if (!isSubmitted) {
        quizCard.querySelectorAll(".lis-comp-option-btn:not(:disabled)").forEach(btn => {
          btn.onclick = () => {
            const qi = Number(btn.dataset.qIdx);
            const optIdx = Number(btn.dataset.optIdx);

            userAnswers[qi] = optIdx;

            // Highlight trong nhóm câu hỏi này
            const block = quizCard.querySelector(`#compQBlock_${qi}`);
            if (block) {
              block.querySelectorAll(".lis-comp-option-btn").forEach(b => {
                b.classList.toggle("is-selected", Number(b.dataset.optIdx) === optIdx);
              });
              const statusEl = block.querySelector(`#compQStatus_${qi}`);
              if (statusEl) {
                statusEl.className = "lis-comp-q-status is-answered";
                statusEl.textContent = "Đã chọn đáp án";
              }
            }

            // Cập nhật real-time thanh tiến độ làm bài
            const newCount = Object.keys(userAnswers).length;
            const newPct = questions.length > 0 ? Math.round((newCount / questions.length) * 100) : 0;
            
            const countText = quizCard.querySelector("#compProgressCountText");
            if (countText) countText.innerHTML = `Đã làm: <strong>${newCount}/${questions.length}</strong> câu`;
            
            const pctText = quizCard.querySelector("#compProgressPctText");
            if (pctText) pctText.textContent = `${newPct}%`;

            const fillBar = quizCard.querySelector("#compProgressFillBar");
            if (fillBar) fillBar.style.width = `${newPct}%`;

            const bottomCountText = quizCard.querySelector("#compBottomCountText");
            if (bottomCountText) bottomCountText.textContent = `${newCount}`;

            const submitBtn = quizCard.querySelector("#btnCompSubmitAll");
            if (submitBtn) submitBtn.disabled = (newCount === 0);

            updateSidebarProgress();
          };
        });

        // NÚT NỘP BÀI
        const submitBtn = quizCard.querySelector("#btnCompSubmitAll");
        if (submitBtn) {
          submitBtn.onclick = () => {
            const count = Object.keys(userAnswers).length;
            if (count < questions.length) {
              const remain = questions.length - count;
              if (!confirm(`Bạn còn ${remain} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài không?`)) {
                return;
              }
            }

            isSubmitted = true;
            const cCount = questions.filter((q, i) => userAnswers[i] === q.a).length;
            const p = Math.round((cCount / questions.length) * 100);

            if (p >= 70) {
              const passKey = lesson.id + "_comp";
              if (!Progress.doneList("listenDone").includes(passKey)) {
                Progress.markDone("listenDone", passKey);
                Progress.addXp(15);
                toast("Chúc mừng! Đã hoàn thành bài nghe hiểu (+15 XP) 🎉");
              }
            } else {
              toast(`Bạn đạt ${cCount}/${questions.length} câu. Hãy xem giải thích và luyện tập thêm nhé!`);
            }

            updateSidebarProgress();
            renderQuizQuestion();
            quizCard.scrollIntoView({ behavior: "smooth", block: "start" });
          };
        }
      } else {
        // CÁC NÚT SAU KHI NỘP BÀI
        const retryBtn = quizCard.querySelector("#btnCompRetry");
        if (retryBtn) {
          retryBtn.onclick = () => {
            for (const k in userAnswers) delete userAnswers[k];
            isSubmitted = false;
            updateSidebarProgress();
            renderQuizQuestion();
            quizCard.scrollIntoView({ behavior: "smooth", block: "start" });
          };
        }

        const nextLesBtn = quizCard.querySelector("#btnCompGoNextLesson");
        if (nextLesBtn && nextLesson) {
          nextLesBtn.onclick = () => {
            stopAudio();
            if (compWaveform) {
              try { compWaveform.destroy(); } catch (_) {}
              compWaveform = null;
            }
            openComprehensionWorkspace(nextLesson);
          };
        }

        const doneBack = quizCard.querySelector("#btnCompDoneBack");
        if (doneBack) {
          doneBack.onclick = (e) => {
            if (e) e.preventDefault();
            stopAudio();
            if (compWaveform) {
              try { compWaveform.destroy(); } catch (_) {}
              compWaveform = null;
            }
            document.body.classList.remove("in-workspace");
            renderHub();
            window.scrollTo({ top: 0, behavior: "smooth" });
          };
        }
      }
    };

    const renderWorkspace = () => {
      const answeredCount = Object.keys(userAnswers).length;
      const pctDone = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

      host.innerHTML = `
        <div class="lis-dict-workspace-shell lis-comp-workspace-shell">
          <!-- TOPBAR STICKY -->
          <div class="lis-dict-topbar">
            <button type="button" class="lis-dict-topbar-back" id="btnCompBack" title="Quay lại danh sách bài nghe" aria-label="Quay lại">
              ${icon("arrow-left", 20)}
            </button>
            <div class="lis-dict-topbar-heading">
              <h1 class="lis-dict-topbar-title"><span class="lis-dict-title-prefix">Nghe hiểu - </span><span class="lis-dict-title-topic">${esc(lesson.title)}</span></h1>
            </div>
            <button type="button" class="lis-dict-topbar-menu-btn" id="btnCompToggleSidebar" aria-label="Danh sách bài luyện" title="Xem danh sách bài luyện">
              ${icon("list", 20)}
              <span class="lis-dict-menu-badge">${questions.length}</span>
            </button>
          </div>

          <!-- BỐ CỤC LƯỚI 3/7: 3 PHẦN DANH SÁCH BÀI LUYỆN BÊN TRÁI, 7 PHẦN LÀM BÀI BÊN PHẢI -->
          <div class="lis-dict-workspace-grid">
            <!-- CỘT TRÁI (3 PHẦN): DANH SÁCH CÂU HỎI TRONG BÀI LUYỆN NÀY -->
            <aside class="lis-dict-sidebar-panel" id="compSidebarPanel">
              <div class="lis-dict-sidebar-header">
                <div>
                  <h3 class="lis-dict-sidebar-title">Danh sách câu hỏi</h3>
                </div>
                <button type="button" class="lis-dict-sidebar-close-btn" id="btnCompCloseSidebar" aria-label="Đóng danh sách">
                  ${icon("x", 18)}
                </button>
              </div>

              <div class="lis-dict-sidebar-progress-box">
                <div class="lis-dict-sidebar-progress-text">
                  <span>Tiến độ bài làm</span>
                  <strong id="compSidebarDoneText">${answeredCount}/${questions.length} câu đã làm</strong>
                </div>
                <div class="lis-dict-progress-track">
                  <div class="lis-dict-progress-fill" id="compSidebarDoneFill" style="width: ${pctDone}%"></div>
                </div>
              </div>

              <div class="lis-dict-sentence-list">
                ${questions.map((q, i) => {
                  const isAns = userAnswers[i] !== undefined;
                  const num = String(i + 1).padStart(2, "0");
                  return `
                    <button type="button" class="lis-dict-sentence-item ${isAns ? "is-done" : ""}" data-q-idx="${i}" title="Câu ${i + 1}: ${esc(q.q)}">
                      <span class="lis-dict-sentence-num">${num}</span>
                      <div class="lis-dict-sentence-info">
                        <strong class="lis-dict-sentence-label">Câu hỏi ${i + 1}</strong>
                        <small class="lis-dict-sentence-snippet">${esc(q.q)}</small>
                      </div>
                      <span class="lis-dict-sentence-status">
                        ${isAns ? icon("check", 16) : icon("arrow-right", 16)}
                      </span>
                    </button>
                  `;
                }).join("")}
              </div>
            </aside>

            <!-- CỘT PHẢI (7 PHẦN): AUDIO PLAYER & KHUNG CÂU HỎI TRẮC NGHIỆM -->
            <main class="lis-dict-main-panel">
              <!-- 1. KHUNG PHÁT ÂM THANH (AUDIO PLAYER) -->
              <section class="lis-dict-player-card ${isPlaying ? "is-playing" : ""}" id="compPlayerCard">
                <div class="lis-dict-waveform-wrap" id="compWaveformWrap" aria-label="Giao diện sóng âm phát âm thanh"></div>

                <div class="lis-dict-player-controls">
                  <!-- Cụm trái: Phát lại từ đầu -->
                  <div class="lis-dict-ctrl-left">
                    <button type="button" class="lis-dict-btn-replay" id="btnCompReplay" title="Phát lại toàn bộ bài nghe từ đầu" aria-label="Phát lại">
                      ${icon("rotate-ccw", 16)} <span class="lis-ctrl-btn-text">Phát lại</span>
                    </button>
                  </div>

                  <!-- Cụm giữa: Tua lùi 5s, Play/Pause, Tua tới 5s -->
                  <div class="lis-dict-ctrl-center">
                    <button type="button" class="lis-dict-btn-skip" id="btnCompSkipBack" title="Lùi 5 giây" aria-label="Lùi 5 giây">
                      ${icon("chevron-left", 20)}
                    </button>
                    <button type="button" class="lis-dict-btn-play" id="btnCompPlay" title="${isPlaying ? "Tạm dừng" : "Phát bài nghe"}" aria-label="${isPlaying ? "Tạm dừng" : "Phát bài nghe"}">
                      ${isPlaying ? icon("pause-control", 24) : icon("play-control", 24)}
                    </button>
                    <button type="button" class="lis-dict-btn-skip" id="btnCompSkipFwd" title="Tiến 5 giây" aria-label="Tiến 5 giây">
                      ${icon("chevron-right", 20)}
                    </button>
                  </div>

                  <!-- Cụm phải: Tốc độ phát & Bật lời thoại -->
                  <div class="lis-dict-ctrl-right">
                    <button type="button" class="lis-dict-btn-speed" id="btnCompSpeed" title="Thay đổi tốc độ phát">
                      <span id="compSpeedText">${currentSpeed}x</span>
                    </button>
                    <button type="button" class="lis-dict-btn-speed lis-dict-btn-transcript" id="btnCompToggleTranscript" title="Xem hoặc ẩn lời thoại đoạn nghe" aria-label="Lời thoại">
                      ${icon("languages", 16)} <span class="lis-ctrl-btn-text" id="compTransLabel">${showTranscript ? "Ẩn lời thoại" : "Lời thoại"}</span>
                    </button>
                  </div>
                </div>

                <!-- LỜI THOẠI HỘI THOẠI NGA - VIỆT (TÙY CHỌN ẨN/HIỆN) -->
                ${lines.length ? `
                  <div class="lis-comp-dialogue-box ${showTranscript ? "" : "hidden"}" id="compDialogueBox">
                    <div style="font-size:0.8rem;font-weight:800;color:var(--muted);text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:6px">
                      ${icon("book-open-blog", 14)} Lời thoại bài nghe (Nhấp vào câu để nghe riêng câu đó):
                    </div>
                    ${lines.map((ln, idx) => `
                      <div class="lis-comp-dialogue-line ${idx === currentLineIdx ? "is-active" : ""}" data-line-idx="${idx}">
                        <strong>${esc(ln.speaker || ln.who || "Người nói")}:</strong>
                        <span class="ru">${esc(ln.ru || "")}</span>
                        <span class="line-vi">${esc(ln.vi || "")}</span>
                      </div>
                    `).join("")}
                  </div>
                ` : ""}
              </section>

              <!-- 2. KHUNG CÂU HỎI TRẮC NGHIỆM ĐÁNH GIÁ NGHE HIỂU -->
              <section class="lis-comp-quiz-card" id="compQuizCard"></section>
            </main>
          </div>
          <div class="lis-dict-sidebar-scrim" id="compSidebarScrim"></div>
        </div>
      `;

      bindWorkspaceEvents();
      initCompWaveform();
      renderQuizQuestion();
    };

    const bindWorkspaceEvents = () => {
      // 1. Quay lại
      const backBtn = host.querySelector("#btnCompBack") || host.querySelector(".lis-dict-topbar-back");
      if (backBtn) {
        backBtn.onclick = (e) => {
          if (e) e.preventDefault();
          stopAudio();
          if (compWaveform) {
            try { compWaveform.destroy(); } catch (_) {}
            compWaveform = null;
          }
          document.body.classList.remove("in-workspace");
          renderHub();
          window.scrollTo({ top: 0, behavior: "smooth" });
        };
      }

      // 2. Mobile Drawer Sidebar Toggle
      const toggleSidebarBtn = host.querySelector("#btnCompToggleSidebar");
      const closeSidebarBtn = host.querySelector("#btnCompCloseSidebar");
      const sidebarPanel = host.querySelector("#compSidebarPanel");
      const scrim = host.querySelector("#compSidebarScrim");

      const openMobileDrawer = () => {
        if (sidebarPanel) sidebarPanel.classList.add("is-open");
        if (scrim) scrim.classList.add("is-open");
      };

      const closeMobileDrawer = () => {
        if (sidebarPanel) sidebarPanel.classList.remove("is-open");
        if (scrim) scrim.classList.remove("is-open");
      };

      if (toggleSidebarBtn) toggleSidebarBtn.onclick = openMobileDrawer;
      if (closeSidebarBtn) closeSidebarBtn.onclick = closeMobileDrawer;
      if (scrim) scrim.onclick = closeMobileDrawer;

      // 3. Cuộn đến câu hỏi tương ứng khi bấm vào danh sách ở sidebar
      host.querySelectorAll(".lis-dict-sentence-item[data-q-idx]").forEach(item => {
        item.onclick = () => {
          const qi = Number(item.dataset.qIdx);
          const targetBlock = host.querySelector(`#compQBlock_${qi}`);
          if (targetBlock) {
            closeMobileDrawer();
            targetBlock.scrollIntoView({ behavior: "smooth", block: "center" });
            targetBlock.classList.remove("highlight-pulse");
            void targetBlock.offsetWidth;
            targetBlock.classList.add("highlight-pulse");
          }
        };
      });

      // 4. Audio Player controls
      const playBtn = host.querySelector("#btnCompPlay");
      if (playBtn) {
        playBtn.onclick = () => {
          if (isPlaying) {
            pauseAudio();
          } else {
            if (currentTimeSec >= totalDurationSec - 0.2) {
              playFromTime(0);
            } else {
              playFromTime(currentTimeSec);
            }
          }
        };
      }

      const replayBtn = host.querySelector("#btnCompReplay");
      if (replayBtn) {
        replayBtn.onclick = () => {
          playFromTime(0);
        };
      }

      // Tua lùi 5 giây
      const skipBackBtn = host.querySelector("#btnCompSkipBack");
      if (skipBackBtn) {
        skipBackBtn.onclick = () => {
          const cur = (compNativeAudio && !compNativeAudio.paused) ? compNativeAudio.currentTime : (isPlaying ? (playbackBaseTimeSec + (Date.now() - playbackStartTimestamp) / 1000) : currentTimeSec);
          const targetSec = Math.max(0, cur - 5);
          playFromTime(targetSec);
        };
      }

      // Tua tới 5 giây
      const skipFwdBtn = host.querySelector("#btnCompSkipFwd");
      if (skipFwdBtn) {
        skipFwdBtn.onclick = () => {
          const cur = (compNativeAudio && !compNativeAudio.paused) ? compNativeAudio.currentTime : (isPlaying ? (playbackBaseTimeSec + (Date.now() - playbackStartTimestamp) / 1000) : currentTimeSec);
          const targetSec = Math.min(totalDurationSec, cur + 5);
          playFromTime(targetSec);
        };
      }

      const speedBtn = host.querySelector("#btnCompSpeed");
      if (speedBtn) {
        speedBtn.onclick = () => {
          const speeds = [0.75, 1.0, 1.25];
          const nextIdx = (speeds.indexOf(currentSpeed) + 1) % speeds.length;
          currentSpeed = speeds[nextIdx];
          const span = host.querySelector("#compSpeedText");
          if (span) span.textContent = `${currentSpeed}x`;
          toast(`Tốc độ phát: ${currentSpeed}x`);
          recomputeTimeline();
          if (isPlaying) {
            playFromTime(currentTimeSec);
          }
        };
      }

      const toggleTransBtn = host.querySelector("#btnCompToggleTranscript");
      if (toggleTransBtn) {
        toggleTransBtn.onclick = () => {
          showTranscript = !showTranscript;
          const diagBox = host.querySelector("#compDialogueBox");
          if (diagBox) diagBox.classList.toggle("hidden", !showTranscript);
          const transLabel = host.querySelector("#compTransLabel");
          if (transLabel) transLabel.textContent = showTranscript ? "Ẩn lời thoại" : "Lời thoại";
        };
      }

      // Click vào 1 dòng trong hội thoại để phát từ đầu câu đó
      host.querySelectorAll(".lis-comp-dialogue-line").forEach(lineEl => {
        lineEl.onclick = () => {
          const lineIdx = Number(lineEl.dataset.lineIdx);
          if (!isNaN(lineIdx) && timeline[lineIdx]) {
            playFromTime(timeline[lineIdx].start);
          }
        };
      });
    };

    renderWorkspace();
  };


  const openDictationWorkspace = (lesson) => {
    if (window.setRusiDeepUrl && lesson) {
      window.setRusiDeepUrl('/listening/dictation/' + encodeURIComponent(lesson.id || lesson.code));
    }
    if (typeof window.requireAuth === "function" && !window.requireAuth("listening.html?id=" + encodeURIComponent((lesson && lesson.id) || ""))) return;
    currentLesson = lesson;
    document.body.classList.add("in-workspace");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Lấy danh sách các bài luyện trong cùng cấp độ để hiển thị ở Sidebar (Req 11)
    let allLessons = (typeof getListeningLessons === "function" ? getListeningLessons() : []).filter(l => l.level === (lesson.level || "A1"));
    if (!allLessons.length && lesson) {
      allLessons = [lesson];
    } else if (lesson && !allLessons.some(l => l.id === lesson.id)) {
      allLessons.unshift(lesson);
    }

    const isLessonDone = (item) => {
      if (!item || !item.id) return false;
      const list = Progress.doneList("listenDone") || [];
      if (list.includes(item.id) || list.includes(item.id + "_dict") || list.includes(item.id + "_dict_done")) return true;
      const sList = (Array.isArray(item.dictation) && item.dictation.length > 0)
        ? item.dictation
        : (Array.isArray(item.lines) && item.lines.length > 0 ? item.lines : [1]);
      return sList.length > 0 && sList.every((_, idx) => list.includes(`${item.id}_dict_${idx}`));
    };

    // Thu thập danh sách câu luyện trong bài hiện tại
    const rawSentences = (Array.isArray(lesson.dictation) && lesson.dictation.length > 0)
      ? lesson.dictation
      : (Array.isArray(lesson.lines) && lesson.lines.length > 0 ? lesson.lines.map(l => l.text_ru || l.ru) : ["Вот, пожалуйста."]);

    const sentences = rawSentences.map((raw, idx) => {
      const lineMatch = (lesson.lines || []).find(l => {
        const text = l.text_ru || l.ru || "";
        return text && (text.includes(raw) || raw.includes(text));
      });
      const vi = lineMatch ? (lineMatch.translation_vi || lineMatch.vi) : (lesson.vi || "");
      const lineIdx = lineMatch ? lesson.lines.indexOf(lineMatch) : idx;
      return {
        idx,
        lineIdx,
        start_sec: lineMatch ? lineMatch.start_sec : null,
        end_sec: lineMatch ? lineMatch.end_sec : null,
        audio_url: (lineMatch && lineMatch.audio_url) || lesson.audio_url || null,
        ru: raw,
        vi,
        vocab: getSentenceVocab(raw, lesson, lineIdx)
      };
    });

    let currentSentenceIdx = 0;
    let currentBlankPct = 50;
    let showAnswer = false;
    let hideInstantCheck = false; // Ẩn kết quả tức thì tới khi bấm Enter (Req 4)
    let isPlaying = false;
    let isLooping = false;
    let loopCountTarget = 3; // Số lần phát lại (Req 2)
    let loopCurrentCount = 0;
    let loopDelaySec = 2; // Thời gian nghỉ giữa các lần (Req 2)
    let speed = 1.0;
    let loopTimeout = null;
    let progressTimer = null;
    let autoAdvanceTimeout = null;
    let unlockedVocab = {};
    let isRePracticing = false;
    let showCompletedReview = false;
    let rePracticeDone = new Set();
    let dictNativeAudio = null;

    const isSentenceDone = (idx) => {
      const key = `${lesson.id}_dict_${idx}`;
      return Progress.doneList("listenDone").includes(key);
    };

    let dictWaveform = null;

    const initDictWaveform = () => {
      const wrap = host.querySelector("#dictWaveformWrap");
      if (!wrap) return;
      if (dictWaveform) {
        try { dictWaveform.destroy(); } catch (_) {}
        dictWaveform = null;
      }
      dictWaveform = createRealtimeWaveform(wrap, {
        onSeek: (pct) => {
          stopAudio();
          playCurrentAudio();
        }
      });
      const s = sentences[currentSentenceIdx];
      if (dictWaveform && s && s.ru) {
        const soundUrl = (s.audio_url || s.audio) || null;
        dictWaveform.setSpokenText(s.ru, soundUrl);
      }
    };

    const stopAudio = () => {
      if (dictNativeAudio) {
        try { dictNativeAudio.pause(); } catch (_) {}
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      clearTimeout(loopTimeout);
      isPlaying = false;
      const playerCard = host.querySelector("#dictPlayerCard");
      if (playerCard) playerCard.classList.remove("is-playing");
      const playBtn = host.querySelector("#btnDictPlay");
      if (playBtn) playBtn.innerHTML = icon("play-control", 24);
      if (dictWaveform) {
        try { dictWaveform.stop(); } catch (_) {}
      }
    };

    const updateLoopBtnState = () => {
      const loopBtn = host.querySelector("#btnDictLoop");
      if (loopBtn) {
        loopBtn.classList.toggle("is-active", isLooping);
        const countLabel = loopCountTarget === Infinity ? "∞" : `${loopCountTarget}x`;
        loopBtn.innerHTML = `${icon("repeat", 16)} <span>${isLooping ? `Lặp (${countLabel})` : "Tự lặp"}</span>`;
      }
    };

    const playCurrentAudio = () => {
      stopAudio();
      const s = sentences[currentSentenceIdx];
      if (!s) return;

      isPlaying = true;
      const playerCard = host.querySelector("#dictPlayerCard");
      if (playerCard) playerCard.classList.add("is-playing");
      const playBtn = host.querySelector("#btnDictPlay");
      if (playBtn) playBtn.innerHTML = icon("pause-control", 24);

      const wordCount = s.ru.trim().split(/\s+/).length;
      const charCount = s.ru.length;
      const estDurationSec = Math.max(0.9, Math.min(25, (charCount * 95 + wordCount * 110 + 200) / (speed * 1000)));
      const soundUrl = (s && (s.audio_url || s.audio)) || null;
      if (dictWaveform) {
        dictWaveform.start(s.ru, estDurationSec, soundUrl);
      }

      const onPlaybackDone = () => {
        if (dictWaveform) dictWaveform.complete();
        isPlaying = false;
        const pCard = host.querySelector("#dictPlayerCard");
        if (pCard) pCard.classList.remove("is-playing");
        const pBtn = host.querySelector("#btnDictPlay");
        if (pBtn) pBtn.innerHTML = icon("play-control", 24);

        if (isLooping) {
          loopCurrentCount++;
          if (loopCountTarget !== Infinity && loopCurrentCount >= loopCountTarget) {
            isLooping = false;
            updateLoopBtnState();
            toast("Đã hoàn thành số lần tự lặp");
          } else {
            loopTimeout = setTimeout(() => {
              if (isLooping) playCurrentAudio();
            }, loopDelaySec * 1000);
          }
        }
      };

      const speakWithSynthesis = () => {
        if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis) {
          const u = new SpeechSynthesisUtterance(s.ru);
          u.lang = "ru-RU";
          u.rate = speed;
          if (typeof pickVoice === "function") {
            const v = pickVoice("ru-RU");
            if (v) u.voice = v;
          }
          u.onboundary = (e) => {
            if (dictWaveform && e.charIndex !== undefined && s.ru.length > 0) {
              dictWaveform.updateBoundary(e.charIndex, e.charLength || 0);
            }
          };
          u.onend = onPlaybackDone;
          u.onerror = onPlaybackDone;
          window.speechSynthesis.speak(u);
        } else {
          setTimeout(onPlaybackDone, Math.max(1200, estDurationSec * 1000));
        }
      };

      if (soundUrl) {
        try {
          if (!dictNativeAudio) {
            dictNativeAudio = new Audio();
          }
          dictNativeAudio.src = soundUrl;
          dictNativeAudio.playbackRate = speed;
          const startT = (typeof s.start_sec === "number") ? s.start_sec : 0;
          const endT = (typeof s.end_sec === "number") ? s.end_sec : (startT + estDurationSec);
          dictNativeAudio.currentTime = startT;

          let hasEnded = false;
          const checkEnd = () => {
            if (!hasEnded && dictNativeAudio && dictNativeAudio.currentTime >= endT) {
              hasEnded = true;
              dictNativeAudio.pause();
              dictNativeAudio.removeEventListener("timeupdate", checkEnd);
              onPlaybackDone();
            }
          };

          dictNativeAudio.addEventListener("timeupdate", checkEnd);
          dictNativeAudio.onended = () => {
            if (!hasEnded) {
              hasEnded = true;
              dictNativeAudio.removeEventListener("timeupdate", checkEnd);
              onPlaybackDone();
            }
          };
          dictNativeAudio.onerror = () => {
            dictNativeAudio.removeEventListener("timeupdate", checkEnd);
            speakWithSynthesis();
          };

          dictNativeAudio.play().catch(() => {
            speakWithSynthesis();
          });
          return;
        } catch (_) {
          speakWithSynthesis();
          return;
        }
      }

      speakWithSynthesis();
    };

    const tokenizeSentence = (sentenceText) => {
      const tokens = [];
      const regex = /([а-яА-ЯёЁa-zA-Z0-9\-]+|[^а-яА-ЯёЁa-zA-Z0-9\s]+|\s+)/g;
      let m;
      while ((m = regex.exec(sentenceText)) !== null) {
        const val = m[1];
        if (/^\s+$/.test(val)) continue;
        const isWord = /^[а-яА-ЯёЁa-zA-Z0-9\-]+$/.test(val);
        tokens.push({ text: val, isWord });
      }
      return tokens;
    };

    const getBlankSet = (tokens, pct) => {
      const wordIndices = [];
      tokens.forEach((t, i) => { if (t.isWord) wordIndices.push(i); });
      if (pct >= 100) return new Set(wordIndices);

      const sorted = [...wordIndices].sort((a, b) => tokens[b].text.length - tokens[a].text.length);
      const count = Math.max(1, Math.round(wordIndices.length * (pct / 100)));
      return new Set(sorted.slice(0, count));
    };

    // Gợi ý 1 từ (Req 5 & phím Tab)
    const hintOneWord = () => {
      const flow = host.querySelector("#dictSentenceFlow");
      if (!flow) return;
      const inputs = Array.from(flow.querySelectorAll(".lis-dict-word-input:not(.is-correct)"));
      if (inputs.length === 0) {
        toast("Tất cả các từ trong câu đã được điền chính xác!");
        return;
      }
      const targetInput = inputs[0];
      const expected = targetInput.dataset.expected || "";
      targetInput.value = expected;
      targetInput.classList.add("is-correct");
      targetInput.classList.remove("is-wrong");
      targetInput.readOnly = true;
      toast(`Gợi ý: “${expected}”`);

      const remaining = Array.from(flow.querySelectorAll(".lis-dict-word-input:not(.is-correct)"));
      if (remaining.length === 0) {
        handleSentenceFinished();
      } else {
        remaining[0].focus();
      }
    };

    const renderWorkspace = () => {
      const s = sentences[currentSentenceIdx];
      const completedLessonsCount = allLessons.filter(isLessonDone).length;
      const pctTopicDone = allLessons.length > 0 ? Math.round((completedLessonsCount / allLessons.length) * 100) : 0;
      const isLessonCompleted = isLessonDone(lesson);
      const isCurrentSentenceDone = isRePracticing ? rePracticeDone.has(currentSentenceIdx) : isSentenceDone(currentSentenceIdx);
      const isUnlocked = isCurrentSentenceDone || (!isRePracticing && isSentenceDone(currentSentenceIdx)) || !!unlockedVocab[currentSentenceIdx];
      const allReDone = isRePracticing && sentences.length > 0 && sentences.every((_, i) => rePracticeDone.has(i));
      const isBannerVisible = isLessonCompleted && !isRePracticing && !showCompletedReview;
      const showPracticeCard = !isLessonCompleted || isRePracticing || showCompletedReview;

      host.innerHTML = `
        <div class="lis-dict-workspace-shell">
          <!-- 1. Thanh điều hướng trên cùng -->
          <div class="lis-dict-topbar">
            <button type="button" class="lis-dict-topbar-back" id="btnDictBack" title="Quay lại danh sách bài nghe" aria-label="Quay lại">
              ${icon("arrow-left", 20)}
            </button>
            <div class="lis-dict-topbar-heading">
              <h1 class="lis-dict-topbar-title"><span class="lis-dict-title-prefix">Nghe chép chính tả - </span><span class="lis-dict-title-topic">${esc(lesson.title)}</span></h1>
            </div>
            <button type="button" class="lis-dict-topbar-menu-btn" id="btnDictToggleSidebar" aria-label="Danh sách bài luyện" title="Xem danh sách bài luyện">
              ${icon("list", 20)}
              <span class="lis-dict-menu-badge">${allLessons.length}</span>
            </button>
          </div>

          <!-- Bố cục 3/7: 3 phần bên trái danh sách bài luyện, 7 phần bên phải làm bài -->
          <div class="lis-dict-workspace-grid">
            <!-- CỘT TRÁI (3 PHẦN): DANH SÁCH BÀI LUYỆN TRONG CHỦ ĐỀ / CẤP ĐỘ (Req 11, không có lis-dict-sentence-snippet - Req 1) -->
            <aside class="lis-dict-sidebar-panel" id="dictSidebarPanel">
              <div class="lis-dict-sidebar-header">
                <h3 class="lis-dict-sidebar-title">Danh sách bài luyện</h3>
                <button type="button" class="lis-dict-sidebar-close-btn" id="btnDictCloseSidebar" aria-label="Đóng danh sách">
                  ${icon("x", 18)}
                </button>
              </div>

              <div class="lis-dict-sidebar-progress-box">
                <div class="lis-dict-sidebar-progress-text">
                  <span>Tiến độ cấp độ</span>
                  <strong>${completedLessonsCount}/${allLessons.length} bài đã xong</strong>
                </div>
                <div class="lis-dict-progress-track">
                  <div class="lis-dict-progress-fill" style="width: ${pctTopicDone}%"></div>
                </div>
              </div>

              <div class="lis-dict-sentence-list">
                ${allLessons.map((item, i) => {
                  const active = item.id === lesson.id;
                  const isDone = isLessonDone(item);
                  const num = String(i + 1).padStart(2, "0");
                  return `
                    <button type="button" class="lis-dict-sentence-item ${active ? "is-active" : ""} ${isDone ? "is-done" : ""}" data-lesson-id="${esc(item.id)}" title="${esc(item.title)}">
                      <span class="lis-dict-sentence-num">${num}</span>
                      <div class="lis-dict-sentence-info">
                        <strong class="lis-dict-sentence-label">${esc(item.title)}</strong>
                      </div>
                      <span class="lis-dict-sentence-status">
                        ${isDone ? icon("check-circle-correct", 17) : active ? icon("headphones", 16) : icon("arrow-right", 16)}
                      </span>
                    </button>
                  `;
                }).join("")}
              </div>
            </aside>

            <!-- CỘT PHẢI (7 PHẦN): KHUNG LÀM BÀI CHÍNH -->
            <main class="lis-dict-main-panel">
              <!-- 2. Khung phát âm thanh (Audio Player) -->
              <section class="lis-dict-player-card" id="dictPlayerCard">
                <div class="lis-dict-waveform-wrap" id="dictWaveformWrap" aria-label="Giao diện sóng âm phát âm thanh"></div>

                <div class="lis-dict-player-controls">
                  <!-- Cụm trái: Phát lại -->
                  <div class="lis-dict-ctrl-left">
                    <button type="button" class="lis-dict-btn-replay" id="btnDictReplay" title="Phát lại từ đầu câu này" aria-label="Phát lại">
                      ${icon("rotate-ccw", 16)} <span class="lis-ctrl-btn-text">Phát lại</span>
                    </button>
                  </div>

                  <!-- Cụm giữa: Câu trước (<), Play/Pause, Câu tiếp theo (>) (Req 12) -->
                  <div class="lis-dict-ctrl-center">
                    <button type="button" class="lis-dict-btn-skip" id="btnDictPrevSentence" title="Câu trước" ${currentSentenceIdx === 0 ? "disabled" : ""}>
                      ${icon("chevron-left", 20)}
                    </button>
                    <button type="button" class="lis-dict-btn-play" id="btnDictPlay" title="Phát / Dừng âm thanh">
                      ${icon("play-control", 24)}
                    </button>
                    <button type="button" class="lis-dict-btn-skip" id="btnDictNextSentence" title="Câu tiếp theo" ${currentSentenceIdx === sentences.length - 1 ? "disabled" : ""}>
                      ${icon("chevron-right", 20)}
                    </button>
                  </div>

                  <!-- Cụm phải: Tốc độ phát (Slider đẹp tinh tế) & Tự lặp (Cửa sổ phong cách Pomodoro cao cấp) -->
                  <div class="lis-dict-ctrl-right">
                    <div class="lis-dict-speed-wrapper">
                      <button type="button" class="lis-dict-btn-speed" id="btnDictSpeed" title="Thay đổi tốc độ phát">
                        <span id="dictSpeedText">${speed.toFixed(1)}x</span>
                      </button>
                      <div class="lis-dict-popover lis-dict-speed-popover hidden" id="dictSpeedPopover">
                        <div class="lis-dict-popover-header">
                          <div class="pomo-pop-title-wrap">
                            <span class="pomo-pop-title-dot" style="background:var(--primary)"></span>
                            <span class="lis-dict-popover-title">Tốc độ phát âm</span>
                          </div>
                          <span class="lis-dict-slider-badge" id="dictSpeedBadge">${speed.toFixed(1)}x</span>
                        </div>
                        
                        <div class="lis-dict-slider-wrap">
                          <input type="range" min="0.7" max="1.4" step="0.1" value="${speed.toFixed(1)}" class="pomo-range" id="dictSpeedSlider" aria-label="Tốc độ phát âm">
                          <div class="lis-dict-slider-ticks">
                            <span>0.7x (Chậm)</span>
                            <span>1.0x (Chuẩn)</span>
                            <span>1.4x (Nhanh)</span>
                          </div>
                        </div>

                        <div class="lis-dict-presets-row">
                          <button type="button" class="lis-dict-preset-btn ${Math.abs(speed - 0.8) < 0.01 ? "is-active" : ""}" data-speed="0.8">0.8x</button>
                          <button type="button" class="lis-dict-preset-btn ${Math.abs(speed - 1.0) < 0.01 ? "is-active" : ""}" data-speed="1.0">1.0x</button>
                          <button type="button" class="lis-dict-preset-btn ${Math.abs(speed - 1.2) < 0.01 ? "is-active" : ""}" data-speed="1.2">1.2x</button>
                          <button type="button" class="lis-dict-preset-btn ${Math.abs(speed - 1.4) < 0.01 ? "is-active" : ""}" data-speed="1.4">1.4x</button>
                        </div>
                      </div>
                    </div>

                    <div class="lis-dict-loop-wrapper">
                      <button type="button" class="lis-dict-btn-loop ${isLooping ? "is-active" : ""}" id="btnDictLoop" title="Cài đặt tự lặp">
                        ${icon("repeat", 16)} <span>${isLooping ? `Lặp (${loopCountTarget === Infinity ? "∞" : `${loopCountTarget}x`})` : "Tự lặp"}</span>
                      </button>
                      <div class="lis-dict-popover lis-dict-loop-popover hidden" id="dictLoopPopover">
                        <div class="lis-dict-popover-header">
                          <div class="pomo-pop-title-wrap">
                            <span class="pomo-pop-title-dot" style="background:#10b981"></span>
                            <span class="lis-dict-popover-title">Cài đặt tự lặp</span>
                          </div>
                          <button type="button" class="pomo-pop-icon-btn" id="btnCloseLoopPopover" title="Đóng" aria-label="Đóng">
                            ${icon("x", 14)}
                          </button>
                        </div>

                        <!-- Quick Presets -->
                        <div class="lis-dict-presets-row" id="loopPresetsRow">
                          <button type="button" class="lis-dict-preset-btn ${loopCountTarget === 2 && loopDelaySec === 2 ? "is-active" : ""}" data-count="2" data-delay="2">2 lần · 2s</button>
                          <button type="button" class="lis-dict-preset-btn ${loopCountTarget === 3 && loopDelaySec === 2 ? "is-active" : ""}" data-count="3" data-delay="2">3 lần · 2s</button>
                          <button type="button" class="lis-dict-preset-btn ${loopCountTarget === 5 && loopDelaySec === 3 ? "is-active" : ""}" data-count="5" data-delay="3">5 lần · 3s</button>
                        </div>

                        <!-- Section 1: Số lần phát lại -->
                        <div class="lis-dict-slider-section">
                          <div class="lis-dict-slider-header">
                            <span class="lis-dict-popover-label">Số lần phát lại</span>
                            <span class="lis-dict-slider-val" id="dictLoopCountBadge">${loopCountTarget === Infinity ? "Vô hạn" : `${loopCountTarget} lần`}</span>
                          </div>
                          <input type="range" min="1" max="10" step="1" value="${loopCountTarget === Infinity ? 10 : loopCountTarget}" class="pomo-range" id="dictLoopCountSlider">
                          <div class="lis-dict-slider-ticks">
                            <span>1 lần</span>
                            <span>5 lần</span>
                            <span>Vô hạn</span>
                          </div>
                        </div>

                        <!-- Section 2: Thời gian nghỉ -->
                        <div class="lis-dict-slider-section">
                          <div class="lis-dict-slider-header">
                            <span class="lis-dict-popover-label">Thời gian nghỉ</span>
                            <span class="lis-dict-slider-val" id="dictLoopDelayBadge">${loopDelaySec} giây</span>
                          </div>
                          <input type="range" min="1" max="6" step="1" value="${loopDelaySec}" class="pomo-range" id="dictLoopDelaySlider">
                          <div class="lis-dict-slider-ticks">
                            <span>1s</span>
                            <span>3s</span>
                            <span>6s</span>
                          </div>
                        </div>

                        <div class="lis-dict-popover-actions">
                          <button type="button" class="lis-dict-popover-btn-secondary" id="btnDictLoopOff">Tắt lặp</button>
                          <button type="button" class="lis-dict-popover-btn-primary" id="btnDictLoopApply">Áp dụng</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 2.5 Banner nhắc bài đã hoàn thành -->
              ${isBannerVisible ? `
                <div class="lis-dict-completed-banner is-completed-card">
                  <div class="lis-dict-completed-banner-left">
                    <span class="lis-dict-completed-banner-icon">
                      ${icon("check-circle-correct", 20)}
                    </span>
                    <div class="lis-dict-completed-banner-text">
                      <div class="lis-dict-completed-banner-title">
                        Đã hoàn thành!
                      </div>
                    </div>
                  </div>
                  <div class="lis-dict-completed-banner-actions">
                    <button type="button" class="btn-dict-repractice btn-dict-repractice-hero" id="btnDictRePractice" title="Bắt đầu luyện tập lại bài này" aria-label="Luyện lại">
                      ${icon("rotate-ccw", 15)} <span class="lis-banner-btn-text">Luyện lại</span>
                    </button>
                    <button type="button" class="btn-dict-repractice-exit" id="btnDictViewCompleted" title="Xem lại đáp án đã hoàn thành" aria-label="Xem đáp án">
                      ${icon("eye", 15)} <span class="lis-banner-btn-text">Đáp án</span>
                    </button>
                  </div>
                </div>
              ` : ""}

              ${showCompletedReview ? `
                <div class="lis-dict-completed-banner is-review-mode">
                  <div class="lis-dict-completed-banner-left">
                    <span class="lis-dict-completed-banner-icon">
                      ${icon("eye", 18)}
                    </span>
                    <div class="lis-dict-completed-banner-text">
                      <div class="lis-dict-completed-banner-title">Đang xem đáp án đã hoàn thành</div>
                      <div class="lis-dict-completed-banner-sub">Các ô điền hiển thị kết quả chính xác để bạn đối chiếu.</div>
                    </div>
                  </div>
                  <div class="lis-dict-completed-banner-actions">
                    <button type="button" class="btn-dict-repractice" id="btnDictRePractice" title="Bắt đầu luyện tập lại">
                      ${icon("rotate-ccw", 15)} <span>Luyện lại bài này</span>
                    </button>
                    <button type="button" class="btn-dict-repractice-exit" id="btnDictCloseReview" title="Đóng xem đáp án">
                      ${icon("x", 15)} <span>Đóng</span>
                    </button>
                  </div>
                </div>
              ` : ""}

              <!-- 3. Thẻ làm bài chính thống nhất (chỉ hiển thị khi đang luyện tập hoặc xem đáp án) -->
              ${showPracticeCard ? `
              <section class="lis-dict-practice-card" id="dictPracticeCard">
                <!-- 3a. Thanh công cụ (Hiển thị 1 dòng trên mobile với các nút icon) -->
                <div class="lis-dict-toolbar-card">
                  <div class="lis-dict-percent-group" role="group" aria-label="Mức độ ẩn từ gợi ý">
                    <button type="button" class="lis-dict-pct-btn ${currentBlankPct === 30 ? "is-active" : ""}" data-pct="30" title="Chỉ ẩn 30% từ (Dễ)">30%</button>
                    <button type="button" class="lis-dict-pct-btn ${currentBlankPct === 50 ? "is-active" : ""}" data-pct="50" title="Ẩn 50% từ (Vừa)">50%</button>
                    <button type="button" class="lis-dict-pct-btn ${currentBlankPct === 70 ? "is-active" : ""}" data-pct="70" title="Ẩn 70% từ (Thử thách)">70%</button>
                  </div>

                  <div class="lis-dict-toolbar-right">
                    <button type="button" class="lis-dict-tool-btn is-icon-only ${hideInstantCheck ? "is-active" : ""}" id="btnToggleHideResult" title="${hideInstantCheck ? "Đang ẩn kết quả (nhấn Enter để kiểm tra)" : "Ẩn kết quả tới khi nhấn Enter"}" aria-label="Ẩn kết quả">
                      ${icon("eye-off", 16)}
                    </button>
                  </div>
                </div>

                <!-- 3b. Khu vực chép chính tả -->
                <div class="lis-dict-practice-body">
                  <div class="lis-dict-sentence-flow" id="dictSentenceFlow"></div>

                  <!-- Dòng hiển thị đáp án trực tiếp tại đây, không thêm thẻ box mới (Req 7) -->
                  <div class="lis-dict-inline-result ${showAnswer ? "" : "hidden"}" id="dictInlineResult">
                    <span class="lis-dict-inline-badge">${icon("check", 14)} Đáp án:</span>
                    <span class="lis-dict-inline-ru ru">${esc(s.ru)}</span>
                    ${s.vi ? `<span class="lis-dict-inline-vi">— ${esc(s.vi)}</span>` : ""}
                    <button type="button" class="btn-icon lis-dict-inline-speak" id="btnDictSpeakInlineAnswer" title="Nghe câu đáp án">
                      ${icon("volume-high", 15)}
                    </button>
                  </div>
                </div>

                <!-- 3c. Khung phụ dưới: Từ vựng nên học tích hợp -->
                <div class="lis-dict-vocab-box ${isUnlocked ? "is-unlocked" : "is-locked"}" id="dictVocabBox">
                  ${!isUnlocked ? `
                    <div class="lis-dict-lock-badge">
                      <span class="lis-dict-lock-icon">${icon("lock", 20)}</span>
                      <div class="lis-dict-lock-copy">
                        <strong>Chép xong câu để xem ${s.vocab.length} từ nên học</strong>
                        <p>Từ vựng nằm ngay trong câu, hiện sớm sẽ lộ đáp án.</p>
                      </div>
                    </div>
                  ` : `
                    <div class="lis-dict-vocab-header">
                      <div class="lis-dict-vocab-header-left">
                        <span class="lis-dict-vocab-sparkle">${icon("sparkles-clean", 20)}</span>
                        <div>
                          <strong>Từ vựng nên học trong câu</strong>
                          <small>Nhấp icon lọ để lưu trực tiếp vào Lọ từ vựng cá nhân</small>
                        </div>
                      </div>
                      <span class="lis-dict-vocab-count-pill">${s.vocab.length} từ</span>
                    </div>

                    <div class="lis-dict-vocab-list">
                      ${s.vocab.map(v => `
                        <div class="lis-dict-vocab-item">
                          <div class="lis-dict-vocab-item-main">
                            <div class="lis-dict-vocab-ru-line">
                              <strong class="lis-dict-vocab-ru ru">${esc(v.stress || v.ru)}</strong>
                              ${v.pos ? `<span class="lis-dict-vocab-pos">${esc(v.pos)}</span>` : ""}
                            </div>
                            <p class="lis-dict-vocab-vi">${esc(v.vi)}</p>
                          </div>
                          <div class="lis-dict-vocab-actions">
                            <button type="button" class="lis-dict-vocab-btn-action dict-vocab-speak" data-word="${esc(v.ru)}" title="Nghe phát âm từ này">
                              ${icon("volume-high", 18)}
                            </button>
                            <button type="button" class="lis-dict-vocab-btn-action dict-vocab-addjar" data-ru="${esc(v.ru)}" data-vi="${esc(v.vi)}" data-stress="${esc(v.stress || v.ru)}" data-pos="${esc(v.pos || "")}" title="Thêm vào Lọ từ vựng của bạn">
                              ${icon("archive-jar", 18)}
                            </button>
                          </div>
                        </div>
                      `).join("")}
                    </div>
                  `}
                </div>
              </section>
              ` : ""}
            </main>
          </div>
          <div class="lis-dict-sidebar-scrim" id="dictSidebarScrim"></div>
        </div>
      `;

      if (showPracticeCard) {
        renderClozeSentence();
      }
      bindWorkspaceEvents();
      initDictWaveform();
    };

    const renderClozeSentence = () => {
      const flow = host.querySelector("#dictSentenceFlow");
      if (!flow) return;

      const s = sentences[currentSentenceIdx];
      const tokens = tokenizeSentence(s.ru);
      const blankSet = getBlankSet(tokens, currentBlankPct);
      const isDone = isRePracticing ? rePracticeDone.has(currentSentenceIdx) : isSentenceDone(currentSentenceIdx);

      if (isDone) {
        flow.classList.add("is-completed");
      } else {
        flow.classList.remove("is-completed");
      }

      const units = [];
      let i = 0;
      while (i < tokens.length) {
        const token = tokens[i];

        // 1. Dấu mở (prefix) như «, “, (, [
        let prefixHtml = "";
        if (!token.isWord && /^[«“(\["]+$/.test(token.text)) {
          prefixHtml = `<span class="lis-dict-punct lis-dict-punct-prefix">${esc(token.text)}</span>`;
          i++;
          if (i >= tokens.length) {
            units.push(`<span class="lis-dict-token-unit">${prefixHtml}</span>`);
            break;
          }
        }

        const curr = tokens[i];
        let mainHtml = "";

        if (!curr.isWord) {
          mainHtml = `<span class="lis-dict-punct">${esc(curr.text)}</span>`;
        } else if (!blankSet.has(i)) {
          mainHtml = `<span class="lis-dict-static-word ru">${esc(curr.text)}</span>`;
        } else {
          const cleanWord = curr.text.replace(/[.,!?;:«»""'']/g, "");
          const dotCount = Math.min(5, Math.max(2, Math.round(cleanWord.length * 0.7)));
          const dots = "·".repeat(dotCount);
          const width = Math.max(54, cleanWord.length * 14 + 26);
          const val = isDone ? cleanWord : "";
          const correctCls = isDone ? "is-correct" : "";
          const readonlyAttr = isDone ? "readonly" : "";

          mainHtml = `
            <input type="text"
              class="lis-dict-word-input ru ${correctCls}"
              data-expected="${esc(cleanWord)}"
              style="width: ${width}px;"
              placeholder="${dots}"
              value="${esc(val)}"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              aria-label="Từ cần điền (${cleanWord.length} ký tự)"
              ${readonlyAttr}
            />
          `;
        }

        // 2. Dấu đóng (suffix) như .,!?;:», ”)]... bám sát từ trước đó, không bị tách dòng
        let suffixHtml = "";
        while (i + 1 < tokens.length && !tokens[i + 1].isWord && /^[.,!?;:»”\)'"]+$/.test(tokens[i + 1].text)) {
          suffixHtml += `<span class="lis-dict-punct lis-dict-punct-suffix">${esc(tokens[i + 1].text)}</span>`;
          i++;
        }

        units.push(`<span class="lis-dict-token-unit">${prefixHtml}${mainHtml}${suffixHtml}</span>`);
        i++;
      }

      flow.innerHTML = units.join("");

      const inputs = Array.from(flow.querySelectorAll(".lis-dict-word-input"));
      const norm = (str) => (str || "").trim().toLowerCase().replace(/[.,!?;:«»""'']/g, "").replace(/ё/g, "е");

      // Hàm kiểm tra khi bấm Enter (hoặc khi ở chế độ hideInstantCheck)
      const checkAllInputsOnEnter = (currentInput) => {
        let hasWrong = false;
        inputs.forEach(inp => {
          if (inp.classList.contains("is-correct")) return;
          const exp = inp.dataset.expected || "";
          if (norm(inp.value) === norm(exp) && norm(inp.value).length > 0) {
            inp.classList.add("is-correct");
            inp.classList.remove("is-wrong");
            inp.readOnly = true;
            inp.value = exp;
          } else if (inp.value.trim().length > 0) {
            inp.classList.add("is-wrong");
            hasWrong = true;
          }
        });

        const nextIncomplete = inputs.find(inp => !inp.classList.contains("is-correct"));
        if (!nextIncomplete) {
          handleSentenceFinished();
        } else {
          nextIncomplete.focus();
          if (hasWrong) {
            toast("Có từ chưa đúng, hãy nghe kỹ lại nhé!");
          }
        }
      };

      inputs.forEach((input, idx) => {
        input.oninput = () => {
          input.classList.remove("is-wrong");
          if (!hideInstantCheck) {
            const expected = input.dataset.expected || "";
            if (norm(input.value) === norm(expected) && norm(input.value).length > 0) {
              input.classList.add("is-correct");
              input.classList.remove("is-wrong");
              input.readOnly = true;
              input.value = expected;

              const nextInput = inputs.find(inp => !inp.classList.contains("is-correct"));
              if (nextInput) {
                nextInput.focus();
              } else {
                handleSentenceFinished();
              }
            }
          }
        };

        input.onkeydown = (e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            hintOneWord();
          } else if (e.key === "Enter") {
            e.preventDefault();
            checkAllInputsOnEnter(input);
          } else if (e.key === " ") {
            e.preventDefault();
            const currIdx = inputs.indexOf(input);
            if (currIdx < inputs.length - 1) inputs[currIdx + 1].focus();
          } else if (e.key === "Backspace" && input.value === "") {
            const currIdx = inputs.indexOf(input);
            if (currIdx > 0 && !inputs[currIdx - 1].readOnly) {
              inputs[currIdx - 1].focus();
            }
          }
        };
      });

      const firstEmpty = inputs.find(inp => !inp.classList.contains("is-correct"));
      if (firstEmpty) {
        setTimeout(() => firstEmpty.focus(), 80);
      }
    };

    const handleSentenceFinished = () => {
      // 1. Phản hồi âm thanh
      if (typeof playQuizletSound === "function") {
        playQuizletSound("correct");
      }
      unlockedVocab[currentSentenceIdx] = true;

      // 2. Ghi nhận hoàn thành câu
      if (isRePracticing) {
        rePracticeDone.add(currentSentenceIdx);
      } else {
        const key = `${lesson.id}_dict_${currentSentenceIdx}`;
        if (!Progress.doneList("listenDone").includes(key)) {
          Progress.markDone("listenDone", key);
          Progress.addXp(10);
        }
      }

      // 3. Khóa các ô điền của câu hiện tại sang trạng thái is-correct
      const flow = host.querySelector("#dictSentenceFlow");
      if (flow) {
        flow.classList.add("is-completed");
        flow.querySelectorAll(".lis-dict-word-input").forEach(inp => {
          inp.classList.add("is-correct");
          inp.classList.remove("is-wrong");
          inp.readOnly = true;
        });
      }

      // 4. Tự động chuyển sang câu tiếp theo đến hết
      const hasNext = currentSentenceIdx < sentences.length - 1;

      clearTimeout(autoAdvanceTimeout);
      if (hasNext) {
        toast(`Chính xác! Đang chuyển sang câu ${currentSentenceIdx + 2}/${sentences.length}... 🚀`);
        autoAdvanceTimeout = setTimeout(() => {
          stopAudio();
          currentSentenceIdx++;
          showAnswer = false;
          renderWorkspace();
          setTimeout(() => {
            playCurrentAudio();
          }, 300);
        }, 850);
      } else {
        if (isRePracticing) {
          toast("Xuất sắc! Bạn đã hoàn thành toàn bộ bài luyện lại! 🌟");
          autoAdvanceTimeout = setTimeout(() => {
            stopAudio();
            isRePracticing = false;
            showCompletedReview = false;
            rePracticeDone.clear();
            currentSentenceIdx = 0;
            renderWorkspace();
          }, 1100);
        } else {
          const allDone = sentences.every((_, i) => isSentenceDone(i));
          if (allDone) {
            Progress.markDone("listenDone", `${lesson.id}_dict`);
            Progress.markDone("listenDone", `${lesson.id}_dict_done`);
            Progress.addXp(20);
            toast("Xuất sắc! Bạn đã hoàn thành toàn bộ bài nghe chép chính tả! 🎉 (+20 XP)");
          } else {
            toast("Bạn đã làm đến cuối bài nghe! Hãy hoàn thành các câu còn lại để nhận XP nhé.");
          }
          autoAdvanceTimeout = setTimeout(() => {
            stopAudio();
            currentSentenceIdx = 0;
            renderWorkspace();
          }, 1100);
        }
      }
    };

    let closeAllPopoversHandler = null;

    const bindWorkspaceEvents = () => {
      // 1. Quay lại Hub
      const backBtn = host.querySelector("#btnDictBack") || host.querySelector(".lis-dict-topbar-back");
      if (backBtn) {
        backBtn.onclick = (e) => {
          if (e) e.preventDefault();
          clearTimeout(autoAdvanceTimeout);
          stopAudio();
          if (dictWaveform) {
            try { dictWaveform.destroy(); } catch (_) {}
            dictWaveform = null;
          }
          if (closeAllPopoversHandler) {
            document.removeEventListener("click", closeAllPopoversHandler);
          }
          document.body.classList.remove("in-workspace");
          renderHub();
          window.scrollTo({ top: 0, behavior: "smooth" });
        };
      }

      // Xử lý Luyện lại bài đã hoàn thành
      const btnRePractice = host.querySelector("#btnDictRePractice");
      if (btnRePractice) {
        btnRePractice.onclick = () => {
          clearTimeout(autoAdvanceTimeout);
          isRePracticing = true;
          showCompletedReview = false;
          rePracticeDone.clear();
          currentSentenceIdx = 0;
          showAnswer = false;
          toast("Bắt đầu luyện tập lại bài học! 🎧");
          renderWorkspace();
          setTimeout(() => {
            playCurrentAudio();
          }, 350);
        };
      }

      const btnViewCompleted = host.querySelector("#btnDictViewCompleted");
      if (btnViewCompleted) {
        btnViewCompleted.onclick = () => {
          clearTimeout(autoAdvanceTimeout);
          showCompletedReview = true;
          isRePracticing = false;
          renderWorkspace();
        };
      }

      const btnCloseReview = host.querySelector("#btnDictCloseReview");
      if (btnCloseReview) {
        btnCloseReview.onclick = () => {
          clearTimeout(autoAdvanceTimeout);
          showCompletedReview = false;
          renderWorkspace();
        };
      }

      // 2. Audio Player Controls
      const playBtn = host.querySelector("#btnDictPlay");
      if (playBtn) {
        playBtn.onclick = () => {
          if (isPlaying) {
            stopAudio();
          } else {
            playCurrentAudio();
          }
        };
      }

      const replayBtn = host.querySelector("#btnDictReplay");
      if (replayBtn) {
        replayBtn.onclick = () => {
          playCurrentAudio();
        };
      }

      // Điều hướng câu trước / câu sau ở cụm giữa (Req 12)
      const prevSentenceBtn = host.querySelector("#btnDictPrevSentence");
      if (prevSentenceBtn) {
        prevSentenceBtn.onclick = () => {
          clearTimeout(autoAdvanceTimeout);
          if (currentSentenceIdx > 0) {
            stopAudio();
            currentSentenceIdx--;
            showAnswer = false;
            renderWorkspace();
          }
        };
      }

      const nextSentenceBtn = host.querySelector("#btnDictNextSentence");
      if (nextSentenceBtn) {
        nextSentenceBtn.onclick = () => {
          clearTimeout(autoAdvanceTimeout);
          if (currentSentenceIdx < sentences.length - 1) {
            stopAudio();
            currentSentenceIdx++;
            showAnswer = false;
            renderWorkspace();
          }
        };
      }

      // Cửa sổ tốc độ phát (Slider từ trái sang phải đẹp tinh tế)
      const speedBtn = host.querySelector("#btnDictSpeed");
      const speedPopover = host.querySelector("#dictSpeedPopover");
      const loopPopover = host.querySelector("#dictLoopPopover");

      if (speedBtn && speedPopover) {
        speedBtn.onclick = (e) => {
          e.stopPropagation();
          if (loopPopover) loopPopover.classList.add("hidden");
          speedPopover.classList.toggle("hidden");
        };

        const speedSlider = speedPopover.querySelector("#dictSpeedSlider");
        const speedBadge = speedPopover.querySelector("#dictSpeedBadge");
        const speedText = host.querySelector("#dictSpeedText");

        const updateSpeedDisplay = (val) => {
          speed = Math.round(val * 10) / 10;
          if (speedSlider) speedSlider.value = speed.toFixed(1);
          if (speedBadge) speedBadge.textContent = `${speed.toFixed(1)}x`;
          if (speedText) speedText.textContent = `${speed.toFixed(1)}x`;
          speedPopover.querySelectorAll(".lis-dict-preset-btn").forEach(btn => {
            btn.classList.toggle("is-active", Math.abs(parseFloat(btn.dataset.speed) - speed) < 0.01);
          });
        };

        if (speedSlider) {
          speedSlider.oninput = (e) => {
            e.stopPropagation();
            updateSpeedDisplay(parseFloat(speedSlider.value));
          };
          speedSlider.onchange = (e) => {
            e.stopPropagation();
            toast(`Tốc độ phát: ${speed.toFixed(1)}x`);
            if (isPlaying) playCurrentAudio();
          };
        }

        speedPopover.querySelectorAll(".lis-dict-preset-btn").forEach(btn => {
          btn.onclick = (e) => {
            e.stopPropagation();
            updateSpeedDisplay(parseFloat(btn.dataset.speed));
            toast(`Tốc độ phát: ${speed.toFixed(1)}x`);
            if (isPlaying) playCurrentAudio();
          };
        });
      }

      // Cửa sổ tự lặp (Chuẩn Pomodoro đẹp tinh tế)
      const loopBtn = host.querySelector("#btnDictLoop");
      if (loopBtn && loopPopover) {
        loopBtn.onclick = (e) => {
          e.stopPropagation();
          if (speedPopover) speedPopover.classList.add("hidden");
          loopPopover.classList.toggle("hidden");
        };

        const closeLoopBtn = loopPopover.querySelector("#btnCloseLoopPopover");
        if (closeLoopBtn) {
          closeLoopBtn.onclick = (e) => {
            e.stopPropagation();
            loopPopover.classList.add("hidden");
          };
        }

        const loopCountSlider = loopPopover.querySelector("#dictLoopCountSlider");
        const loopDelaySlider = loopPopover.querySelector("#dictLoopDelaySlider");
        const loopCountBadge = loopPopover.querySelector("#dictLoopCountBadge");
        const loopDelayBadge = loopPopover.querySelector("#dictLoopDelayBadge");

        let tempCount = loopCountTarget;
        let tempDelay = loopDelaySec;

        const syncLoopPresetHighlights = () => {
          loopPopover.querySelectorAll(".lis-dict-preset-btn").forEach(btn => {
            const c = parseInt(btn.dataset.count, 10);
            const d = parseInt(btn.dataset.delay, 10);
            btn.classList.toggle("is-active", tempCount === c && tempDelay === d);
          });
        };

        if (loopCountSlider) {
          loopCountSlider.oninput = (e) => {
            e.stopPropagation();
            const val = parseInt(loopCountSlider.value, 10);
            tempCount = val >= 10 ? Infinity : val;
            if (loopCountBadge) loopCountBadge.textContent = tempCount === Infinity ? "Vô hạn" : `${tempCount} lần`;
            syncLoopPresetHighlights();
          };
        }

        if (loopDelaySlider) {
          loopDelaySlider.oninput = (e) => {
            e.stopPropagation();
            tempDelay = parseInt(loopDelaySlider.value, 10);
            if (loopDelayBadge) loopDelayBadge.textContent = `${tempDelay} giây`;
            syncLoopPresetHighlights();
          };
        }

        loopPopover.querySelectorAll(".lis-dict-preset-btn").forEach(btn => {
          btn.onclick = (e) => {
            e.stopPropagation();
            tempCount = parseInt(btn.dataset.count, 10);
            tempDelay = parseInt(btn.dataset.delay, 10);
            if (loopCountSlider) loopCountSlider.value = tempCount;
            if (loopDelaySlider) loopDelaySlider.value = tempDelay;
            if (loopCountBadge) loopCountBadge.textContent = `${tempCount} lần`;
            if (loopDelayBadge) loopDelayBadge.textContent = `${tempDelay} giây`;
            syncLoopPresetHighlights();
          };
        });

        const applyLoopBtn = loopPopover.querySelector("#btnDictLoopApply");
        if (applyLoopBtn) {
          applyLoopBtn.onclick = (e) => {
            e.stopPropagation();
            loopCountTarget = tempCount;
            loopDelaySec = tempDelay;
            isLooping = true;
            loopCurrentCount = 0;
            updateLoopBtnState();
            loopPopover.classList.add("hidden");
            const countTxt = loopCountTarget === Infinity ? "Vô hạn" : `${loopCountTarget} lần`;
            toast(`Đã bật tự lặp: ${countTxt}, nghỉ ${loopDelaySec}s`);
            if (!isPlaying) playCurrentAudio();
          };
        }

        const offLoopBtn = loopPopover.querySelector("#btnDictLoopOff");
        if (offLoopBtn) {
          offLoopBtn.onclick = (e) => {
            e.stopPropagation();
            isLooping = false;
            clearTimeout(loopTimeout);
            updateLoopBtnState();
            loopPopover.classList.add("hidden");
            toast("Đã tắt chế độ tự lặp");
          };
        }
      }

      // Đóng popover khi nhấn ra ngoài
      if (closeAllPopoversHandler) {
        document.removeEventListener("click", closeAllPopoversHandler);
      }
      closeAllPopoversHandler = () => {
        if (speedPopover) speedPopover.classList.add("hidden");
        if (loopPopover) loopPopover.classList.add("hidden");
      };
      document.addEventListener("click", closeAllPopoversHandler);

      // 3. Mức độ gợi ý %
      host.querySelectorAll(".lis-dict-pct-btn").forEach((b) => {
        b.onclick = () => {
          currentBlankPct = parseInt(b.dataset.pct, 10) || 50;
          host.querySelectorAll(".lis-dict-pct-btn").forEach(btn => btn.classList.remove("is-active"));
          b.classList.add("is-active");
          renderClozeSentence();
        };
      });

      // 5. Ẩn kết quả tới khi bấm Enter (Req 4)
      const toggleHideBtn = host.querySelector("#btnToggleHideResult");
      if (toggleHideBtn) {
        toggleHideBtn.onclick = () => {
          hideInstantCheck = !hideInstantCheck;
          toggleHideBtn.classList.toggle("is-active", hideInstantCheck);
          toggleHideBtn.title = hideInstantCheck ? "Đang ẩn kết quả (nhấn Enter để kiểm tra)" : "Ẩn kết quả tới khi nhấn Enter";
          toast(hideInstantCheck ? "Đang bật ẩn kết quả: Gõ xong nhấn Enter để kiểm tra" : "Đã tắt ẩn kết quả: Tự động chuyển khi điền đúng");
        };
      }

      const speakInlineBtn = host.querySelector("#btnDictSpeakInlineAnswer");
      if (speakInlineBtn) {
        speakInlineBtn.onclick = () => {
          speak(sentences[currentSentenceIdx].ru, "ru-RU", speed);
        };
      }


      // 8. Mở khóa sớm từ vựng
      const unlockEarlyBtn = host.querySelector("#btnUnlockVocabEarly");
      if (unlockEarlyBtn) {
        unlockEarlyBtn.onclick = () => {
          unlockedVocab[currentSentenceIdx] = true;
          renderWorkspace();
        };
      }

      // Phát âm từ vựng
      host.querySelectorAll(".dict-vocab-speak").forEach((b) => {
        b.onclick = () => {
          const w = b.dataset.word;
          if (w) speak(w, "ru-RU", 0.85);
        };
      });

      // Thêm từ vào Lọ từ vựng cá nhân
      host.querySelectorAll(".dict-vocab-addjar").forEach((b) => {
        b.onclick = () => {
          const fn = window.openAddToJarModal || window.openAddJarModal;
          if (typeof fn === "function") {
            fn({
              ru: b.dataset.ru,
              vi: b.dataset.vi,
              stress: b.dataset.stress || b.dataset.ru,
              note: b.dataset.pos || ""
            });
          } else if (typeof toast === "function") {
            toast(`Đã chọn lưu từ “${b.dataset.ru}” vào Lọ từ vựng`);
          }
        };
      });

      // 9. Chuyển bài qua danh sách Sidebar (Req 11)
      host.querySelectorAll(".lis-dict-sentence-item").forEach((b) => {
        b.onclick = () => {
          const lessonId = b.dataset.lessonId;
          if (lessonId && lessonId !== lesson.id) {
            clearTimeout(autoAdvanceTimeout);
            stopAudio();
            if (closeAllPopoversHandler) {
              document.removeEventListener("click", closeAllPopoversHandler);
            }
            const targetLesson = allLessons.find(l => l.id === lessonId);
            if (targetLesson) {
              closeMobileDrawer();
              openDictationWorkspace(targetLesson);
            }
          }
        };
      });

      // Mobile Drawer Sidebar
      const toggleSidebarBtn = host.querySelector("#btnDictToggleSidebar");
      const closeSidebarBtn = host.querySelector("#btnDictCloseSidebar");
      const sidebarPanel = host.querySelector("#dictSidebarPanel");
      const scrim = host.querySelector("#dictSidebarScrim");

      const openMobileDrawer = () => {
        if (sidebarPanel) sidebarPanel.classList.add("is-open");
        if (scrim) scrim.classList.add("is-open");
      };

      const closeMobileDrawer = () => {
        if (sidebarPanel) sidebarPanel.classList.remove("is-open");
        if (scrim) scrim.classList.remove("is-open");
      };

      if (toggleSidebarBtn) toggleSidebarBtn.onclick = openMobileDrawer;
      if (closeSidebarBtn) closeSidebarBtn.onclick = closeMobileDrawer;
      if (scrim) scrim.onclick = closeMobileDrawer;
    };

    renderWorkspace();
  };

  const modeDict = (mb, lesson) => {
    openDictationWorkspace(lesson);
  };

  const modeCheck = (mb, lesson) => {
    quizEngine(mb, lesson.questions, {
      onFinish: (pct) => {
        if (pct >= 60) {
          const key = lesson.id + "_check";
          if (!Progress.doneList("listenDone").includes(key)) Progress.addXp(15);
          Progress.markDone("listenDone", key);
          toast("Hoàn thành bài trắc nghiệm nghe hiểu (+15 XP)!");
        }
      }
    });
  };

  const checkUrlLesson = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const getParam = (k) => (window.getRusiRouteParam ? window.getRusiRouteParam(k) : null) || urlParams.get(k);
      const modeParam = (getParam("mode") || "").toLowerCase();
      if (modeParam === "dictation" || modeParam === "comprehension") {
        currentMode = modeParam;
      }
      const targetId = getParam("id") || getParam("lesson");
      if (targetId) {
        if (typeof window.requireAuth === "function" && !window.requireAuth("listening.html?id=" + encodeURIComponent(targetId))) return true;
        const all = typeof getListeningLessons === "function" ? getListeningLessons() : [];
        const found = all.find(l => l.id === targetId || l.code === targetId);
        if (found) {
          const isPro = Boolean(found.is_pro_only || found.is_pro);
          if (isPro && typeof Monetization !== "undefined" && !Monetization.isPro()) {
            Monetization.showProGateModal("Nội dung bài nghe PRO", "Nâng cấp tài khoản PRO để mở khóa trọn vẹn bài học này!");
            return false;
          }
          if (currentMode === "dictation") openDictationWorkspace(found);
          else openComprehensionWorkspace(found);
          return true;
        }
      }
    } catch (_) {}
    return false;
  };

  if (!checkUrlLesson()) {
    renderHub();
  }
}
window.initListeningPage = initListeningPage;
window._initListeningPage = initListeningPage;
