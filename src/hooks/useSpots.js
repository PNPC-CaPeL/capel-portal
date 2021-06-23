import { graphql, useStaticQuery } from 'gatsby';

export const useSpots = () => {
  const { wrapper: { nodes: spots = [] } = {} } = useStaticQuery(graphql`
    {
      wrapper: allSpot {
        nodes {
          id
          Nom
          Type: Type_de_site
          geojson { coordinates type }
          internal { content }
        }
      }
    }
  `);

  return spots;
};

export default useSpots;
