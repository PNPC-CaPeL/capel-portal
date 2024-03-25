// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@nuxt/content', '@nuxtjs/tailwindcss'],
  devtools: { enabled: false },
  ssr: true,
  experimental: {
    componentIslands: true
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'fr',
        name: 'Français',
      },
      {
        code: 'en',
        name: 'English',
      },
    ],
    defaultLocale: 'fr',
  },
  content: {
    locales: ['fr', 'en'],
  },
  app: {
    head: {
      title: 'CaPel',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'description',
          content: `Le Carnet de Plongée en Ligne (CaPeL)`,
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.svg' }],
    },
  },
  runtimeConfig: {
    LCK_BASE_PATH: '', // see NUXT_LCK_BASE_PATH in .env
    LCK_DB_UUID: '', // see NUXT_LCK_DB_UUID in .env
    LCK_USERNAME: '', // see NUXT_LCK_USERNAME in .env
    LCK_PASSWORD: '', // see NUXT_LCK_PASSWORD in .env
  },
})
