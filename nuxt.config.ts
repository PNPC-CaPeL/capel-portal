// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  devtools: { enabled: false },
  i18n: {
    vueI18n: './i18n.config.ts',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'fr',
        name: 'Français'
      },
      {
        code: 'en',
        name: 'English'
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
          hid: 'description',
          name: 'description',
          content: `Le Carnet de Plongée en Ligne (CaPeL)`,
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/icon.svg' }
      ],
    },
  },
  runtimeConfig: {
    lckBasePath: 'https://locokit.makina-corpus.net/api', // see NUXT_PUBLIC_LCK_BASE_PATH in .env
    lckDbUuid: '', // see NUXT_PUBLIC_LCK_DB_UUID in .env
    lckUsername: '', // see NUXT_PUBLIC_LCK_USERNAME in .env
    lckPassword: '' // see NUXT_PUBLIC_LCK_PASSWORD in .env
  }
})
