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
EXIFの回転は自動補正する。長辺は `hero/` が2000px、それ以外は1600px。
1枚500KBを超える場合は、品質→幅の順に落として500KB以内に収める。

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
| `stories/airport-travel.jpg` | ゴルフバッグとスーツケースを押して空港に立つ横峯さくら | `/stories/tour-life`（本文写真） |
| `stories/desert-course-pointing.jpg` | サボテンのコースで打つ方向を指す横峯さくら | `/stories/tour-life`（ギャラリー） |
| `stories/desert-course-wide.jpg` | 山並みとサボテンが見えるコースのグリーン | `/stories/tour-life`（ギャラリー） |
| `stories/city-street-tower.jpg` | タワーが見える街の交差点の横峯さくら | `/stories/tour-life`（ギャラリー） |
| `stories/city-street-portrait.jpg` | 街路樹の並ぶ通りに立つ横峯さくら | `/stories/tour-life`（ギャラリー） |
| `stories/beach-sunset.jpg` | 夕方の海辺の横峯さくらと子ども | `/stories/tour-life`（本文写真） |
| `stories/airport-terminal-christmas.jpg` | クリスマスツリーが飾られた空港ターミナル | `/stories/tour-life`（ギャラリー） |
| `stories/train-station-hall.jpg` | アーチ型の屋根が続く駅のコンコース | `/stories/tour-life`（ギャラリー） |
| `stories/city-night-billboards.jpg` | 電光看板が並ぶ夜の街の交差点 | `/stories/tour-life`（ギャラリー） |
| `stories/home-cooking.jpg` | 滞在先のキッチンで野菜を炒める横峯さくら | `/stories/tour-life`（ギャラリー） |
| `stories/airport-with-child.jpg` | スーツケース2つの横で子どもと並ぶ横峯さくら | `/stories/tour-life`（ギャラリー） |
| `stories/cathedral-night.jpg` | 夜の広場で大聖堂を背にした横峯さくら | `/stories/tour-life`（ギャラリー） |
| `stories/meal-with-child.jpg` | 食事の席で子どもと並ぶ横峯さくら | `/stories/tour-life`（ギャラリー） |
| `comeback/with-child-grass.jpg` | 草地で子どもと顔を寄せて笑う横峯さくら | `/stories/comeback`（本文写真） |
| `childcare-on-tour/practice-range-with-child.jpg` | 練習場で子どものスイングに手を添える横峯さくら | `/stories/childcare-on-tour`（本文写真） |
| `stories/walking-with-child.jpg` | 子どもと手をつないで歩く横峯さくら | `/stories/tour-life`（ギャラリー） |
| `sakura-baton/talking-to-children.jpg` | フットサルクラブの子どもたちに話す横峯さくら | `/sakura-baton`（本文写真） |
| `sakura-baton/group-with-children.jpg` | フットサルクラブの子どもたちとの集合写真 | `/sakura-baton` |
| `sponsors/golf-bag.jpg` | ゴルフバッグからクラブを取り出す横峯さくら | `/sponsors`（用具） |
| `sponsors/club-factory.jpg` | 工房でアイアンヘッドを確かめる横峯さくら | `/sponsors`（用具） |
| `sakura-baton/figador-sumida-jersey.jpg` | SAKURA BATONのロゴが入った背番号4のユニフォーム | `/sakura-baton` |
| `sponsors/golf-shoe.jpg` | ゴルフシューズを手に持つ横峯さくら | `/sponsors` |
| `sponsors/smeg-sparkling-water.jpg` | SMEGのスパークリングウォーターメーカーと横峯さくら | `/sponsors` |
| `sponsors/smeg-kettle.jpg` | SMEGの電気ケトルを持つ横峯さくら | `/sponsors` |

### 保留（`_pending/`。公開していない）

| ファイル | 内容 | 保留の理由 |
|---|---|---|
| `_pending/illustration_v1.png` | フォロースルーの横位置ワイド画像 | 加工または生成画像の可能性があり、素材の出自を確認したい |

公開する場合は `photos/` 側の通常フォルダへ移動し、`npm run photos` を実行してページに配置する。

子どもが写っている写真は、2026年8月に掲載可の確認を得たうえで使用している
（名前は扱わない。CLAUDE.mdルール5）。

ギャラリーのキャプションを `{{要確認: この写真の撮影地と年月}}` にしてある。
撮影地と年月が分かったら `src/content/stories/tour-life.md` の `gallery` の
`caption` を書き換える。

## まだ足りない写真

- スポンサーロゴ（`/sponsors` の各社ロゴ画像。altは正式社名を入れる）
- `/media`、`/partners`、`/news` 用の写真（現状は写真なし）
