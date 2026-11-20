/**
 * RUSI TRKI — audioRecorder.js
 * Hardware Audio Recorder & VAD (Voice Activity Detection)
 * Chuẩn PCM WAV 16kHz Mono tương thích 100% iOS Safari, Chrome, Edge, Android
 * Tối ưu theo chuẩn DauEnglish (0-Egress & Full Cross-Browser)
 */
(function(window) {
  'use strict';

  const TARGET_SAMPLE_RATE = 16000;

  // Kiểm tra thiết bị & trình duyệt
  const getUserAgent = () => (typeof navigator !== 'undefined' ? navigator.userAgent || '' : '');
  const isIOS = () => /iPad|iPhone|iPod/.test(getUserAgent()) || (getUserAgent().includes('Macintosh') && typeof document !== 'undefined' && 'ontouchend' in document);
  const isAndroid = () => /Android/i.test(getUserAgent());
  const isStandalone = () => typeof window !== 'undefined' && (navigator.standalone === true || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches));

  function getMicBlockedMessage() {
    if (isIOS()) {
      return "Micro đang bị chặn. Vào Cài đặt → Safari → Micrô → chọn 'Hỏi' hoặc 'Cho phép', rồi tải lại trang.";
    }
    if (isAndroid()) {
      return "Micro đang bị chặn. Bấm vào biểu tượng ổ khóa bên trái thanh địa chỉ → Quyền → Micrô → Cho phép, rồi tải lại trang.";
    }
    return "Micro đang bị chặn. Vui lòng bấm vào biểu tượng ổ khóa bên trái thanh địa chỉ để cho phép quyền Microphone, rồi tải lại trang.";
  }

  function getBrowserAdvice() {
    if (isIOS() && isStandalone()) {
      return "App RUSI TRKI trên màn hình chính iPhone không hỗ trợ nhận dạng giọng nói do giới hạn của Apple. Bạn vẫn có thể thu âm và nghe lại giọng mình. Để được AI chấm điểm, vui lòng mở rusitrki.com bằng trình duyệt Safari.";
    }
    const ua = getUserAgent();
    if (/coc_coc_browser/i.test(ua)) {
      return "Trình duyệt Cốc Cốc có thể chặn kết nối nhận diện giọng nói. Hãy dùng Google Chrome hoặc Microsoft Edge để AI chấm phát âm tốt nhất.";
    }
    if (typeof navigator !== 'undefined' && navigator.brave) {
      return "Trình duyệt Brave chặn dịch vụ nhận diện giọng nói mặc định. Hãy mở bằng Google Chrome, Edge hoặc Safari.";
    }
    return null;
  }

  // Downsample audio float32 sang 16kHz
  function downsampleBuffer(buffer, inputSampleRate, outputSampleRate) {
    if (outputSampleRate >= inputSampleRate) return buffer;
    const ratio = inputSampleRate / outputSampleRate;
    const newLength = Math.floor(buffer.length / ratio);
    const result = new Float32Array(newLength);
    for (let i = 0; i < newLength; i++) {
      const start = Math.floor(i * ratio);
      const end = Math.min(Math.floor((i + 1) * ratio), buffer.length);
      let sum = 0;
      let count = 0;
      for (let j = start; j < end; j++) {
        sum += buffer[j];
        count++;
      }
      result[i] = count > 0 ? sum / count : 0;
    }
    return result;
  }

  // Encode PCM WAV Float32 -> 16-bit PCM WAV Blob
  function encodeWAV(chunks, inputSampleRate) {
    let totalLen = 0;
    for (const c of chunks) totalLen += c.length;
    const merged = new Float32Array(totalLen);
    let offset = 0;
    for (const c of chunks) {
      merged.set(c, offset);
      offset += c.length;
    }

    const downsampled = downsampleBuffer(merged, inputSampleRate, TARGET_SAMPLE_RATE);
    const sampleRate = inputSampleRate > TARGET_SAMPLE_RATE ? TARGET_SAMPLE_RATE : inputSampleRate;

    const buffer = new ArrayBuffer(44 + downsampled.length * 2);
    const view = new DataView(buffer);

    const writeString = (pos, str) => {
      for (let i = 0; i < str.length; i++) view.setUint8(pos + i, str.charCodeAt(i));
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + downsampled.length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
    view.setUint16(20, 1, true);  // AudioFormat (1 = PCM)
    view.setUint16(22, 1, true);  // NumChannels (1 = Mono)
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true); // ByteRate (sampleRate * numChannels * bitsPerSample/8)
    view.setUint16(32, 2, true);  // BlockAlign
    view.setUint16(34, 16, true); // BitsPerSample
    writeString(36, 'data');
    view.setUint32(40, downsampled.length * 2, true);

    let idx = 44;
    for (let i = 0; i < downsampled.length; i++, idx += 2) {
      const s = Math.max(-1, Math.min(1, downsampled[i]));
      view.setInt16(idx, s < 0 ? s * 32768 : s * 32767, true);
    }

    return new Blob([buffer], { type: 'audio/wav' });
  }

  function isAudioSupported() {
    return typeof navigator !== 'undefined' &&
      !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) &&
      typeof window !== 'undefined' &&
      !!(window.AudioContext || window.webkitAudioContext);
  }

  async function startAudioRecording(options = {}) {
    const {
      onLevel = null,       // Callback(volume 0..1) cho sóng âm
      silenceMs = 1800,     // Dừng sau 1.8s im lặng
      maxMs = 12000,        // Giới hạn tối đa 12s
      onAutoStop = null     // Callback khi VAD tự ngắt
    } = options;

    if (!isAudioSupported()) {
      throw new Error("Thiết bị không hỗ trợ thu âm qua Web Audio. Vui lòng mở bằng Chrome hoặc Safari.");
    }

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
    } catch (err) {
      const name = err?.name || '';
      if (name === 'NotAllowedError' || name === 'SecurityError') {
        throw new Error(getMicBlockedMessage());
      }
      if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
        throw new Error("Không tìm thấy microphone trên thiết bị của bạn.");
      }
      if (name === 'NotReadableError') {
        throw new Error("Micro đang được ứng dụng khác sử dụng. Vui lòng tắt ứng dụng đó và thử lại.");
      }
      throw new Error("Không thể mở micro. Hãy kiểm tra cài đặt trình duyệt và thử lại.");
    }

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioCtx();
    try { await audioCtx.resume(); } catch (_) {}

    const source = audioCtx.createMediaStreamSource(stream);
    const processor = audioCtx.createScriptProcessor(4096, 1, 1);
    const chunks = [];
    let isStopped = false;
    let hasSpoken = false;
    let lastSpokenAt = Date.now();
    const startedAt = Date.now();

    let resolvePromise;
    const donePromise = new Promise(resolve => { resolvePromise = resolve; });

    const cleanup = () => {
      if (!isStopped) {
        isStopped = true;
        try { processor.disconnect(); } catch (_) {}
        try { source.disconnect(); } catch (_) {}
        try { stream.getTracks().forEach(t => t.stop()); } catch (_) {}
        try { audioCtx.close(); } catch (_) {}
      }
    };

    let timer = null;
    const finish = () => {
      if (isStopped) return;
      if (timer) { clearTimeout(timer); timer = null; }
      const inputRate = audioCtx.sampleRate;
      cleanup();
      const blob = encodeWAV(chunks, inputRate);
      resolvePromise(blob);
    };

    const cancel = () => {
      if (timer) { clearTimeout(timer); timer = null; }
      cleanup();
      resolvePromise(new Blob([], { type: 'audio/wav' }));
    };

    processor.onaudioprocess = (e) => {
      if (isStopped) return;
      const channel = e.inputBuffer.getChannelData(0);
      chunks.push(new Float32Array(channel));

      // Tính năng lượng RMS
      let sumSq = 0;
      for (let i = 0; i < channel.length; i++) sumSq += channel[i] * channel[i];
      const rms = Math.sqrt(sumSq / channel.length);

      if (onLevel) {
        onLevel(Math.min(1, rms * 6));
      }

      const now = Date.now();
      // Ngưỡng phát hiện bắt đầu phát âm
      if (rms > 0.02) {
        hasSpoken = true;
        lastSpokenAt = now;
      }

      const isMaxTimeout = now - startedAt > maxMs;
      const isSilenceTimeout = hasSpoken && (now - lastSpokenAt > silenceMs);

      if (isMaxTimeout || isSilenceTimeout) {
        finish();
        if (onAutoStop) onAutoStop();
      }
    };

    source.connect(processor);
    const gain = audioCtx.createGain();
    gain.gain.value = 0; // Tránh echo vòng lặp âm thanh ra loa
    processor.connect(gain);
    gain.connect(audioCtx.destination);

    // Timeout an toàn
    timer = setTimeout(() => {
      if (!isStopped) {
        finish();
        if (onAutoStop) onAutoStop();
      }
    }, maxMs + 1000);

    return {
      done: donePromise,
      finish,
      cancel
    };
  }

  window.RusiAudioRecorder = {
    isAudioSupported,
    startAudioRecording,
    getMicBlockedMessage,
    getBrowserAdvice,
    isIOS,
    isStandalone
  };

})(window);
