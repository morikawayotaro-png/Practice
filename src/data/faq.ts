/**
 * よくある質問8問。
 * 質問文は「実際に検索される質問の形」で固定してある。
 * 回答は docs/content-v2.md の原稿で置き換える（事実を補って書かない）。
 * answer は1〜3文で結論から書く。
 */
export type Faq = {
  question: string;
  answer: string;
  /** 詳しく説明しているページへのリンク（任意） */
  more?: { href: string; label: string };
};

export const FAQS: Faq[] = [
  {
    question: '横峯さくらは現在も現役でプレーしていますか',
    answer: '{{要確認: 現在の活動状況（現役かどうか、主戦場、直近シーズンの出場方針）}}',
    more: { href: '/challenge', label: '今の挑戦' },
  },
  {
    question: '横峯さくらの通算優勝回数は何回ですか',
    answer: '{{要確認: 通算優勝回数と、主な優勝大会}}',
    more: { href: '/profile', label: 'プロフィール・戦績' },
  },
  {
    question: '永久シードとは何ですか。あと何勝で獲得できますか',
    answer: '{{要確認: 永久シードの条件と、現在地（通算勝利数と必要勝利数）}}',
    more: { href: '/stories/eternal-seed', label: '永久シードへの挑戦とは' },
  },
  {
    question: '子育てをしながらツアーを回っているのですか',
    answer: '{{要確認: 家族帯同でツアーを回っている体制の説明}}',
    more: { href: '/stories/tour-life', label: '家族と旅するツアー暮らし' },
  },
  {
    question: '出産後、いつ競技に復帰しましたか',
    answer: '{{要確認: 出産時期と復帰時期（西暦・月まで）}}',
    more: { href: '/stories/comeback', label: '妊娠7カ月での出場と産後復帰' },
  },
  {
    question: 'ツアーの託児所の活動とは何ですか',
    answer: '{{要確認: 託児所に関する取り組みの内容と経緯}}',
    more: { href: '/stories/childcare-on-tour', label: 'ツアーに託児所を' },
  },
  {
    question: 'Sakura Birdie Fund はどんな取り組みですか',
    answer: '{{要確認: Sakura Birdie Fund の仕組み（何をすると何が寄付されるか）と実績}}',
    more: { href: '/sakura-baton', label: 'SAKURA BATON' },
  },
  {
    question: 'イベント出演やスポンサーシップはどこに依頼すればよいですか',
    answer:
      'スポンサーシップ、イベント出演、取材のご依頼はHERITAGE合同会社が窓口です。ご案内ページに依頼内容と連絡先をまとめています。',
    more: { href: '/partners', label: 'スポンサーシップ・出演のご案内' },
  },
];
