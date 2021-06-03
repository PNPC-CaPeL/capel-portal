import { graphql, useStaticQuery } from 'gatsby';

export const useHomepageBlocks = () => {
  const { wrapper: { nodes = [] } = {} } = useStaticQuery(graphql`
    query {
      wrapper: allGhostPage(
        filter: { fields: { isHome: { eq: true } } }
        sort: { fields: published_at, order: ASC }
      ){
        nodes {
          title
          slug
          feature_image
          autoExcerpt: excerpt
          customExcerpt: custom_excerpt
          childHtmlRehype { htmlAst }
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
