import { graphql, useStaticQuery } from 'gatsby';

export const useSpots = () => {
  const { wrapper: { nodes: spots = [] } = {} } = useStaticQuery(graphql`
    {
      wrapper: allSpot(
        filter: { Statut: { in: ["Contribué", "Public"] } }
      ) {
        nodes {
          id
          Nom
          Type: Type_de_site
          Amarrage: Dispositif_d_amarrage
          # By: Profil_cr_ateur
          Statut
          geojson { coordinates type }
          internal { content }
        }
      }
    }
  `);

  return spots;
};

export default useSpots;
