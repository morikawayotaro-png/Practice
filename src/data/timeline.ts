/**
 * 年表。1項目 = 年月・出来事・出典 の3点セット。
 * 出典が確認できない記述はここに書かず、needsCheck を立てる。
 */
export type TimelineEntry = {
  /** 見出し用の年月。machine には <time datetime> に入れる値 */
  label: string;
  machine: string;
  /** 見出しは事実文で立てる */
  heading: string;
  body: string;
  sources: { label: string; url: string }[];
  needsCheck?: string;
  /** 年表のうち構造化データ(Event)に出す主要項目 */
  keyEvent?: boolean;
};

const JLPGA = { label: 'JLPGA 選手プロフィール', url: 'https://www.lpga.or.jp/members/info/1000541' };
const WIKI = { label: 'Wikipedia「大山志保」', url: 'https://ja.wikipedia.org/wiki/大山志保' };
const GDO_PROFILE = { label: 'GDO 選手プロフィール', url: 'https://news.golfdigest.co.jp/players/profile/161/' };

export const timeline: TimelineEntry[] = [
  {
    label: '1977年5月',
    machine: '1977-05-25',
    heading: '1977年、宮崎県宮崎市に生まれる',
    body: '大山志保は1977年5月25日、宮崎県宮崎市に生まれた。',
    sources: [JLPGA, WIKI],
  },
  {
    label: '2000年',
    machine: '2000',
    heading: '2000年、JLPGAの最終プロテストに合格',
    body: '2000年のJLPGA最終プロテストに合格し、プロゴルファーとなった。',
    sources: [WIKI],
  },
  {
    label: '2003年',
    machine: '2003',
    heading: '2003年、ベルーナレディースカップでツアー初優勝',
    body: 'ベルーナレディースカップゴルフトーナメントで、JLPGAツアー初優勝を挙げた。',
    sources: [WIKI, GDO_PROFILE],
    keyEvent: true,
  },
  {
    label: '2005年11月',
    machine: '2005-11',
    heading: '2005年、リコーカップで公式戦初優勝',
    body: '11月のLPGAツアーチャンピオンシップリコーカップを制し、公式戦で初めて優勝した。同年はマンシングウェアレディース東海クラシックでも勝ち、年間2勝を挙げている。',
    sources: [WIKI, GDO_PROFILE],
    keyEvent: true,
  },
  {
    label: '2006年',
    machine: '2006',
    heading: '2006年、年間5勝で初の賞金女王',
    body: '4月のフジサンケイレディスクラシックを皮切りに年間5勝を挙げ、獲得賞金1億6629万957円で賞金ランキング1位となった。女子ツアーで初めて1億5000万円を超える金額で、不動裕理の7年連続賞金女王を止めての初戴冠だった。',
    sources: [
      { label: 'イミダス「大山志保 初の賞金女王に輝いた女子プロゴルファー」', url: 'https://imidas.jp/hotkeyperson/detail/P-00-202-06-12.html' },
      WIKI,
    ],
    keyEvent: true,
  },
  {
    label: '2008年',
    machine: '2008',
    heading: '2008年、肘の痛みを抱えたまま米国ツアーの予選会を通過',
    body: '肘の痛みを抱えながら米国LPGAツアーの予選会を突破し、翌シーズンの出場権を得た。国内では同年、マスターズGCレディースで優勝している。',
    sources: [WIKI, GDO_PROFILE],
  },
  {
    label: '2009年',
    machine: '2009',
    heading: '2009年、米国LPGAツアーに参戦し、左肘の手術で撤退',
    body: '米国LPGAツアーに参戦したが、左肘の状態が改善せず、年末に患部を手術して米国ツアーから撤退した。',
    sources: [WIKI, GDO_PROFILE],
    keyEvent: true,
  },
  {
    label: '2011年10月',
    machine: '2011-10',
    heading: '2011年、マスターズGCレディースでプレーオフを制して復活優勝',
    body: '10月のマスターズGCレディースで、ポーラ・クリーマーとの3ホールに及ぶプレーオフを制し、2008年以来3年ぶりの優勝を挙げた。この年は賞金ランキング12位でシードに復帰している。',
    sources: [WIKI, GDO_PROFILE],
    keyEvent: true,
  },
  {
    label: '2013年',
    machine: '2013',
    heading: '2013年、リコーカップで公式戦2勝目',
    body: 'LPGAツアーチャンピオンシップリコーカップを制し、公式戦2勝目を挙げた。翌2014年はゴルフ5レディスとNOBUTA GROUP マスターズGCレディースで2勝、2015年はヨネックスレディスで優勝している。',
    sources: [WIKI, GDO_PROFILE],
  },
  {
    label: '2016年4月',
    machine: '2016-04',
    heading: '2016年、フジサンケイレディスクラシックで通算17勝目',
    body: '4月のフジサンケイレディスクラシックで、同大会10年ぶりの優勝を果たした。',
    sources: [WIKI, GDO_PROFILE],
  },
  {
    label: '2017年10月',
    machine: '2017-10',
    heading: '2017年、頚椎椎間板ヘルニアで離脱',
    body: '9月に練習中に首を痛め、10月に頚椎椎間板ヘルニアと診断されてツアーを離れた。離脱は約8カ月に及んだ。',
    sources: [WIKI, GDO_PROFILE],
    needsCheck: '離脱期間「約8カ月」の一次情報を確認する',
    keyEvent: true,
  },
  {
    label: '2018年5月',
    machine: '2018-05',
    heading: '2018年5月、ほけんの窓口レディースで復帰',
    body: '約8カ月の離脱を経て、5月のほけんの窓口レディースでツアーに戻った。',
    sources: [WIKI],
  },
  {
    label: '2018年6月',
    machine: '2018-06',
    heading: '2018年6月、復帰4戦目のヨネックスレディスで優勝',
    body: '復帰4戦目のヨネックスレディスゴルフトーナメントをトータル10アンダーで制し、2年ぶり、通算18勝目を挙げた。同大会3勝目は、2001年・2002年・2007年に勝った不動裕理に次いで史上2人目だった。当時41歳。',
    sources: [
      { label: 'ALBA Net「大山志保が大会3勝目で史上2人目の快挙達成」', url: 'https://www.alba.co.jp/articles/category/tour/jlpga/post/nv9ckfasln/' },
      { label: 'GDO「ヨネックスレディス」歴代優勝者', url: 'https://news.golfdigest.co.jp/news/jlpga/article/74406/1/' },
    ],
    keyEvent: true,
  },
  {
    label: '2022年6月',
    machine: '2022-06',
    heading: '2022年6月、アース・モンダミンカップを最後に欠場が続く',
    body: 'シード選手として出場した6月のアース・モンダミンカップ2日目を最後に、原因不明の全身の痛みにより試合に出られない状態が続いた。',
    sources: [
      { label: 'ALBA Net「大山志保が伊藤園レディスで2年5カ月ぶりにツアー復帰へ」', url: 'https://news.biglobe.ne.jp/sports/1020/alb_241020_7874532309.html' },
    ],
    keyEvent: true,
  },
  {
    label: '2022年11月',
    machine: '2022-11-14',
    heading: '2022年11月、トーナメント特別保障制度の適用が発表される',
    body: '11月14日、JLPGAはトーナメント特別保障制度を適用することを発表した。長期の欠場中もシード資格を保つ制度である。',
    sources: [
      { label: 'ALBA Net（BIGLOBEニュース配信）', url: 'https://news.biglobe.ne.jp/sports/1020/alb_241020_7874532309.html' },
    ],
  },
  {
    label: '2023年',
    machine: '2023',
    heading: '2023年、特別保障制度の適用期間が1年延長される',
    body: '復帰の見通しが立たず、特別保障制度の適用期間が1年延長された。制度の適用期間が延長されたのは初めてだった。',
    sources: [
      { label: 'GDO「46歳・大山志保の公傷期間を1年延長 特別保障制度では初」', url: 'https://news.golfdigest.co.jp/news/jlpga/article/157101/1/' },
    ],
  },
  {
    label: '2024年11月',
    machine: '2024-11',
    heading: '2024年11月、伊藤園レディスで2年5カ月ぶりに復帰',
    body: '伊藤園レディスゴルフトーナメントに出場し、2022年6月のアース・モンダミンカップ以来、868日ぶりにツアーへ戻った。当時47歳。この復帰戦の前に、本人は原因不明の病と向き合ってきたことを公の場で語っている。',
    sources: [
      { label: 'GDO「「とにかくこの舞台に立ちたい」と難病を告白 47歳の大山志保が涙のツアー復帰」', url: 'https://news.golfdigest.co.jp/news/jlpga/article/174254/1/' },
      { label: 'egolf「ツアー18勝・大山志保が「伊藤園レディス」で復帰！ 22年6月以来868日ぶり」', url: 'https://egolf.jp/tournews/159281/' },
    ],
    keyEvent: true,
  },
  {
    label: '2026年3月',
    machine: '2026-03-28',
    heading: '2026年3月、アクサレディスin MIYAZAKIで約4年ぶりの予選通過',
    body: '地元宮崎で開かれたアクサレディスゴルフトーナメント in MIYAZAKIで、2日目を終えてトータル1アンダー・43位タイに入り、予選を通過した。予選通過は2022年5月のブリヂストンレディス以来、約4年ぶりだった。当時48歳。',
    sources: [
      { label: 'ALBA Net「大山志保が涙の4年ぶり予選通過」', url: 'https://www.alba.co.jp/articles/category/tour/jlpga/post/kuzx9y0jv8y/' },
      { label: 'GDO 2026年 アクサレディス 最終日スコア', url: 'https://news.golfdigest.co.jp/jlpga/8929/score/' },
    ],
    keyEvent: true,
  },
];

export const keyEvents = timeline.filter((t) => t.keyEvent);
