import { graphql, useStaticQuery } from 'gatsby';

export const useGhostSettings = () => {
  const { wrapper = {} } = useStaticQuery(graphql`
    query {
      wrapper: ghostSettings {
        ...GhostSettingsFields
      }
    }
  `);

  return wrapper;
};

export default useGhostSettings;
