import { graphql, useStaticQuery } from 'gatsby';

const isCurrentYear = ({ data: { date } }) =>
  (+date?.match?.(/^\d{4}/)?.[0] === new Date().getFullYear());

export const useStructures = () => {
  const { wrapper } = useStaticQuery(graphql`
    query {
      wrapper: allAirtable(
        filter: {queryName: {eq: "regulation"}, data: {Statut: {eq: "Structure"}}}
      ) {
        nodes {
          data {
            structure: Structure
            date: Date(formatString: "YYYY-MM")
          }
        }
      }
    }
  `);

  return wrapper.nodes
    .filter(isCurrentYear)
    .map(({ data: { structure } }) => structure);
};

export default useStructures;
