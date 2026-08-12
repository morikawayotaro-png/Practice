# 株式会社TRY'S — コーポレートサイト（1ページ）

名刺デザイン（ネイビー × 生成り × ゴールド / Quiet Luxury）をそのままWebに落とし込んだ、
1ページ完結型のコーポレートサイトです。ビルド不要・静的ファイルのみで動作します。

## 構成

```
index.html              … 全セクションを含む1ページ
assets/css/style.css    … デザイン一式（カラー変数は :root にまとめています）
assets/js/main.js       … ローディング / スクロール演出 / ON・OFF切替 / モバイルメニュー
assets/img/favicon.svg  … ファビコン（ロゴマーク）
```

## セクション

| No. | セクション | 内容 |
| --- | --- | --- |
| — | HERO | ロゴマーク、BETTER ON. BETTER OFF.、挑戦の日も、休息の日も。 |
| 01 | CONCEPT | ブランドの考え方と3つの姿勢（SELECT / DELIVER / TELL） |
| 02 | BUSINESS | ON（TRY'S STORE）/ OFF（ITALIAN STORIES）をタブで切替 |
| 03 | BRANDS | SHOT NAVI / KNOWS PERSONAL / SMEG / Lucaffé |
| 04 | COMPANY | 名刺を再現したカード＋会社概要 |
| 05 | CONTACT | メールでのお問い合わせ |

## デザイン仕様

- カラー：ネイビー `#111f3d` / 生成り `#f7f3ea` / ゴールド `#c3a05a`
- 欧文：Jost（名刺のワイドなレタースペーシングを再現）
- 和文：Noto Sans JP / 見出しは Noto Serif JP（明朝）
- 演出：ロゴのドローイング、スクロールリビール、ブランドカードのホバー、ブランド名のマーキー
- レスポンシブ対応（768px以下でハンバーガーメニュー）、`prefers-reduced-motion` 対応

## 公開方法

静的ホスティングにそのまま置くだけで公開できます。

- GitHub Pages：リポジトリの Settings → Pages → Branch を選択して公開
- Netlify / Vercel / Cloudflare Pages：ビルドコマンドなし、公開ディレクトリはルート

ローカル確認：

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## 内容の更新

- 会社情報・事業内容の文言：`index.html` の該当セクションを編集
- 配色・余白・フォント：`assets/css/style.css` の `:root` を編集
- 取扱ブランドの追加：`index.html` の `.brand-list` に `<li class="brand">` を追加

> 商品説明文はコンセプトに沿って作成した想定文です。実際の表記に合わせて調整してください。
