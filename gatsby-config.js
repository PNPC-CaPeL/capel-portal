require('dotenv').config({ path: '.env' });

module.exports = {
  siteMetadata: {
    title: 'CaPeL',
  },
  plugins: [
    'gatsby-plugin-netlify',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-capel-locokit',
      options: {
        dbId: process.env.LCK_DBID,
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
  },
};
