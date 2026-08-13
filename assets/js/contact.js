/* お問い合わせフォーム（構築インプット v1.4 第10章準拠）
   - ラベル常時表示、エラーは項目直下に文章で表示
   - honeypot と送信間隔チェックによるスパム対策
   - 送信中の二重送信防止
   - siteConfig.contactEndpoint 設定時はAPIへPOST、未設定時はメール作成にフォールバック */

(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var config = window.siteConfig;
  var result = document.getElementById("form-result");
  var submitButton = form.querySelector(".form-submit");
  var loadedAt = Date.now();
  var sending = false;

  var setError = function (name, message) {
    var field = form.querySelector('[data-field="' + name + '"]');
    if (!field) return;
    field.classList.toggle("has-error", Boolean(message));
    var error = field.querySelector(".form-error");
    if (error && message) error.textContent = message;
  };

  var fields = form.elements;

  var validate = function () {
    var valid = true;
    var values = {
      company: fields.namedItem("company").value.trim(),
      name: fields.namedItem("name").value.trim(),
      email: fields.namedItem("email").value.trim(),
      tel: fields.namedItem("tel").value.trim(),
      subject: fields.namedItem("subject").value,
      message: fields.namedItem("message").value.trim(),
      consent: fields.namedItem("consent").checked
    };

    if (!values.name) {
      setError("name", "お名前を入力してください。");
      valid = false;
    } else setError("name", "");

    if (!values.email) {
      setError("email", "メールアドレスを入力してください。");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError("email", "メールアドレスの形式をご確認ください。");
      valid = false;
    } else setError("email", "");

    if (values.tel && !/^[0-9０-９\-ー]+$/.test(values.tel)) {
      setError("tel", "電話番号は数字とハイフンで入力してください。");
      valid = false;
    } else setError("tel", "");

    if (!values.subject) {
      setError("subject", "ご用件を選択してください。");
      valid = false;
    } else setError("subject", "");

    if (!values.message) {
      setError("message", "内容を入力してください。");
      valid = false;
    } else if (values.message.length > 2000) {
      setError("message", "内容は2000文字以内で入力してください。");
      valid = false;
    } else setError("message", "");

    if (!values.consent) {
      setError("consent", "プライバシーポリシーへの同意が必要です。");
      valid = false;
    } else setError("consent", "");

    return valid ? values : null;
  };

  var showSuccess = function () {
    form.style.display = "none";
    result.classList.add("is-shown");
    result.scrollIntoView({ block: "center" });
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (sending) return;

    /* スパム対策：honeypot が埋まっている、または表示直後の送信は受け付けない */
    if (fields.namedItem("website").value !== "" || Date.now() - loadedAt < 4000) return;

    var values = validate();
    if (!values) {
      var firstError = form.querySelector(".has-error");
      if (firstError) firstError.scrollIntoView({ block: "center" });
      return;
    }

    sending = true;
    submitButton.disabled = true;
    submitButton.textContent = "送信しています";

    if (config.contactEndpoint) {
      fetch(config.contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      })
        .then(function (res) {
          if (!res.ok) throw new Error("送信に失敗: " + res.status);
          showSuccess();
        })
        .catch(function () {
          sending = false;
          submitButton.disabled = false;
          submitButton.textContent = "送信する";
          setError("message", "送信できませんでした。時間をおいてお試しいただくか、メールでご連絡ください。");
        });
    } else {
      /* 送信API未設定の間は、入力内容を本文に整えてメールソフトを開く */
      var address = config.emailUser + "@" + config.emailDomain;
      var body = [
        "会社名・団体名：" + (values.company || "（未記入）"),
        "お名前：" + values.name,
        "メールアドレス：" + values.email,
        "電話番号：" + (values.tel || "（未記入）"),
        "ご用件：" + values.subject,
        "",
        values.message
      ].join("\n");
      window.location.href =
        "mailto:" + address +
        "?subject=" + encodeURIComponent("お問い合わせ｜" + config.companyName) +
        "&body=" + encodeURIComponent(body);
      sending = false;
      submitButton.disabled = false;
      submitButton.textContent = "送信する";
    }
  });
})();
