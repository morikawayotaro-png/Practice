# 大山志保 公式サイト

プロゴルファー大山志保の公式サイト。AI検索（ChatGPT、Gemini、Perplexity、Claude、GoogleのAI Overviewなど）が
事実を正確に引用できる構造を最優先に設計している。

## 構成

- **Astro 5**（静的出力、クライアントJSなし）
- **@astrojs/sitemap** で `sitemap-index.xml` を自動生成
- 事実データは `src/data/` に集約。本文・JSON-LD・`/llms.txt` はすべて同じデータを参照する

```
src/
  data/        事実データ（ここだけを更新すればサイト全体に反映される）
    profile.ts   プロフィール、公式リンク、年齢の算出
    wins.ts      JLPGAツアー優勝18試合
    timeline.ts  年表（年月・出来事・出典の3点セット）
    season.ts    今季の出場と結果、最終更新日
    faq.ts       よくある質問（回答は各120字以内）
    site.ts      ドメイン、問い合わせ先、フォーム送信先、OGP画像
  layouts/Base.astro    共通のhead、Person構造化データ、ヘッダー、フッター
  components/           JsonLd、英語要約
  pages/                各ページ、robots.txt、llms.txt
scripts/validate-jsonld.mjs   構造化データとメタ情報の点検
```

## コマンド

```bash
npm install
npm run dev       # 開発サーバー
npm run build     # dist/ に静的出力
npm run validate  # dist/ の JSON-LD・canonical・description・h1 を点検
```

`npm run validate` は `npm run build` のあとに実行する。

## 更新のしかた

| 更新したいもの | 編集するファイル |
| --- | --- |
| 今季の出場・結果 | `src/data/season.ts`（`lastUpdated` も必ず更新する） |
| 優勝の追加 | `src/data/wins.ts` |
| 年表への追加 | `src/data/timeline.ts`（出典URLを必ず付ける） |
| FAQの追加・修正 | `src/data/faq.ts`（回答は120字以内、最初の一文で結論） |
| ドメイン・連絡先 | `src/data/site.ts` と `astro.config.mjs` の `site` |

## 書き方の決まり

- 各ページの最初の段落は、そのページが答える問いへの結論から始める
- 見出しは事実文か疑問文にする。装飾的な見出しは使わない
- 固有名詞は初出でフルネームと属性を書く（「大山志保（プロゴルファー、2006年賞金女王）」）
- 数字には年や単位を付ける。一文一情報を心がける
- 出典が確認できない事実は書かない。`[要確認]` を残して後から埋める
- 2022年からの体調不良について、病名は公表されていない。本人が公の場で使っている
  「原因不明の病」以上に踏み込まない。病名の推測や医学的な説明を加えない
- 画像のalt属性は内容を具体的に書く。人物写真は「大山志保、2026年アクサレディスにて」の形式

## AI検索向けの実装

- 全ページに `Person` の構造化データ（`alternateName`、`birthPlace`、`award`、`sameAs` を含む）
- `/story` `/records` `/now` に `ItemList`（`Event` / `SportsEvent`）、`/faq` に `FAQPage`、
  `/partners` `/speaking` に `Service` / `Offer`
- `/robots.txt` で GPTBot、ClaudeBot、PerplexityBot、Google-Extended、CCBot、anthropic-ai などを明示的に許可
- `/llms.txt` にサイトの要約、核となる事実、主要ページ、優勝一覧、年表、FAQを出力
- canonical、OGP、descriptionを全ページに設定。descriptionはそのページの結論を1文で

## 公開前に必要な作業

1. `src/data/site.ts` と `astro.config.mjs` の `site` を本番ドメインに差し替える
2. 問い合わせ先メールアドレスを設定する。フォームを使う場合は `site.ts` の `formEndpoint` に
   フォームサービスのエンドポイントを入れる（入れると `/contact` がフォーム表示に切り替わる）
3. 写真を `public/` に置き、`site.ts` の `ogImage` を設定する
4. 公開後、Googleのリッチリザルトテスト（https://search.google.com/test/rich-results）と
   schema.org のバリデータで構造化データを検証する。どちらも公開URLが必要なため公開後に実行する
5. Google Search Console にサイトマップ（`/sitemap-index.xml`）を登録する

## 未確定事項

`[要確認]` として本文とコード中に残している。一覧は `grep -rn "要確認" src/` で取得できる。
