# TRY'S コーポレートサイト

株式会社TRY'S のコーポレートサイト（構築インプット v1.4 準拠）。
フレームワークなしの静的サイト。ビルドは Shot Navi 製品セクションの生成のみ。

- サイトURL（公開予定）: https://trys-inc.co.jp
- 二層運用: ブランド表現層（トップ／私たちについて／取扱ブランド）＋ 実務層（事業内容／会社概要／問い合わせ／プライバシーポリシー）

## 構成

```
/                       トップ
/about/                 私たちについて
/business/              事業内容
/brands/                取扱ブランド
/brands/smeg/           SMEG（販売・メディア運営）
/brands/shot-navi/      Shot Navi（正規代理店）
/company/               会社概要（経営陣）
/contact/               お問い合わせ
/privacy/               プライバシーポリシー
/404.html               404ページ
assets/                 CSS・JS・画像（撮り下ろし15点）
data/shot-navi-products.json   Shot Navi 製品データ（唯一の出典）
scripts/build-products.mjs     製品セクション生成
scripts/precheck.sh            公開前チェック（禁止語・表記ゆれ）
```

## 更新の手順

### Shot Navi の製品を差し替える

`data/shot-navi-products.json` を編集し、生成スクリプトを実行する。
HTML（`brands/shot-navi/index.html` のマーカー区間）は直接編集しない。

```
node scripts/build-products.mjs
```

製品が12点を超えたらカテゴリーごとにページを分ける（v1.4 第4-6章）。

### 公開前チェック

```
bash scripts/precheck.sh
```

禁止語（第6章）、「TRY'S INC.」・後株表記、機種依存のローマ数字、
「〜ではなく」構文と「物語」「共感」の使用回数を検査する。

## 設定箇所（公開前に埋める）

`assets/js/site.js` の `siteConfig`:

- `urls.smegStories` — 設定済み（https://smeg-stories.com）
- `urls.smegOnlineStore` — SMEGオンラインストアのURL（未設定の間、リンクは自動で非活性表示）
- `urls.trysStore` — TRY'S STORE（開店後に設定。それまで「準備中」表示）
- `contactEndpoint` — フォーム送信API（Resend / SendGrid 等）。未設定の間は info@ 宛のメール案内にフォールバック

社名・連絡先はすべて `siteConfig` から出力する（表記ゆれ防止／v1.2確定）。

## 決定事項（2026-08-19）世界観規定書v3「挑戦の質 版」を適用

- 中心思想は「あなたの挑戦の質を上げるものを揃える。」。v2の「所有の悦びを、静かに湧き立たせる。」は社内理念として保存し、対外コピーには使用しない
- トップのステートメントを確定版（変更禁止）に差し替え。ABOUT・BUSINESS・BRANDSを改稿し、BRANDSは三列構成（勝負の道具／楽しみの道具／休息の道具）に
- 会社概要の締めは「それぞれの経験を、あなたの挑戦へ。」
- 禁止語に「頑張れ」「時間がない」を追加（precheck.sh に反映）
- 「〜ではなく」構文はSMEGヒーロー・SHOTLYZERの2回のみに収束
- 文体ルール：定義形を使わない（自己定義のみ可）／読み手の内面を先回りしない／世間との対比で上に立たない／命令形・決めゼリフ・対句の多用を避ける
- BUSINESSの循環図（MEDIA→SALES→CONTENT）は旧世界観の構成のため撤去
- Shot Naviページの「Shot Naviとは」「なぜ扱うのか」と事実バッジを挑戦の質 版に改稿。横峯さくらへの言及は新コピーに含まれないため撤去（掲出可否の確認事項も解消）
- 製品8点のコピーもv3の文体ルールで書き直し（定義形・決めゼリフを含む旧コピーを置換。「〜ではなく」はSMEGヒーローの1回のみに）
- トップのブランドステートメント帯（ポエム）は掲載しない（2026-08-19の指示で撤去。トップはヒーロー→事業→取扱ブランドの構成）

## 決定事項（2026-08-13）

- 「〜ではなく」構文はステートメント詩文・SMEGヒーロー・SHOTLYZERの3か所を維持（詩文は上限2回のカウント外）
- `/about/` のチーム面は写真なしで構成する（A-3の撮影・配置は行わない）
- VELLIX v14／EXCEEDS／SHOTLYZER／INSOLYIS のタイポグラフィプレート表示を承認
- SMEG STORIES のURLは https://smeg-stories.com
- PRECIS LM は発売済みを確認。掲載を継続

## 公開までの残作業（v1.4 第12章より）

- [ ] Shot Naviセクションの事実関係（発売年・PGA認定/推奨の別・日本製の範囲）をテクタイトに最終確認
- [ ] 画像のWebP変換（現状はJPEG。この環境に変換ツールがないため未実施）
- [ ] テクタイトから正式な取扱機種リスト・価格表（メーカー希望小売価格）を取り寄せ、JSONと照合
      （VELLIX v14／EXCEEDS／SHOTLYZER／INSOLYIS のタイポグラフィプレート表示は承認済み。
        後日公式素材へ差し替える場合は、黒背景を アイボリー #F5F1E8 に置換して彩度を落とす）
- [ ] 「正規代理店」の表記・掲載位置についてテクタイトの了承
- [ ] DNS・info@ メール・SPF／DKIM／DMARC 設定
- [ ] プライバシーポリシーの専門家確認（第4項は導入する解析ツールに合わせて修正）
- [ ] OGP画像の専用作成（現状はA-1ヒーロー写真を流用）
- [ ] www 有無の301統一・https強制（ホスティング側設定）
- [ ] Search Console・解析ツール登録、SMEG STORIES 側フッターへの運営者リンク追加
