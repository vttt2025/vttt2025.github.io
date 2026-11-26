/* RUSI — Trình phát YouTube tối giản cho bài học.
 * Ẩn tối đa giao diện YouTube: tắt thanh điều khiển (controls=0), chú thích, phụ đề tự bật, phím tắt, toàn màn hình;
 * lớp chặn chuột để YouTube không hiện tiêu đề khi rê chuột; ảnh bìa riêng che màn hình chờ/tạm dừng/kết thúc
 * (tiêu đề, "Xem trên YouTube", "Video khác"). Điều khiển bằng YouTube IFrame API + thanh điều khiển của RUSI.
 * Dùng: const ctl = RusiYtPlayer.mount(wrapEl, { videoId, start, end, rate, title, onTime(sec),
 *         frameId, showBar (mặc định true), revealDelayMs (mặc định 3200), onReady(player), onError(code), onApiFail(err) });
 *       ctl.play() / ctl.pause() / ctl.setRate(r) / ctl.destroy() / ctl.getPlayer() / ctl.allowDirectTap()
 */
(function () {
  "use strict";

  const YT_ORIGIN = "https://www.youtube-nocookie.com";
  const ID_RE = /^[A-Za-z0-9_-]{11}$/;

  const ico = (name, size) => (window.RusiIcons ? window.RusiIcons.get(name, { size }) : "");
  const escText = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const notify = (msg) => { if (typeof window.toast === "function") window.toast(msg); };
  const fmt = (sec) => {
    const s = Math.max(0, Math.floor(Number(sec) || 0));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  };

  // Nạp YouTube IFrame API một lần cho cả trang (dùng chung khóa với trang luyện nói)
  const loadApi = () => {
    if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
    if (window._rusiYtApiPromise) return window._rusiYtApiPromise;
    window._rusiYtApiPromise = new Promise((resolve, reject) => {
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevReady === "function") {
          try { prevReady(); } catch (err) { console.warn("[RusiYtPlayer] onYouTubeIframeAPIReady", err); }
        }
        resolve(window.YT);
      };
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      s.onerror = () => {
        window._rusiYtApiPromise = null;
        reject(new Error("Không tải được YouTube IFrame API"));
      };
      document.head.appendChild(s);
    });
    return window._rusiYtApiPromise;
  };

  const mount = (wrap, opts = {}) => {
    const videoId = String(opts.videoId || "").trim();
    if (!wrap || !ID_RE.test(videoId)) return null;

    const start = Math.max(0, Math.floor(Number(opts.start) || 0));
    const endOpt = Math.floor(Number(opts.end) || 0);
    const end = endOpt > start ? endOpt : 0; // 0 = chạy đến hết video
    let rate = Number(opts.rate) || 1;

    const hasOrigin = window.location.origin && window.location.origin !== "null" && !window.location.origin.startsWith("file:");
    const baseParams = `enablejsapi=1&rel=0&playsinline=1&iv_load_policy=3&cc_load_policy=0&start=${start}${end ? `&end=${end}` : ""}${hasOrigin ? `&origin=${encodeURIComponent(window.location.origin)}` : ""}`;
    const hiddenUiParams = "&controls=0&disablekb=1&fs=0";

    wrap.classList.add("rusi-yt");
    wrap.insertAdjacentHTML("afterbegin", `
      <iframe class="rusi-yt-frame"${opts.frameId ? ` id="${escText(opts.frameId)}"` : ""} src="${YT_ORIGIN}/embed/${videoId}?${baseParams}${hiddenUiParams}"
        title="${escText(opts.title || "Video bài học")}" tabindex="-1"
        allow="autoplay; encrypted-media; picture-in-picture"></iframe>
      <div class="rusi-yt-shield" aria-hidden="true"></div>
      <button type="button" class="rusi-yt-poster" aria-label="Phát video"
        style="background-image:url('https://i.ytimg.com/vi/${videoId}/hqdefault.jpg')">
        <span class="rusi-yt-poster-play">${ico("play", 30)}</span>
        <span class="rusi-yt-poster-msg"></span>
      </button>
    `);

    const bar = document.createElement("div");
    bar.className = "rusi-yt-bar";
    bar.innerHTML = `
      <button type="button" class="rusi-yt-btn" data-act="toggle" aria-label="Phát">${ico("play", 18)}</button>
      <button type="button" class="rusi-yt-btn" data-act="back" aria-label="Lùi 5 giây" title="Lùi 5 giây">${ico("rotate-ccw", 16)}<span class="rusi-yt-btn-txt">5s</span></button>
      <input type="range" class="rusi-yt-seek" min="0" max="0" step="0.1" value="0" aria-label="Tua video">
      <span class="rusi-yt-time">0:00 / --:--</span>
    `;
    if (opts.showBar === false) bar.hidden = true; // trang tự có nút điều khiển riêng (vd. luyện nói theo câu)
    wrap.insertAdjacentElement("afterend", bar);

    const frame = wrap.querySelector(".rusi-yt-frame");
    const shield = wrap.querySelector(".rusi-yt-shield");
    const poster = wrap.querySelector(".rusi-yt-poster");
    const posterMsg = wrap.querySelector(".rusi-yt-poster-msg");
    const toggleBtn = bar.querySelector('[data-act="toggle"]');
    const backBtn = bar.querySelector('[data-act="back"]');
    const seek = bar.querySelector(".rusi-yt-seek");
    const timeEl = bar.querySelector(".rusi-yt-time");

    let player = null;
    let ready = false;
    let broken = false;
    let pendingPlay = false;
    let isPlaying = false;
    let tickTimer = null;
    let blockTimer = null;
    let revealTimer = null; // YouTube hiện tiêu đề/logo ~3 giây mỗi lần bắt đầu phát hoặc tua → giữ ảnh bìa thêm một chút
    // Mặc định 3,2 giây; 0 = thấy hình ngay khi phát (chấp nhận giao diện YouTube nháy, vd. luyện nói theo câu ngắn)
    const REVEAL_DELAY_MS = Number.isFinite(Number(opts.revealDelayMs)) && opts.revealDelayMs !== null
      ? Math.max(0, Number(opts.revealDelayMs))
      : 3200;

    const clearReveal = () => {
      if (revealTimer) { clearTimeout(revealTimer); revealTimer = null; }
      wrap.classList.remove("is-revealed");
    };
    const armReveal = () => {
      if (revealTimer || wrap.classList.contains("is-revealed")) return;
      revealTimer = setTimeout(() => {
        revealTimer = null;
        if (isPlaying && !destroyed) wrap.classList.add("is-revealed");
      }, REVEAL_DELAY_MS);
    };

    // Tắt phụ đề do chủ video bật sẵn (cc_load_policy=0 không tắt được). Hàm không có trong tài liệu chính thức:
    // trình phát nào không hỗ trợ thì bỏ qua, video vẫn phát bình thường.
    const captionsOff = () => {
      ["captions", "cc"].forEach((mod) => {
        try { player.unloadModule(mod); } catch (err) { console.debug("[RusiYtPlayer] unloadModule " + mod, err); }
      });
    };
    let dragging = false;
    let destroyed = false;

    const segEnd = () => {
      if (end) return end;
      if (!ready) return 0;
      try { return Number(player.getDuration()) || 0; } catch (_) { return 0; }
    };
    const curTime = () => {
      if (!ready) return start;
      try { return Number(player.getCurrentTime()) || start; } catch (_) { return start; }
    };

    const setPlayingUi = (playing) => {
      isPlaying = playing;
      wrap.classList.toggle("is-playing", playing);
      toggleBtn.innerHTML = ico(playing ? "pause" : "play", 18);
      toggleBtn.setAttribute("aria-label", playing ? "Tạm dừng" : "Phát");
    };

    const tick = () => {
      if (!frame.isConnected) { destroy(); return; } // trang đã gỡ khung video (rời bài học)
      const t = curTime();
      const e = segEnd();
      const total = Math.max(0, e - start);
      if (!dragging) {
        seek.max = String(total);
        seek.value = String(Math.min(total, Math.max(0, t - start)));
      }
      timeEl.textContent = `${fmt(t - start)} / ${total ? fmt(total) : "--:--"}`;
      if (typeof opts.onTime === "function") {
        try { opts.onTime(t); } catch (err) { console.warn("[RusiYtPlayer] onTime", err); }
      }
    };

    const startTicking = () => {
      if (!tickTimer) tickTimer = setInterval(tick, 250);
    };
    const stopTicking = () => {
      if (tickTimer) { clearInterval(tickTimer); tickTimer = null; }
    };

    // API không dùng được → trả lại thanh điều khiển gốc của YouTube để video vẫn xem được
    const fallbackToNativeUi = (reason) => {
      console.warn("[RusiYtPlayer] Chuyển sang giao diện YouTube gốc:", reason);
      if (typeof opts.onApiFail === "function") {
        try { opts.onApiFail(reason); } catch (err) { console.warn("[RusiYtPlayer] onApiFail", err); }
      }
      broken = true;
      stopTicking();
      wrap.classList.add("is-native");
      bar.hidden = true;
      frame.removeAttribute("tabindex");
      frame.src = `${YT_ORIGIN}/embed/${videoId}?${baseParams}`;
    };

    const play = () => {
      if (destroyed || broken) return;
      if (!ready) {
        pendingPlay = true;
        wrap.classList.add("is-loading");
        return;
      }
      try {
        const e = segEnd();
        let state = -1;
        try { state = player.getPlayerState(); } catch (_) {}
        if (state === 0 || (e && curTime() >= e - 0.3)) player.seekTo(start, true);
        player.setPlaybackRate(rate);
        player.playVideo();
      } catch (err) {
        console.warn("[RusiYtPlayer] play", err);
      }
      // Trình duyệt (thường là iOS) chặn phát khi chưa chạm trực tiếp vào video → tạm bỏ lớp che để chạm nút gốc
      if (blockTimer) clearTimeout(blockTimer);
      blockTimer = setTimeout(() => {
        blockTimer = null;
        if (destroyed || isPlaying || !ready) return;
        let state = -1;
        try { state = player.getPlayerState(); } catch (_) {}
        if (state === -1 || state === 5) {
          wrap.classList.add("needs-tap");
          notify("Trình duyệt chưa cho phát video. Chạm trực tiếp vào video một lần.");
        }
      }, 3000);
    };

    const pause = () => {
      pendingPlay = false;
      wrap.classList.remove("is-loading");
      if (!ready || destroyed) return;
      try { player.pauseVideo(); } catch (err) { console.warn("[RusiYtPlayer] pause", err); }
    };

    const seekToSec = (sec) => {
      if (!ready || destroyed) return;
      const e = segEnd();
      const target = Math.max(start, e ? Math.min(sec, e - 0.25) : sec);
      if (isPlaying) { clearReveal(); armReveal(); } // tua khi đang phát → YouTube lại hiện giao diện của nó
      try { player.seekTo(target, true); } catch (err) { console.warn("[RusiYtPlayer] seekTo", err); }
      // getCurrentTime() chưa cập nhật ngay sau seekTo → hiển thị luôn vị trí đích
      const total = Math.max(0, e - start);
      seek.value = String(Math.min(total, target - start));
      timeEl.textContent = `${fmt(target - start)} / ${total ? fmt(total) : "--:--"}`;
    };

    const setRate = (r) => {
      rate = Number(r) || 1;
      if (!ready || destroyed) return;
      try { player.setPlaybackRate(rate); } catch (err) { console.warn("[RusiYtPlayer] setPlaybackRate", err); }
    };

    const destroy = () => {
      destroyed = true;
      stopTicking();
      clearReveal();
      if (blockTimer) { clearTimeout(blockTimer); blockTimer = null; }
      if (player) {
        try { player.destroy(); } catch (err) { console.warn("[RusiYtPlayer] destroy", err); }
        player = null;
      }
      ready = false;
      bar.remove();
    };

    // Sự kiện giao diện RUSI
    poster.addEventListener("click", play);
    shield.addEventListener("click", () => (isPlaying ? pause() : play()));
    toggleBtn.addEventListener("click", () => (isPlaying ? pause() : play()));
    backBtn.addEventListener("click", () => seekToSec(curTime() - 5));
    seek.addEventListener("input", () => {
      dragging = true;
      const total = Number(seek.max) || 0;
      timeEl.textContent = `${fmt(seek.value)} / ${total ? fmt(total) : "--:--"}`;
    });
    seek.addEventListener("change", () => {
      dragging = false;
      seekToSec(start + (Number(seek.value) || 0));
    });

    // Gắn IFrame API vào iframe (hết 10 giây chưa xong → giao diện YouTube gốc)
    let apiTimeout = null;
    Promise.race([
      loadApi(),
      new Promise((_, reject) => {
        apiTimeout = setTimeout(() => reject(new Error("Hết thời gian tải YouTube IFrame API")), 10000);
      })
    ]).then((YT) => {
      clearTimeout(apiTimeout);
      if (destroyed || !frame.isConnected) return;
      player = new YT.Player(frame, {
        host: YT_ORIGIN,
        events: {
          onReady: () => {
            if (destroyed || !frame.isConnected) return;
            ready = true;
            try { player.setPlaybackRate(rate); } catch (_) {}
            tick();
            if (typeof opts.onReady === "function") {
              try { opts.onReady(player); } catch (err) { console.warn("[RusiYtPlayer] onReady", err); }
            }
            if (pendingPlay) {
              pendingPlay = false;
              play();
            }
          },
          onStateChange: (e) => {
            if (destroyed) return;
            const state = e && e.data;
            // has-started: đã phát → lúc dừng giữ khung hình hiện tại; is-ended: hết video → che màn hình gợi ý của YouTube
            if (state === 1) wrap.classList.add("has-started");
            wrap.classList.toggle("is-ended", state === 0);
            if (state === 1) {
              wrap.classList.remove("is-loading", "needs-tap");
              setPlayingUi(true);
              startTicking();
              captionsOff();
              armReveal();
            } else if (state === 3) {
              wrap.classList.add("is-loading");
            } else {
              wrap.classList.remove("is-loading");
              clearReveal();
              setPlayingUi(false);
              stopTicking();
              tick();
            }
          },
          onError: (e) => {
            // 2: ID sai, 5: lỗi HTML5, 100: video bị xoá, 101/150: chủ video không cho nhúng
            console.warn("[RusiYtPlayer] YouTube player error", e && e.data);
            stopTicking();
            clearReveal();
            setPlayingUi(false);
            wrap.classList.remove("is-loading", "needs-tap");
            wrap.classList.add("is-error");
            posterMsg.textContent = "Video hiện không phát được.";
            poster.disabled = true;
            toggleBtn.disabled = true;
            backBtn.disabled = true;
            seek.disabled = true;
            if (typeof opts.onError === "function") {
              try { opts.onError(e && e.data); } catch (err) { console.warn("[RusiYtPlayer] onError", err); }
            }
          }
        }
      });
    }).catch((err) => {
      clearTimeout(apiTimeout);
      if (!destroyed && frame.isConnected) fallbackToNativeUi(err);
    });

    // Trình duyệt chặn phát (iOS): bỏ lớp che để người dùng chạm thẳng vào video một lần
    const allowDirectTap = () => wrap.classList.add("needs-tap");
    const getPlayer = () => (ready && !destroyed ? player : null);

    return { play, pause, setRate, destroy, getTime: curTime, getPlayer, allowDirectTap };
  };

  window.RusiYtPlayer = { mount };
})();
