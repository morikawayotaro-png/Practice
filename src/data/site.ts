export const site = {
  title: '大山志保 公式サイト',
  /** [要確認] 本番ドメイン確定後に astro.config.mjs の site も合わせて差し替える */
  origin: 'https://shiho-oyama.example.com',
  /** [要確認] 問い合わせ先メールアドレス */
  contactEmail: 'contact@example.com',
  /**
   * 問い合わせフォームの送信先。Formspree など静的サイト向けのフォームサービスの
   * エンドポイントを入れると、/contact がフォーム表示に切り替わる。
   * 空のあいだはメールでの問い合わせ導線を表示する。 [要確認]
   */
  formEndpoint: '' as string,
  nav: [
    { href: '/', label: 'トップ' },
    { href: '/story', label: 'ストーリー' },
    { href: '/records', label: '記録' },
    { href: '/now', label: 'いま' },
    { href: '/partners', label: 'パートナー' },
    { href: '/speaking', label: '講演・メディア' },
    { href: '/faq', label: 'よくある質問' },
    { href: '/contact', label: 'お問い合わせ' },
  ],
} as const;
