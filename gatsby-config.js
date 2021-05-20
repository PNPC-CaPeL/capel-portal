require('dotenv').config({ path: '.env' });

module.exports = {
  siteMetadata: {
    title: 'CaPeL',
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-remote-images',
      options: {
        nodeType: 'GhostPage',
        imagePath: 'feature_image',
        name: 'featureImage',
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
        apiUrl: process.env.GHOST_API_URL,
        contentApiKey: process.env.GHOST_API_KEY,
      },
    },
    {
      resolve: 'gatsby-plugin-ghost-pages',
      options: {},
    },
  ],
  flags: {
    DEV_SSR: false,
  },
};
