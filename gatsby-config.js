require('dotenv').config({ path: '.env' });

module.exports = {
  siteMetadata: {
    title: 'CaPeL',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            'X-Frame-Options: SAMEORIGIN',
          ],
        },
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-capel-locokit',
      options: {
        dbId: process.env.LCK_DBID,
        settingsTableId: process.env.LCK_SETTINGS_ID,
        structurePublicFields: ['id', 'Nom', 'Ville', 'Adresse', 'Code postal',
          'Téléphone principal', 'Coordonnées GPS', 'Site web'],
      },
    },

    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: { include: /.*assets.*\.svg$/ },
      },
    },
    {
      resolve: 'gatsby-theme-material-ui',
      options: {
        stylesConfig: {
          // disableAutoprefixing: true,
          // disableMinification: true,
        },
        webFontsConfig: {
          fonts: {
            google: [
              {
                family: 'Raleway',
                variants: [
                  '300', '300i',
                  '400', '400i',
                  '500', '500i',
                  '600', '600i',
                  '700', '700i',
                ],
                strategy: 'selfHosted',
              },
            ],
          },
        },
      },
    },
    {
      resolve: 'gatsby-source-ghost',
      options: {
        apiUrl: process.env.GHOST_API_URL || 'http://localhost:2368',
        contentApiKey: process.env.GHOST_API_KEY || 'aaaaaaaaaaaaaaaaaaaaaaaaaa',
      },
    },
    {
      resolve: 'gatsby-plugin-ghost-pages',
      options: {},
    },
    {
      resolve: 'gatsby-transformer-rehype',
      options: {
        filter: node => ['GhostPage', 'GhostPost'].includes(node.internal.type),
        source: node => node.html,
        plugins: [
          {
            resolve: 'gatsby-rehype-ghost-links',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-ghost-images',
      options: {},
    },
  ],
  flags: {
    DEV_SSR: false,
    PRESERVE_WEBPACK_CACHE: true,
  },
};
