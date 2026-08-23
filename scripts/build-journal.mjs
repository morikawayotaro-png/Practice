#!/usr/bin/env node
/**
 * ジャーナル記事一覧の生成
 *
 * data/journal.json を唯一の出典として、journal/index.html の
 *   <!-- ARTICLES:START --> 〜 <!-- ARTICLES:END -->
 * の間を差し替える。
 *
 * 記事データの形式:
 *   { "slug": "example", "date": "2026-09-01", "category": "お知らせ",
 *     "title": "記事タイトル", "excerpt": "一覧に出す抜粋（1〜2文）" }
 *
 *   node scripts/build-journal.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(root, "data", "journal.json"), "utf8"));
const pagePath = join(root, "journal", "index.html");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const fmtDate = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${y}年${Number(m)}月${Number(d)}日`;
};

let html;
if (data.articles.length === 0) {
  html = `    <p class="fade" style="text-align:center; padding-block:48px">記事の公開を準備しています。</p>`;
} else {
  html = data.articles
    .map(
      (a) => `    <article class="card fade">
      <a href="/journal/${esc(a.slug)}/">
        <p class="label" style="text-transform:none"><time datetime="${esc(a.date)}">${fmtDate(a.date)}</time>｜${esc(a.category)}</p>
        <h3 style="margin-top:12px">${esc(a.title)}</h3>
        <p style="margin-top:10px; font-size:.92rem">${esc(a.excerpt)}</p>
      </a>
    </article>`
    )
    .join("\n\n");
}

const page = readFileSync(pagePath, "utf8");
const START = "<!-- ARTICLES:START -->";
const END = "<!-- ARTICLES:END -->";
const s = page.indexOf(START);
const e = page.indexOf(END);
if (s === -1 || e === -1) {
  console.error("ARTICLES:START / ARTICLES:END マーカーが見つかりません。");
  process.exit(1);
}
writeFileSync(pagePath, page.slice(0, s + START.length) + "\n" + html + "\n    " + page.slice(e));
console.log(`${data.articles.length}記事を書き出しました → ${pagePath}`);
