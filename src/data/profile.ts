/**
 * プロフィールの事実情報。docs/content-v2.md から転記する。
 * 原稿にない情報は補わない。未確定は {{要確認: ...}} のまま残す。
 */
export const PROFILE_SUMMARY =
  '{{要確認: プロフィール冒頭の要約（誰が・何を・いつから・なぜ が分かる4〜5文）}}';

export type Fact = { label: string; value: string };

/** 基本情報 */
export const BASIC_FACTS: Fact[] = [
  { label: '氏名', value: '横峯さくら（よこみね さくら）' },
  { label: '生年月日', value: '{{要確認: 生年月日}}' },
  { label: '出身地', value: '{{要確認: 出身地}}' },
  { label: '身長', value: '{{要確認: 身長}}' },
  { label: '血液型', value: '{{要確認: 血液型}}' },
  { label: 'プロ転向', value: '{{要確認: プロ転向年}}' },
  { label: '所属', value: '{{要確認: 所属}}' },
  { label: '使用クラブ', value: '{{要確認: 使用クラブ}}' },
];

/** 三幕構成の経歴 */
export type Act = { act: string; heading: string; period: string; body: string };

export const ACTS: Act[] = [
  {
    act: '第1幕',
    heading: '{{要確認: 第1幕の見出し}}',
    period: '{{要確認: 第1幕の期間（西暦で）}}',
    body: '{{要確認: 第1幕の本文}}',
  },
  {
    act: '第2幕',
    heading: '{{要確認: 第2幕の見出し}}',
    period: '{{要確認: 第2幕の期間（西暦で）}}',
    body: '{{要確認: 第2幕の本文}}',
  },
  {
    act: '第3幕',
    heading: '{{要確認: 第3幕の見出し}}',
    period: '{{要確認: 第3幕の期間（西暦で）}}',
    body: '{{要確認: 第3幕の本文}}',
  },
];

/** 戦績表。原稿の戦績をそのまま行として並べる */
export type Result = { year: string; tournament: string; result: string };

export const RESULTS: Result[] = [
  { year: '{{要確認: 年}}', tournament: '{{要確認: 大会名}}', result: '{{要確認: 成績}}' },
];

export const CURRENT_GOAL = '{{要確認: 現在の目標}}';

/** 英語プロフィール（/en 用） */
export const PROFILE_EN = {
  summary: '{{要確認: English profile summary (4-5 sentences)}}',
  facts: [
    { label: 'Name', value: 'Sakura Yokomine' },
    { label: 'Date of birth', value: '{{要確認: date of birth}}' },
    { label: 'Birthplace', value: '{{要確認: birthplace}}' },
    { label: 'Turned professional', value: '{{要確認: year turned professional}}' },
    { label: 'Tour', value: '{{要確認: tour}}' },
  ] as Fact[],
  career: '{{要確認: English career summary}}',
  currentGoal: '{{要確認: English current goal}}',
};
