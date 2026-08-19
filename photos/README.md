# photos/

写真素材を置くフォルダ。ここに置いた原本を、公開用に変換して `public/photos/` に書き出す。

## 置き方

```
photos/
├── hero/          トップのヒーロー画像
├── profile/       プロフィール写真
├── stories/       storiesページ用
├── news/          ニュース記事用
└── sponsors/      スポンサーロゴ（正式社名がわかるファイル名にする）
```

## 変換

`npm run photos` で `photos/` のJPG/PNGをWebPに変換し、`public/photos/` に書き出す。
ファイル名（拡張子を除く）とフォルダ構成はそのまま引き継がれる。

## alt属性のルール

- 「誰が何をしている写真か」を日本語で書く（例: ティーショットを打つ横峯さくら）
- スポンサーロゴのaltは**正式社名をそのまま**入れる
- 子どもの名前・顔写真は扱わない

## 現在入っている素材（2026年8月）

| ファイル | 内容 | 使用ページ |
|---|---|---|
| `hero/golf-portrait.jpg` | EPSONのキャップ姿でゴルフシューズを持つ横峯さくら | `/`（ヒーロー画像） |
| `sakura-baton/figador-sumida-jersey.jpg` | SAKURA BATONのロゴが入った背番号4のユニフォームを持つ横峯さくら | `/sakura-baton` |
| `sponsors/smeg-sparkling-water.jpg` | SMEGのスパークリングウォーターメーカーと横峯さくら | `/sponsors` |
| `sponsors/smeg-kettle.jpg` | SMEGの電気ケトルを持つ横峯さくら | `/sponsors` |
| `stories/tour-life-beach.jpg` | 夕方の海辺を歩く横峯さくらと子ども | **未使用**（下記参照） |

`stories/tour-life-beach.jpg` は子どもが写っているため、CLAUDE.mdのルール5
（子どもの名前・顔写真は扱わない）に照らして掲載の可否を確認するまで、
`public/photos/` には書き出していない（サイトからは参照されない）。
掲載する場合は `npm run photos` を再実行し、`/stories/tour-life` に配置する。

## まだ足りない写真

- `/profile` のプロフィール写真（正面）
- `/challenge` の試合中の写真
- スポンサーロゴ（`/sponsors` の各社ロゴ画像）
- OGP画像（`public/ogp/default.png` は仮の生成物）
