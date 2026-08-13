#!/usr/bin/env node
/**
 * Shot Navi 製品セクションの生成
 *
 * data/shot-navi-products.json を唯一の出典として、
 * brands/shot-navi/index.html の
 *   <!-- PRODUCTS:START --> 〜 <!-- PRODUCTS:END -->
 * の間を差し替える。製品の更新はJSONの編集とこのスクリプトの実行のみ。
 *
 *   node scripts/build-products.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = join(root, "data", "shot-navi-products.json");
const pagePath = join(root, "brands", "shot-navi", "index.html");

const data = JSON.parse(readFileSync(dataPath, "utf8"));

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const yen = (n) => n.toLocaleString("ja-JP");

const renderPlate = (p) => {
  if (p.image) {
    return `      <figure class="product-plate">
        <span class="product-no">${esc(p.no)}</span>
        <img src="${esc(p.image)}" alt="${esc(p.imageAlt || p.name)}" loading="lazy">
      </figure>`;
  }
  // 正規素材の支給待ち：タイポグラフィのみのプレートで代替（第9章・第13章-4）
  return `      <figure class="product-plate product-plate--ph" role="img" aria-label="${esc(p.name)}（製品写真は準備中）">
        <span class="product-no">${esc(p.no)}</span>
        <span class="ph-name">${esc(p.name)}</span>
      </figure>`;
};

const renderSpecs = (specs) =>
  specs
    .map(([k, v]) => `          <tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`)
    .join("\n");

// 「G II」等の末尾ローマ数字（半角2文字）は、字間を詰めて組む（修正指示 2）
const displayName = (name) =>
  esc(name).replace(/ II$/, ' <span class="model-ii">II</span>');

const renderProduct = (p) => `    <article class="product fade" id="${esc(p.id)}">
${renderPlate(p)}
      <div class="product-body">
        <span class="label product-cat">${esc(p.category)}</span>
        <h3 class="product-name" lang="en">${displayName(p.name)}</h3>
        <p class="product-copy">${esc(p.copy)}</p>
        <p class="product-desc">${esc(p.description)}</p>
        <table class="spec-table">
          <tbody>
${renderSpecs(p.specs)}
          </tbody>
        </table>
        <p class="product-price">${yen(p.priceJpy)}円<span class="tax">（税込）</span></p>
        <details class="product-more">
          <summary>詳しく見る</summary>
          <div class="product-more-body">
            <p>お求めは TRY'S STORE で。開店の準備を進めています。それまでのご購入・在庫のご確認は、<a href="/contact/">お問い合わせ</a>よりご連絡ください。</p>
          </div>
        </details>
      </div>
    </article>`;

if (data.products.length > 12) {
  console.warn(
    `注意: 製品が${data.products.length}点あります。12点を超えたらカテゴリーごとにページを分けること（v1.4 第4-6章）。`
  );
}

const html = data.products.map(renderProduct).join("\n\n");

const page = readFileSync(pagePath, "utf8");
const START = "<!-- PRODUCTS:START -->";
const END = "<!-- PRODUCTS:END -->";
const start = page.indexOf(START);
const end = page.indexOf(END);
if (start === -1 || end === -1) {
  console.error("PRODUCTS:START / PRODUCTS:END マーカーが見つかりません。");
  process.exit(1);
}

const next =
  page.slice(0, start + START.length) +
  "\n" +
  html +
  "\n    " +
  page.slice(end);

writeFileSync(pagePath, next);
console.log(`${data.products.length}製品を書き出しました → ${pagePath}`);
