import { graphql, useStaticQuery } from 'gatsby';

export const useFooterBlocks = () => {
  const { wrapper = {} } = useStaticQuery(graphql`
    query {
      wrapper: allGhostPage(
        filter: {
          fields: { noPage: { eq: true } },
          slug: { eq: "footer" }
        }
      ) {
        nodes {
          childHtmlRehype { htmlAst }
        }
      }
    }
  `);

  return wrapper.nodes;
};

export default useFooterBlocks;
