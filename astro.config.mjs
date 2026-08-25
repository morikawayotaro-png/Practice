// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE は本番ドメイン確定後にここだけ差し替える（canonical / OGP / sitemap の絶対URLに使用）
// [要確認] ドメイン未定のため仮置き
export default defineConfig({
  site: 'https://shiho-oyama.example.com',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // canonical（末尾スラッシュなし）と表記を揃える
      serialize: (item) => ({ ...item, url: item.url.replace(/(.+)\/$/, '$1') }),
    }),
  ],
  build: { inlineStylesheets: 'always' },
});
