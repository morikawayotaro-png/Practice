/**
 * スポンサー。区分と表記は公式サイトのスポンサーページに合わせている。
 * ロゴの alt には「正式社名」をそのまま入れる（CLAUDE.md ルール6）。
 *
 * 現在の name は、いただいたロゴに表示されているブランド表記をそのまま使っている。
 * {{要確認: 各社の正式社名（「株式会社」の有無と表記。EPSON / smeg / NEW ERA /
 * ecco GOLF / TORINOX / Masdagolf / Russeluno / FAST / Shot Navi / 新日本建物 /
 * タスキホールディングス / 環境STATION / 三井不動産）}}
 *
 * logo は public/ からのパス。未入稿の場合は省略すると社名テキストで表示される。
 * 現在の public/logos/*.png は、いただいたスポンサーページのスクリーンショットから
 * 切り出した暫定素材（`npm run logos` で再生成できる）。
 * {{要確認: 各社の正式なロゴデータ（PNG/SVG）。受け取ったら public/logos/ の
 * 同名ファイルを置き換える}}
 */
export type Sponsor = {
  /** 正式社名。そのまま alt に入る */
  name: string;
  url?: string;
  logo?: string;
  /** 用具カテゴリー（用具別セクションのみ使用） */
  category?: string;
};

export type SponsorGroup = {
  id: string;
  heading: string;
  note?: string;
  sponsors: Sponsor[];
};

export const SPONSOR_GROUPS: SponsorGroup[] = [
  {
    id: 'affiliation',
    heading: 'AFFILIATION',
    note: '所属',
    sponsors: [{ name: 'EPSON', logo: '/logos/epson.png' }],
  },
  {
    id: 'sponsors',
    heading: 'SPONSORS',
    sponsors: [
      { name: 'Shot Navi', logo: '/logos/shot-navi.png' },
      { name: 'FAST', logo: '/logos/fast.png' },
      { name: 'AMANO', logo: '/logos/amano.png' },
      { name: '高輪ヂーゼル株式会社', logo: '/logos/takanawa-diesel.png' },
      { name: 'タスキホールディングス', logo: '/logos/tasuki-holdings.png' },
      { name: '新日本建物', logo: '/logos/shin-nihon-tatemono.png' },
      { name: 'smeg', logo: '/logos/smeg.png' },
    ],
  },
  {
    id: 'equipment',
    heading: '用具',
    note: 'ウェア、キャップ、ボール、シューズ、サングラス、クラブの提供',
    sponsors: [
      { name: 'Russeluno', logo: '/logos/russeluno.png', category: 'WEAR & BAG' },
      { name: 'NEW ERA', logo: '/logos/new-era.png', category: 'CAP' },
      { name: 'ブリヂストン', logo: '/logos/bridgestone.png', category: 'BALL' },
      { name: 'ecco GOLF', logo: '/logos/ecco-golf.png', category: 'SHOES' },
      { name: 'TORINOX', logo: '/logos/torinox.png', category: 'SUNGLASSES' },
      { name: 'Masdagolf', logo: '/logos/masdagolf.png', category: 'CLUB' },
    ],
  },
  {
    id: 'supporters',
    heading: 'SUPPORTERS',
    sponsors: [
      { name: '環境STATION', logo: '/logos/kankyo-station.png' },
      { name: '三井不動産', logo: '/logos/mitsui-fudosan.png' },
    ],
  },
];

/** SPECIAL THANKS。ロゴではなくテキストで掲載する */
export const SPECIAL_THANKS: { role: string; name: string }[] = [
  { role: 'ウェブサイト衣装協力', name: 'NAKAGAMI' },
];
