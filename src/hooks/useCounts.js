import { graphql, useStaticQuery } from 'gatsby';

const isCurrentYear = ({ data: { date } }) =>
  (+date?.match?.(/^\d{4}/)?.[0] === new Date().getFullYear());

const hasStatut = ({ data: { Statut } }) => Boolean(Statut);

export const useCounts = () => {
  const { wrapper } = useStaticQuery(graphql`
    query {
      wrapper: allAirtable {
        nodes {
          queryName
          data {
            date: Date(formatString: "YYYY-MM")
            Statut
          }
        }
      }
    }
  `);

  const counts = {
    declaration: { single: 0, structure: 0, total: 0 },
    regulation: { single: 0, structure: 0, total: 0 },
  };

  wrapper.nodes
    .filter(isCurrentYear)
    .filter(hasStatut)
    .forEach(({ queryName, data: { Statut } }) => {
      counts[queryName].total += 1;
      if (Statut === 'Structure') {
        counts[queryName].structure += 1;
      } else {
        counts[queryName].single += 1;
      }
    });

  return counts;
};

export default useCounts;
