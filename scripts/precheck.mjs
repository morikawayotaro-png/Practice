#!/usr/bin/env node
/**
 * 公開前チェック（構築インプット v1.4 第12章）
 *   node scripts/precheck.mjs
 *
 * - 禁止語（第6章）の全文検索
 * - 「TRY'S INC.」表記の残存チェック
 * - 「〜ではなく」「物語」「共感」の使用回数
 * - 後株表記（TRY'S株式会社）の混入チェック
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;

const collect = (dir) => {
  const files = [];
  for (const entry of readdirSync(dir)) {
    if (entry === ".git" || entry === "node_modules" || entry === "scripts") continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) files.push(...collect(path));
    else if (/\.(html|json|js|css)$/.test(entry)) files.push(path);
  }
  return files;
};

const files = collect(root).map((path) => ({
  path: relative(root, path),
  text: readFileSync(path, "utf8"),
}));

let failed = false;
const report = (ok, message) => {
  if (!ok) failed = true;
  console.log(`${ok ? "OK " : "NG "} ${message}`);
};

// 禁止語（第6章）。コード上の識別子ではなく表示文が対象なので、HTMLとJSONのみ見る
const contentFiles = files.filter((file) => /\.(html|json)$/.test(file.path));
const forbidden = ["便利", "お得", "人気", "限定", "最新", "トレンド", "バズ", "映え"];
for (const word of forbidden) {
  const hits = contentFiles.filter((file) => file.text.includes(word));
  report(hits.length === 0, `禁止語「${word}」${hits.length ? "が残存: " + hits.map((h) => h.path).join(", ") : "なし"}`);
}

// TRY'S INC. の残存
{
  const hits = files.filter((file) => /TRY'?['’]?S\s*INC/i.test(file.text));
  report(hits.length === 0, `「TRY'S INC.」表記${hits.length ? "が残存: " + hits.map((h) => h.path).join(", ") : "なし"}`);
}

// 後株表記（TRY'S株式会社）の混入
{
  const hits = contentFiles.filter((file) => file.text.includes("TRY'S株式会社"));
  report(hits.length === 0, `後株表記${hits.length ? "が残存: " + hits.map((h) => h.path).join(", ") : "なし（前株で統一）"}`);
}

// 「〜ではなく」構文（第6章は上限2回）。
// ただし本書v1.4の確定コピー自体が3か所で使っている
// （トップのステートメント帯／SMEGヒーロー／SHOTLYZER）ため、
// この3か所は既知として許容し、それ以外への新規追加をNGとする。
// ※第6章と第13章の記述矛盾。発注元に確認のうえ上限を確定させること。
{
  const allowed = new Map([
    ["index.html", 1],
    ["brands/smeg/index.html", 1],
    ["data/shot-navi-products.json", 1],
  ]);
  let ok = true;
  const where = [];
  for (const file of contentFiles) {
    const count = (file.text.match(/ではなく/g) || []).length;
    if (count === 0) continue;
    where.push(`${file.path}×${count}`);
    if (count > (allowed.get(file.path) || 0)) ok = false;
  }
  report(ok, `「〜ではなく」構文 — 確定コピーの3か所のみ（新規追加なし）${where.length ? " — " + where.join(", ") : ""}`);
}

// 「物語」「共感」：上限5回
for (const word of ["物語", "共感"]) {
  let count = 0;
  const where = [];
  for (const file of contentFiles) {
    const matches = file.text.match(new RegExp(word, "g"));
    if (matches) {
      count += matches.length;
      where.push(`${file.path}×${matches.length}`);
    }
  }
  report(count <= 5, `「${word}」 ${count}回（上限5回）${where.length ? " — " + where.join(", ") : ""}`);
}

// 機種依存のローマ数字（第13章 修正3）
{
  const hits = contentFiles.filter((file) => /[Ⅰ-ⅿ]/.test(file.text));
  report(hits.length === 0, `ローマ数字の機種依存文字${hits.length ? "が残存: " + hits.map((h) => h.path).join(", ") : "なし（半角英字で統一）"}`);
}

process.exit(failed ? 1 : 0);
