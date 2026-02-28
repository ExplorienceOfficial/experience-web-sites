import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://www.explorience.com.tr',
    i18n: {
        defaultLocale: 'tr',
        locales: ['tr', 'en'],
        routing: {
            prefixDefaultLocale: true,
            redirectToDefaultLocale: false,
        },
    },
    integrations: [
        sitemap({
            i18n: {
                defaultLocale: 'tr',
                locales: {
                    tr: 'tr-TR',
                    en: 'en-US',
                },
            },
        }),
    ],
});
