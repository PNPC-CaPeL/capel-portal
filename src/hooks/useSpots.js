import { graphql, useStaticQuery } from 'gatsby';

export const useSpots = () => {
  const { wrapper: { nodes: spots = [] } = {} } = useStaticQuery(graphql`
    {
      wrapper: allSpot {
        nodes {
          Nom
          geojson { coordinates type }
          internal { content }
        }
      }
    }
  `);

  return spots;
};

export default useSpots;
