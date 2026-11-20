/**
 * RUSI TRKI — page-blog.js
 * Phân hệ trang: initBlogPage
 * Chuẩn Modular Architecture (0-Egress & Clean Code)
 */

function initBlogPage() {
  const host = el("#blogHost");
  let selectedCategory = "all";
  let cloudPosts = (window.RusiSupabase && window.RusiSupabase.cache) ? window.RusiSupabase.cache.get("blog:all") : null;

  const loadCloudPosts = async () => {
    // 0-Egress rule: Bỏ qua truy vấn Supabase nếu đã có bài blog trong RAM/IndexedDB
    if (window.BLOG_POSTS && window.BLOG_POSTS.length > 0) return;
    if (window.RusiSupabase && typeof window.RusiSupabase.isReady === "function" && window.RusiSupabase.isReady()) {
      try {
        const remote = await window.RusiSupabase.blog.getAll();
        if (remote && remote.length) {
          cloudPosts = remote;
          console.log(`[Supabase] Đã tải ${remote.length} bài blog từ Database!`);
          renderBlog();
        }
      } catch (err) {
        console.warn("[Supabase] Lỗi tải bài blog từ cloud:", err);
      }
    }
  };
  loadCloudPosts();

  const renderBlog = () => {
    const posts = (cloudPosts && cloudPosts.length) ? cloudPosts : (typeof BLOG_POSTS !== "undefined" ? BLOG_POSTS : []);
    const filtered = selectedCategory === "all" ? posts : posts.filter((p) => p.category === selectedCategory);

    host.innerHTML = `
      <div class="shop-filters">
        <button class="tab ${selectedCategory === "all" ? "active" : ""}" data-c="all">Tất cả bài viết</button>
        <button class="tab ${selectedCategory === "du_hoc_trai_nghiem" ? "active" : ""}" data-c="du_hoc_trai_nghiem">Trải nghiệm du học & KTX</button>
        <button class="tab ${selectedCategory === "luat_cu_tru" ? "active" : ""}" data-c="luat_cu_tru">Luật cư trú & Thẻ ngân hàng Mir</button>
        <button class="tab ${selectedCategory === "ngu_phap" ? "active" : ""}" data-c="ngu_phap">Thành ngữ & Ngữ pháp Nga</button>
        <button class="tab ${selectedCategory === "hoc_bong_du_hoc" ? "active" : ""}" data-c="hoc_bong_du_hoc">Học bổng Du học Nga</button>
      </div>

      <div class="shop-grid">
        ${filtered
          .map(
            (p, i) => `
          <article class="product-card blog-card" data-slug="${p.slug || i}" onclick="window.location.href='blog-post.html?slug=' + encodeURIComponent('${p.slug || i}')" style="cursor:pointer">
            <div class="product-img-wrap">
              <img src="${esc(p.cover || "assets/red-square.jpg")}" class="product-img" alt="${esc(p.title)}" />
              <span class="product-badge">${esc(p.categoryName || "Du học")}</span>
            </div>
            <div class="product-body">
              <div class="product-cat">${esc(p.date || "")} · ${esc(p.readTime || "5 phút đọc")}</div>
              <h3 class="product-title" style="font-size:1.05rem">
                <a href="blog-post.html?slug=${encodeURIComponent(p.slug || i)}" style="color:inherit;text-decoration:none">${esc(p.title)}</a>
              </h3>
              <p class="product-desc">${esc(p.excerpt)}</p>
              <a href="blog-post.html?slug=${encodeURIComponent(p.slug || i)}" class="btn btn-primary btn-sm btn-read-post" style="margin-top:auto;text-decoration:none">
                Đọc bài viết →
              </a>
            </div>
          </article>`
          )
          .join("")}
      </div>
    `;

    host.querySelectorAll("[data-c]").forEach((btn) => {
      btn.onclick = () => {
        selectedCategory = btn.dataset.c;
        renderBlog();
      };
    });

    host.querySelectorAll(".btn-read-post").forEach((btn) => {
      btn.onclick = () => {
        const slug = btn.dataset.slug;
        const post = posts.find((p) => p.slug === slug || String(posts.indexOf(p)) === slug);
        if (post) showArticleModal(post);
      };
    });
  };

  const showArticleModal = (post) => {
    let m = document.getElementById("articleModal");
    if (!m) {
      m = document.createElement("div");
      m.id = "articleModal";
      m.className = "anticheat-modal";
      document.body.appendChild(m);
    }
    m.innerHTML = `
      <div class="anticheat-modal-box bpost-modal-content" style="max-width:960px;width:min(94vw, 960px);text-align:left;max-height:88vh;overflow-y:auto;border-top-color:var(--primary);padding:32px 36px;border-radius:20px;">
        <div style="display:flex;justify-content:space-between;align-items:start">
          <span class="pro-chip">${esc(post.categoryName || "CẨM NANG DU HỌC")}</span>
          <button class="btn btn-outline btn-sm" id="closeArticle" style="padding:4px 12px;display:inline-flex;align-items:center;gap:6px">${window.RusiIcons ? RusiIcons.get("x", { size: 16 }) : "&times;"} Đóng</button>
        </div>
        <h2 style="margin:16px 0 8px;font-size:1.85rem;line-height:1.35">${esc(post.title)}</h2>
        <div style="color:var(--muted);font-size:0.88rem;margin-bottom:18px">
          Tác giả: <b>${esc(post.author || "RUSI Editorial")}</b> · Ngày: ${esc(post.date || "")}
        </div>
        ${post.cover ? `<img src="${esc(post.cover)}" style="width:100%;max-height:360px;object-fit:cover;border-radius:14px;margin-bottom:20px" alt="" />` : ""}
        <div class="rusi-md-rendered" style="line-height:1.85;font-size:1.05rem;color:var(--text)">
          ${window.RusiMarkdown && typeof window.RusiMarkdown.render === "function" ? window.RusiMarkdown.render(post.content || post.excerpt) : `<p style="white-space:pre-line">${esc(post.content || post.excerpt)}</p>`}
        </div>
        <div style="background:var(--primary-soft);border-radius:10px;padding:16px;margin-top:24px;text-align:center">
          <h4>Chuẩn bị hành trang chứng chỉ tiếng Nga cùng RUSI</h4>
          <p style="font-size:0.88rem;color:var(--muted);margin:6px 0 14px">Luyện đề thi thử TRKI miễn phí hoặc nâng cấp gói PRO để được AI Rusika đồng hành.</p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
            <a class="btn btn-primary btn-sm" href="mock-test.html">Làm đề thi thử TRKI</a>
            <button class="btn btn-outline btn-sm" onclick="Monetization.openUpgradeModal()">Nâng cấp PRO</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById("closeArticle").onclick = () => m.remove();
  };

  renderBlog();
}
window.initBlogPage = initBlogPage;
window._initBlogPage = initBlogPage;
