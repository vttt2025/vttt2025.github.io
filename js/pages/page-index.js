/**
 * RUSI TRKI — page-index.js
 * Phân hệ trang: initIndexPage
 * Chuẩn Modular Architecture (0-Egress & Clean Code)
 */

function initIndexPage() {
  const xp = STORE.get("xp", 0);
  const streak = STORE.get("streak", 0);
  const vocabDone = Progress.doneList("vocabDone").length;
  if (el("#pwXp")) el("#pwXp").textContent = xp;
  if (el("#pwStreak")) el("#pwStreak").textContent = streak;
  if (el("#pwVocab")) el("#pwVocab").textContent = `${vocabDone}/${(window.VOCAB_JARS || []).length}`;
  const best = STORE.get("bestTest", null);
  if (el("#pwBest")) el("#pwBest").textContent = best === null ? "—" : best + "%";

  // Kích hoạt Bài test xếp lớp TRKI 0đ (Diagnostic Placement Test)
  const diagBtn = el("#btnOpenDiagnosticModal");
  if (diagBtn) {
    diagBtn.onclick = () => {
      if (typeof window.openDiagnosticTestModal === "function") {
        window.openDiagnosticTestModal();
      }
    };
  }

  // Nút bong bóng chat nổi Mascot Rusika ở góc dưới bên phải màn hình
  if (typeof MascotRusika !== "undefined") {
    MascotRusika.renderFloatingWidget();
  }

  // Render Bảng Gói Cước PRO & VietQR (Chuẩn hiện nay)
  window.renderPricingGrid = function () {
    const pricingHost = el("#pricingGrid");
    const pricingSection = document.getElementById("pricing");
    if (!pricingHost) return;

    const user = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
    
    // Luôn hiển thị bảng giá công khai chuẩn EdTech minh bạch
    if (pricingSection) pricingSection.style.display = "block";

    const isPro = typeof Monetization !== "undefined" ? Monetization.isPro() : false;
    const proInfo = typeof Monetization !== "undefined" ? Monetization.getProInfo() : null;
    const rawPkgs = typeof Monetization !== "undefined" ? Monetization.getPackages() : (typeof PACKAGES !== "undefined" ? PACKAGES : []);
    const seenPkgs = new Set();
    const pkgs = rawPkgs.filter(p => {
      const pid = (p.id || "").toLowerCase();
      if (!pid || seenPkgs.has(pid)) return false;
      seenPkgs.add(pid);
      return true;
    });

    // Không hiển thị banner pricing-auth-banner logged-in theo yêu cầu
    pricingHost.innerHTML = pkgs.map((pkg) => {
      const isCurrentPlan = isPro && proInfo && (pkg.id || "").toLowerCase() === (proInfo.pkgId || "").toLowerCase();
      
      // Nút hành động chuẩn theo trạng thái auth & pro
      let actionBtnHtml = "";
      if (isCurrentPlan) {
        actionBtnHtml = `
          <button class="btn btn-outline" disabled style="width:100%;background:rgba(16,185,129,0.1);color:#059669;border-color:#10b981;cursor:default;font-weight:800">
            ${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Gói bạn đang sử dụng
          </button>`;
      } else {
        actionBtnHtml = `
          <button class="btn ${pkg.popular ? "btn-primary" : "btn-outline"} btn-upgrade-pkg" data-pkg="${pkg.id}" style="width:100%;${pkg.popular ? "background:var(--secondary);border-color:var(--secondary);color:#fff" : ""}">
            ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} Kích hoạt ngay
          </button>`;
      }

      return `
      <div class="pricing-card ${pkg.popular ? "popular" : ""} ${isCurrentPlan ? "is-current" : ""}">
        ${isCurrentPlan ? `<div class="pricing-current-badge">GÓI ĐANG DÙNG</div>` : (pkg.popular ? `<div class="pricing-popular-badge" style="display:inline-flex;align-items:center;gap:5px">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 13 }) : ""} PHỔ BIẾN NHẤT</div>` : (pkg.id === "pro_1y" ? `<div class="pricing-popular-badge" style="background:linear-gradient(135deg, #10b981, #059669);display:inline-flex;align-items:center;gap:5px">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 13 }) : ""} GIÁ TRỊ CAO NHẤT</div>` : ""))}
        <div class="pricing-card-head">
          <span class="pricing-badge">${esc(pkg.badge || "PRO")}</span>
          <h3 class="pricing-title">${esc(pkg.title)}</h3>
          <p class="pricing-desc">${esc(pkg.desc)}</p>
        </div>
        <div class="pricing-price-wrap">
          <span class="pricing-amount">${pkg.price.toLocaleString("vi-VN")} đ</span>
          ${pkg.priceOld ? `<span class="pricing-old">${pkg.priceOld.toLocaleString("vi-VN")} đ</span>` : ""}
        </div>
        <ul class="pricing-features">
          ${(pkg.features || []).map((f) => `<li><span class="chk">${window.RusiIcons ? RusiIcons.get("check", { size: 14 }) : ""}</span> <span>${esc(f)}</span></li>`).join("")}
        </ul>
        ${actionBtnHtml}
      </div>`;
    }).join("");

    pricingHost.querySelectorAll(".btn-upgrade-pkg").forEach((btn) => {
      btn.onclick = () => {
        if (typeof Monetization !== "undefined") {
          Monetization.openUpgradeModal(btn.dataset.pkg);
        }
      };
    });
  };

  window.renderPricingGrid();

  // Khởi tạo tương tác Accordion cho FAQ
  document.querySelectorAll(".faq-item button").forEach((btn) => {
    btn.onclick = () => {
      const item = btn.closest(".faq-item");
      const wasOpen = item.classList.contains("faq-open");
      document.querySelectorAll(".faq-item").forEach((el) => {
        el.classList.remove("faq-open");
        const icon = el.querySelector("i");
        if (icon) icon.textContent = "+";
      });
      if (!wasOpen) {
        item.classList.add("faq-open");
        const icon = item.querySelector("i");
        if (icon) icon.textContent = "−";
      }
    };
  });

  // Khởi tạo chạy tự động 5 feedback học viên (Testimonial Auto-carousel)
  const initTestimonialCarousel = () => {
    const track = el("#testimonialTrack");
    const dotsHost = el("#testimonialDots");
    const prevBtn = el("#btnTestimonialPrev");
    const nextBtn = el("#btnTestimonialNext");
    const slider = el("#testimonialSlider");
    if (!track) return;

    const feedbacks = [
      {
        quote: "Sau 3 tháng học tại Rusi TRKI, mình đã tự tin đỗ chứng chỉ ТРКИ-1 và hoàn thành hồ sơ học bổng Hiệp định sang MGU. Điều mình thích nhất là giao diện thi thử mô phỏng y như phòng thi thật và các lọ từ vựng cực kỳ thực tế.",
        author: "Lan Hương",
        role: "Học viên xuất sắc đỗ học bổng MGU Moscow 2026",
        badge: "Học bổng Hiệp định MGU",
        initials: "LH",
        color: "#ff9f64"
      },
      {
        quote: "Luyện nghe 4 Part CEFR và phần phát âm Shadowing trên Rusi giúp mình cải thiện rõ rệt từ một người rất ngại nói. Nhờ đó mình vượt qua bài phỏng vấn du học của ĐH Tổng hợp Saint Petersburg (SPbU) với điểm số tuyệt đối.",
        author: "Minh Tuấn",
        role: "Du học sinh SPbU Saint Petersburg",
        badge: "Du học sinh SPbU",
        initials: "MT",
        color: "#2563eb"
      },
      {
        quote: "Tính năng Lọ từ vựng Spaced Repetition cứu cánh cho mình khi học 6 cách và động từ chuyển động. Trước đây học trước quên sau, giờ từ vựng tự động nhắc đúng thời điểm cần ôn tập, học cực kỳ nhàn mà nhớ sâu.",
        author: "Phương Anh",
        role: "Đỗ chứng chỉ ТРКИ A2 (89/100 điểm)",
        badge: "ТРКИ A2 89/100",
        initials: "PA",
        color: "#7c3aed"
      },
      {
        quote: "Bộ đề thi thử TRKI ở đây cực kỳ chuẩn cấu trúc, có đồng hồ bấm giờ và cảnh báo chống gian lận giúp rèn tâm lý phòng thi nghiêm túc. Phần giải thích ngữ pháp chi tiết từng câu sau khi nộp bài rất đáng giá.",
        author: "Đức Hải",
        role: "Sinh viên năm nhất HSE Moscow",
        badge: "Du học sinh HSE",
        initials: "ĐH",
        color: "#059669"
      },
      {
        quote: "Từ một người mất gốc tiếng Nga, nhờ phương pháp học qua bối cảnh đời sống thực tế và sự đồng hành của AI Rusika, mình đã đạt mục tiêu sang Nga học dự bị chỉ sau 4 tháng đồng hành cùng Rusi.",
        author: "Thanh Thảo",
        role: "Học viên nhận học bổng RUDN University",
        badge: "Học bổng RUDN",
        initials: "TT",
        color: "#e11d48"
      }
    ];

    let currentIndex = 0;
    let timer = null;
    const INTERVAL = 4500; // 4.5 giây tự động đổi

    track.innerHTML = feedbacks
      .map(
        (f, idx) => `
        <div class="testimonial-slide ${idx === 0 ? "active" : ""}" data-idx="${idx}">
          <div class="testimonial-badge">${esc(f.badge)}</div>
          <div class="testimonial-stars" style="display:inline-flex;gap:3px;color:#f59e0b">${Array(5).fill(window.RusiIcons ? RusiIcons.get("star", { size: 16 }) : "").join("")}</div>
          <blockquote>${esc(f.quote)}</blockquote>
          <div class="student">
            <span class="student-avatar" style="background:${f.color}">${esc(f.initials)}</span>
            <p>
              <strong>${esc(f.author)}</strong>
              <small>${esc(f.role)}</small>
            </p>
          </div>
        </div>
      `
      )
      .join("");

    if (dotsHost) {
      dotsHost.innerHTML = feedbacks
        .map(
          (_, idx) => `
          <button type="button" class="testimonial-dot ${idx === 0 ? "active" : ""}" data-idx="${idx}" aria-label="Feedback ${idx + 1}"></button>
        `
        )
        .join("");
    }

    const showSlide = (idx, animate = true) => {
      currentIndex = (idx + feedbacks.length) % feedbacks.length;
      if (track) {
        track.style.transition = animate ? "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)" : "none";
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
      track.querySelectorAll(".testimonial-slide").forEach((s, i) => {
        s.classList.toggle("active", i === currentIndex);
      });
      if (dotsHost) {
        dotsHost.querySelectorAll(".testimonial-dot").forEach((d, i) => {
          d.classList.toggle("active", i === currentIndex);
        });
      }
    };

    const nextSlide = () => showSlide(currentIndex + 1);
    const prevSlide = () => showSlide(currentIndex - 1);

    const startTimer = () => {
      stopTimer();
      timer = setInterval(nextSlide, INTERVAL);
    };

    const stopTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    if (prevBtn) {
      prevBtn.onclick = () => {
        prevSlide();
        startTimer();
      };
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        nextSlide();
        startTimer();
      };
    }

    if (dotsHost) {
      dotsHost.querySelectorAll(".testimonial-dot").forEach((d) => {
        d.onclick = () => {
          const idx = parseInt(d.dataset.idx, 10);
          showSlide(idx);
          startTimer();
        };
      });
    }

    // Thao tác kéo chuột (Desktop) và vuốt tay (Mobile/Tablet)
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let hasMoved = false;

    const onPointerDown = (clientX) => {
      stopTimer();
      isDragging = true;
      hasMoved = false;
      startX = clientX;
      currentX = clientX;
      if (track) {
        track.style.transition = "none";
        track.style.cursor = "grabbing";
      }
    };

    const onPointerMove = (clientX) => {
      if (!isDragging) return;
      currentX = clientX;
      const diffX = currentX - startX;
      if (Math.abs(diffX) > 6) {
        hasMoved = true;
      }
      if (track) {
        track.style.transition = "none";
        track.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diffX}px))`;
      }
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      if (track) {
        track.style.cursor = "grab";
      }
      const diffX = currentX - startX;
      const SWIPE_THRESHOLD = 45;
      if (hasMoved && Math.abs(diffX) >= SWIPE_THRESHOLD) {
        if (diffX < 0) {
          // Kéo sang trái -> Slide tiếp theo
          nextSlide();
        } else {
          // Kéo sang phải -> Slide trước đó
          prevSlide();
        }
      } else {
        showSlide(currentIndex, true);
      }
      startTimer();
    };

    if (slider) {
      slider.onmouseenter = stopTimer;
      slider.onmouseleave = startTimer;

      // Touch events
      slider.addEventListener("touchstart", (e) => {
        if (e.touches && e.touches[0]) {
          onPointerDown(e.touches[0].clientX);
        }
      }, { passive: true });

      slider.addEventListener("touchmove", (e) => {
        if (e.touches && e.touches[0]) {
          onPointerMove(e.touches[0].clientX);
        }
      }, { passive: true });

      slider.addEventListener("touchend", onPointerUp);
      slider.addEventListener("touchcancel", onPointerUp);

      // Mouse drag events
      slider.addEventListener("mousedown", (e) => {
        onPointerDown(e.clientX);
      });

      window.addEventListener("mousemove", (e) => {
        if (isDragging) {
          onPointerMove(e.clientX);
        }
      });

      window.addEventListener("mouseup", () => {
        if (isDragging) {
          onPointerUp();
        }
      });
    }

    startTimer();
  };

  initTestimonialCarousel();

  // YÊU CẦU: Bắt buộc đăng nhập khi click vào các bài luyện/khóa học tại trang chủ
  document.querySelectorAll(".course-btn, a[href='mock-test.html']").forEach(link => {
    link.addEventListener("click", (e) => {
      if (typeof window.isUserLoggedIn === "function" && !window.isUserLoggedIn()) {
        e.preventDefault();
        const targetHref = link.getAttribute("href") || "mock-test.html";
        if (typeof window.requireAuth === "function") {
          window.requireAuth(targetHref);
        } else {
          window.location.href = "login.html?redirect=" + encodeURIComponent(targetHref);
        }
      }
    });
  });
}
window.initIndexPage = initIndexPage;
window._initIndexPage = initIndexPage;
