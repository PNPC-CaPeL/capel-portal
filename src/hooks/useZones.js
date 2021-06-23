import { graphql, useStaticQuery } from 'gatsby';

export const useZones = () => {
  const { wrapper: { nodes = [] } = {} } = useStaticQuery(graphql`
    {
      wrapper: allZone {
        nodes {
          id
          Nom
          geojson { coordinates type }
          Protection
        }
      }
    }
  `);

  return nodes;
};

export default useZones;
