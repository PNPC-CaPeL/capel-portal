import { graphql, useStaticQuery } from 'gatsby';

export const useStructures = () => {
  const { wrapper } = useStaticQuery(graphql`
    query {
      wrapper: allFile(
        filter: {
          relativeDirectory: { eq: "structures" },
          childMarkdownRemark: { frontmatter: { draft: { ne: true } } }
        }
      ) {
        nodes {
          name
          childMarkdownRemark {
            htmlAst
            frontmatter {
              title
              url
              location
            }
          }
        }
      }
    }

  `);

  return wrapper.nodes;
};

export default useStructures;
