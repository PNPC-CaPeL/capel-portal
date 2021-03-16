import { graphql, useStaticQuery } from 'gatsby';

export const useDivings = () => {
  const { file: { internal: { content } = {} } = {} } = useStaticQuery(graphql`
    query {
      file(relativeDirectory: {eq: "lists"}, name: {eq: "divings"}) {
        id
        internal {
          content
        }
      }
    }
  `);

  try {
    return JSON.parse(content).divings;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return {};
  }
};

export default useDivings;
