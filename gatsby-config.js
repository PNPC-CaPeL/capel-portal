module.exports = {
  /* Your site config here */
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
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
  ],
};
