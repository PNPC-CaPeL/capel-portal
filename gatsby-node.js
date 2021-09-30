exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          { test: /tripetto.*/, use: loaders.null() },
          { test: /.*leaflet.*/i, use: loaders.null() },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      fallback: {
        fs: false,
      },
    },
  });
};

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type GhostPage {
      url: String
      featureImage: File @link(by: "id", from: "featureImage___NODE")
    }

    type GhostPost {
      url: String
      featureImage: File @link(by: "id", from: "featureImage___NODE")
    }

    type File {
      url: String
    }

    type HtmlRehype implements Node @derivedTypes @childOf(types: ["GhostPost", "GhostPage"]) {
      html: String
      htmlAst: JSON
      tableOfContents: JSON
      context: HtmlRehypeContext
    }

    type HtmlRehypeContext {
      url: String
      slug: String
      feature_image: String
    }

    type Division implements Node {
      Style: String
    }
  `);
};
