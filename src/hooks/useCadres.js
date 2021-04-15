import { graphql, useStaticQuery } from 'gatsby';

export const useCadres = () => {
  const { file: { internal: { content } = {} } = {} } = useStaticQuery(graphql`
    query {
      file(relativeDirectory: {eq: "lists"}, name: {eq: "cadres"}) {
        id
        internal {
          content
        }
      }
    }
  `);

  try {
    return JSON.parse(content).cadres;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return {};
  }
};

export default useCadres;
