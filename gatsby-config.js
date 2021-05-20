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
        nodeType: 'MarkdownRemark',
        imagePath: 'frontmatter.picture',
        name: 'pictureFile',
        prepareUrl: url => (
          url.startsWith('/')
            ? `https://raw.githubusercontent.com/PNPC-CaPeL/capel-proto-contents/main${url}`
            : url
        ),
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
  ],
  flags: {
    DEV_SSR: false,
  },
};
