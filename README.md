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

- `urls.smegStories` — SMEG STORIES の正式URL（未設定の間、リンクは自動で非活性表示）
- `urls.smegOnlineStore` — SMEGオンラインストアのURL
- `urls.trysStore` — TRY'S STORE（開店後に設定。それまで「準備中」表示）
- `contactEndpoint` — フォーム送信API（Resend / SendGrid 等）。未設定の間は info@ 宛のメール案内にフォールバック

社名・連絡先はすべて `siteConfig` から出力する（表記ゆれ防止／v1.2確定）。

## 公開までの残作業（v1.4 第12章より）

- [ ] A-3 経営陣ポートレート3枚組の撮影と `/about/` への配置
- [ ] 画像のWebP変換（現状はJPEG。この環境に変換ツールがないため未実施）
- [ ] テクタイトから正式な取扱機種リスト・価格表（メーカー希望小売価格）・商品画像・ブランドアセットを取り寄せ、JSONへ反映
      （VELLIX v14／EXCEEDS／SHOTLYZER／INSOLYIS はタイポグラフィのプレートで仮置き中。
        黒背景の公式素材は背景をアイボリー #F5F1E8 に置換して彩度を落とす）
- [ ] 「正規代理店」の表記・掲載位置についてテクタイトの了承
- [ ] 横峯さくらに触れる一文（/brands/shot-navi/「なぜ扱うのか」）の掲出可否確認
- [ ] PRECIS LM（2026年8月上旬発売）の発売済み確認。未発売なら掲載を外す
- [ ] DNS・info@ メール・SPF／DKIM／DMARC 設定
- [ ] プライバシーポリシーの専門家確認（第4項は導入する解析ツールに合わせて修正）
- [ ] OGP画像の専用作成（現状はA-1ヒーロー写真を流用）
- [ ] www 有無の301統一・https強制（ホスティング側設定）
- [ ] Search Console・解析ツール登録、SMEG STORIES 側フッターへの運営者リンク追加
