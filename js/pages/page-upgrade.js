/**
 * RUSI TRKI — page-upgrade.js
 * Phân hệ trang: initUpgradePage
 * Chuẩn Modular Architecture (0-Egress & Clean Code)
 */

function initUpgradePage() {
  const host = el("#upgradeHost");
  if (!host) return;
  const cachedPackages = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("packages:all") : null;
  if (cachedPackages && cachedPackages.length) {
    window.PACKAGES = cachedPackages;
  }

  const loadCloudPackages = async () => {
    // 0-Egress rule: Bỏ qua truy vấn Supabase nếu đã có gói cước trong RAM/IndexedDB
    if (window.PACKAGES && window.PACKAGES.length > 0) return;
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.packages.getAll();
        if (remote && remote.length) {
          window.PACKAGES = remote;
          console.log(`[Supabase] Đã tải ${remote.length} gói cước từ Database!`);
          render();
        }
      } catch (err) {
        console.warn("[Supabase] Lỗi tải gói cước từ cloud:", err);
      }
    }
  };
  loadCloudPackages();
  // Bản đã xuất bản (data/modules) — PACKAGES trong data.js chỉ là bản dự phòng khi chưa tải được
  if (window.RusiDataLoader) {
    window.RusiDataLoader.load("PACKAGES").then((d) => { if (d && d.length) render(); })
      .catch((err) => console.warn("[RusiDataLoader] Lỗi nạp gói cước:", err));
  }

  const render = () => {
    const user = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
    const isPro = typeof Monetization !== "undefined" ? Monetization.isPro() : false;
    const proInfo = typeof Monetization !== "undefined" ? Monetization.getProInfo() : null;
    const pkgs = typeof Monetization !== "undefined" ? Monetization.getPackages() : (typeof PACKAGES !== "undefined" ? PACKAGES : []);

    // Tạo phần hiển thị trạng thái học viên (User Strip)
    let userStripHtml = "";
    const isGuest = user && (String(user.id || user.uid || "").startsWith("guest_") || user.isGuest);
    if (user && !isGuest) {
      const initials = (user.name || user.email || "?")
        .split(/\s+/)
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
      const avatar = user.photo
        ? `<img src="${esc(user.photo)}" alt="" referrerpolicy="no-referrer" />`
        : initials;

      userStripHtml = `
      <div class="upgrade-user-strip">
        <div class="upgrade-user-info">
          <div class="user-avatar-small">${avatar}</div>
          <div>
            <div class="upgrade-user-name">
              <span>Học viên:</span> <b>${esc(user.name || "Bạn")}</b>
            </div>
            <div class="upgrade-user-tier">
              Cấp độ tài khoản: ${isPro ? `<span class="user-tier-badge tier-pro">PRO</span>` : `<span class="user-tier-badge tier-free">Miễn phí</span>`}
            </div>
          </div>
        </div>

        ${isPro ? `
          <div class="upgrade-pro-active-box" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <span>${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Gói đang dùng: <b>${esc(proInfo ? proInfo.pkgTitle : "PRO")}</b> (${esc((proInfo && proInfo.expiresFormatted) || "Đang kích hoạt")})</span>
            <button type="button" class="btn btn-sm btn-outline" id="btnUpgradeManagePro" style="min-height:44px">Quản lý gói</button>
          </div>
        ` : `
          <div class="upgrade-discount-countdown">
            ${window.RusiIcons ? RusiIcons.get("flame-streak", { size: 16 }) : ""} Ưu đãi 50% dành riêng cho tài khoản của bạn hôm nay
          </div>
        `}
      </div>`;
    } else {
      userStripHtml = `
      <div class="upgrade-user-strip" style="background:linear-gradient(135deg, rgba(37,99,235,0.06), rgba(245,158,11,0.06));border:1px solid rgba(37,99,235,0.15)">
        <div class="upgrade-user-info">
          <div class="user-avatar-small" style="background:var(--primary);color:#fff">${window.RusiIcons ? RusiIcons.get("user-avatar-default", { size: 16 }) : "Я"}</div>
          <div>
            <div class="upgrade-user-name">
              <span>Khách vãng lai:</span> <b>Bạn chưa đăng nhập</b>
            </div>
            <div class="upgrade-user-tier" style="font-size:0.84rem;color:var(--muted)">
              Đăng nhập để đồng bộ tiến độ luyện thi và gắn quyền PRO vĩnh viễn vào tài khoản
            </div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <a class="btn btn-sm btn-primary" href="login.html?redirect=upgrade.html" style="text-decoration:none;font-weight:700">Đăng nhập</a>
          <a class="btn btn-sm btn-outline" href="signup.html?redirect=upgrade.html" style="text-decoration:none">Đăng ký</a>
        </div>
      </div>`;
    }

    host.innerHTML = `
      <!-- HERO SECTION -->
      <div class="upgrade-hero">
        <span class="upgrade-kicker">BẢNG GIÁ DỊCH VỤ & GÓI HỌC VIÊN PRO</span>
        <h1>Mở Khóa Toàn Diện — Bứt Phá Chứng Chỉ TRKI</h1>
        <p>Đầu tư thông minh một lần, đồng hành trọn vẹn suốt quá trình luyện thi chứng chỉ ТРКИ và chinh phục học bổng du học Liên bang Nga.</p>
      </div>

      <!-- USER STRIP -->
      ${userStripHtml}

      <!-- PRICING CARDS GRID -->
      <div class="pricing-grid" style="margin-bottom:60px">
        ${pkgs.map((pkg) => {
          const isCurrent = isPro && proInfo && (pkg.id || "").toLowerCase() === (proInfo.pkgId || "").toLowerCase();
          // PRO trọn đời: không cần mua/gia hạn → ẩn nút "Kích hoạt ngay" (chỉ giao diện, không đổi logic thanh toán)
          const hideBuy = Boolean(isPro && proInfo && proInfo.isLifetime);
          return `
          <div class="pricing-card ${pkg.popular ? "popular" : ""} ${isCurrent ? "is-current" : ""}">
            ${isCurrent ? `<div class="pricing-current-badge">GÓI ĐANG DÙNG</div>` : (pkg.popular ? `<div class="pricing-popular-badge" style="display:inline-flex;align-items:center;gap:5px">${window.RusiIcons ? RusiIcons.get("sparkles-clean", { size: 13 }) : ""} PHỔ BIẾN NHẤT</div>` : (pkg.id === "pro_1y" ? `<div class="pricing-popular-badge" style="background:linear-gradient(135deg, #10b981, #059669);display:inline-flex;align-items:center;gap:5px">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 13 }) : ""} GIÁ TRỊ CAO NHẤT</div>` : "")) }
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
            ${isCurrent ? `
              <button class="btn btn-outline" disabled style="width:100%;background:rgba(16,185,129,0.1);color:#059669;border-color:#10b981;cursor:default;font-weight:800">
                ${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} Gói bạn đang sử dụng
              </button>
            ` : hideBuy ? "" : `
              <button class="btn ${pkg.popular ? "btn-primary" : "btn-outline"} btn-select-upgrade" data-pkg="${pkg.id}" style="width:100%;${pkg.popular ? "background:var(--secondary);border-color:var(--secondary);color:#fff" : ""}">
                ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} Kích hoạt ngay
              </button>
            `}
          </div>`;
        }).join("")}
      </div>

      <!-- BẢNG SO SÁNH CHI TIẾT TÍNH NĂNG (CHUẨN RUSI FREE VS PRO) -->
      <section class="comparison-section">
        <div class="comparison-heading">
          <span class="section-kicker">SO SÁNH QUYỀN LỢI</span>
          <h2>So Sánh Gói Miễn Phí & Gói PRO</h2>
          <p>Tối giản, minh bạch và làm nổi bật giá trị bứt phá của Hội viên PRO</p>
        </div>

        <div class="comparison-table-wrap">
          <table class="comparison-table">
            <thead>
              <tr>
                <th class="col-feature">Nội dung & Tính năng</th>
                <th class="col-free">Tài khoản Miễn phí</th>
                <th class="col-pro">
                  <div class="pro-col-header">
                    <span class="pro-crown">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 14 }) : ""}</span>
                    <span>Đặc Quyền PRO</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="col-feature"><b>Ngân hàng đề thi TRKI</b></td>
                <td class="col-free" data-label="Miễn phí">1 đề mẫu A1/A2</td>
                <td class="col-pro" data-label="Đặc quyền PRO"><b>Toàn bộ 89+ đề thi</b> (6.680+ câu hỏi A1–C2)</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Đáp án & Giải thích chi tiết</b></td>
                <td class="col-free" data-label="Miễn phí">Chỉ xem điểm tổng</td>
                <td class="col-pro" data-label="Đặc quyền PRO"><b>Chi tiết từng câu</b> & ngữ pháp 6 Cách</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Luyện nghe 4 Part CEFR</b></td>
                <td class="col-free" data-label="Miễn phí">Nghe thử Part 1</td>
                <td class="col-pro" data-label="Đặc quyền PRO"><b>Trọn bộ 4 Part</b> kèm transcript song ngữ</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Luyện nói Shadowing cùng AI</b></td>
                <td class="col-free" data-label="Miễn phí">2 lượt thử/ngày</td>
                <td class="col-pro" data-label="Đặc quyền PRO"><b>Toàn bộ 28 bài học</b>, AI chấm âm vị bản xứ</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Chấm bài Viết (Письмо)</b></td>
                <td class="col-free" data-label="Miễn phí">1 bài mẫu</td>
                <td class="col-pro" data-label="Đặc quyền PRO"><b>11 đề viết</b>, AI chấm theo 4 chuẩn TRKI</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Kho Lọ từ vựng Spaced Repetition</b></td>
                <td class="col-free" data-label="Miễn phí">2 lọ cơ bản</td>
                <td class="col-pro" data-label="Đặc quyền PRO"><b>33 lọ hệ thống</b> (5.000+ từ) & vô hạn lọ cá nhân</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Phòng thi CBT & Đảo đề</b></td>
                <td class="col-free" data-label="Miễn phí">Cố định đáp án</td>
                <td class="col-pro" data-label="Đặc quyền PRO"><b>Bấm giờ thi thật</b> & tự động đảo đáp án</td>
              </tr>
              <tr>
                <td class="col-feature"><b>Hỗ trợ học thuật & Tài liệu</b></td>
                <td class="col-free" data-label="Miễn phí"><span style="color:var(--muted)">Không hỗ trợ</span></td>
                <td class="col-pro" data-label="Đặc quyền PRO"><b style="color:#059669">✓ Ưu tiên 1-1</b> & Sổ tay du học Nga</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- QUY TRÌNH 3 BƯỚC THANH TOÁN VIETQR -->
      <section class="steps-section">
        <div style="text-align:center">
          <span class="section-kicker">KÍCH HOẠT SAU ĐỐI SOÁT</span>
          <h2 style="font-size:1.6rem;font-weight:800;color:var(--text);margin-bottom:6px">Quy Trình 3 Bước Kích Hoạt PRO</h2>
          <p style="color:var(--muted);font-size:0.92rem">Chuyển khoản đúng nội dung để được kích hoạt nhanh nhất.</p>
        </div>

        <div class="steps-grid">
          <div class="step-card">
            <span class="step-num step-card-num">01</span>
            <div class="step-icon">${window.RusiIcons ? RusiIcons.get("target", { size: 28 }) : ""}</div>
            <div class="step-title">Chọn Gói Cước</div>
            <div class="step-desc">Chọn gói 1 Tháng, 3 Tháng hoặc 1 Năm phù hợp nhất với mục tiêu học tập của bạn.</div>
          </div>
          <div class="step-card">
            <span class="step-num step-card-num">02</span>
            <div class="step-icon">${window.RusiIcons ? RusiIcons.get("qr-code-vietqr", { size: 28 }) : ""}</div>
            <div class="step-title">Quét Mã VietQR</div>
            <div class="step-desc">Mở app Mobile Banking bất kỳ, quét mã VietQR tự động điền sẵn số tài khoản và cú pháp.</div>
          </div>
          <div class="step-card">
            <span class="step-num step-card-num">03</span>
            <div class="step-icon">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 28 }) : ""}</div>
            <div class="step-title">Mở Khóa PRO</div>
            <div class="step-desc">Đội ngũ RUSI đối soát giao dịch và kích hoạt tài khoản PRO trong giờ làm việc.</div>
          </div>
        </div>
      </section>

      <!-- CAM KẾT & ĐẢM BẢO -->
      <div class="guarantees-grid">
        <div class="guarantee-card">
          <div class="guarantee-icon">${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 28 }) : ""}</div>
          <div class="guarantee-title">Kích Hoạt Nhanh</div>
          <div class="guarantee-desc">Kích hoạt sau khi đối soát, trong giờ làm việc.</div>
        </div>
        <div class="guarantee-card">
          <div class="guarantee-icon">${window.RusiIcons ? RusiIcons.get("shield-anti-cheat", { size: 28 }) : ""}</div>
          <div class="guarantee-title">An Toàn Tuyệt Đối</div>
          <div class="guarantee-desc">Cổng VietinBank chuẩn bảo mật liên ngân hàng NAPAS.</div>
        </div>
        <div class="guarantee-card">
          <div class="guarantee-icon">${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 28 }) : ""}</div>
          <div class="guarantee-title">Hỗ Trợ 1-1</div>
          <div class="guarantee-desc">Giảng viên và cựu du học sinh Nga trực tiếp đồng hành.</div>
        </div>
        <div class="guarantee-card">
          <div class="guarantee-icon">${window.RusiIcons ? RusiIcons.get("crown-vip", { size: 28 }) : ""}</div>
          <div class="guarantee-title">Bảo Lưu Trọn Đời</div>
          <div class="guarantee-desc">Tiến độ học tập và quyền PRO luôn được gắn với email của bạn.</div>
        </div>
      </div>

      <!-- FAQ ACCORDION -->
      <section style="margin:60px 0">
        <div style="text-align:center;margin-bottom:30px">
          <span class="section-kicker">HỎI ĐÁP</span>
          <h2 style="font-size:1.6rem;font-weight:800;color:var(--text);margin-bottom:6px">Câu Hỏi Thường Gặp Về Gói PRO</h2>
        </div>
        <div class="faq-list" style="max-width:760px;margin:0 auto">
          <div class="faq-item">
            <button type="button">
              <span>Thanh toán xong thì bao lâu tài khoản được kích hoạt?</span>
              <i>+</i>
            </button>
            <div class="faq-answer">
              <p>Sau khi bạn quét mã VietQR và hoàn tất chuyển khoản đúng nội dung, đội ngũ RUSI sẽ đối soát giao dịch và kích hoạt tài khoản PRO trong giờ làm việc.</p>
            </div>
          </div>
          <div class="faq-item">
            <button type="button">
              <span>Tôi có thể học trên nhiều thiết bị (điện thoại, máy tính) không?</span>
              <i>+</i>
            </button>
            <div class="faq-answer">
              <p>Có! Quyền lợi PRO và toàn bộ lịch sử thi thử, chuỗi Streak, lọ từ vựng cá nhân được gắn cố định vào tài khoản email của bạn. Bạn có thể đăng nhập trên máy tính xách tay, điện thoại hay iPad và dữ liệu luôn được đồng bộ mượt mà.</p>
            </div>
          </div>
          <div class="faq-item">
            <button type="button">
              <span>Nên chọn gói 1 Tháng, 3 Tháng hay 1 Năm?</span>
              <i>+</i>
            </button>
            <div class="faq-answer">
              <p>• <b>Gói 1 Tháng (399.000đ)</b>: Phù hợp nhất cho học viên ôn thi nước rút trong 2–4 tuần trước ngày thi thật.<br/>• <b>Gói 3 Tháng (899.000đ - Tiết kiệm 25%)</b>: Lựa chọn phổ biến nhất để hoàn thành trọn vẹn 1 cấp độ (A1→A2 hoặc A2→B1) hoặc ôn thi học phần đại học.<br/>• <b>Gói 1 Năm (1.899.000đ - Tiết kiệm 60%)</b>: Đồng hành trọn vẹn 1 năm Khoa dự bị (Подфак) tại Nga hoặc cả năm học chuyên ngành đại học, hỗ trợ chấm bài viết luận AI 20 lượt mỗi ngày.</p>
            </div>
          </div>
          <div class="faq-item">
            <button type="button">
              <span>Nếu tôi chuyển khoản sai cú pháp thì xử lý thế nào?</span>
              <i>+</i>
            </button>
            <div class="faq-answer">
              <p>Đừng lo lắng! Đội ngũ Admin và cựu du học sinh RUSI luôn túc trực hỗ trợ 24/7. Bạn chỉ cần gửi ảnh chụp biên lai qua nhóm Zalo VIP hoặc Fanpage để được kích hoạt thủ công trong 5 phút.</p>
            </div>
          </div>
          <div class="faq-item">
            <button type="button">
              <span>Tài khoản PRO có được tự động cập nhật khi có thêm đề thi mới không?</span>
              <i>+</i>
            </button>
            <div class="faq-answer">
              <p>Có! Trong suốt thời gian hiệu lực của gói, bạn được tự động cập nhật 100% các bộ đề thi mới, bài luyện nói, lọ từ vựng và tính năng nâng cấp của RUSI TRKI mà không phải trả thêm bất kỳ chi phí nào.</p>
            </div>
          </div>
          <div class="faq-item">
            <button type="button">
              <span>Người mới bắt đầu học tiếng Nga (A0 - A1) có nên dùng gói PRO không?</span>
              <i>+</i>
            </button>
            <div class="faq-answer">
              <p>Rất nên! Lộ trình RUSI TRKI phân cấp rõ ràng từ A1 đến B2. Học viên mới sẽ được luyện phát âm Shadowing từ cơ bản, tích lũy từ vựng qua Lọ từ thông minh SM-2 và làm quen cấu trúc đề thi sơ cấp kèm giải thích chi tiết bằng tiếng Việt.</p>
            </div>
          </div>
          <div class="faq-item">
            <button type="button">
              <span>Tôi có thể gia hạn hoặc nâng cấp lên gói dài hạn hơn bất kỳ lúc nào không?</span>
              <i>+</i>
            </button>
            <div class="faq-answer">
              <p>Hoàn toàn được! Bạn có thể gia hạn hoặc nâng cấp gói bất cứ khi nào. Thời hạn còn lại của gói cũ sẽ được hệ thống tự động cộng dồn nối tiếp vào gói mới, bảo lưu toàn vẹn quyền lợi và chuỗi tiến độ học tập của bạn.</p>
            </div>
          </div>
        </div>
      </section>
    `;

    // Gắn sự kiện chọn gói cước mở VietQR
    host.querySelectorAll(".btn-select-upgrade").forEach((btn) => {
      btn.onclick = () => {
        const pkgId = btn.dataset.pkg;
        const currentUser = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
        if (!currentUser && typeof Monetization !== "undefined") {
          Monetization.showAuthRequiredModal("Đăng nhập để Nâng cấp PRO", "Vui lòng đăng nhập để gắn quyền PRO vào tài khoản và bảo lưu quyền lợi trọn đời.", pkgId);
          return;
        }
        if (typeof Monetization !== "undefined") {
          Monetization.openUpgradeModal(pkgId);
        }
      };
    });

    // Id riêng: #btnManageUpgradePage là link trong modal Quản lý gói (app.js) — trùng id sẽ làm modal bắt nhầm nút
    const manageBtn = host.querySelector("#btnUpgradeManagePro");
    if (manageBtn) {
      manageBtn.onclick = () => {
        if (typeof Monetization !== "undefined") {
          Monetization.openManageModal();
        }
      };
    }

    // Tương tác Accordion FAQ
    host.querySelectorAll(".faq-item button").forEach((btn) => {
      btn.onclick = () => {
        const item = btn.closest(".faq-item");
        const wasOpen = item.classList.contains("faq-open");
        host.querySelectorAll(".faq-item").forEach((el) => {
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
  };

  render();

  // Tự động mở modal VietQR nếu có query param ?pkg=... sau khi đăng nhập chuyển hướng về
  let pkgAutoOpened = false;
  const checkAutoOpenPkg = () => {
    if (pkgAutoOpened) return;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const targetPkg = urlParams.get("pkg");
      const currentUser = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
      const isGuest = currentUser && (String(currentUser.id || currentUser.uid || "").startsWith("guest_") || currentUser.isGuest);
      if (targetPkg && currentUser && !isGuest && typeof Monetization !== "undefined") {
        pkgAutoOpened = true;
        setTimeout(() => {
          Monetization.openUpgradeModal(targetPkg);
          if (window.history && window.history.replaceState) {
            const cleanUrl = window.location.pathname + (window.location.hash || "");
            window.history.replaceState({}, document.title, cleanUrl);
          }
        }, 350);
      }
    } catch (_) {}
  };
  checkAutoOpenPkg();

  // Lắng nghe sự kiện Auth và PRO để re-render tự động
  if (window.Auth && typeof window.Auth.onChange === "function") {
    window.Auth.onChange(() => {
      render();
      checkAutoOpenPkg();
    });
  }
  window.addEventListener("trki:pro-updated", () => render());
}
window.initUpgradePage = initUpgradePage;
window.initUpgradePage = initUpgradePage;
window._initUpgradePage = initUpgradePage;
