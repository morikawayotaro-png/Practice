/**
 * よくある質問8問（原稿A6）。
 * 質問文は実際に検索される形で固定。回答は結論から書く。
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
    answer:
      '現役です。2026年シーズンもJLPGAツアーに出場しています。2021年に出産したあとも競技を続けており、家族とともにツアーを回っています。',
    more: { href: '/challenge', label: '今の挑戦' },
  },
  {
    question: '横峯さくらの通算優勝回数は何回ですか',
    answer:
      'JLPGAツアー通算23勝です。2009年には年間6勝を挙げ、賞金女王になりました。',
    more: { href: '/profile', label: 'プロフィール・戦績' },
  },
  {
    question: '永久シードとは何ですか。あと何勝で獲得できますか',
    answer:
      'JLPGAツアーで通算30勝した選手に生涯の出場資格が与えられる制度です。これまでに獲得したのは樋口久子さんら6人。横峯さくらは通算23勝で、あと7勝で獲得となります。',
    more: { href: '/stories/eternal-seed', label: '永久シードへの挑戦とは' },
  },
  {
    question: '子育てをしながらツアーを回っているのですか',
    answer:
      'はい。家族と一緒に移動しながらツアーを回っています。沖縄と北海道を除き移動は基本的に車で、年間の走行距離は4万キロを超えます。',
    more: { href: '/stories/tour-life', label: '家族と旅するツアー暮らし' },
  },
  {
    question: '出産後、いつ競技に復帰しましたか',
    answer:
      '2021年2月に出産し、約3カ月半後の2021年5月27日に開幕したリゾートトラストレディスで復帰しました。',
    more: { href: '/stories/comeback', label: '妊娠7カ月での出場と産後復帰' },
  },
  {
    question: 'ツアーの託児所の活動とは何ですか',
    answer:
      '2023年7月、アンバサダーを務める「PLEIADES CUP 横峯さくら DREAM GOLF LADIES 2023」（福岡雷山ゴルフ倶楽部）で、本人の発案により託児所「DREAM KIDS GARDEN」が設置されました。所属先のエプソンが協賛し、出場選手が子どもを預けて試合に集中できる環境を作りました。JLPGAツアーでも2023年5月から、住友商事のサポートによる会場託児所の取り組みが始まっています。',
    more: { href: '/stories/childcare-on-tour', label: 'ツアーに託児所を' },
  },
  {
    question: 'Sakura Birdie Fund はどんな取り組みですか',
    answer:
      'ツアーでバーディを1つ奪うごとに1,000円、イーグルで1万円、ホールインワンで5万円を子ども支援団体に寄付する取り組みです。2024年に始まり、寄付先は日本財団とクリステル・ヴィ・アンサンブルの2団体です。',
    more: { href: '/sakura-baton', label: 'SAKURA BATON' },
  },
  {
    question: 'イベント出演やスポンサーシップはどこに依頼すればよいですか',
    answer:
      'イベント出演やスポンサーシップのご依頼は、マネジメントを担当するHERITAGE合同会社が窓口です。yokomine.sakura.heritage@gmail.com までご連絡ください。2営業日以内を目安に回答します。',
    more: { href: '/partners', label: 'スポンサーシップ・出演のご案内' },
  },
];
