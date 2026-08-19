/**
 * 各ページの meta 情報と更新日。
 * 更新日は「そのページの内容を最後に更新した日」を YYYY-MM-DD で入れる。
 */
export type PageMeta = {
  title: string;
  description: string;
  updated: string;
};

const UPDATED = '2026-08-19';

export const PAGES = {
  home: {
    title: '横峯さくら オフィシャルサイト',
    // トップの description は定義文（src/data/site.ts の SITE.definition）を使う
    description: '',
    updated: UPDATED,
  },
  profile: {
    title: 'プロフィール',
    description:
      'プロゴルファー横峯さくらのプロフィール。基本情報、経歴、戦績、現在の目標をまとめています。',
    updated: UPDATED,
  },
  challenge: {
    title: '今の挑戦',
    description:
      '横峯さくらが取り組んでいる永久シードへの挑戦の現在地と、その背景をまとめたページです。',
    updated: UPDATED,
  },
  sakuraBaton: {
    title: 'SAKURA BATON',
    description:
      '横峯さくらの社会貢献活動。競技・発信・社会貢献の3本柱と Sakura Birdie Fund の取り組みを説明します。',
    updated: UPDATED,
  },
  faq: {
    title: 'よくある質問',
    description: '横峯さくらについてよく寄せられる8つの質問と回答をまとめています。',
    updated: UPDATED,
  },
  sponsors: {
    title: 'スポンサー',
    description:
      '横峯さくらを支えるスポンサー一覧。AFFILIATION、SPONSORS、用具、SUPPORTERSの区分で掲載しています。',
    updated: UPDATED,
  },
  partners: {
    title: 'スポンサーシップ・出演のご案内',
    description:
      '横峯さくらへのスポンサーシップ、イベント出演、取材のご依頼窓口はHERITAGE合同会社です。',
    updated: UPDATED,
  },
  news: {
    title: 'ニュース',
    description: '横峯さくらに関するお知らせと最新情報の一覧です。',
    updated: UPDATED,
  },
  media: {
    title: 'メディア出演・掲載',
    description: '横峯さくらのテレビ、雑誌、Web媒体などへの出演・掲載履歴の一覧です。',
    updated: UPDATED,
  },
  en: {
    title: 'Sakura Yokomine | Profile',
    description:
      'Profile of Sakura Yokomine, a Japanese professional golfer competing on the JLPGA Tour.',
    updated: UPDATED,
  },
} satisfies Record<string, PageMeta>;
