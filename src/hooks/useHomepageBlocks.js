import { graphql, useStaticQuery } from 'gatsby';

export const useHomepageBlocks = () => {
  const { wrapper: { nodes = [] } = {} } = useStaticQuery(graphql`
    query {
      wrapper: allGhostPage(filter: {featured: {eq: true}}) {
        nodes {
          title
          slug
          feature_image
          html
          featureImage { childImageSharp { gatsbyImageData(
            aspectRatio: 1.3333333
            width: 800
            placeholder: BLURRED
          ) } }
        }
      }
    }
  `);

  return nodes;
};

export default useHomepageBlocks;
