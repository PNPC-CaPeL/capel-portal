const { createRemoteFileNode } = require('gatsby-source-filesystem');
const { JSDOM } = require('jsdom');

exports.onCreateNode = async ({
  node,
  actions: { createNode, createParentChildLink },
  store,
  cache,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  const createImageNodeOptions = {
    store,
    cache,
    createNode,
    createNodeId,
    createContentDigest,
  };

  if (['GhostPage', 'GhostPost'].includes(node.internal.type)) {
    const { html, feature_image: featureImageUrl } = node;

    if (featureImageUrl) {
      reporter.info(`Create image node: ${featureImageUrl} (from ${node.title})`);
      const imageNode = await createRemoteFileNode({
        ...createImageNodeOptions,
        url: featureImageUrl,
        parentNodeId: node.id,
      });

      if (imageNode) {
        // eslint-disable-next-line no-param-reassign
        node.featureImage___NODE = imageNode.id;
        createParentChildLink({ parent: node, child: imageNode });
      }
    }

    if (html) {
      const { window: { document } } = new JSDOM(html);
      const images = Array.from(document.querySelectorAll('img[src]')).map(img => img.src);

      await Promise.all(images.map(async url => {
        reporter.info(`Create image node: ${url} (from ${node.title})`);
        const imageNode = await createRemoteFileNode({
          ...createImageNodeOptions,
          url,
          parentNodeId: node.id,
        });

        return createParentChildLink({ parent: node, child: imageNode });
      }));
    }
  }
};
