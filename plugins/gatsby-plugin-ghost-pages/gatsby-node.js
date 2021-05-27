const path = require('path');

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  const result = await graphql(`
    {
      allGhostPost(sort: { order: ASC, fields: published_at }) {
        edges {
          node {
            slug
            url
          }
        }
      }
      allGhostTag(sort: { order: ASC, fields: name }) {
        edges {
          node {
            slug
            url
            postCount
          }
        }
      }
      allGhostAuthor(sort: { order: ASC, fields: name }) {
        edges {
          node {
            slug
            url
            postCount
          }
        }
      }
      allGhostPage(sort: { order: ASC, fields: published_at }) {
        edges {
          node {
            slug
            url
          }
        }
      }
    }
  `);

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors);
  }

  // Extract query results
  // const tags = result.data.allGhostTag.edges;
  // const authors = result.data.allGhostAuthor.edges;
  const pages = result.data.allGhostPage.edges;
  const posts = result.data.allGhostPost.edges;

  // Load templates
  // const indexTemplate = path.resolve('./src/templates/index.js');
  // const tagsTemplate = path.resolve('./src/templates/tag.js');
  // const authorTemplate = path.resolve('./src/templates/author.js');
  const pageTemplate = path.resolve('./src/components/templates/GhostPage.js');
  const postTemplate = path.resolve('./src/components/templates/GhostPost.js');

  /*
  // Create tag pages
  tags.forEach(({ node }) => {
    const totalPosts = node.postCount !== null ? node.postCount : 0;

    // This part here defines, that our tag pages will use
    // a `/tag/:slug/` permalink.
    const url = `/tag/${node.slug}`;

    const items = Array.from({ length: totalPosts });

    // Create pagination
    paginate({
      createPage,
      items,
      itemsPerPage: postsPerPage,
      component: debugTemplate,
      pathPrefix: ({ pageNumber }) => ((pageNumber === 0) ? url : `${url}/page`),
      context: {
        slug: node.slug,
      },
    });
  });
  */

  /*
  // Create author pages
  authors.forEach(({ node }) => {
    const totalPosts = node.postCount !== null ? node.postCount : 0;

    // This part here defines, that our author pages will use
    // a `/author/:slug/` permalink.
    const url = `/author/${node.slug}`;

    const items = Array.from({ length: totalPosts });

    // Create pagination
    paginate({
      createPage,
      items,
      itemsPerPage: postsPerPage,
      component: debugTemplate,
      pathPrefix: ({ pageNumber }) => ((pageNumber === 0) ? url : `${url}/page`),
      context: {
        slug: node.slug,
      },
    });
  });
  */

  // Create pages
  pages.forEach(({ node }) => {
    // This part here defines, that our pages will use
    // a `/:slug/` permalink.
    // node.url = `/${node.slug}/`;

    createPage({
      path: `/${node.slug}/`,
      component: pageTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug,
      },
    });

    // Redirection from `/edit` to Ghost edit page
    createRedirect({
      redirectInBrowser: true,
      fromPath: `/${node.slug}/edit`,
      toPath: `${node.url}edit`,
    });
  });

  // Create post pages
  posts.forEach(({ node }) => {
    // This part here defines, that our posts will use
    // a `/:slug/` permalink.
    // node.url = `/${node.slug}/`;

    createPage({
      path: `/${node.slug}/`,
      component: postTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug,
      },
    });

    // Redirection from `/edit` to Ghost edit page
    createRedirect({
      redirectInBrowser: true,
      fromPath: `/${node.slug}/edit`,
      toPath: `${node.url}edit`,
    });
  });

  /*
  // Create pagination
  paginate({
    createPage,
    items: posts,
    itemsPerPage: postsPerPage,
    component: debugTemplate,
    pathPrefix: ({ pageNumber }) => {
      if (pageNumber === 0) {
        return '/';
      }
      return '/page';
    },
  });
  */
};
