# 公開前チェックリスト

コマンドで確認できるものは `npm run check:all` でまとめて実行できる。

- [ ] `dist/` のHTMLに本文が含まれる（テキストエディタで目視 / `npm run check:build`）
- [ ] [validator.schema.org](https://validator.schema.org/) でJSON-LD 4種すべてエラーなし
      （Person=/profile、FAQPage=/faq、Article=/stories/*、NewsArticle=/news/*）
- [ ] [リッチリザルトテスト](https://search.google.com/test/rich-results)で /faq のFAQPageが認識される
- [ ] `robots.txt` と `llms.txt` がブラウザで直接開ける
- [ ] スポンサーロゴすべてにaltで正式社名が入っている
- [ ] `{{要確認}}` が残っていない（`npm run check:pending -- --strict`）
- [ ] 各storiesページと/faqがAEOの型を満たす（`npm run check:aeo` が全項目○）
- [ ] スマホ実機で全14ページ確認
- [ ] DNSのTTLを事前に短縮済み（3600 → 300秒）
- [ ] 旧サイトの全URLが `docs/redirects.csv` に含まれている（`/posts/:slug` のワイルドカードで個別記事は網羅済み。他に固有パスのページがないか最終確認）
- [ ] 旧サイトURLからのリダイレクト動作確認（`curl -sI` で301）
- [ ] トップのmeta descriptionが定義文になっている
- [ ] OGP画像を差し替え済み（`public/ogp/default.png` は仮の生成物）
- [ ] 全ページの更新日が実際の更新日になっている（`src/data/pages.ts` の `UPDATED`）
