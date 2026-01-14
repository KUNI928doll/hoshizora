(() => {
  "use strict";

  /**
   * 安全に要素を取得（存在しない場合はnull）
   * @param {string} selector
   * @param {ParentNode} [root=document]
   */
  const $ = (selector, root = document) => root.querySelector(selector);

  /**
   * 安全に要素を複数取得
   * @param {string} selector
   * @param {ParentNode} [root=document]
   */
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function init() {
    // Drawer (hamburger) menu
    const toggle = $(".l-header__toggle");
    const drawer = $("#drawer");
    const overlay = $("[data-drawer-overlay]");
    const closeBtn = $("[data-drawer-close]");

    const openDrawer = () => {
      if (!toggle || !drawer) return;
      document.documentElement.classList.add("is-drawerOpen");
      toggle.setAttribute("aria-expanded", "true");
      drawer.setAttribute("aria-hidden", "false");
    };

    const closeDrawer = () => {
      if (!toggle || !drawer) return;
      document.documentElement.classList.remove("is-drawerOpen");
      toggle.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
    };

    if (toggle && drawer) {
      toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        if (isOpen) closeDrawer();
        else openDrawer();
      });

      closeBtn?.addEventListener("click", closeDrawer);
      overlay?.addEventListener("click", closeDrawer);

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeDrawer();
      });

      // ドロワー内リンクを押したら閉じる
      $$(".l-header__drawer a.js-scroll").forEach((a) => {
        a.addEventListener("click", () => closeDrawer());
      });

      // 画面がlg以上になったら強制的に閉じる（状態ズレ防止）
      const mqLg = window.matchMedia("(min-width: 1024px)");
      mqLg.addEventListener("change", (e) => {
        if (e.matches) closeDrawer();
      });
    }

    // ここに初期化処理を追加していく（要素が無い場合は何もしない）
    // 例: スムーススクロール（href="#..." のリンクだけ）
    $$(".js-scroll").forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href") || "";
        if (!href.startsWith("#")) return;

        const target = $(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    // 例: フッターに西暦を入れる（<span class="js-year"></span>）
    const yearEl = $(".js-year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();


