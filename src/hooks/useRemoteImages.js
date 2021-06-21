import { graphql, useStaticQuery } from 'gatsby';

export const useRemoteImages = () => {
  const { wrapper: { nodes = [] } = {} } = useStaticQuery(graphql`
    query {
      wrapper: allFile(filter: {url: {ne: null}}) {
        nodes {
          url
          childImageSharp { gatsbyImageData }
        }
      }
    }
  `);

  return {
    files: nodes.map(
      ({ url, childImageSharp }) => ({ url, gatsbyImageData: childImageSharp?.gatsbyImageData }),
    ),
    byUrl: nodes.reduce((acc, { url, childImageSharp }) => ({
      ...acc,
      [url]: childImageSharp?.gatsbyImageData,
    }), {}),
  };
};

export default useRemoteImages;
