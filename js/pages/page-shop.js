/**
 * RUSI TRKI — page-shop.js
 * Phân hệ trang: initShopPage
 * Chuẩn Modular Architecture (0-Egress & Clean Code)
 */

function initShopPage() {
  const host = el("#shopHost");
  if (!host) return;
  let currentCat = "all";
  let cart = STORE.get("shop_cart", []);
  let cloudProducts = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("shop:all") : null;

  const loadCloudProducts = async () => {
    // 0-Egress rule: Bỏ qua truy vấn Supabase nếu đã có sản phẩm shop trong RAM/IndexedDB
    if (window.SHOP_PRODUCTS && window.SHOP_PRODUCTS.length > 0) return;
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.shop.getAll();
        if (remote && remote.length) {
          cloudProducts = remote;
          console.log(`[Supabase] Đã tải ${remote.length} sản phẩm shop từ Database!`);
          renderShop();
        }
      } catch (err) {
        console.warn("[Supabase] Lỗi tải sản phẩm shop từ cloud:", err);
      }
    }
  };
  loadCloudProducts();
  // Bản đã xuất bản (data/modules) — SHOP_PRODUCTS trong data.js chỉ là bản dự phòng khi chưa tải được
  if (window.RusiDataLoader) {
    window.RusiDataLoader.load("SHOP_PRODUCTS").then((d) => { if (d && d.length && !(cloudProducts && cloudProducts.length)) renderShop(); })
      .catch((err) => console.warn("[RusiDataLoader] Lỗi nạp sản phẩm:", err));
  }

  const saveCart = () => {
    STORE.set("shop_cart", cart);
    updateCartButton();
  };

  const updateCartButton = () => {
    let btn = document.getElementById("cartFloatBtn");
    const count = cart.reduce((acc, it) => acc + it.qty, 0);
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "cartFloatBtn";
      btn.className = "cart-float-btn";
      document.body.appendChild(btn);
      btn.onclick = openCartDrawer;
    }
    btn.innerHTML = `${window.RusiIcons ? RusiIcons.get("shopping-bag-shop", { size: 16 }) : ""} Giỏ hàng (<span id="cartCount">${count}</span>)`;
    btn.style.display = count > 0 ? "flex" : "none";
  };

  const renderShop = () => {
    const products = (cloudProducts && cloudProducts.length) ? cloudProducts : (typeof SHOP_PRODUCTS !== "undefined" ? SHOP_PRODUCTS : []);
    const filtered = currentCat === "all" ? products : products.filter((p) => p.category === currentCat);

    host.innerHTML = `
      <div class="shop-filters">
        <button class="tab ${currentCat === "all" ? "active" : ""}" data-c="all">Tất cả sản phẩm & dịch vụ</button>
        <button class="tab ${currentCat === "banh_keo" ? "active" : ""}" data-c="banh_keo">Bánh kẹo Nga</button>
        <button class="tab ${currentCat === "my_pham" ? "active" : ""}" data-c="my_pham">Mỹ phẩm Siberia</button>
        <button class="tab ${currentCat === "luu_niem" ? "active" : ""}" data-c="luu_niem">Quà lưu niệm Nga</button>
        <button class="tab ${currentCat === "dich_vu_du_hoc" ? "active" : ""}" data-c="dich_vu_du_hoc">Dịch vụ du học Nga</button>
      </div>

      <div class="shop-grid">
        ${filtered
          .map((p) => {
            const idVal = String(p.id ?? "");
            const hrefVal = "product-detail.html?id=" + encodeURIComponent(idVal);
            return `
          <div class="product-card shop-product-card" data-id="${esc(idVal)}" data-href="${esc(hrefVal)}" style="cursor:pointer">
            <div class="product-img-wrap">
              <img src="${esc(p.image)}" class="product-img" alt="${esc(p.title)}" />
              ${p.badge ? `<span class="product-badge">${esc(p.badge)}</span>` : ""}
            </div>
            <div class="product-body">
              <div class="product-cat">${esc(p.categoryName || p.category_name || "")}</div>
              <h3 class="product-title">
                <a href="${esc(hrefVal)}" style="color:inherit;text-decoration:none">${esc(p.title)}</a>
              </h3>
              <p class="product-desc">${esc(p.desc)}</p>
              <div class="product-pricing">
                <span class="product-price">${Number(p.price || 0).toLocaleString("vi-VN")} đ</span>
                ${p.priceRub ? `<span class="product-rub">(≈ ${esc(p.priceRub)} ₽)</span>` : ""}
                ${(p.originalPrice || p.original_price || p.priceOld) ? `<span class="product-old-price">${Number(p.originalPrice || p.original_price || p.priceOld).toLocaleString("vi-VN")} đ</span>` : ""}
              </div>
              <button class="btn btn-primary btn-sm btn-add-cart" data-id="${esc(idVal)}" style="margin-top:auto">
                ${window.RusiIcons ? RusiIcons.get("shopping-bag-shop", { size: 16 }) : ""} ${p.category === "dich_vu_du_hoc" ? "Đăng ký tư vấn" : "Thêm vào giỏ"}
              </button>
            </div>
          </div>`;
          })
          .join("")}
      </div>
    `;

    host.querySelectorAll("[data-c]").forEach((btn) => {
      btn.onclick = () => {
        currentCat = btn.dataset.c;
        renderShop();
      };
    });

    host.querySelectorAll(".shop-product-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest("a, button")) return;
        const href = card.dataset.href;
        if (href) window.location.href = href;
      });
    });

    host.querySelectorAll(".btn-add-cart").forEach((btn) => {
      btn.onclick = (e) => {
        if (e) e.stopPropagation();
        const id = btn.dataset.id;
        const item = products.find((p) => p.id === id);
        if (!item) return;
        const existing = cart.find((c) => c.id === id);
        if (existing) {
          existing.qty++;
        } else {
          cart.push({ id: item.id, title: item.title, price: item.price, image: item.image, qty: 1 });
        }
        saveCart();
        toast(`Đã thêm “${item.title.substring(0, 24)}...” vào giỏ hàng`);
      };
    });

    updateCartButton();
  };

  const openCartDrawer = () => {
    let overlay = document.getElementById("cartOverlay");
    let drawer = document.getElementById("cartDrawer");
    if (!drawer) {
      overlay = document.createElement("div");
      overlay.id = "cartOverlay";
      overlay.className = "cart-drawer-overlay";
      document.body.appendChild(overlay);

      drawer = document.createElement("div");
      drawer.id = "cartDrawer";
      drawer.className = "cart-drawer";
      document.body.appendChild(drawer);

      overlay.onclick = closeCartDrawer;
    }

    const total = cart.reduce((acc, it) => acc + it.price * it.qty, 0);

    drawer.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--border);padding-bottom:12px">
        <h3 style="margin:0;display:flex;align-items:center;gap:8px">${window.RusiIcons ? RusiIcons.get("shopping-bag-shop", { size: 20 }) : ""} Giỏ hàng của bạn</h3>
        <button class="btn btn-outline btn-sm" id="closeCartBtn" style="padding:2px 8px">&times;</button>
      </div>
      <div style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:12px">
        ${
          cart.length === 0
            ? '<p style="color:var(--muted);text-align:center;margin-top:40px">Giỏ hàng đang trống</p>'
            : cart
                .map(
                  (it) => `
            <div style="display:flex;gap:10px;align-items:center;background:var(--bg);border-radius:10px;padding:8px">
              <img src="${esc(it.image)}" style="width:54px;height:54px;object-fit:cover;border-radius:6px" alt="" />
              <div style="flex:1;min-width:0">
                <div style="font-size:0.86rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(it.title)}</div>
                <div style="font-size:0.8rem;color:var(--secondary);font-weight:700">${it.price.toLocaleString("vi-VN")} đ</div>
              </div>
              <div style="display:flex;align-items:center;gap:4px">
                <button class="btn btn-soft btn-sm btn-qty" data-id="${esc(it.id)}" data-op="-1" style="padding:2px 6px">-</button>
                <span style="font-size:0.85rem;font-weight:700;min-width:18px;text-align:center">${Number(it.qty) || 0}</span>
                <button class="btn btn-soft btn-sm btn-qty" data-id="${esc(it.id)}" data-op="1" style="padding:2px 6px">+</button>
              </div>
            </div>`
                )
                .join("")
        }
      </div>
      <div style="border-top:1px solid var(--border);padding-top:16px;margin-top:12px">
        <div style="display:flex;justify-content:space-between;margin-bottom:14px;font-size:1.1rem;font-weight:800">
          <span>Tổng thanh toán:</span>
          <span style="color:var(--secondary)">${total.toLocaleString("vi-VN")} đ</span>
        </div>
        <button class="btn btn-primary" id="btnCheckoutCart" style="width:100%" ${cart.length === 0 ? "disabled" : ""}>
          Thanh toán VietQR ngay
        </button>
      </div>
    `;

    overlay.style.display = "block";
    drawer.classList.add("open");

    document.getElementById("closeCartBtn").onclick = closeCartDrawer;

    drawer.querySelectorAll(".btn-qty").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const op = parseInt(btn.dataset.op, 10);
        const item = cart.find((c) => c.id === id);
        if (!item) return;
        item.qty += op;
        if (item.qty <= 0) {
          cart = cart.filter((c) => c.id !== id);
        }
        saveCart();
        openCartDrawer();
      };
    });

    const checkoutBtn = document.getElementById("btnCheckoutCart");
    if (checkoutBtn) {
      checkoutBtn.onclick = () => {
        closeCartDrawer();
        openCheckoutModal(total);
      };
    }
  };

  const closeCartDrawer = () => {
    const overlay = document.getElementById("cartOverlay");
    const drawer = document.getElementById("cartDrawer");
    if (overlay) overlay.style.display = "none";
    if (drawer) drawer.classList.remove("open");
  };

  const openCheckoutModal = (total) => {
    const currentUser = window.Auth && window.Auth.user;
    if (!currentUser || String(currentUser.uid || "").startsWith("guest_")) {
      if (window.Monetization && typeof window.Monetization.showAuthRequiredModal === "function") {
        window.Monetization.showAuthRequiredModal("Đăng nhập để đặt hàng", "Vui lòng đăng nhập để lưu đơn hàng và theo dõi trạng thái xác nhận trên Supabase.");
      }
      return;
    }
    let m = document.getElementById("checkoutModal");
    if (!m) {
      m = document.createElement("div");
      m.id = "checkoutModal";
      m.className = "anticheat-modal";
      document.body.appendChild(m);
    }

    let ordNum = STORE.get("last_order_num", 1092) + 1;
    STORE.set("last_order_num", ordNum);
    const orderId = "RUSI_ORD" + ordNum;
    const qrUrl = `https://img.vietqr.io/image/vietinbank-108873919999-compact2.png?amount=${total}&addInfo=${orderId}&accountName=RUSI%20TRKI%20PLATFORM`;

    m.innerHTML = `
      <div class="anticheat-modal-box" style="max-width:500px;text-align:left">
        <h3 style="margin-bottom:12px">${window.RusiIcons ? RusiIcons.get("shopping-bag-shop", { size: 20 }) : ""} Đặt Hàng & Thanh Toán VietQR</h3>
        <div style="font-size:0.85rem;color:var(--muted);margin-bottom:14px">
          Mã đơn hàng: <b style="color:var(--primary)">${esc(orderId)}</b> · Tổng tiền: <b style="color:var(--secondary)">${total.toLocaleString("vi-VN")} đ</b>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
          <input type="text" id="custName" placeholder="Họ và tên của bạn" style="padding:8px 12px;border:1px solid var(--border);border-radius:8px" />
          <input type="text" id="custPhone" placeholder="Số điện thoại nhận hàng / tư vấn" style="padding:8px 12px;border:1px solid var(--border);border-radius:8px" />
          <input type="text" id="custAddress" placeholder="Địa chỉ giao hàng (hoặc ghi KTX trường)" style="padding:8px 12px;border:1px solid var(--border);border-radius:8px" />
        </div>
        <div class="vietqr-img-box" style="text-align:center">
          <img src="${esc(qrUrl)}" style="max-width:220px;border-radius:8px" alt="VietQR" />
          <p style="font-size:0.75rem;color:var(--muted);margin-top:6px">Quét mã chuyển khoản tức thì qua ứng dụng ngân hàng</p>
        </div>
        <div style="display:flex;gap:10px;margin-top:16px">
          <button class="btn btn-outline" id="cancelCheckout" style="flex:1">Hủy</button>
          <button class="btn btn-primary" id="confirmPaidOrder" style="flex:2;background:var(--green);border-color:var(--green)">
            ${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : ""} Đã chuyển khoản xong
          </button>
        </div>
      </div>
    `;

    document.getElementById("cancelCheckout").onclick = () => m.remove();
    document.getElementById("confirmPaidOrder").onclick = async () => {
      const name = document.getElementById("custName").value.trim() || "Quý khách";
      const phone = document.getElementById("custPhone").value.trim();
      const address = document.getElementById("custAddress").value.trim();
      const button = document.getElementById("confirmPaidOrder");
      button.disabled = true;
      const result = await window.RusiSupabase?.orders?.createShopPending({
        id: orderId,
        userId: currentUser.uid,
        amount: total,
        items: cart,
        customerName: name,
        customerPhone: phone,
        deliveryAddress: address
      });
      if (!result?.ok) {
        button.disabled = false;
        toast(result?.message || "Không thể ghi nhận đơn hàng. Vui lòng thử lại.");
        return;
      }
      cart = [];
      saveCart();
      m.remove();
      toast(`Cảm ơn ${name}! Đơn hàng ${orderId} đã được ghi nhận.`);
    };
  };

  renderShop();
}

