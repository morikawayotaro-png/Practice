# デプロイとドメイン切り替え手順

## 0. 公開前にプレビューURLだけ先に見る（推奨）

ドメインを切り替えずに、実際のサイトとして触れる状態を先に作れる。
`https://<プロジェクト名>-<ハッシュ>.vercel.app` という一時URLが発行され、
yokomine-sakura.com には一切影響しない。関係者への共有もこのURLで足りる。

1. [vercel.com](https://vercel.com) にGitHubアカウントでログイン。
2. **Add New → Project** → `morikawayotaro-png/Practice` を選んで **Import**。
   （リポジトリが出てこない場合は、GitHub連携の画面で対象リポジトリへのアクセスを許可する）
3. 設定はAstroとして自動検出される。次を確認して **Deploy**。
   - Framework Preset: **Astro**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`（`npm ci` でもよい）
   - Node.js Version: **22.x**
4. **重要**: 現時点で作業内容は `claude/yokomine-sakura-site-v9oxcc` ブランチにある。
   `main` にはまだ何も入っていないため、初回のデプロイは失敗する。
   デプロイ後に **Settings → Git → Production Branch** を
   `claude/yokomine-sakura-site-v9oxcc` に変更し、**Deployments → 最新 → Redeploy** を実行する。
   （または先に `main` へマージしておけば、この手順は不要）
5. 発行されたURLを開いて全ページを確認する。
   以降、このブランチにpushするたびに自動で更新される。

ローカルで見る場合は次の通り。Node.js 22が必要。

```bash
git clone https://github.com/morikawayotaro-png/Practice.git
cd Practice
git checkout claude/yokomine-sakura-site-v9oxcc
npm ci
npm run dev      # http://localhost:4321
```

## 1. Vercelへのデプロイ（本番）

1. GitHubにこのリポジトリをpushする（このリポジトリは push 済み）。
2. [vercel.com](https://vercel.com) にログインし、**Add New → Project** からこのリポジトリを選ぶ。
3. 設定はほぼ自動検出される。念のため次を確認する。
   - Framework Preset: **Astro**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Node.js Version: 22.x
4. **Deploy** を押す。`https://<プロジェクト名>.vercel.app` で確認できる。
5. `vercel.json` のリダイレクトとヘッダーは自動で適用される。

以降、`main`（または本番ブランチ）へのpushで自動デプロイされる。
プルリクエストごとにプレビューURLが発行されるので、原稿差し替えはプレビューで確認してからマージする。

## 2. 公開前にやること

- `npm run check:all` がすべて通ること（`check:pending` の残件がゼロ）。
- `docs/launch-checklist.md` を上から順に消し込む。

## 3. DNS切り替え（Studio → Vercel）

### 3-1. 2〜3日前: TTLを短くする

ドメインを管理しているDNS（お名前.com、Route53、Cloudflareなど）で、
`yokomine-sakura.com` と `www` のレコードのTTLを **3600秒 → 300秒** に下げる。
切り替え時に旧サイトと新サイトが混在する時間を短くできる。

### 3-2. Vercel側にドメインを追加

1. Vercelのプロジェクト → **Settings → Domains**。
2. `yokomine-sakura.com` を追加。続けて `www.yokomine-sakura.com` も追加し、
   どちらかをリダイレクト先に設定する（apexを正、wwwをapexへリダイレクトが分かりやすい）。
3. 表示されるDNSレコードを控える。通常は次のどちらか。
   - Aレコード: `76.76.21.21`（Vercelが画面に表示する値を必ず使う）
   - CNAME（wwwなどのサブドメイン）: `cname.vercel-dns.com`

### 3-3. DNSレコードを書き換える

1. Studio向けに設定していた A / CNAME レコードを、3-2で控えた値に差し替える。
   （Studioのレコードは削除するのではなく、書き換える）
2. TXT・MXレコード（メール、認証用）は**触らない**。誤って消すとメールが止まる。
3. 反映を確認する。

```bash
dig yokomine-sakura.com +short
dig www.yokomine-sakura.com +short
curl -sI https://yokomine-sakura.com | head -20
```

4. Vercelの Domains 画面が **Valid Configuration** になり、証明書（Let's Encrypt）が
   自動発行されるのを待つ（通常数分）。

### 3-4. 切り替え後の確認

- 全14ページをスマホ実機で開く。
- 旧サイトのURLからのリダイレクトが効いているか確認する（3-5参照）。
- Google Search Console にプロパティを追加し、`https://yokomine-sakura.com/sitemap-index.xml` を送信する。
- 表示が安定したら（1週間程度）、TTLを元の値（3600秒など）に戻す。

### 3-5. 旧URLからのリダイレクト

1. 旧サイト（Studio）の公開ページURLをすべて `docs/redirects.csv` に書く。

   ```csv
   old,new,status
   /about,/profile,301
   /news-list,/news,301
   ```

2. `npm run redirects` を実行すると `vercel.json` の `redirects` が更新される。
3. コミットしてpushすると、デプロイ後に301リダイレクトが有効になる。
4. 確認する。

```bash
curl -sI https://yokomine-sakura.com/about | head -3   # 301 と location: /profile が返る
```

### 現在の対応表（2026年8月時点）

| 旧URL | 新URL | 備考 |
|---|---|---|
| `/` | `/` | 変更なし。リダイレクト不要 |
| `/news` | `/news` | 変更なし。リダイレクト不要 |
| `/profile` | `/profile` | 変更なし。リダイレクト不要 |
| `/mother` | `/stories/tour-life` | 301 |
| `/contact` | `/partners` | 301 |
| `/posts/:slug` | `/news` | 301。旧サイトの個別記事URLをすべて一覧へ送るワイルドカード |

トップ・NEWS一覧・PROFILEはパスが同じなので、リダイレクトなしでそのまま表示される。
（旧URLの被リンクと検索評価がそのまま引き継がれる）

旧サイトにスポンサー一覧とメディアの独立ページはなく（スポンサーはトップページ下部に掲載）、
上記で旧サイトの全URLを網羅している（2026年8月に確認済み）。

## 4. 切り戻し

DNSのレコードをStudioの値に戻せば元に戻る。TTLを300秒にしてあれば5分程度で戻る。
（この理由でも、切り替え当日までTTLは戻さない）
