// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://yokomine-sakura.com',
  trailingSlash: 'ignore',
  build: {
    // 全ページを静的HTMLとして書き出す（本文はHTMLソースに完全に含まれる）
    format: 'directory',
  },
  integrations: [
    sitemap({
      // canonical（末尾スラッシュなし）と表記を揃える
      serialize: (item) => ({
        ...item,
        url: item.url.replace(/(.+)\/$/, '$1'),
      }),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
