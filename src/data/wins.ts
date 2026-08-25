/**
 * JLPGAツアー優勝 18試合。
 * 大会名は当時の名称。月は報道で確認できたものだけを入れている。
 * [要確認] 大会名の正式表記と各試合の開催月は JLPGA 公式の選手ページで最終照合する。
 */
export type Win = {
  no: number;
  year: number;
  month?: number;
  tournament: string;
  note?: string;
  official?: boolean; // JLPGA公式戦
};

export const wins: Win[] = [
  { no: 1, year: 2003, tournament: 'ベルーナレディースカップゴルフトーナメント', note: 'ツアー初優勝' },
  { no: 2, year: 2005, tournament: 'マンシングウェアレディース東海クラシック', note: '2年ぶりの優勝' },
  { no: 3, year: 2005, month: 11, tournament: 'LPGAツアーチャンピオンシップリコーカップ', note: '公式戦初優勝', official: true },
  { no: 4, year: 2006, month: 4, tournament: 'フジサンケイレディスクラシック' },
  { no: 5, year: 2006, month: 5, tournament: 'サロンパスワールドレディスゴルフトーナメント' },
  { no: 6, year: 2006, month: 8, tournament: 'クリスタルガイザーレディスゴルフトーナメント' },
  { no: 7, year: 2006, month: 8, tournament: 'NEC軽井沢72ゴルフトーナメント' },
  { no: 8, year: 2006, tournament: 'ヨネックスレディスゴルフトーナメント', note: '同大会1勝目' },
  { no: 9, year: 2007, tournament: 'ニチレイPGMレディス' },
  { no: 10, year: 2007, tournament: '明治チョコレートカップ' },
  { no: 11, year: 2008, tournament: 'マスターズGCレディース' },
  { no: 12, year: 2011, month: 10, tournament: 'マスターズGCレディース', note: 'ポーラ・クリーマーとの3ホールのプレーオフを制す。3年ぶりの優勝' },
  { no: 13, year: 2013, tournament: 'LPGAツアーチャンピオンシップリコーカップ', note: '公式戦2勝目', official: true },
  { no: 14, year: 2014, tournament: 'ゴルフ5レディス プロゴルフトーナメント' },
  { no: 15, year: 2014, tournament: 'NOBUTA GROUP マスターズGCレディース' },
  { no: 16, year: 2015, tournament: 'ヨネックスレディスゴルフトーナメント', note: '同大会2勝目' },
  { no: 17, year: 2016, month: 4, tournament: 'フジサンケイレディスクラシック', note: '同大会10年ぶりの優勝' },
  { no: 18, year: 2018, month: 6, tournament: 'ヨネックスレディスゴルフトーナメント', note: '同大会3勝目。復帰4戦目での優勝' },
];

/** 年度別の優勝数 */
export const winsByYear = wins.reduce<Record<number, number>>((acc, w) => {
  acc[w.year] = (acc[w.year] ?? 0) + 1;
  return acc;
}, {});
