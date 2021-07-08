const path = require('path');

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  if (node.internal.type === 'GhostPage') {
    createNodeField({
      node,
      name: 'noPage',
      value: node.tags.some(({ slug }) => slug === 'no-page'),
    });

    createNodeField({
      node,
      name: 'isHome',
      value: node.tags.some(({ slug }) => slug === 'home'),
    });
  }
};

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  /**
   * Required in case of no Post or Page available as ghostId field does not
   * seems to be (pre)defined but only inferred from data
   */
  createTypes(`
    type GhostPost implements Node {
      ghostId: String
    }
    type GhostPage implements Node {
      ghostId: String
    }
  `);
};

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts and pages that we fetched from the Ghost site.
 */
exports.createPages = async ({
  graphql,
  actions: { createPage, createRedirect },
}) => {
  const result = await graphql(`
    {
      allGhostPost(sort: { order: ASC, fields: published_at }) {
        nodes { slug url ghostId }
      }
      allGhostPage(sort: { order: ASC, fields: published_at }) {
        nodes { slug url ghostId }
      }
    }
  `);

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors);
  }

  // Extract query results
  const pages = result.data.allGhostPage.nodes;
  const posts = result.data.allGhostPost.nodes;

  // Load templates
  const pageTemplate = path.resolve('./src/components/templates/GhostPage.js');
  const postTemplate = path.resolve('./src/components/templates/GhostPost.js');

  // Create pages
  pages.forEach(node => {
    createPage({
      path: `/${node.slug}/`,
      component: pageTemplate,
      context: { slug: node.slug },
    });

    // Redirection from `/edit` to Ghost edit page
    createRedirect({
      redirectInBrowser: true,
      fromPath: `/${node.slug}/edit`,
      toPath: `/ghost/#/editor/page/${node.ghostId}`,
    });
  });

  // Create post pages
  posts.forEach(node => {
    createPage({
      path: `/${node.slug}/`,
      component: postTemplate,
      context: { slug: node.slug },
    });

    // Redirection from `/edit` to Ghost edit page
    createRedirect({
      redirectInBrowser: true,
      fromPath: `/${node.slug}/edit`,
      toPath: `/ghost/#/editor/post/${node.ghostId}`,
    });
  });

  // Make Ghost admin accessible through front-end domain
  createRedirect({
    fromPath: '/ghost/*',
    toPath: `${process.env.GHOST_API_URL}/ghost/:splat`,
    statusCode: 200,
  });
};
