/* お問い合わせフォーム（v1.1 第10章の仕様）
   - ラベル常時表示、エラーは項目直下に文章で表示
   - honeypot と送信間隔チェックによるスパム対策
   - 送信中の二重送信防止
   - 送信先APIは siteConfig.contactEndpoint（未設定の間はメール連絡先を案内） */
(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form) { return; }

  var config = window.siteConfig;
  var result = document.getElementById("formResult");
  var globalError = document.getElementById("formGlobalError");
  var submitBtn = document.getElementById("submitBtn");
  var openedAt = Date.now();
  var sending = false;

  function fieldWrap(el) {
    var node = el;
    while (node && !node.classList.contains("form-field")) { node = node.parentElement; }
    return node;
  }

  function setError(el, hasError) {
    var wrap = fieldWrap(el);
    if (wrap) { wrap.classList.toggle("has-error", hasError); }
    return !hasError;
  }

  function validate() {
    var ok = true;
    var name = form.elements.name;
    var email = form.elements.email;
    var tel = form.elements.tel;
    var subject = form.elements.subject;
    var body = form.elements.body;
    var consent = form.elements.consent;

    ok = setError(name, name.value.trim() === "") && ok;
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    ok = setError(email, !emailOk) && ok;
    var telOk = tel.value === "" || /^[0-9\-]+$/.test(tel.value.trim());
    ok = setError(tel, !telOk) && ok;
    ok = setError(subject, subject.value === "") && ok;
    var bodyOk = body.value.trim() !== "" && body.value.length <= 2000;
    ok = setError(body, !bodyOk) && ok;
    ok = setError(consent, !consent.checked) && ok;
    return ok;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (sending) { return; }
    globalError.style.display = "none";

    if (!validate()) {
      var first = form.querySelector(".has-error input, .has-error select, .has-error textarea");
      if (first) { first.focus(); }
      return;
    }

    /* スパム対策：honeypot入力あり、または開いてから3秒未満の送信は受け付けない */
    if (form.elements.website.value !== "" || Date.now() - openedAt < 3000) {
      return;
    }

    var email = config.contactLocal + "@" + config.contactDomain;

    if (!config.contactEndpoint) {
      /* TODO: 公開前に siteConfig.contactEndpoint（Resend / SendGrid 等）を設定する。
         未設定の間はメールでの連絡を案内する */
      globalError.textContent = "送信の準備中です。お手数ですが " + email + " までメールでご連絡ください。";
      globalError.style.display = "block";
      return;
    }

    sending = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "送信しています";

    var payload = {
      organization: form.elements.organization.value.trim(),
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      tel: form.elements.tel.value.trim(),
      subject: form.elements.subject.value,
      body: form.elements.body.value.trim()
    };

    fetch(config.contactEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) { throw new Error("send failed"); }
        form.style.display = "none";
        result.classList.add("is-shown");
        result.focus();
      })
      .catch(function () {
        globalError.textContent = "送信できませんでした。時間をおいて再度お試しいただくか、" + email + " までご連絡ください。";
        globalError.style.display = "block";
      })
      .then(function () {
        sending = false;
        submitBtn.disabled = false;
        submitBtn.textContent = "送信する";
      });
  });
})();
