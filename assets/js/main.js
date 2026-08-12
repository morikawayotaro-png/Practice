/* =========================================================
   TRY'S Inc. — main.js
   ローディング / ヘッダー / スクロール演出 / ON・OFF切替 / お問い合わせフォーム
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- loader（トップページのみ） ---------- */
  window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(function () { loader.classList.add('is-done'); }, reduceMotion ? 0 : 900);
  });

  /* ---------- header state / scroll progress ---------- */
  var header = document.getElementById('header');
  var bar = document.getElementById('scrollBar');
  var topVisual = document.querySelector('.hero, .page-hero');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var threshold = topVisual ? topVisual.offsetHeight - 90 : 120;

    if (header) header.classList.toggle('is-solid', y > threshold);

    if (bar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !nav.classList.contains('is-open')) return;
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'メニューを開く');
    document.body.classList.remove('is-locked');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      document.body.classList.toggle('is-locked', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ---------- scroll reveal ---------- */
  var targets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- ON / OFF switch（BUSINESSページ） ---------- */
  var swtch = document.querySelector('.switch');
  if (swtch) {
    var buttons = swtch.querySelectorAll('.switch__btn');
    var panels = document.querySelectorAll('.panel');

    function activate(target) {
      swtch.setAttribute('data-state', target);
      buttons.forEach(function (b) { b.classList.toggle('is-active', b.dataset.target === target); });
      panels.forEach(function (p) { p.classList.toggle('is-active', p.dataset.panel === target); });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () { activate(btn.dataset.target); });
    });

    /* index.html から #off で遷移してきた場合は OFF を開く */
    activate(location.hash === '#off' ? 'off' : 'on');
    window.addEventListener('hashchange', function () {
      if (location.hash === '#off' || location.hash === '#on') {
        activate(location.hash.slice(1));
      }
    });
  }

  /* ---------- contact form ---------- */
  /* action 属性が設定されていない間は、入力内容からメールを組み立てて送信します。
     外部フォームサービス（Formspree 等）を使う場合は <form> に action と method を追加してください。 */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (form.getAttribute('action')) return;
      e.preventDefault();

      if (!form.reportValidity()) return;

      var get = function (name) {
        var el = form.elements[name];
        return el ? el.value.trim() : '';
      };

      var subject = '【お問い合わせ】' + (get('type') || 'その他');
      var lines = [
        'お問い合わせ種別：' + get('type'),
        '会社名・団体名：' + get('company'),
        'お名前：' + get('name'),
        'メールアドレス：' + get('email'),
        '電話番号：' + get('tel'),
        '',
        'お問い合わせ内容：',
        get('body'),
        '',
        '---',
        '株式会社TRY\'S ウェブサイトのお問い合わせフォームより送信'
      ];

      window.location.href = 'mailto:morikawa@trys-inc.co.jp'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(lines.join('\n'));
    });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
