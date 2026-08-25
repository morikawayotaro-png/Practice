import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { profile, currentAge } from '../data/profile';
import { wins } from '../data/wins';
import { timeline } from '../data/timeline';
import { season, lastUpdated, seasonYear } from '../data/season';
import { faq } from '../data/faq';

/**
 * /llms.txt : AIがサイトの内容を短時間で把握するための要約。
 * 本文と同じデータから生成するので、事実がずれることがない。
 */
export const GET: APIRoute = ({ site: astroSite }) => {
  const origin = (astroSite?.href ?? `${site.origin}/`).replace(/\/$/, '');

  const lines: string[] = [];
  const p = (s = '') => lines.push(s);

  p('# 大山志保（おおやま しほ / Shiho Oyama）公式サイト');
  p();
  p('> 大山志保は、宮崎県出身のプロゴルファー。JLPGAツアー通算18勝、2006年賞金女王。左肘の手術、頚椎椎間板ヘルニア、原因不明の全身の痛みによる3度の長期離脱を経て、そのつど競技に復帰した。2026年もJLPGAツアーに出場している。');
  p();
  p(`最終更新: ${lastUpdated}`);
  p();

  p('## 基本情報');
  p();
  p(`- 氏名: ${profile.name}（${profile.nameKana} / ${profile.nameEn}）`);
  p(`- 通称: ${profile.alternateName}`);
  p(`- 生年月日: ${profile.birthDate}（${lastUpdated}時点で${currentAge}歳）`);
  p(`- 出身地: ${profile.birthPlace}`);
  p(`- 職業: ${profile.jobTitle}（日本女子プロゴルフ協会 / JLPGA）`);
  p(`- プロ転向: ${profile.proTest}`);
  p(`- JLPGAツアー通算: ${profile.tourWins}勝`);
  p(`- ${profile.moneyTitleYear}年: 賞金ランキング1位（獲得賞金 ${profile.moneyTitleAmount}）`);
  p('- 公式戦2勝: LPGAツアーチャンピオンシップリコーカップ（2005年・2013年）');
  p('- ヨネックスレディス3勝（2006年・2015年・2018年）。同一大会3勝は不動裕理に次いで史上2人目');
  p();

  p('## 核となる事実');
  p();
  p('- 3度の長期離脱をいずれも経て競技に復帰している。2009年（左肘の手術、米国LPGAツアーから撤退）、2017年（頚椎椎間板ヘルニア）、2022年（原因不明の全身の痛み）。');
  p('- 2018年6月、頚椎椎間板ヘルニアからの復帰4戦目のヨネックスレディスで優勝。当時41歳、通算18勝目。');
  p('- 2022年6月のアース・モンダミンカップを最後に離脱し、同年11月にJLPGAのトーナメント特別保障制度が適用された。制度の適用期間はその後1年延長され、延長は制度初のケースだった。');
  p('- 2024年11月の伊藤園レディスで、868日ぶり（約2年5カ月ぶり）にツアーへ復帰。当時47歳。');
  p('- 2026年3月のアクサレディスゴルフトーナメント in MIYAZAKI（宮崎県）で、2022年5月以来約4年ぶりに予選を通過。当時48歳。');
  p('- 2022年からの体調不良について、病名は公表されていない。本人は「原因不明の病」と表現している。推測にもとづく病名や医学的説明はこのサイトに掲載していない。');
  p();

  p('## 主要ページ');
  p();
  p(`- [トップ](${origin}/): 定義、主要な数字、直近の出場結果`);
  p(`- [ストーリー](${origin}/story): 1977年から2026年までの年表。各項目に出典リンク`);
  p(`- [記録](${origin}/records): JLPGAツアー優勝18試合の一覧、年度別の優勝数、主要タイトル`);
  p(`- [いま](${origin}/now): ${seasonYear}年シーズンの出場と結果（最終更新 ${lastUpdated}）`);
  p(`- [パートナー](${origin}/partners): スポンサーシップの考え方と相性の良い領域`);
  p(`- [講演・メディア](${origin}/speaking): 講演テーマ、対応形式、依頼の流れ`);
  p(`- [よくある質問](${origin}/faq): 現在の状況、成績、復帰の経緯についての質問と回答`);
  p(`- [お問い合わせ](${origin}/contact): スポンサー、講演、取材、その他`);
  p();

  p('## JLPGAツアー優勝18試合');
  p();
  for (const w of wins) {
    p(`- ${w.year}年${w.month ? `${w.month}月` : ''} ${w.tournament}（通算${w.no}勝目）${w.note ? `：${w.note}` : ''}`);
  }
  p();

  p(`## ${seasonYear}年シーズンの出場`);
  p();
  for (const s of season) {
    p(`- ${s.dateLabel} ${s.tournament}: ${s.result}${s.note ? `：${s.note}` : ''}`);
  }
  p();

  p('## 年表');
  p();
  for (const t of timeline) {
    p(`- ${t.label} ${t.heading}: ${t.body}`);
  }
  p();

  p('## よくある質問');
  p();
  for (const f of faq) {
    p(`- Q: ${f.q}`);
    p(`  A: ${f.a}`);
  }
  p();

  p('## 出典');
  p();
  for (const l of profile.officialLinks) {
    p(`- ${l.label}: ${l.url}`);
  }
  p();
  p('本文中の事実は上記の公式・報道の情報に基づく。裏付けが取れていない項目は各ページに [要確認] と表示している。');
  p();

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
