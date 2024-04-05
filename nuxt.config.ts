// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@nuxt/content', '@nuxtjs/tailwindcss'],
  devtools: { enabled: false },
  ssr: true,
  experimental: {
    componentIslands: true,
  },
  css: ['~/assets/css/main.scss', 'leaflet/dist/leaflet.css'],
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
    navigation: {
      fields: ['menuTitle', 'title'],
    },
    // locales: ['fr', 'en'],
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
  tailwindcss: {
    config: {
      theme: {
        fontFamily: {
          sans: ['Raleway', 'sans-serif'],
        },
        container: {
          padding: {
            DEFAULT: '1rem',
            sm: '1rem',
            xl: '8rem',
            '2xl': '8rem',
          },
        },
        extend: {
          colors: {
            'capel-red': '#f78181',
            'capel-red-500': '#f78181',
            'capel-red-800': '#ac5a5a',
            'capel-blue': '#3991aa',
            'capel-blue-200': '#d3eff6',
            'capel-blue-500': '#3991aa',
            'capel-blue-800': '#276576',
          },
          height: {
            'screen/2': '50vh',
          },
          fontSize: {
            base: '1.1667rem',
          },
          letterSpacing: {
            tightest: '-.075em',
          },
        },
      },
    },
  },
  nitro: {
    prerender: {
      routes: [
        '/',
        '/api/aires',
        '/api/divisions',
        '/api/spots',
        '/api/stats',
        '/api/structures',
        '/api/zones',
      ],
    },
  },
  runtimeConfig: {
    LCK_BASE_PATH: '', // see NUXT_LCK_BASE_PATH in .env
    LCK_DB_UUID: '', // see NUXT_LCK_DB_UUID in .env
    LCK_SETTINGS_UUID: '', // see NUXT_LCK_SETTINGS_UUID in .env
    LCK_USERNAME: '', // see NUXT_LCK_USERNAME in .env
    LCK_PASSWORD: '', // see NUXT_LCK_PASSWORD in .env
  },
})
