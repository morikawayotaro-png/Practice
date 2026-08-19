/**
 * スポンサー。ロゴの alt には「正式社名」をそのまま入れる（CLAUDE.md ルール6）。
 * logo は public/ からのパス。未入稿の場合は空文字にしておくと社名テキストで表示される。
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
    note: '所属先',
    sponsors: [{ name: '{{要確認: 所属先の正式社名}}' }],
  },
  {
    id: 'sponsors',
    heading: 'SPONSORS',
    sponsors: [{ name: '{{要確認: スポンサーの正式社名（複数）}}' }],
  },
  {
    id: 'equipment',
    heading: '用具',
    note: 'クラブ、ボール、シューズ、ウェアなどの用具提供',
    sponsors: [
      { name: '{{要確認: 用具提供社の正式社名}}', category: '{{要確認: 用具カテゴリー}}' },
    ],
  },
  {
    id: 'supporters',
    heading: 'SUPPORTERS',
    sponsors: [{ name: '{{要確認: サポーターの正式社名（複数）}}' }],
  },
];
