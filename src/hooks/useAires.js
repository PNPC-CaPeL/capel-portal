import { graphql, useStaticQuery } from 'gatsby';

export const useAires = () => {
  const { wrapper: { nodes = [] } = {} } = useStaticQuery(graphql`
    {
      wrapper: allAire {
        nodes {
          id
          Nom
          geojson { coordinates type }
          Style
        }
      }
    }
  `);

  return nodes;
};

export default useAires;
