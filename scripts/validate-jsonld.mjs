/**
 * dist/ のHTMLからJSON-LDを取り出し、構造を点検する。
 * Googleのリッチリザルトテストは公開URLが必要なため、公開後に別途実行する。
 * 実行: npm run validate
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const errors = [];
const warnings = [];
let blocks = 0;

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });
}

const files = walk(DIST).sort();

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const found = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (found.length === 0) errors.push(`${file}: JSON-LDがない`);

  for (const [, raw] of found) {
    blocks++;
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      errors.push(`${file}: JSONとして解析できない (${e.message})`);
      continue;
    }
    const where = `${file} [${data['@type']}]`;

    if (!data['@context']) errors.push(`${where}: @contextがない`);
    if (!data['@type']) errors.push(`${where}: @typeがない`);
    if (raw.includes('[要確認]')) warnings.push(`${where}: 構造化データに[要確認]が残っている`);

    switch (data['@type']) {
      case 'Person': {
        for (const key of ['name', 'alternateName', 'birthPlace', 'nationality', 'jobTitle', 'award', 'sameAs']) {
          if (!data[key]) errors.push(`${where}: Personに${key}がない`);
        }
        if (!Array.isArray(data.sameAs) || data.sameAs.length === 0) errors.push(`${where}: sameAsが空`);
        for (const url of data.sameAs ?? []) {
          if (!/^https?:\/\//.test(url)) errors.push(`${where}: sameAsが絶対URLでない (${url})`);
        }
        break;
      }
      case 'FAQPage': {
        const qs = data.mainEntity ?? [];
        if (qs.length === 0) errors.push(`${where}: mainEntityが空`);
        qs.forEach((q, i) => {
          if (q['@type'] !== 'Question') errors.push(`${where}: mainEntity[${i}]がQuestionでない`);
          if (!q.name) errors.push(`${where}: mainEntity[${i}]にnameがない`);
          const text = q.acceptedAnswer?.text;
          if (!text) errors.push(`${where}: mainEntity[${i}]にacceptedAnswer.textがない`);
          else if (text.length > 120) errors.push(`${where}: 回答${i + 1}が120字を超えている (${text.length}字)`);
        });
        break;
      }
      case 'ItemList': {
        const items = data.itemListElement ?? [];
        if (items.length === 0) errors.push(`${where}: itemListElementが空`);
        if (data.numberOfItems !== undefined && data.numberOfItems !== items.length) {
          errors.push(`${where}: numberOfItems(${data.numberOfItems})と要素数(${items.length})が一致しない`);
        }
        items.forEach((li, i) => {
          if (li['@type'] !== 'ListItem') errors.push(`${where}: itemListElement[${i}]がListItemでない`);
          if (typeof li.position !== 'number') errors.push(`${where}: itemListElement[${i}]にpositionがない`);
          if (!li.item?.['@type']) errors.push(`${where}: itemListElement[${i}]のitemに@typeがない`);
          if (!li.item?.name) errors.push(`${where}: itemListElement[${i}]のitemにnameがない`);
          const start = li.item?.startDate;
          if (start !== undefined && !/^\d{4}(-\d{2}(-\d{2})?)?$/.test(start)) {
            errors.push(`${where}: itemListElement[${i}]のstartDateがISO 8601でない (${start})`);
          }
        });
        break;
      }
      case 'Service': {
        for (const key of ['name', 'description', 'provider']) {
          if (!data[key]) errors.push(`${where}: Serviceに${key}がない`);
        }
        break;
      }
      case 'ProfilePage':
      case 'ContactPage': {
        if (!data.mainEntity) errors.push(`${where}: mainEntityがない`);
        break;
      }
    }
  }
}

// canonical と og:url の整合
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  if (!canonical) errors.push(`${file}: canonicalがない`);
  if (!desc) errors.push(`${file}: descriptionがない`);
  if (desc && desc.length > 160) warnings.push(`${file}: descriptionが160字を超えている (${desc.length}字)`);
  if (canonical && ogUrl && canonical !== ogUrl) errors.push(`${file}: canonicalとog:urlが一致しない`);
  if (!/<h1[^>]*>/.test(html)) errors.push(`${file}: h1がない`);
  if ((html.match(/<h1[^>]*>/g) ?? []).length > 1) errors.push(`${file}: h1が複数ある`);
  if (!/<html lang="ja">/.test(html)) errors.push(`${file}: html lang="ja"がない`);
}

console.log(`HTML ${files.length}件、JSON-LD ${blocks}ブロックを点検した。`);
for (const w of warnings) console.log(`  警告: ${w}`);
if (errors.length === 0) {
  console.log('  エラーなし。');
} else {
  for (const e of errors) console.log(`  エラー: ${e}`);
  process.exitCode = 1;
}
