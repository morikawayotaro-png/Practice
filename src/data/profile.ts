/**
 * プロフィールの事実情報（原稿A2〜A5、C5、C6）。
 * 原稿は docs/content-v2.md を正とする。原稿にない情報は補わない。
 */
export const PROFILE_SUMMARY =
  '横峯さくらは鹿児島県出身のプロゴルファー。2004年8月にプロテストに合格し、2009年には年間6勝を挙げて賞金女王になった。2014年からは米LPGAツアーに参戦し、2021年2月に第一子を出産。約3カ月半後の同年5月、リゾートトラストレディスで競技に復帰した。現在は家族とともに車で全国を移動しながらツアーを戦い、永久シードの獲得を目指している。';

export type Fact = { label: string; value: string };

/** 基本情報 */
export const BASIC_FACTS: Fact[] = [
  { label: '氏名', value: '横峯さくら（よこみね さくら）' },
  { label: '生年月日', value: '1985年12月13日' },
  { label: '出身地', value: '鹿児島県鹿屋市' },
  { label: '身長', value: '155cm' },
  { label: '血液型', value: 'AB型' },
  { label: 'プロ転向', value: '2004年（8月、プロテストに2位で合格）' },
  { label: '所属', value: 'エプソン販売（2007年〜）' },
  {
    label: '使用クラブ',
    value: 'Masdagolf ／ ボール: ブリヂストン ／ シューズ: ecco GOLF',
  },
  { label: 'マネジメント', value: 'HERITAGE合同会社' },
];

/** 三幕構成の経歴 */
export type Act = { act: string; heading: string; period: string; body: string };

export const ACTS: Act[] = [
  {
    act: '第1幕',
    heading: 'さくらブーム',
    period: '2004〜2014年',
    body: '2004年8月、18歳でプロテストに2位合格。翌2005年のライフカードレディスで初優勝を挙げると、独特のオーバースイングから繰り出す飛距離と、キャディーを務める父との二人三脚が注目を集め、女子ゴルフ人気を押し上げる存在になった。2009年にはメジャー1勝を含む年間6勝で賞金女王に。獲得賞金1億7501万6384円は当時の日本女子プロゴルフ史上最高額だった。2013年には101試合連続予選通過の記録を樹立し、年間最優秀選手賞を受賞。2014年、大王製紙エリエールレディスで通算23勝目を挙げ、この優勝を最後に米ツアーへ渡る。',
  },
  {
    act: '第2幕',
    heading: '米ツアー挑戦',
    period: '2015〜2019年',
    body: '2015年から主戦場を米LPGAツアーに移した。2014年に結婚し、夫とともにアメリカを転戦する日々が始まる。日本時代のような勝利には届かなかったが、ここで見た光景がその後の人生を決めた。お腹が大きいままプレーする選手。子どもを連れてツアーを回る家族。30年以上の歴史を持つ会場の託児所。「子どもを産んだら引退」と思い込んでいた価値観が変わり、「子どもができたら家族でツアーを回りたい」という将来像を持つようになった。',
  },
  {
    act: '第3幕',
    heading: '母として、現役として',
    period: '2020年〜現在',
    body: '2020年9月に第1子の妊娠を発表し、同年11月、妊娠7カ月でTOTOジャパンクラシックに出場。2021年2月に出産し、約3カ月半後のリゾートトラストレディスで競技に復帰した。以来、家族3人で車で移動しながらツアーを回っている。年間の車移動は4万キロ以上、ホテル住まいはおよそ300日。目標は通算30勝で与えられる永久シードの獲得。まずは12年ぶりとなる24勝目を、家族3人の優勝写真とともに挙げることを目指している。',
  },
];

/** 戦績表の見出しに出す要約 */
export const RESULTS_SUMMARY = 'JLPGAツアー優勝 23勝（うちメジャー2勝）';

/** 戦績表 */
export type Result = { year: string; tournament: string; result: string };

