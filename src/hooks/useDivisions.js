import { graphql, useStaticQuery } from 'gatsby';

export const useDivisions = () => {
  const { wrapper: { nodes = [] } = {} } = useStaticQuery(graphql`
    {
      wrapper: allDivision {
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

export default useDivisions;
