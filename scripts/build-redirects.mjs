#!/usr/bin/env node
/**
 * docs/redirects.csv を読んで vercel.json の "redirects" を生成する。
 * 使い方: node scripts/build-redirects.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const csvPath = join(root, 'docs/redirects.csv');
const vercelPath = join(root, 'vercel.json');

const lines = readFileSync(csvPath, 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#') && l !== 'old,new,status');

const redirects = [];
const errors = [];
const seen = new Set();

for (const line of lines) {
  const [source, destination, statusRaw] = line.split(',').map((s) => s?.trim());
  if (!source || !destination) {
    errors.push(`列が足りません: ${line}`);
    continue;
  }
  if (!source.startsWith('/')) {
    errors.push(`旧URLは / から始めてください: ${source}`);
    continue;
  }
  if (seen.has(source)) {
    errors.push(`旧URLが重複しています: ${source}`);
    continue;
  }
  seen.add(source);
  const statusCode = Number(statusRaw ?? 301);
  redirects.push({
    source,
    destination,
    permanent: statusCode === 301 || statusCode === 308,
  });
}

if (errors.length) {
  console.error('CSVにエラーがあります:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

const vercel = JSON.parse(readFileSync(vercelPath, 'utf8'));
vercel.redirects = redirects;
writeFileSync(vercelPath, JSON.stringify(vercel, null, 2) + '\n');
console.log(`vercel.json に ${redirects.length}件のリダイレクトを書き込みました。`);
for (const r of redirects) {
  console.log(`  ${r.source} → ${r.destination} (${r.permanent ? '301' : '307'})`);
}
