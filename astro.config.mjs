import { defineConfig } from 'astro/config';

// 公開先: https://tzug1729.github.io/portfolio/
// 別の場所へ置くときは SITE_URL / BASE_PATH で上書きする。
// 例) BASE_PATH=/ SITE_URL=https://example.com npm run build
const site = process.env.SITE_URL ?? 'https://tzug1729.github.io';
const base = process.env.BASE_PATH ?? '/portfolio';

export default defineConfig({
  site,
  base,
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      // 日本語は接頭辞なし: /works/atm-simulator
      // 英語は /en 配下:     /en/works/atm-simulator
      prefixDefaultLocale: false,
    },
  },
});
