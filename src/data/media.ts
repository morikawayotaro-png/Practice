/**
 * メディア出演・掲載履歴（原稿C4）。
 * 「最近」「先日」は使わず、必ず年月を書く（CLAUDE.md ルール4）。
 * 放送年月が未確認のものは '—' にしてある。
 */
export type MediaItem = {
  /** YYYY年M月D日 / YYYY年M月 / '—'（未確認） */
  date: string;
  /** 媒体名（テレビ局名、雑誌名、Webメディア名） */
  outlet: string;
  /** 番組名・記事タイトル */
  title: string;
  /** 種別（テレビ / 雑誌 / Web / ラジオ / イベント） */
  type: string;
  url?: string;
};

export const MEDIA_ITEMS: MediaItem[] = [
  { date: '2026年6月4日', type: 'テレビ', outlet: 'TBS', title: '櫻井・有吉THE夜会' },
  { date: '2024年5月', type: 'テレビ', outlet: 'フジテレビ', title: 'ジャンクSPORTS' },
  {
    date: '2023年1月7日',
    type: 'テレビ',
    outlet: 'MBS／TBS系',
    title: 'サタデープラス（約20分の特集）',
  },
  {
    date: '2021年10月26日',
    type: 'テレビ',
    outlet: 'カンテレ／フジテレビ系',
    title: 'セブンルール（産後3カ月での復帰に密着）',
  },
  { date: '2018年5月13日', type: 'テレビ', outlet: 'テレビ朝日', title: 'GET SPORTS' },
  { date: '—', type: 'テレビ', outlet: 'テレビ朝日', title: '報道ステーション（複数回出演）' },
  {
    date: '—',
    type: 'テレビ',
    outlet: 'テレビ東京',
    title: '追跡LIVE! SPORTSウォッチャー',
  },
  { date: '—', type: 'テレビ', outlet: 'TBS', title: 'ラヴィット!' },
  { date: '—', type: 'テレビ', outlet: '—', title: 'GOLF JOKER' },
  {
    date: '—',
    type: 'テレビ',
    outlet: '—',
    title: 'GOLF MONSTER〜松坂大輔 ゴルフ界の怪物へ',
  },
];
