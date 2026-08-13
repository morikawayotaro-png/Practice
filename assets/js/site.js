/* TRY'S corporate site — 共通スクリプト（構築インプット v1.4 準拠） */

/* 社名・連絡先・外部リンクは必ずここから出力する（第1章 表記ルール）。
   ハードコードの重複を作らないこと。 */
window.siteConfig = {
  companyName: "株式会社TRY'S",
  siteUrl: "https://trys-inc.co.jp",
  // 収集ボット対策：メールアドレスは分割して保持し、スクリプトで組み立てる（第10章）
  emailUser: "info",
  emailDomain: "trys-inc.co.jp",
  links: {
    smegStories: "https://smeg-stories.com",
    // SMEG オンラインストアのURL。公開前に設定する。
    smegOnlineStore: "",
    // TRY'S STORE は準備中（第8章）。開店後にURLを設定するとボタンが有効になる。
    trysStore: ""
  },
  // お問い合わせフォームの送信先API（Resend / SendGrid 等のエンドポイント。第10章）。
  // 未設定の間は、送信内容を添えてメールソフトを開くフォールバックで動く。
  contactEndpoint: ""
};

(function () {
  "use strict";

  var config = window.siteConfig;

  /* ヘッダー：初期状態で背景なし、スクロールで濃色に沈む（第3章） */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* フェードイン（prefers-reduced-motion 時はCSS側で無効化される） */
  var faded = document.querySelectorAll(".fade, .cycle-svg");
  if ("IntersectionObserver" in window && faded.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    faded.forEach(function (el) { observer.observe(el); });
  } else {
    faded.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* 社名の一元出力 */
  document.querySelectorAll("[data-company-name]").forEach(function (el) {
    el.textContent = config.companyName;
  });

  /* メールアドレスの組み立て（直接記述しない） */
  var address = config.emailUser + "@" + config.emailDomain;
  document.querySelectorAll("[data-contact-email]").forEach(function (el) {
    el.textContent = address;
    if (el.tagName === "A") el.href = "mailto:" + address;
  });

  /* 外部リンクの適用。URL未設定のボタンは押せない状態にして
     リンク切れのまま公開しない（第13章 修正5） */
  var applyLink = function (selector, url) {
    document.querySelectorAll(selector).forEach(function (el) {
      if (url) {
        el.href = url;
        el.target = "_blank";
        el.rel = "noopener";
        el.classList.remove("is-pending");
      } else {
        el.classList.add("is-pending");
        el.removeAttribute("href");
        el.setAttribute("aria-disabled", "true");
      }
    });
  };
  applyLink("[data-link-smeg-stories]", config.links.smegStories);
  applyLink("[data-link-smeg-store]", config.links.smegOnlineStore);
  applyLink("[data-link-trys-store]", config.links.trysStore);
})();
