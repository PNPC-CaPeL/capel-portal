import { graphql, useStaticQuery } from 'gatsby';

export const useFooterBlocks = () => {
  const { wrapper = {} } = useStaticQuery(graphql`
    query {
      wrapper: allGhostPage(
        filter: { fields: { isBlock: { eq: true }, isFooter: { eq: true } } }
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
