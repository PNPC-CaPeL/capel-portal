import { graphql, useStaticQuery } from 'gatsby';

export const useSpots = () => {
  const { wrapper, spots } = useStaticQuery(graphql`
    query {
      spots: allSpot {
        nodes {
          name
          childMarkdownRemark {
            htmlAst
            frontmatter {
              title
              location
            }
          }
        }
      }

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

  return [
    ...wrapper.nodes,
    ...spots.nodes,
  ];
};

export default useSpots;
