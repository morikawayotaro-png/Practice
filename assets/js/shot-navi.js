/* Shot Navi 製品一覧の描画。
   製品情報は data/shot-navi-products.json を唯一の出典とし、
   差し替えだけで更新できるようにする（構築インプット v1.4 第4-6章）。 */

(function () {
  "use strict";

  var container = document.getElementById("product-list");
  if (!container) return;

  var yen = function (price) {
    return price.toLocaleString("ja-JP") + "円";
  };

  fetch(container.dataset.src)
    .then(function (res) {
      if (!res.ok) throw new Error("製品データの取得に失敗: " + res.status);
      return res.json();
    })
    .then(function (data) {
      var fragment = document.createDocumentFragment();

      data.products.forEach(function (product) {
        var article = document.createElement("article");
        article.className = "product fade";

        var plate = document.createElement("div");
        plate.className = "product-plate";
        plate.setAttribute("role", "img");
        plate.setAttribute("aria-label", product.name + " 製品写真");
        /* 公式の黒背景素材は背景をアイボリーに置き換えて彩度を落とすか、
           実写カットに差し替える（第13章 修正4）。 */
        plate.dataset.cut = "B-2";
        var num = document.createElement("span");
        num.className = "plate-num";
        num.textContent = product.number;
        plate.appendChild(num);

        var body = document.createElement("div");

        var category = document.createElement("span");
        category.className = "label";
        category.textContent = product.category;

        var name = document.createElement("h3");
        name.className = "product-name serif";
        name.textContent = product.name;

        var copy = document.createElement("p");
        copy.className = "product-copy";
        copy.textContent = product.copy;

        var desc = document.createElement("p");
        desc.className = "product-desc";
        desc.textContent = product.description;

        var specs = document.createElement("table");
        specs.className = "product-specs";
        var tbody = document.createElement("tbody");
        product.specs.forEach(function (spec) {
          var tr = document.createElement("tr");
          var th = document.createElement("th");
          th.scope = "row";
          th.textContent = spec.label;
          var td = document.createElement("td");
          td.textContent = spec.value;
          tr.appendChild(th);
          tr.appendChild(td);
          tbody.appendChild(tr);
        });
        specs.appendChild(tbody);

        var price = document.createElement("p");
        price.className = "product-price";
        price.textContent = yen(product.price);
        var tax = document.createElement("span");
        tax.className = "tax-note";
        tax.textContent = "（税込）";
        price.appendChild(tax);

        /* TRY'S STORE 開店までは、詳細を同ページ内のアコーディオンで開く。
           リンク切れのまま公開しない（第13章 修正5）。 */
        var more = document.createElement("details");
        more.className = "product-more";
        var summary = document.createElement("summary");
        summary.textContent = "詳しく見る";
        var moreBody = document.createElement("div");
        moreBody.className = "more-body";
        var moreText = document.createElement("p");
        moreText.textContent = "お求めは TRY'S STORE で。TRY'S STOREは現在準備中です。開店までのご購入・在庫のご相談は、お問い合わせフォームで承ります。";
        var moreLink = document.createElement("p");
        moreLink.style.marginTop = "16px";
        var contact = document.createElement("a");
        contact.className = "btn";
        contact.href = "../../contact/";
        contact.textContent = "お問い合わせ";
        moreLink.appendChild(contact);
        moreBody.appendChild(moreText);
        moreBody.appendChild(moreLink);
        more.appendChild(summary);
        more.appendChild(moreBody);

        body.appendChild(category);
        body.appendChild(name);
        body.appendChild(copy);
        body.appendChild(desc);
        body.appendChild(specs);
        body.appendChild(price);
        body.appendChild(more);

        article.appendChild(plate);
        article.appendChild(body);
        fragment.appendChild(article);
      });

      container.textContent = "";
      container.appendChild(fragment);

      /* 描画後の要素にもフェードインを適用する */
      if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        container.querySelectorAll(".fade").forEach(function (el) { observer.observe(el); });
      } else {
        container.querySelectorAll(".fade").forEach(function (el) { el.classList.add("is-visible"); });
      }
    })
    .catch(function () {
      container.innerHTML = "<p>製品情報を読み込めませんでした。お手数ですが、時間をおいてお試しください。</p>";
    });
})();
