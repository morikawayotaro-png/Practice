# 株式会社TRY'S — コーポレートサイト

名刺デザイン（ネイビー × 生成り × ゴールド / Quiet Luxury）をそのままWebに落とし込んだ
コーポレートサイトです。ビルド不要・静的ファイルのみで動作します。

## ページ構成

| ファイル | ページ | 内容 |
| --- | --- | --- |
| `index.html` | HOME | ヒーロー、各ページへの導線（ABOUT / BUSINESS / ORIGINAL / COMPANY） |
| `about.html` | ABOUT | コンセプト、3つの姿勢（SELECT / DELIVER / CREATE）、代表メッセージ |
| `business.html` | BUSINESS | ON（TRY'S STORE）/ OFF（ITALIAN STORIES）の切替、取扱ブランド |
| `original.html` | ORIGINAL | **自社開発製品**：つくる理由、開発領域、開発プロセス、開発中プロダクト |
| `company.html` | COMPANY | 会社概要、アクセス |
| `contact.html` | CONTACT | お問い合わせフォーム、連絡先 |

```
assets/css/style.css    … デザイン一式（カラー変数は :root にまとめています）
assets/js/main.js       … ローディング / スクロール演出 / ON・OFF切替 / フォーム
assets/img/favicon.svg  … ファビコン（ロゴマーク）
sitemap.xml, robots.txt … 検索エンジン向け
```

ヘッダー・フッターは各HTMLに直接記述しています（ビルド工程なし）。
メニューを変更する場合は6ファイルすべての `<header>` / `<footer>` を更新してください。

## デザイン仕様

- カラー：ネイビー `#111f3d` / 生成り `#f7f3ea` / ゴールド `#c3a05a`
- 欧文：Jost（名刺のワイドなレタースペーシングを再現）
- 和文：Noto Sans JP / 見出しは Noto Serif JP（明朝）
- 演出：ロゴのドローイング、スクロールリビール、ブランドカードのホバー、ブランド名のマーキー
- レスポンシブ対応（768px以下でハンバーガーメニュー）、`prefers-reduced-motion` 対応

## お問い合わせフォームについて

`contact.html` のフォームは、送信時に入力内容を本文に反映したメールを作成します
（`mailto:` を使用するため、サーバー不要で動作します）。

フォーム送信サービス（Formspree、Googleフォーム等）を使う場合は、
`contact.html` の `<form id="contactForm">` に `action` と `method` を追加してください。
`action` が設定されている場合、JavaScriptは介入せず通常のフォーム送信になります。

```html
<form class="form" id="contactForm" action="https://formspree.io/f/xxxxxxx" method="post">
```

## 公開方法

静的ホスティングにそのまま置くだけで公開できます。

- GitHub Pages：リポジトリの Settings → Pages → Branch を選択して公開
- Netlify / Vercel / Cloudflare Pages：ビルドコマンドなし、公開ディレクトリはルート

ローカル確認：

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

独自ドメインで公開する際は、各HTMLの `canonical` / `og:url`、`sitemap.xml`、`robots.txt` の
URL（`https://www.trys-inc.co.jp/`）が正しいかご確認ください。

## 内容の更新

- 会社情報・事業内容の文言：各HTMLの該当箇所を編集
- 配色・余白・フォント：`assets/css/style.css` の `:root` を編集
- 取扱ブランドの追加：`business.html` の `.brand-list` に `<li class="brand">` を追加
- 自社開発製品の公開：`original.html` の `.soon`（COMING SOON カード）を実際の製品情報に差し替え

> 各ページの説明文はコンセプトに沿って作成した想定文です。実際の内容に合わせて調整してください。
> 特に ORIGINAL ページの「開発中のプロダクト」は仮の内容です。
