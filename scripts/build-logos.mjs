#!/usr/bin/env node
/**
 * photos/_logos/ に置いた「現在のスポンサーページのスクリーンショット」から
 * 各社のロゴを切り出し、public/logos/*.png を作る（暫定素材）。
 *
 * 各社から正式なロゴデータ（PNG/SVG）を受け取ったら、
 * public/logos/ に同じファイル名で置き換えればよい。このスクリプトは不要になる。
 *
 * 使い方: node scripts/build-logos.mjs
 */
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const SRC = join(process.cwd(), 'photos/_logos');
const OUT = join(process.cwd(), 'public/logos');
const INSET = 8; // ボックスの枠線を含まないよう内側に寄せる
const BOX = { width: 300, height: 120 }; // 書き出しサイズ（表示は高さ48px想定の2.5倍）

/** [ファイル, left, top, width, height, 出力名] */
const LOGOS = [
  ['sponsors-upper.png', 72, 520, 554, 203, 'epson'],
  ['sponsors-upper.png', 72, 951, 566, 208, 'shot-navi'],
  ['sponsors-upper.png', 685, 951, 566, 208, 'fast'],
  ['sponsors-upper.png', 72, 1213, 566, 207, 'amano'],
  ['sponsors-upper.png', 685, 1213, 566, 207, 'takanawa-diesel'],
  ['sponsors-upper.png', 72, 1570, 566, 208, 'tasuki-holdings'],
  ['sponsors-upper.png', 685, 1570, 566, 208, 'shin-nihon-tatemono'],
  ['sponsors-upper.png', 72, 1910, 566, 207, 'smeg'],
  ['sponsors-upper.png', 72, 2267, 566, 208, 'russeluno'],
  ['sponsors-upper.png', 685, 2267, 566, 208, 'new-era'],
  ['sponsors-lower.png', 72, 1205, 566, 207, 'bridgestone'],
  ['sponsors-lower.png', 685, 1205, 566, 207, 'ecco-golf'],
  ['sponsors-lower.png', 72, 1562, 566, 208, 'torinox'],
  ['sponsors-lower.png', 685, 1562, 566, 208, 'masdagolf'],
  ['sponsors-lower.png', 72, 1998, 566, 207, 'kankyo-station'],
  ['sponsors-lower.png', 685, 1998, 566, 207, 'mitsui-fudosan'],
];

if (!existsSync(SRC)) {
  console.error('photos/_logos/ がありません。');
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

for (const [file, left, top, width, height, name] of LOGOS) {
  const src = join(SRC, file);
  if (!existsSync(src)) {
    console.error(`元画像がありません: ${file}`);
    process.exit(1);
  }
  const outPath = join(OUT, `${name}.png`);
  await sharp(src)
    .extract({
      left: left + INSET,
      top: top + INSET,
      width: width - INSET * 2,
      height: height - INSET * 2,
    })
    // 周囲の白を落としてロゴだけにし、同じ枠に収める
    .trim({ threshold: 12 })
    .resize({ ...BOX, fit: 'contain', background: { r: 255, g: 255, b: 255 } })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`${name}.png`);
}
console.log(`\n${LOGOS.length}件を public/logos/ に書き出しました。`);
