require('dotenv').config({ path: '.env' });

module.exports = {
  siteMetadata: {
    title: 'Title',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-material-ui',
      options: {
        stylesConfig: {
          // disableAutoprefixing: true,
          // disableMinification: true,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-blocks',
        path: `${__dirname}/src/blocks`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
  ],
  flags: {
    DEV_SSR: false,
    FAST_REFRESH: true,
  },
};
