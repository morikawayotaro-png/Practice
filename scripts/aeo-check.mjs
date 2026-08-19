#!/usr/bin/env node
/**
 * storiesの4ページと /faq が「storiesページの型」を満たしているかを検査する。
 *  1. 冒頭段落だけで質問への回答が完結しているか（リード段落があり、未確定を含まないか）
 *  2. H2見出しが質問文の形になっているか
 *  3. 数字・日付が5つ以上あるか
 *  4. 本人コメントの引用が1箇所あるか
 *  5. 関連リンクが3本あるか
 * 使い方: npm run build && node scripts/aeo-check.mjs
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = join(process.cwd(), 'dist');
if (!existsSync(DIST)) {
  console.error('dist/ がありません。先に `npm run build` を実行してください。');
  process.exit(1);
}

const storyDirs = existsSync(join(DIST, 'stories'))
  ? readdirSync(join(DIST, 'stories')).map((d) => `/stories/${d}`)
  : [];
const routes = [...storyDirs, '/faq'];

const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const rows = [];
const notes = [];

for (const route of routes) {
  const file = join(DIST, route.replace(/^\//, ''), 'index.html');
  if (!existsSync(file)) {
    notes.push(`${route}: HTMLが見つかりません`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;

  // 1. 冒頭で回答が完結しているか
  //    stories … リード段落が80文字以上で未確定を含まない
  //    /faq   … すべての質問（H2）の直後に、未確定を含まない回答段落がある
  let leadOk;
  let leadText = '';
  let leadHasPending = false;
  let faqAnswerNote = '';
  if (route === '/faq') {
    const blocks = [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>\s*<p[^>]*>([\s\S]*?)<\/p>/g)];
    const answers = blocks.map((b) => stripTags(b[2]));
    const filled = answers.filter((a) => a.length >= 20 && !/要確認/.test(a));
    leadOk = answers.length > 0 && filled.length === answers.length;
    faqAnswerNote = `${filled.length}/${answers.length}問`;
    leadHasPending = filled.length < answers.length;
  } else {
    const lead =
      main.match(/<p class="mt-8 border-l-4[^"]*"[^>]*>([\s\S]*?)<\/p>/)?.[1] ??
      main.match(/<h1[\s\S]*?<\/h1>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/)?.[1] ??
      '';
    leadText = stripTags(lead);
    leadHasPending = /要確認/.test(leadText);
    leadOk = leadText.length >= 80 && !leadHasPending;
  }

  // 2. H2が質問文の形か
  const h2s = [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)]
    .map((m) => stripTags(m[1]))
    .filter((t) => t && !['関連ページ', '記録を読む'].includes(t));
  const questionLike = h2s.filter((t) => /(か|ですか|のか|何|どう|なぜ|いつ|どこ|誰)\s*$|[?？]$|か$/.test(t));
  const h2Ok = h2s.length > 0 && questionLike.length === h2s.length;

  // 3. 数字・日付の個数（関連ページ以降は除く）
  //    {{要確認}} のプレースホルダに含まれる数字は数えない
  const bodyOnly = main.split('関連ページ')[0];
  const numbers = stripTags(bodyOnly).replace(/\{\{要確認[^}]*\}\}/g, ' ').match(/\d+/g) ?? [];
  const numberOk = numbers.length >= 5;

  // 4. 引用ブロック
  const quotes = (main.match(/<blockquote/g) ?? []).length;
  const quoteOk = route === '/faq' ? null : quotes >= 1;

  // 5. 関連リンク3本
  const relatedSection = main.split('関連ページ')[1] ?? '';
  const relatedLinks = (relatedSection.match(/<a href=/g) ?? []).length;
  const relatedOk = relatedLinks >= 3;

  const mark = (v) => (v === null ? '—' : v ? '○' : '×');

  rows.push({
    ページ: route,
    '1.冒頭で完結': mark(leadOk),
    '2.H2が質問形': `${mark(h2Ok)} (${questionLike.length}/${h2s.length})`,
    '3.数字5つ以上': `${mark(numberOk)} (${numbers.length})`,
    '4.引用1箇所': `${mark(quoteOk)} (${quotes})`,
    '5.関連リンク3本': `${mark(relatedOk)} (${relatedLinks})`,
  });

  if (!leadOk) {
    const reason =
      route === '/faq'
        ? `回答が入っているのは ${faqAnswerNote}（{{要確認}} が残っている）`
        : leadHasPending
          ? '{{要確認}} が残っているため未達（原稿流し込みで解消）'
          : `${leadText.length}文字と短い`;
    notes.push(`${route}: 冒頭で完結 — ${reason}`);
  }
  if (!h2Ok) {
    const bad = h2s.filter((t) => !questionLike.includes(t));
    notes.push(`${route}: 質問形でないH2 — ${bad.join(' / ')}`);
  }
  if (!numberOk) {
    notes.push(`${route}: 数字・日付が${numbers.length}個。原稿の年月・回数を入れて5個以上にする`);
  }
  if (quoteOk === false) notes.push(`${route}: 引用ブロックがない`);
  if (!relatedOk) notes.push(`${route}: 関連リンクが${relatedLinks}本`);
}

console.table(rows);
if (notes.length) {
  console.log('\n--- 未達項目 ---');
  for (const n of notes) console.log(`- ${n}`);
} else {
  console.log('\nすべての項目を満たしています。');
}
console.log(
  '\n注: /faq は storiesページの型のうち「引用ブロック」は対象外のため「—」で表示します。'
);
