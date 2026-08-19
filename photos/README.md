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

`_` で始まるフォルダ・ファイルは `npm run photos` の対象外＝サイトには公開されない。

### 配置済み

| ファイル | 内容 | 使用ページ |
|---|---|---|
| `hero/on-course.jpg` | クラブを手にボールの行方を見つめる横峯さくら | `/` ヒーロー（遅延読み込みなし）／OGP画像の元 |
| `profile/portrait-smile.jpg` | キャップ姿で笑顔の横峯さくら | `/profile` |
| `challenge/reading-green.jpg` | グリーンでパットのラインを読む横峯さくら | `/challenge` |
| `stories/follow-through.jpg` | フォロースルーの姿勢の横峯さくら | `/stories/eternal-seed` |
| `stories/airport-travel.jpg` | ゴルフバッグとスーツケースを押して空港に立つ横峯さくら | `/stories/tour-life` |
| `sakura-baton/figador-sumida-jersey.jpg` | SAKURA BATONのロゴが入った背番号4のユニフォーム | `/sakura-baton` |
| `sponsors/golf-shoe.jpg` | ゴルフシューズを手に持つ横峯さくら | `/sponsors` |
| `sponsors/smeg-sparkling-water.jpg` | SMEGのスパークリングウォーターメーカーと横峯さくら | `/sponsors` |
| `sponsors/smeg-kettle.jpg` | SMEGの電気ケトルを持つ横峯さくら | `/sponsors` |

### 保留（`_pending/`。公開していない）

| ファイル | 内容 | 保留の理由 |
|---|---|---|
| `_pending/tour-life-beach.jpg` | 夕方の海辺を歩く横峯さくらと子ども | 子どもが写っている（CLAUDE.mdルール5） |
| `_pending/illustration_v1.png` | フォロースルーの横位置ワイド画像 | 加工または生成画像の可能性があり、素材の出自を確認したい |
| `_pending/desert-course-pointing.jpg` | 砂漠のコースで方向を指す後ろ姿 | 人物・撮影地・年月が未確認 |
| `_pending/desert-course-wide.jpg` | 砂漠のコースの引きの風景 | 撮影地・年月が未確認 |
| `_pending/street-portrait.jpg` | 海外の街路に立つポートレート | 撮影地・年月が未確認 |
| `_pending/toronto-street.jpg` | タワーが見える街路のポートレート | 撮影地・年月が未確認 |

公開する場合は `photos/` 側の通常フォルダへ移動し、`npm run photos` を実行してページに配置する。

## まだ足りない写真

- スポンサーロゴ（`/sponsors` の各社ロゴ画像。altは正式社名を入れる）
- `/media`、`/partners`、`/news` 用の写真（現状は写真なし）
