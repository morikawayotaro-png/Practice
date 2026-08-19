/**
 * サイト全体で使う定数。
 * 事実情報はここに集約する。原稿は docs/content-v2.md を正とする。
 */
export const SITE = {
  url: 'https://yokomine-sakura.com',
  name: '横峯さくら オフィシャルサイト',
  shortName: '横峯さくら',
  personName: '横峯さくら',
  personNameEn: 'Sakura Yokomine',
  jobTitle: 'プロゴルファー',
  tagline: 'その姿が、誰かの選択肢になれたら',
  /** トップページ本文の冒頭とトップの meta description に使う定義文（原稿A1） */
  definition:
    '横峯さくらは、2004年にプロ転向し、JLPGAツアーで通算23勝を挙げた日本のプロゴルファー。2021年の出産を経て同年5月にツアーへ復帰し、現在は永久シードの獲得を目指して競技を続けている。',
  /** 依頼窓口 */
  contact: {
    company: 'HERITAGE合同会社',
    email: 'yokomine.sakura.heritage@gmail.com',
    formUrl: '',
    address: '東京都千代田区飯田橋1-7-4 2階',
    /** 回答までの目安 */
    replyTime: '2営業日以内',
  },
  /**
   * JSON-LD の sameAs に入れる外部プロフィール。空文字のものは出力されない。
   * {{要確認: Wikipedia・JLPGA選手ページ・Instagram・アメブロ のURL（AI検索が本人と外部情報を紐づけるために必要）}}
   */
  sameAs: {
    wikipedia: '',
    jlpga: '',
    instagram: '',
    ameblo: '',
    x: '',
    youtube: '',
  },
  /** OGP のデフォルト画像（public/ からのパス） */
  defaultOgImage: '/ogp/default.jpg',
  locale: 'ja_JP',
} as const;

export type NavItem = { href: string; label: string; labelEn?: string };

export const NAV: NavItem[] = [
  { href: '/profile', label: 'プロフィール' },
  { href: '/challenge', label: '今の挑戦' },
  { href: '/sakura-baton', label: 'SAKURA BATON' },
  { href: '/news', label: 'ニュース' },
  { href: '/media', label: 'メディア' },
  { href: '/sponsors', label: 'スポンサー' },
  { href: '/partners', label: 'ご依頼' },
  { href: '/faq', label: 'よくある質問' },
];

export const FOOTER_NAV: NavItem[] = [
  ...NAV,
  { href: '/stories/tour-life', label: '家族と旅するツアー暮らし' },
  { href: '/stories/comeback', label: '妊娠7カ月での出場と産後復帰' },
  { href: '/stories/childcare-on-tour', label: 'ツアーに託児所を' },
  { href: '/stories/eternal-seed', label: '永久シードへの挑戦とは' },
  { href: '/en', label: 'English' },
];

/** sameAs の配列（空を除く） */
export function sameAsList(): string[] {
  return Object.values(SITE.sameAs).filter((v) => typeof v === 'string' && v.length > 0);
}
