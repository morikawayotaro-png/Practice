# 横峯さくら オフィシャルサイト

プロゴルファー横峯さくらの公式サイト（yokomine-sakura.com）。
AI検索が一次情報として読み取り、引用できる状態にすることを目的に構築している。

設計とルールは [CLAUDE.md](./CLAUDE.md)、
サイト設計は [docs/master-plan.md](./docs/master-plan.md)、
原稿は [docs/content-v2.md](./docs/content-v2.md) にある。

## 開発

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ に静的HTMLを出力
npm run preview  # ビルド結果をローカルで配信
```

## 検証コマンド

```bash
npm run check:all       # build → 下の3つをまとめて実行
npm run check:build     # dist/ のHTMLに本文とJSON-LDが入っているか
npm run check:aeo       # storiesと/faqがAEOの型を満たしているか（表で出力）
npm run check:pending   # 残っている {{要確認}} の一覧
npm run check:pending -- --strict   # 1件でも残っていたら終了コード1（公開前用）
```

## ページを増やす・書き換える

| やりたいこと | 触るファイル |
|---|---|
| ニュースを1本追加 | `src/content/news/` に Markdown を1ファイル追加（`_template.md` をコピー） |
| storiesの本文を直す | `src/content/stories/*.md` |
| プロフィールの事実を直す | `src/data/profile.ts` |
| スポンサーを直す | `src/data/sponsors.ts` |
| メディア履歴を直す | `src/data/media.ts` |
| FAQの回答を直す | `src/data/faq.ts` |
| 定義文・連絡先・SNSのURL | `src/data/site.ts` |
| 各ページのmeta descriptionと更新日 | `src/data/pages.ts` |

事実情報はすべて `src/data/` と `src/content/` に集約してある。
レイアウトを触らずに事実だけ差し替えられる。

### ニュースを1本追加する

```bash
cp src/content/news/_template.md src/content/news/2026-09-01-example.md
# frontmatter の title / description / publishDate を書き、draft: false にする
```

ファイル名がURLになる（`/news/2026-09-01-example`）。
トップの最新3件、`/news` 一覧、`llms.txt`、`sitemap.xml` に自動で反映される。

## 写真

`photos/` に原本を置き、`npm run photos` で WebP に変換して `public/photos/` に書き出す。
詳細は [photos/README.md](./photos/README.md)。

## 公開

- 手順: [docs/deploy.md](./docs/deploy.md)（Vercelデプロイ、DNS切り替え、リダイレクト）
- 公開前チェック: [docs/launch-checklist.md](./docs/launch-checklist.md)
- 公開後モニタリング: [docs/monitoring.md](./docs/monitoring.md)

旧サイトからのリダイレクトは `docs/redirects.csv` を埋めて `npm run redirects` を実行すると
`vercel.json` に反映される。

## 構成

```
src/
├── content/          Markdown（news / stories）
├── content.config.ts Content Collectionsの定義
├── data/             事実情報（profile / sponsors / media / faq / site / pages）
├── layouts/          BaseLayout（meta・OGP・JSON-LD）／StoryLayout
├── components/       Header / Footer / JsonLd / PhotoSlot / RelatedLinks など
├── pages/            14ページのルート、llms.txt
└── styles/global.css Tailwind（オフホワイト＋桜色、Noto Serif JP / Noto Sans JP）
```

技術構成は Astro（静的生成）+ Tailwind CSS。
全ページがビルド時にHTMLへ書き出され、本文はHTMLソースに完全に含まれる。
クライアントサイドレンダリングに依存している箇所はない（モバイルメニューも `<details>` で動く）。

## 未確定箇所について

原稿（`docs/content-v2.md`）が未提供のため、事実が入る箇所はすべて
`{{要確認: ...}}` を置いてある。原稿が届いたら置き換える。
残件は `npm run check:pending` で一覧できる。
