import { graphql, useStaticQuery } from 'gatsby';

export const useSpots = () => {
  const { wrapper } = useStaticQuery(graphql`
    query {
      wrapper: allFile(
        filter: {
          relativeDirectory: { eq: "spots" },
          childMarkdownRemark: { frontmatter: { draft: { ne: true } } }
        }
      ) {
        nodes {
          name
          childMarkdownRemark {
            htmlAst
            frontmatter {
              title
              ref
              types
              location
              structures
            }
          }
        }
      }
    }
  `);

  return wrapper.nodes;
};

export default useSpots;