/* =====================================================================
 * BÀI KIỂM TRA XẾP LỚP TRKI 0Đ (DIAGNOSTIC PLACEMENT TEST)
 * ===================================================================== */
const DIAGNOSTIC_QUESTIONS = [
  {
    cat: "cases",
    catName: "Ngữ pháp 6 Cách",
    q: "Где вы сейчас живёте? — Мы живём в ... (Россия).",
    options: ["Россию", "России", "Россией", "Россия"],
    a: 1,
    ex: "Vị trí địa lý ở đâu (Где) đi với giới từ в + Cách 6 (Prepositional). Danh từ giống cái kết thúc bằng -ия biến đổi đuôi thành -ии (в России)."
  },
  {
    cat: "cases",
    catName: "Ngữ pháp 6 Cách",
    q: "Куда вы так спешите? — Я спешу в ... (библиотека).",
    options: ["библиотеке", "библиотекой", "библиотеку", "библиотеки"],
    a: 2,
    ex: "Chỉ phương hướng di chuyển đi tới đâu (Куда) dùng giới từ в + Cách 4 (Accusative). Danh từ giống cái đuôi -а đổi thành -у (в библиотеку)."
  },
  {
    cat: "verbs",
    catName: "Động từ & Thể",
    q: "Мой старший брат отлично ... по-русски.",
    options: ["говорят", "говорить", "говорю", "говорит"],
    a: 3,
    ex: "Chủ ngữ ngôi thứ 3 số ít (он / мой брат). Động từ nhóm 2 говорить chia ở ngôi он là говорит."
  },
  {
    cat: "cases",
    catName: "Ngữ pháp 6 Cách",
    q: "Вчера на семинаре было три новых ...",
    options: ["студента", "студент", "студентов", "студенту"],
    a: 0,
    ex: "Sau các số đếm 2, 3, 4 (два, три, четыре), danh từ đi kèm bắt buộc chia ở dạng Cách 2 số ít (три студента)."
  },
  {
    cat: "cases",
    catName: "Ngữ pháp 6 Cách",
    q: "Это ... новая тетрадь? — Да, моя.",
    options: ["твой", "твоя", "твоё", "твои"],
    a: 1,
    ex: "Тетрадь là danh từ giống cái (đuôi -дь), do đó đại từ sở hữu tương ứng phải dùng dạng giống cái (твоя тетрадь)."
  },
  {
    cat: "cases",
    catName: "Ngữ pháp 6 Cách",
    q: "Извините, сейчас у меня совсем нет ... (время).",
    options: ["время", "временем", "времени", "времена"],
    a: 2,
    ex: "Cấu trúc phủ định sở hữu 'У меня нет...' đòi hỏi danh từ ở Cách 2. Danh từ giống trung đặc biệt время biến đổi thành времени."
  },
  {
    cat: "cases",
    catName: "Ngữ pháp 6 Cách",
    q: "Антон регулярно звонит своей пожилой ... (бабушка).",
    options: ["бабушку", "бабушкой", "бабушки", "бабушке"],
    a: 3,
    ex: "Động từ звонить đòi hỏi bổ ngữ chỉ người tiếp nhận ở Cách 3 (Dative). Danh từ giống cái бабушка đổi thành бабушке."
  },
  {
    cat: "verbs",
    catName: "Động từ & Thể",
    q: "Вчера весь вечер Анна внимательно ... новую книгу.",
    options: ["читала", "прочитала", "прочитать", "читает"],
    a: 0,
    ex: "Cụm từ 'весь вечер' (cả buổi tối) chỉ quá trình hành động kéo dài trong quá khứ, bắt buộc dùng thể Chưa hoàn thành (читала)."
  },
  {
    cat: "motion",
    catName: "Động từ chuyển động",
    q: "Каждое утро дети ... в школу пешком.",
    options: ["идут", "ходят", "пошли", "ездили"],
    a: 1,
    ex: "Hành động đi bộ diễn ra thường xuyên, lặp đi lặp lại hai chiều (каждое утро) dùng động từ chuyển động vô định hướng ходить (ходят)."
  },
  {
    cat: "cases",
    catName: "Ngữ pháp 6 Cách",
    q: "По утрам я всегда пью крепкий кофе с ... (молоко).",
    options: ["молоко", "молока", "молоком", "молоке"],
    a: 2,
    ex: "Giới từ с (kèm theo, với) đòi hỏi danh từ chia ở Cách 5 (Instrumental). Danh từ giống trung молоко biến thành молоком."
  },
  {
    cat: "motion",
    catName: "Động từ chuyển động",
    q: "Поезд из Санкт-Петербурга ровно в 10 часов ... на вокзал.",
    options: ["убыл", "пробыл", "перебыл", "прибыл"],
    a: 3,
    ex: "Chuyển động đến nơi đích dùng tiền tố при- (прибыть trên tàu xe / прибыл)."
  },
  {
    cat: "verbs",
    catName: "Động từ & Thể",
    q: "Студент наконец успешно ... сложный тест за 45 минут.",
    options: ["сдал", "сдавал", "сдаст", "сдавать"],
    a: 0,
    ex: "Từ 'наконец' (cuối cùng thì) và giới từ 'за 45 минут' (trong vòng 45 phút) thể hiện kết quả hoàn tất trọn vẹn, phải dùng thể Hoàn thành (сдал)."
  },
  {
    cat: "syntax",
    catName: "Cú pháp & Cấu trúc câu",
    q: "Врач, ... мы вчера встретили в клинике, очень опытный.",
    options: ["который", "которого", "которому", "которым"],
    a: 1,
    ex: "Đại từ quan hệ который thay thế cho danh từ chỉ người sống (врач) làm tân ngữ trực tiếp cho встретили, chia theo Cách 4 giống đực sinh vật (= Cách 2: которого)."
  },
  {
    cat: "syntax",
    catName: "Cú pháp & Cấu trúc câu",
    q: "Экскурсию в Петергоф отменили из-за ... (плохая погода).",
    options: ["плохую погоду", "плохой погоде", "плохой погоды", "плохой погодой"],
    a: 2,
    ex: "Giới từ chỉ nguyên nhân tiêu cực из-за (do, bởi vì) luôn đòi hỏi danh từ và tính từ đi kèm chia ở Cách 2 (из-за плохой погоды)."
  },
  {
    cat: "syntax",
    catName: "Cú pháp & Cấu trúc câu",
    q: "Если бы у меня ... возможность, я бы обязательно поехал на Байкал.",
    options: ["было", "будет", "есть", "была"],
    a: 3,
    ex: "Trong câu giả định 'Если бы', động từ luôn chia thời quá khứ phù hợp với giống của chủ ngữ. Chủ ngữ возможность là danh từ giống cái (đuôi -ость) nên dùng была."
  }
];

