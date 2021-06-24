import { graphql, useStaticQuery } from 'gatsby';

export const useStructures = () => {
  const { wrapper: { nodes = [] } = {} } = useStaticQuery(graphql`
    {
      wrapper: allStructure(
        filter: { geojson: { coordinates: { ne: null } } }
      ) {
        nodes {
          id
          Nom
          geojson { coordinates type }
          internal { content }
        }
      }
    }
  `);

  return nodes;
};

export default useStructures;
