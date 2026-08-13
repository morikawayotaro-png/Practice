/* TRY'S コーポレートサイト 共通スクリプト */

/* 社名・連絡先・外部URLは必ずここから出力する（表記ゆれ防止／v1.2確定）。
   外部URLが未確定の項目は空文字にしておくと、リンクは自動的に非活性表示になる。 */
window.siteConfig = {
  companyName: "株式会社TRY'S",
  siteUrl: "https://trys-inc.co.jp",
  /* 収集ボット対策のため分割して保持し、表示時に組み立てる */
  contactLocal: "info",
  contactDomain: "trys-inc.co.jp",
  urls: {
    smegStories: "https://smeg-stories.com",
    /* TODO: 公開前に SMEGオンラインストアの正式URLを設定する */
    smegOnlineStore: "",
    trysStore: "" /* TRY'S STORE は準備中。開店後にURLを設定 */
  },
  /* TODO: フォーム送信APIのエンドポイント（Resend / SendGrid 等）。
     未設定の間はメールでの連絡先を案内する */
  contactEndpoint: ""
};

(function () {
  "use strict";

  var config = window.siteConfig;

  /* ---------- 社名の一元出力 ---------- */
  document.querySelectorAll("[data-company]").forEach(function (el) {
    el.textContent = config.companyName;
  });

  /* ---------- ヘッダー：スクロールで濃色に沈む ---------- */
  var header = document.getElementById("siteHeader");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- モバイルナビ ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobileNav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- フェードイン ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var faders = document.querySelectorAll(".fade");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    faders.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    faders.forEach(function (el) { io.observe(el); });
  }

  /* ---------- メールアドレスの組み立て表示 ---------- */
  var email = config.contactLocal + "@" + config.contactDomain;
  document.querySelectorAll("[data-email]").forEach(function (el) {
    el.textContent = email;
    if (el.tagName === "A") { el.href = "mailto:" + email; }
  });

  /* ---------- 外部リンク：URL未設定の間は非活性 ---------- */
  document.querySelectorAll("[data-external]").forEach(function (a) {
    var key = a.getAttribute("data-external");
    var url = config.urls[key];
    if (url) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
    } else {
      /* リンク切れのまま公開しない（v1.4 第13章-5）。
         URL設定までリンクを外し、data-pending 指定があれば「準備中」を添える */
      var span = document.createElement("span");
      span.className = a.className;
      span.innerHTML = a.innerHTML + (a.hasAttribute("data-pending") ? "（準備中）" : "");
      a.replaceWith(span);
    }
  });

  /* ---------- フッターの年 ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
