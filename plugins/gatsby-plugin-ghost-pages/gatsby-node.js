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
        nodes { slug url }
      }
      allGhostPage(sort: { order: ASC, fields: published_at }) {
        nodes { slug url }
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
      toPath: `${node.url}edit`,
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
      toPath: `${node.url}edit`,
    });
  });
};
