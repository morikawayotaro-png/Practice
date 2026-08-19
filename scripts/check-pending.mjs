#!/usr/bin/env node
/**
 * 残っている {{要確認: ...}} を一覧する。
 * 使い方: node scripts/check-pending.mjs [--strict]
 *   --strict … 1件でも残っていたら終了コード1（公開前チェック用）
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const TARGET_DIRS = ['src', 'docs', 'public'];
const SKIP = new Set(['node_modules', 'dist', '.astro', '.git', '.vercel']);
const EXT = /\.(astro|ts|tsx|js|mjs|md|mdx|json|txt|css|html)$/;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (EXT.test(name)) out.push(full);
  }
  return out;
}

const files = TARGET_DIRS.flatMap((d) => {
  try {
    return walk(join(ROOT, d));
  } catch {
    return [];
  }
});

// 実際のプレースホルダは {{要確認: 内容}} の形（コロンあり）。
// 説明文中の {{要確認}}（コロンなし）は数えない。
const pattern = /\{\{要確認\s*[:：][^}]*\}\}/g;
const hits = [];

for (const file of files.sort()) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    const matches = line.match(pattern);
    if (!matches) return;
    for (const m of matches) {
      hits.push({ file: relative(ROOT, file), line: i + 1, text: m });
    }
  });
}

if (hits.length === 0) {
  console.log('✅ {{要確認}} は残っていません。');
  process.exit(0);
}

let currentFile = '';
console.log(`⚠️  未確定箇所（{{要確認}}）: ${hits.length}件\n`);
for (const hit of hits) {
  if (hit.file !== currentFile) {
    currentFile = hit.file;
    console.log(`\n■ ${currentFile}`);
  }
  console.log(`  L${String(hit.line).padStart(4)}  ${hit.text}`);
}

const byFile = hits.reduce((acc, h) => {
  acc[h.file] = (acc[h.file] ?? 0) + 1;
  return acc;
}, {});
console.log('\n--- ファイル別件数 ---');
for (const [file, count] of Object.entries(byFile).sort((a, b) => b[1] - a[1])) {
  console.log(`${String(count).padStart(4)}  ${file}`);
}
console.log(`\n合計 ${hits.length}件`);

if (process.argv.includes('--strict')) process.exit(1);
