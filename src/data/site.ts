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
   * JSON-LD の sameAs に入れる外部の公式ページ。空文字のものは出力されない。
   * 「このサイトの人物は、これらのページと同一人物である」とAI検索に伝えるための項目。
   * 追加する場合は、本人・所属先が運営している公式のものだけを入れる。
   * URLは共有用のパラメータを外した正規の形にする。
   */
  sameAs: {
    // 日本語版Wikipedia「横峯さくら」（%〜 は日本語タイトルをURLエンコードしたもの）
    wikipedia: 'https://ja.wikipedia.org/wiki/%E6%A8%AA%E5%B3%AF%E3%81%95%E3%81%8F%E3%82%89',
    // JLPGA（日本女子プロゴルフ協会）選手ページ
    jlpga: 'https://www.lpga.or.jp/members/info/1000639',
    instagram: 'https://www.instagram.com/sakura_yokomine/',
    ameblo: 'https://ameblo.jp/sakura-yokomine/',
    x: '',
    youtube: 'https://www.youtube.com/channel/UCl0CeSa8WYkR24hVPLO9SoQ',
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
