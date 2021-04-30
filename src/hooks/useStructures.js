import { graphql, useStaticQuery } from 'gatsby';

export const useStructures = () => {
  const { wrapper, structures } = useStaticQuery(graphql`
    query {
      structures: allStructure {
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

  return [
    ...wrapper.nodes,
    ...structures.nodes,
  ];
};

export default useStructures;
