#!/usr/bin/env node
/**
 * photos/ の写真を WebP に変換して public/photos/ に書き出す。
 * - 長辺1600pxに収める（ヒーロー用は2000px）
 * - フォルダ構成とファイル名（拡張子以外）はそのまま引き継ぐ
 * 使い方: npm run photos
 */
import { readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, relative, dirname, parse } from 'node:path';
import sharp from 'sharp';

const SRC = join(process.cwd(), 'photos');
const OUT = join(process.cwd(), 'public/photos');
const INPUT = /\.(jpe?g|png|tiff?|webp)$/i;

if (!existsSync(SRC)) {
  console.error('photos/ がありません。');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    // アンダースコア始まり（photos/_pending/ など）は変換しない＝公開しない
    if (name.startsWith('_')) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (INPUT.test(name)) out.push(full);
  }
  return out;
}

const files = walk(SRC);
if (files.length === 0) {
  console.log('変換対象の写真がありません（photos/ に素材を置いてから実行してください）。');
  process.exit(0);
}

let count = 0;
for (const file of files) {
  const rel = relative(SRC, file);
  const { dir, name } = parse(rel);
  // hero/ 配下は大きめ、それ以外は長辺1600px
  const maxWidth = rel.startsWith('hero') ? 2000 : 1600;
  const outDir = join(OUT, dir);
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, `${name}.webp`);

  const meta = await sharp(file).metadata();
  const width = Math.min(meta.width ?? maxWidth, maxWidth);
  const encode = (quality, w) =>
    sharp(file)
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outPath);

  // 500KBに収まるまで、品質→幅の順で落としていく
  const steps = [
    [82, width],
    [68, width],
    [68, Math.min(width, 1200)],
    [60, Math.min(width, 1200)],
  ];
  for (const [quality, w] of steps) {
    await encode(quality, w);
    if (statSync(outPath).size <= 500 * 1024) break;
  }

  const after = statSync(outPath).size;
  const before = statSync(file).size;
  console.log(
    `${rel} → ${relative(process.cwd(), outPath)}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`
  );
  count++;
}
console.log(`\n${count}件を変換しました。ページ側の src は /photos/... を指定してください。`);
