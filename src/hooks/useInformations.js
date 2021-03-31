import { graphql, useStaticQuery } from 'gatsby';

export const useInformations = () => {
  const { wrapper } = useStaticQuery(graphql`
    query {
      wrapper: allFile(
        filter: {
          relativeDirectory: { eq: "informations" },
          childMarkdownRemark: { frontmatter: { draft: { ne: true } } }
        }
      ) {
        nodes {
          name
          childMarkdownRemark {
            excerptAst
            htmlAst
            frontmatter {
              title
              zone
              spots
            }
          }
        }
      }
    }
  `);

  return wrapper.nodes;
};

export default useInformations;
