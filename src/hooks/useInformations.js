import { useStaticQuery, graphql } from 'gatsby';

export const useInformations = () => {
  // To be replaced with fetched blog posts from Ghost
  const { wrapper: { nodes = [] } = {} } = useStaticQuery(graphql`
    {
      wrapper: allGhostPost(
        sort: { fields: published_at, order: DESC },
        limit: 5
      ) {
        nodes {
          id
          title
          slug
          date: published_at
          childHtmlRehype { htmlAst }
          featureImage {
            childImageSharp {
              gatsbyImageData(
                aspectRatio: 1,
                width: 300,
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  `);

  return nodes;
};

export default useInformations;
