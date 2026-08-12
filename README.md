# TRY'S コーポレートサイト

「TRY'S コーポレートサイト 構築インプット v1.4」に基づく静的サイトの実装。

## 構成

```
/                       トップ
/about/                 私たちについて（思想・チーム）
/business/              事業（メディア／セールス／プロダクト）
/brands/                取扱ブランド
/brands/smeg/           SMEG
/brands/shot-navi/      Shot Navi（正規代理店）
/company/               会社概要（経営陣を含む）
/contact/               お問い合わせ
/privacy/               プライバシーポリシー
/404.html               404ページ
assets/css/style.css    共通スタイル（第5章のデザイン規定）
assets/js/site.js       共通スクリプトとサイト設定（siteConfig）
assets/js/shot-navi.js  Shot Navi 製品一覧の描画
assets/js/contact.js    お問い合わせフォーム（第10章）
data/shot-navi-products.json  Shot Navi 製品データ（唯一の出典）
scripts/precheck.mjs    公開前チェック（第12章）
```

## 運用ルール

- **社名・連絡先・外部リンクは `assets/js/site.js` の `siteConfig` から出力する。** HTML側に直接書き足さないこと（表記ゆれ防止。第1章）。
- **Shot Navi の製品情報は `data/shot-navi-products.json` の差し替えのみで更新する。** 型番・価格・仕様はテクタイトの公式データが唯一の出典。
- 写真はすべて撮り下ろし（第9章のカットリスト）への差し替え前提。プレースホルダーには `data-cut` 属性でカット番号を付けてある。
- コピーの追加・変更時は `node scripts/precheck.mjs` を実行し、禁止語と構文回数の規定（第6章）を確認する。

## 公開前に設定が必要な項目

`assets/js/site.js` の `siteConfig` 内:

| 項目 | 内容 |
|---|---|
| `links.smegOnlineStore` | SMEG オンラインストアのURL |
| `links.trysStore` | TRY'S STORE のURL（開店後） |
| `contactEndpoint` | フォーム送信API（Resend / SendGrid 等）。未設定の間はメール作成にフォールバック |

URL未設定の外部ボタンは自動的に押せない状態になり、リンク切れのまま公開されない。

このほか、OGP画像（`assets/ogp.png`）の制作、送信ドメイン認証（SPF・DKIM・DMARC）、`www` 有無の301統一とhttps強制（サーバー設定）、プライバシーポリシーの専門家確認が公開前の残作業（第12章）。