export const RESULTS: Result[] = [
  { year: '2005', tournament: 'ライフカードレディスゴルフトーナメント', result: '優勝（ツアー初優勝）' },
  { year: '2005', tournament: 'ミヤギテレビ杯ダンロップ女子オープン', result: '優勝' },
  { year: '2006', tournament: 'ニチレイレディス', result: '優勝' },
  { year: '2006', tournament: 'ベルーナレディースカップ', result: '優勝' },
  {
    year: '2006',
    tournament: 'LPGAツアーチャンピオンシップリコーカップ',
    result: '優勝（メジャー初制覇）',
  },
  { year: '2007', tournament: '中京テレビ・ブリヂストンレディスオープン', result: '優勝' },
  { year: '2007', tournament: '新キャタピラー三菱レディース', result: '優勝' },
  { year: '2007', tournament: '富士通レディース', result: '優勝' },
  { year: '2008', tournament: '大王製紙エリエールレディスオープン', result: '優勝' },
  { year: '2009', tournament: 'スタジオアリス女子オープン', result: '優勝' },
  { year: '2009', tournament: '廣済堂レディスゴルフカップ', result: '優勝' },
  { year: '2009', tournament: 'ニチレイPGMレディス', result: '優勝' },
  { year: '2009', tournament: 'マンシングウェアレディース東海クラシック', result: '優勝' },
  { year: '2009', tournament: '伊藤園レディスゴルフトーナメント', result: '優勝' },
  {
    year: '2009',
    tournament: 'LPGAツアーチャンピオンシップリコーカップ',
    result: '優勝（メジャー2勝目）',
  },
  { year: '2010', tournament: 'フンドーキンレディース', result: '優勝' },
  { year: '2010', tournament: 'マスターズGCレディース', result: '優勝' },
  { year: '2011', tournament: 'リゾートトラストレディス', result: '優勝' },
  { year: '2013', tournament: 'サイバーエージェントレディス', result: '優勝' },
  { year: '2013', tournament: 'マンシングウェアレディース東海クラシック', result: '優勝' },
  { year: '2013', tournament: 'NOBUTA GROUPマスターズGCレディース', result: '優勝' },
  { year: '2013', tournament: '伊藤園レディスゴルフトーナメント', result: '優勝' },
  {
    year: '2014',
    tournament: '大王製紙エリエールレディスオープン',
    result: '優勝（通算23勝目）',
  },
];

/** 主要記録 */
export const MAJOR_RECORDS: string[] = [
  '2009年 賞金女王（獲得賞金1億7501万6384円は当時の日本女子プロゴルフ史上最高額）',
  '2013年 年間最優秀選手賞、101試合連続予選通過の記録を樹立',
  '2010年 女子世界ランキング最高13位',
];

export const CURRENT_GOAL =
  '現在の目標は、JLPGAツアー通算30勝で与えられる永久シードの獲得。これまでの通算勝利数は23勝。子育てをしながらツアーを戦う姿を通じて、後輩の選手たちに競技を続けるという選択肢を示すことも目標のひとつにしている。';

/** 英語プロフィール（/en 用） */
export const PROFILE_EN = {
  summary:
    'Sakura Yokomine is a Japanese professional golfer with 23 career victories on the JLPGA Tour, including two major championships. Born on December 13, 1985 in Kanoya, Kagoshima, she turned professional in 2004 and quickly became one of the most popular players in Japanese women’s golf. In 2009 she won six tournaments in a single season and topped the money list with record earnings of 175 million yen, the highest in JLPGA history at the time.',
  facts: [
    { label: 'Name', value: 'Sakura Yokomine' },
    { label: 'Date of birth', value: 'December 13, 1985' },
    { label: 'Birthplace', value: 'Kanoya, Kagoshima, Japan' },
    { label: 'Turned professional', value: '2004' },
    { label: 'Tour', value: 'JLPGA Tour' },
    { label: 'Career wins', value: '23 (JLPGA Tour, including 2 majors)' },
  ] as Fact[],
  career: [
    'From 2015 she competed mainly on the LPGA Tour in the United States, where she saw players continue their careers through pregnancy and motherhood — an experience that reshaped her own view of what a professional athlete’s life could be.',
    'In November 2020 she played the TOTO Japan Classic while seven months pregnant, gave birth to her first child in February 2021, and returned to competition just three and a half months later at the Resort Trust Ladies. She now travels the JLPGA Tour by car with her husband and son, spending around 300 nights a year in hotels and driving more than 40,000 kilometers a season.',
  ],
  currentGoal:
    'Off the course, she advocates for on-site childcare at tournaments and runs SAKURA BATON, a social contribution project that includes the Sakura Birdie Fund, which donates to children’s organizations for every birdie she makes. Her goal is her 30th career win, which would earn her lifetime playing rights on the JLPGA Tour.',
  contact: 'For sponsorship and media inquiries, please contact HERITAGE LLC.',
};
