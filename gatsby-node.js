exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /tripetto.*/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
