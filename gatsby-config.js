require('dotenv').config({ path: '.env' });

module.exports = {
  siteMetadata: {
    title: 'CaPeL',
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-netlify-cms',
    'gatsby-transformer-json',
    'gatsby-source-capel-geojson',
    {
      resolve: 'gatsby-source-git',
      options: {
        name: 'remote-contents',
        remote: process.env.GITHUB_CONTENT_REPO,
        branch: 'main',
        local: 'src/remote-contents',
      },
    },
    {
      resolve: 'gatsby-plugin-copy-files',
      options: {
        source: `${__dirname}/src/remote-contents/public`,
        destination: '',
      },
    },
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
      resolve: 'gatsby-source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: 'appwosEetH7gWIHO2',
            tableName: 'Signatures du règlement',
            queryName: 'regulation',
          },
          {
            baseId: 'appwosEetH7gWIHO2',
            tableName: 'Déclarations de plongées',
            queryName: 'declaration',
          },
        ],
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
  },
};