window.openDiagnosticTestModal = function () {
  let modal = document.getElementById("diagTestModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "diagTestModal";
    modal.className = "diagnostic-modal-overlay";
    document.body.appendChild(modal);
  }

  let userAnswers = {};
  let totalTime = 15 * 60;
  let timerId = null;

  const closeDiagModal = () => {
    if (timerId) clearInterval(timerId);
    modal.remove();
  };

  const updateProgressStats = () => {
    const totalQ = DIAGNOSTIC_QUESTIONS.length;
    const answeredCount = Object.keys(userAnswers).length;
    const answeredChip = modal.querySelector("#diagAnsweredChip");
    if (answeredChip) answeredChip.textContent = `Đã làm: ${answeredCount}/${totalQ} câu`;
    const footerCount = modal.querySelector("#diagFooterCount");
    if (footerCount) footerCount.textContent = `${answeredCount}/${totalQ}`;
  };

  const renderExamSheet = () => {
    const totalQ = DIAGNOSTIC_QUESTIONS.length;
    const answeredCount = Object.keys(userAnswers).length;
    const m = Math.floor(totalTime / 60).toString().padStart(2, "0");
    const s = (totalTime % 60).toString().padStart(2, "0");

    modal.innerHTML = `
      <div class="diagnostic-modal-card">
        <div class="diag-modal-header">
          <div class="diag-modal-title-wrap">
            <span class="diag-modal-title">Kiểm Tra Trình Độ Tiếng Nga</span>
            <span class="diag-timer-chip" id="diagTimerDisplay">
              ${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 14 }) : ""} ${m}:${s}
            </span>
            <span class="diag-answered-chip" id="diagAnsweredChip" style="font-size:0.8rem;font-weight:700;color:var(--primary);background:var(--primary-soft);padding:3px 8px;border-radius:6px">
              Đã làm: ${answeredCount}/${totalQ} câu
            </span>
          </div>
          <button class="diag-modal-close" id="btnCloseDiag" type="button" title="Đóng">&times;</button>
        </div>

        <div class="diag-palette-bar">
          <span style="font-size:0.75rem;font-weight:700;color:var(--muted);margin-right:6px">Câu hỏi:</span>
          ${DIAGNOSTIC_QUESTIONS.map((_, idx) => {
            const isDone = typeof userAnswers[idx] === "number";
            return `
            <button type="button" class="diag-palette-pill ${isDone ? "done" : ""}" id="diagPill_${idx}" data-jump-to="${idx}" title="Chuyển đến câu ${idx + 1}">
              ${idx + 1}
            </button>`;
          }).join("")}
        </div>

        <div class="diag-modal-body" id="diagModalBody">
          <div class="diag-intro-hint" style="background:rgba(23,87,166,0.05);border:1px dashed rgba(23,87,166,0.25);border-radius:10px;padding:12px 16px;margin-bottom:20px;font-size:0.88rem;color:var(--muted)">
            <strong style="color:var(--primary)">💡 Hướng dẫn:</strong> Đề thi gồm 15 câu trắc nghiệm phân hóa. Hãy chọn đáp án chính xác nhất cho từng câu. Nhấp vào số câu ở thanh điều hướng để cuộn nhanh đến câu tương ứng.
          </div>

          <div class="diag-test-sheet">
            ${DIAGNOSTIC_QUESTIONS.map((q, idx) => {
              const isAnswered = typeof userAnswers[idx] === "number";
              return `
              <div class="diag-q-card ${isAnswered ? "is-answered" : ""}" id="diagQ_${idx}">
                <div class="diag-q-meta">
                  <div>
                    <span class="diag-q-num">Câu ${idx + 1}/${totalQ}</span>
                    <span class="diag-q-topic">${esc(q.catName)}</span>
                  </div>
                  <span class="diag-q-status" id="diagQStatus_${idx}" style="font-size:0.78rem;font-weight:700;color:${isAnswered ? "var(--green)" : "var(--muted)"}">
                    ${isAnswered ? "✓ Đã làm" : "Chưa chọn"}
                  </span>
                </div>
                <div class="diag-q-text ru">${esc(q.q)}</div>
                <div class="diag-options-grid">
                  ${q.options.map((opt, oi) => {
                    const isSelected = userAnswers[idx] === oi;
                    return `
                    <button type="button" class="diag-option-btn ${isSelected ? "selected" : ""}" data-q-idx="${idx}" data-opt-idx="${oi}">
                      <span class="diag-option-num">${String.fromCharCode(65 + oi)}</span>
                      <span class="ru">${esc(opt)}</span>
                    </button>`;
                  }).join("")}
                </div>
              </div>`;
            }).join("")}
          </div>
        </div>

        <div class="diag-modal-footer">
          <div style="font-size:0.9rem;font-weight:700;color:var(--muted)">
            Đã hoàn thành: <b id="diagFooterCount" style="color:var(--primary)">${answeredCount}/${totalQ}</b> câu
          </div>
          <button type="button" class="btn btn-primary" id="btnDiagSubmit" style="padding:10px 24px;font-weight:800;background:var(--secondary);border-color:var(--secondary)">
            ${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : ""} Hoàn thành & Nhận kết quả
          </button>
        </div>
      </div>
    `;

    document.getElementById("btnCloseDiag").onclick = closeDiagModal;

    // Smooth jump via palette pills
    modal.querySelectorAll(".diag-palette-pill").forEach(pill => {
      pill.onclick = () => {
        const jumpIdx = pill.dataset.jumpTo;
        const targetQ = modal.querySelector(`#diagQ_${jumpIdx}`);
        if (targetQ) {
          targetQ.scrollIntoView({ behavior: "smooth", block: "center" });
          targetQ.style.borderColor = "var(--primary)";
          setTimeout(() => {
            if (typeof userAnswers[jumpIdx] === "number") {
              targetQ.style.borderColor = "rgba(16, 185, 129, 0.4)";
            } else {
              targetQ.style.borderColor = "var(--border)";
            }
          }, 800);
        }
      };
    });

    // Select option handler
    modal.querySelectorAll(".diag-option-btn").forEach(btn => {
      btn.onclick = () => {
        const qIdx = parseInt(btn.dataset.qIdx, 10);
        const optIdx = parseInt(btn.dataset.optIdx, 10);
        userAnswers[qIdx] = optIdx;

        // Update card visual
        const card = modal.querySelector(`#diagQ_${qIdx}`);
        if (card) {
          card.classList.add("is-answered");
          card.querySelectorAll(".diag-option-btn").forEach(b => {
            const oi = parseInt(b.dataset.optIdx, 10);
            b.classList.toggle("selected", oi === optIdx);
          });
          const statusEl = card.querySelector(`#diagQStatus_${qIdx}`);
          if (statusEl) {
            statusEl.textContent = "✓ Đã làm";
            statusEl.style.color = "var(--green)";
          }
        }

        // Update palette pill
        const pill = modal.querySelector(`#diagPill_${qIdx}`);
        if (pill) pill.classList.add("done");

        updateProgressStats();
      };
    });

    const submitBtn = modal.querySelector("#btnDiagSubmit");
    if (submitBtn) {
      submitBtn.onclick = () => {
        const total = DIAGNOSTIC_QUESTIONS.length;
        const answered = Object.keys(userAnswers).length;
        if (answered < total) {
          const confirmSubmit = window.confirm(`Bạn mới trả lời ${answered}/${total} câu hỏi. Bạn có chắc chắn muốn nộp bài để nhận phân tích kết quả ngay không?`);
          if (!confirmSubmit) return;
        }
        renderResult();
      };
    }
  };

  const renderResult = () => {
    if (timerId) clearInterval(timerId);

    let totalCorrect = 0;
    const catStats = {
      cases: { name: "Ngữ pháp 6 Cách", correct: 0, total: 0 },
      verbs: { name: "Động từ & Thể", correct: 0, total: 0 },
      motion: { name: "Động từ chuyển động", correct: 0, total: 0 },
      syntax: { name: "Cú pháp & Cấu trúc câu", correct: 0, total: 0 }
    };

    DIAGNOSTIC_QUESTIONS.forEach((q, idx) => {
      const userChoice = userAnswers[idx];
      const isCorrect = userChoice === q.a;
      if (isCorrect) totalCorrect++;

      const groupKey = catStats[q.cat] ? q.cat : "cases";
      catStats[groupKey].total++;
      if (isCorrect) catStats[groupKey].correct++;
    });

    const totalQ = DIAGNOSTIC_QUESTIONS.length;
    const pct = Math.round((totalCorrect / totalQ) * 100);

    // Xác định trình độ dự đoán
    let estLevel = "A1 (Sơ Cấp)";
    let estBadge = "Khởi động nền tảng";
    let estDesc = "Bạn đang ở giai đoạn xây dựng nền tảng ban đầu. Vốn từ và cấu trúc 6 Cách cơ bản cần được rèn luyện thường xuyên hơn.";

    if (totalCorrect >= 13) {
      estLevel = "B1–B2 (Trung Cấp Vững Vàng)";
      estBadge = "Đạt chuẩn Du học & Thi TRKI-1";
      estDesc = "Xuất sắc! Bạn nắm rất vững hệ thống 6 Cách, biến thể động từ phức hợp và cấu trúc câu điều kiện, sẵn sàng chinh phục chứng chỉ TRKI quốc tế.";
    } else if (totalCorrect >= 8) {
      estLevel = "A2 (Cơ Bản Đang Bứt Phá)";
      estBadge = "Tiến độ bứt phá tốt";
      estDesc = "Khá tốt! Bạn đã làm chủ hầu hết các quy tắc ngữ pháp thường gặp, cần đào sâu thêm tiền tố động từ chuyển động và thể hoàn thành trong quá khứ.";
    }

    // Phân tích điểm mạnh
    const strengths = [];
    if (catStats.cases.correct >= 4) {
      strengths.push("Nắm rất chắc quy tắc biến cách danh từ và chọn đúng giới từ đi kèm trong 6 Cách.");
    } else if (catStats.cases.correct >= 2) {
      strengths.push("Nhận diện tương đối tốt các cách cơ bản (Cách 4 chỉ phương hướng, Cách 6 vị trí).");
    }

    if (catStats.verbs.correct >= 2) {
      strengths.push("Phân biệt chính xác thể động từ (quá trình kéo dài vs kết quả hoàn thành).");
    }
    if (catStats.motion.correct >= 2) {
      strengths.push("Hiểu rõ cơ chế động từ chuyển động vô định hướng / có định hướng và tiền tố chỉ hướng đến.");
    }
    if (catStats.syntax.correct >= 2) {
      strengths.push("Làm chủ cấu trúc câu phức, đại từ quan hệ который và câu giả định nếu như (если бы).");
    }
    if (strengths.length === 0) {
      strengths.push("Có khả năng tư duy và làm quen nhanh với định dạng câu hỏi trắc nghiệm tiếng Nga chuẩn.");
    }

    // Phân tích điểm yếu & Lời khuyên cải thiện
    const weaknesses = [];
    if (catStats.cases.correct < 4) {
      weaknesses.push("Cần củng cố: Danh từ biến cách đặc biệt (như thời gian 'времени'), Cách 2 phủ định và số từ đi với danh từ Cách 2 số ít.");
    }
    if (catStats.verbs.correct < 2) {
      weaknesses.push("Cần củng cố: Thể Chưa hoàn thành cho quá trình (весь вечер) so với thể Hoàn thành đạt kết quả trong khoảng thời gian (за 45 минут).");
    }
    if (catStats.motion.correct < 2) {
      weaknesses.push("Cần củng cố: Phân biệt cặp động từ chuyển động ходить / идти và ý nghĩa tiền tố chuyển động (при- đến nơi, у- rời đi).");
    }
    if (catStats.syntax.correct < 2) {
      weaknesses.push("Cần củng cố: Mệnh đề quan hệ với danh từ giống đực sinh vật (который biến thành которого), giới từ nguyên nhân tiêu cực из-за + Cách 2.");
    }
    if (weaknesses.length === 0) {
      weaknesses.push("Tiếp tục duy trì luyện tập đọc báo chí Nga, nghe bản tin thực tế và thử sức với ngân hàng 74 đề thi thật TRKI để giữ vững phong độ.");
    }

    // Kiểm tra trạng thái đăng nhập
    const currentUser = (window.Auth && window.Auth.user) || (typeof STORE !== "undefined" ? STORE.get("auth_user", null) : null);
    const isLogged = currentUser && !String(currentUser.uid || "").startsWith("guest_");

    // Lưu kết quả vào STORE
    try {
      if (typeof STORE !== "undefined") {
        STORE.set("last_diagnostic_test", {
          score: totalCorrect,
          total: totalQ,
          level: estLevel,
          pct,
          timestamp: Date.now()
        });
      }
    } catch(e) {}

    modal.innerHTML = `
      <div class="diagnostic-modal-card">
        <div class="diag-modal-header">
          <div class="diag-modal-title-wrap">
            <span class="diag-modal-title">Báo Cáo Đánh Giá Năng Lực Tiếng Nga</span>
          </div>
          <button class="diag-modal-close" id="btnCloseDiag" type="button" title="Đóng">&times;</button>
        </div>
        <div class="diag-modal-body">
          <div class="diag-result-box">
            <span class="diag-result-badge">
              ${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 14 }) : ""} ${estBadge}
            </span>
            <div class="diag-result-level">${estLevel}</div>
            <div class="diag-result-score">Kết quả bài làm: <b>${totalCorrect}/${totalQ} câu đúng (${pct}%)</b></div>

            <div class="diag-analysis-grid">
              ${Object.values(catStats).map(c => {
                const cPct = c.total > 0 ? Math.round((c.correct / c.total) * 100) : 0;
                return `
                <div class="diag-analysis-item">
                  <div class="diag-analysis-name">${esc(c.name)}</div>
                  <div class="diag-analysis-pct">${c.correct}/${c.total} câu (${cPct}%)</div>
                  <div class="diag-analysis-bar">
                    <div class="diag-analysis-fill" style="width:${cPct}%;background:${cPct >= 70 ? 'var(--green)' : cPct >= 40 ? 'var(--secondary)' : 'var(--red)'}"></div>
                  </div>
                </div>`;
              }).join("")}
            </div>

            <div class="diag-strengths-box">
              <strong>${window.RusiIcons ? RusiIcons.get("check-circle-correct", { size: 16 }) : ""} Điểm mạnh của bạn:</strong>
              <ul>
                ${strengths.map(s => `<li>${esc(s)}</li>`).join("")}
              </ul>
            </div>

            <div class="diag-weaknesses-box">
              <strong>${window.RusiIcons ? RusiIcons.get("alert-circle", { size: 16 }) : ""} Điểm yếu & Cần cải thiện:</strong>
              <ul>
                ${weaknesses.map(w => `<li>${esc(w)}</li>`).join("")}
              </ul>
            </div>

            <div class="diag-recommend-box">
              <strong style="color:var(--primary)">Chẩn đoán chuyên môn & Lộ trình đề xuất:</strong>
              <p style="margin:6px 0 0 0">${estDesc}</p>
            </div>

            <!-- CTA Mời Đăng Ký / Đăng Nhập -->
            ${!isLogged ? `
              <div class="diag-auth-cta-box">
                <div class="diag-auth-cta-title">🎉 Đăng ký / Đăng nhập để lưu kết quả & nhận lộ trình học</div>
                <p class="diag-auth-cta-desc">
                  Lưu trữ kết quả kiểm tra năng lực vào tài khoản của bạn, nhận đề xuất bài học theo chuyên đề điểm yếu và bắt đầu học tập cùng RUSI hoàn toàn miễn phí.
                </p>
                <div class="diag-auth-btns-row">
                  <button type="button" class="btn btn-primary" id="btnDiagRegister" style="padding:12px 24px;font-weight:800;background:var(--primary);border-color:var(--primary)">
                    ${window.RusiIcons ? RusiIcons.get("user", { size: 16 }) : ""} Đăng ký tài khoản miễn phí
                  </button>
                  <button type="button" class="btn btn-outline" id="btnDiagLogin" style="padding:12px 22px;font-weight:700">
                    ${window.RusiIcons ? RusiIcons.get("log-in", { size: 16 }) : ""} Đăng nhập ngay
                  </button>
                </div>
              </div>
            ` : `
              <div class="diag-auth-cta-box" style="background:rgba(16,185,129,0.08);border-color:rgba(16,185,129,0.3)">
                <div class="diag-auth-cta-title" style="color:#059669">✓ Đã lưu kết quả vào hồ sơ học tập của bạn!</div>
                <p class="diag-auth-cta-desc">
                  Hệ thống đã cập nhật năng lực dự đoán vào tài khoản học viên. Hãy tiếp tục ôn luyện để nâng cao phản xạ!
                </p>
                <div class="diag-auth-btns-row">
                  <a href="mock-test.html" class="btn btn-primary" style="padding:12px 24px;font-weight:800;text-decoration:none">
                    ${window.RusiIcons ? RusiIcons.get("graduation-cap", { size: 16 }) : ""} Vào phòng thi thử TRKI →
                  </a>
                </div>
              </div>
            `}

            <div class="diag-result-actions" style="margin-top:16px">
              <a class="btn btn-outline" href="vocabulary.html" style="text-decoration:none;padding:12px;font-weight:700">
                ${window.RusiIcons ? RusiIcons.get("archive-jar", { size: 16 }) : ""} Luyện từ vựng theo chủ đề
              </a>
              <a class="btn btn-primary" href="mock-test.html" style="text-decoration:none;padding:12px;font-weight:800;background:var(--secondary);border-color:var(--secondary)">
                ${window.RusiIcons ? RusiIcons.get("zap-xp", { size: 16 }) : ""} Luyện thi TRKI thực chiến
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("btnCloseDiag").onclick = closeDiagModal;

    const btnReg = modal.querySelector("#btnDiagRegister");
    if (btnReg) {
      btnReg.onclick = () => {
        closeDiagModal();
        if (typeof AuthModal !== "undefined" && typeof AuthModal.open === "function") {
          AuthModal.open("register");
        }
      };
    }

    const btnLogin = modal.querySelector("#btnDiagLogin");
    if (btnLogin) {
      btnLogin.onclick = () => {
        closeDiagModal();
        if (typeof AuthModal !== "undefined" && typeof AuthModal.open === "function") {
          AuthModal.open("login");
        }
      };
    }
  };

  renderExamSheet();

  timerId = setInterval(() => {
    totalTime--;
    const tEl = document.getElementById("diagTimerDisplay");
    if (tEl) {
      const m = Math.floor(totalTime / 60).toString().padStart(2, "0");
      const s = (totalTime % 60).toString().padStart(2, "0");
      tEl.innerHTML = `${window.RusiIcons ? RusiIcons.get("timer-clock", { size: 14 }) : ""} ${m}:${s}`;
    }
    if (totalTime <= 0) {
      clearInterval(timerId);
      renderResult();
    }
  }, 1000);
};
window.initShopPage = initShopPage;
window._initShopPage = initShopPage;
