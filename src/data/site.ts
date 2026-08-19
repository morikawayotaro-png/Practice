/**
 * サイト全体で使う定数。
 * 事実情報はここに集約する。原稿が届いたら {{要確認}} を置き換える。
 */
export const SITE = {
  url: 'https://yokomine-sakura.com',
  name: '横峯さくら オフィシャルサイト',
  shortName: '横峯さくら',
  personName: '横峯さくら',
  personNameEn: 'Sakura Yokomine',
  jobTitle: 'プロゴルファー',
  tagline: 'その姿が、誰かの選択肢になれたら',
  /** トップページ本文の冒頭とトップの meta description に使う定義文 */
  definition: '{{要確認: 定義文（docs/content-v2.md「定義文」の文章をそのまま入れる）}}',
  /** 依頼窓口 */
  contact: {
    company: 'HERITAGE合同会社',
    email: '{{要確認: 問い合わせ先メールアドレス}}',
    formUrl: '',
    address: '{{要確認: HERITAGE合同会社の所在地}}',
  },
  /** JSON-LD の sameAs に入れる外部プロフィール。空文字のものは出力されない */
  sameAs: {
    wikipedia: '',
    jlpga: '',
    instagram: '',
    ameblo: '',
    x: '',
    youtube: '',
  },
  /** OGP のデフォルト画像（public/ からのパス） */
  defaultOgImage: '/ogp/default.png',
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
