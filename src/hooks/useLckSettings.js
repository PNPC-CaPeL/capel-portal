import React from 'react';
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

  const parsedNodes = React.useMemo(() => nodes.map(node => {
    try {
      return { ...node, value: JSON.parse(node.text_value) };
    } catch (err) {
      // not a JSON value
    }

    return node;
  }), [nodes]);

  return [
    parsedNodes,
    parsedNodes.reduce((acc, node) => ({ ...acc, [node.key]: node }), {}),
  ];
};

export default useLckSettings;
