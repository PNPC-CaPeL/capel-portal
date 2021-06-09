import { graphql, useStaticQuery } from 'gatsby';

export const useLckMetrics = () => {
  const { wrapper: { nodes = [] } = {} } = useStaticQuery(graphql`
    {
      wrapper: allLckMetric {
        nodes {
          key
          count
        }
      }
    }
  `);

  return [
    nodes,
    nodes.reduce((acc, node) => ({ ...acc, [node.key]: node }), {}),
  ];
};

export default useLckMetrics;
