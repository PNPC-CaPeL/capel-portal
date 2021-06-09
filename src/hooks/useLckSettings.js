import { graphql, useStaticQuery } from 'gatsby';

export const useLckSettings = () => {
  const { wrapper: { nodes = [] } = {} } = useStaticQuery(graphql`
    {
      wrapper: allLckSettings {
        nodes {
          key
          text_value
        }
      }
    }
  `);

  return [
    nodes,
    nodes.reduce((acc, node) => ({ ...acc, [node.key]: node }), {}),
  ];
};

export default useLckSettings;
