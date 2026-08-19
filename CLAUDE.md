# プロジェクト概要

プロゴルファー横峯さくらの公式サイト（yokomine-sakura.com）の再構築。
目的は2つ。
1. ChatGPT・Gemini・Perplexity・Google AI OverviewsなどのAI検索が、
   本サイトを一次情報として読み取り、引用できる状態にすること
2. 名前を知らない人の質問（子育てと両立するアスリートは？など）への
   AIの回答に、横峯さくらが登場する状態を作ること

設計の詳細は docs/master-plan.md、原稿は docs/content-v2.md にある。
作業前に両方を読むこと。

# 技術スタック

- Astro（静的生成）+ Tailwind CSS
- コンテンツはMarkdown管理（Astro Content Collections）
  - news と stories の2コレクション。Markdownファイル追加で記事が増える構造
- デプロイ先はVercel
- gitで管理。フェーズ完了ごとにコミットする

# 絶対に守るルール

1. 全ページ、本文テキストが完全にHTMLソースに含まれること。
   クライアントサイドレンダリング依存の実装は禁止。
2. 事実情報（戦績、日付、人物情報、スポンサー名）を docs/content-v2.md に
   ない内容で補って書かない。不明箇所は {{要確認: 内容}} を置く。
3. 文章は事実ベースで簡潔に。誇張表現や飾った言い回しは使わない。
4. 「最近」「先日」は使わず、必ず年月を書く。
5. 子どもの名前・顔写真は扱わない。
6. すべての画像にalt属性。スポンサーロゴのaltは正式社名をそのまま入れる。
7. 言語は日本語（/en のみ英語）。

# サイト構成（14ページ）

1. /            トップ：定義文＋タグライン「その姿が、誰かの選択肢になれたら」＋最新ニュース3件
2. /profile     プロフィール：冒頭要約→基本情報→三幕構成の経歴→戦績表→現在の目標
3. /challenge   今の挑戦：永久シードの現在地。storiesへのハブを兼ねる
4. /stories/tour-life        家族と旅するツアー暮らし
5. /stories/comeback         妊娠7カ月での出場と産後復帰
6. /stories/childcare-on-tour ツアーに託児所を
7. /stories/eternal-seed     永久シードへの挑戦とは
8. /sakura-baton 社会貢献：3本柱（競技・発信・社会貢献）とSakura Birdie Fund
9. /faq         よくある質問8問
10. /sponsors   スポンサー一覧：AFFILIATION/SPONSORS/用具別/SUPPORTERSの区分
11. /partners   スポンサーシップ・出演のご案内：依頼窓口はHERITAGE合同会社
12. /news       ニュース一覧＋個別記事
13. /media      メディア出演・掲載履歴
14. /en         英語プロフィール

# storiesページの型（最重要）

/stories/ 配下の4ページは以下の型を厳守：
- タイトルは質問への答えになる宣言文
- 冒頭段落だけで質問への回答が完結すること（誰が・何を・いつから・なぜを4〜5文で)
- H2見出しはユーザーの質問文そのまま（例:「なぜ家族でツアーを回るのか」）。
  見出し直後の2〜3文で答えを書き、詳細はその後
- 数字と日付を各ページ最低5つ含める
- 本人の一人称コメントを引用ブロックで1箇所
- 末尾に関連ページへのリンク3本

# LLMO技術要件

- JSON-LD構造化データ：
  - /profile に Person（sameAs: Wikipedia, JLPGA選手ページ, Instagram, アメブロ）
  - /faq に FAQPage
  - /stories/* に Article
  - /news/* に NewsArticle
- robots.txt：全クローラー許可。GPTBot / ClaudeBot / PerplexityBot /
  Google-Extended / CCBot を明示的にAllow
- ルートに llms.txt（サイト概要と主要ページ案内）
- sitemap.xml 自動生成
- 全ページに更新日を表示
- 全ページに個別のOGPとmeta description（トップのdescriptionは定義文）

# デザイン方針

- 写真主役、余白の多いシンプルな構成
- オフホワイト基調＋桜色をアクセントに少量
- 見出しNoto Serif JP、本文Noto Sans JP
- スマホ表示を最優先で確認
- 過度なアニメーションは入れない

# 実装メモ（このリポジトリ固有）

- 開発: `npm run dev` / 本番ビルド: `npm run build`
- 検証: `npm run check:all`
  - `check:build` … dist/ のHTMLに本文とJSON-LDが含まれるか
  - `check:aeo`   … storiesと/faqがAEOの型を満たすか（表で出力）
  - `check:pending` … 残っている {{要確認}} の一覧
- 原稿（docs/content-v2.md）とマスタープラン（docs/master-plan.md）が
  未提供の箇所は、すべて {{要確認: ...}} を置いてある。
  原稿が届いたら {{要確認}} を置換していく運用。
- 事実が入る場所のデータは src/data/ に集約してある
  （profile.ts / sponsors.ts / media.ts / faq.ts / site.ts）。
  ページのレイアウトを触らずに事実だけ差し替えられる。
