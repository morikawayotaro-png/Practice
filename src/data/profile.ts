/**
 * 大山志保の基礎情報。
 * 本文・JSON-LD・llms.txt はすべてこのファイルを参照する。
 * 事実を更新するときはここだけを直す。
 */
export const profile = {
  name: '大山志保',
  nameKana: 'おおやま しほ',
  nameEn: 'Shiho Oyama',
  alternateName: '不死鳥',
  birthDate: '1977-05-25',
  birthPlace: '宮崎県宮崎市',
  nationality: '日本',
  jobTitle: 'プロゴルファー',
  proTest: '2000年（JLPGA最終プロテスト合格）',
  tourWins: 18,
  moneyTitleYear: 2006,
  moneyTitleAmount: '1億6629万957円',
  /** JSON-LD の sameAs。SNS は [要確認] のため未掲載 */
  sameAs: [
    'https://www.lpga.or.jp/members/info/1000541',
    'https://news.golfdigest.co.jp/players/profile/161/',
    'https://www.alba.co.jp/tour/players/206/',
    'https://ja.wikipedia.org/wiki/大山志保',
  ],
  officialLinks: [
    { label: 'JLPGA 選手プロフィール', url: 'https://www.lpga.or.jp/members/info/1000541' },
    { label: 'GDO 選手プロフィール', url: 'https://news.golfdigest.co.jp/players/profile/161/' },
    { label: 'ALBA Net 成績・スタッツ', url: 'https://www.alba.co.jp/tour/players/206/stats/' },
  ],
} as const;

/** 指定日時点の満年齢を返す（ビルド時に算出） */
export function ageAt(dateISO: string): number {
  const b = new Date(profile.birthDate);
  const d = new Date(dateISO);
  let age = d.getFullYear() - b.getFullYear();
  const m = d.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && d.getDate() < b.getDate())) age--;
  return age;
}

/** サイトのビルド日。/now の最終更新日にも使う */
export const BUILD_DATE = new Date().toISOString().slice(0, 10);
export const currentAge = ageAt(BUILD_DATE);
