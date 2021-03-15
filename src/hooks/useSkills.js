import { graphql, useStaticQuery } from 'gatsby';

export const useSkills = () => {
  const { file: { internal: { content } = {} } = {} } = useStaticQuery(graphql`
    query {
      file(relativeDirectory: {eq: "lists"}, name: {eq: "skills"}) {
        id
        internal {
          content
        }
      }
    }
  `);

  try {
    return JSON.parse(content).skills;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return {};
  }
};

export default useSkills;
