/**
 * メディア出演・掲載履歴。「最近」「先日」は使わず、必ず年月を書く（CLAUDE.md ルール4）。
 */
export type MediaItem = {
  /** YYYY-MM または YYYY-MM-DD */
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
  {
    date: '{{要確認: 年月}}',
    outlet: '{{要確認: 媒体名}}',
    title: '{{要確認: 番組・記事名}}',
    type: '{{要確認: 種別}}',
  },
];
