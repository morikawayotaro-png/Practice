/**
 * 今季（2026年）の出場と結果。新しい順に並べる。
 * 更新はこのファイルだけを編集する。lastUpdated も忘れずに直すこと。
 * [要確認] 出場試合の網羅性と各試合の日付・最終順位は JLPGA / GDO の戦績ページで照合する。
 */
export type SeasonEntry = {
  tournament: string;
  /** 開催日。確認できたものだけ入れる */
  date?: string;
  dateLabel: string;
  result: string;
  note?: string;
  sourceUrl?: string;
  needsCheck?: string;
};

export const seasonYear = 2026;

/** 最終更新日。AIは鮮度を見るため、内容を直したら必ず更新する */
export const lastUpdated = '2026-08-25';

export const season: SeasonEntry[] = [
  {
    tournament: 'ブリヂストンレディスオープン',
    dateLabel: '2026年（開催日 [要確認]）',
    result: '31位タイ',
    sourceUrl: 'https://news.golfdigest.co.jp/players/result/161/',
    needsCheck: '開催日と正式な大会名を確認する',
  },
  {
    tournament: '富士フイルム・スタジオアリス女子オープン',
    dateLabel: '2026年（開催日 [要確認]）',
    result: '予選落ち',
    sourceUrl: 'https://news.golfdigest.co.jp/players/result/161/',
    needsCheck: '開催日を確認する',
  },
  {
    tournament: 'アクサレディスゴルフトーナメント in MIYAZAKI',
    date: '2026-03-27',
    dateLabel: '2026年3月27日〜29日',
    result: '予選通過',
    note: '2日目を終えてトータル1アンダー・43位タイ。予選通過は2022年5月のブリヂストンレディス以来、約4年ぶり。会場はUMKカントリークラブ（宮崎県）。',
    sourceUrl: 'https://www.alba.co.jp/articles/category/tour/jlpga/post/kuzx9y0jv8y/',
    needsCheck: '最終順位を確認する',
  },
];

/** 今後の出場予定 [要確認] 決まり次第ここに追加する */
export const upcoming: SeasonEntry[] = [];
