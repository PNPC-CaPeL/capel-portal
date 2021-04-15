import { graphql, useStaticQuery } from 'gatsby';

export const useHomepageBlocks = () => {
  const { wrapper } = useStaticQuery(graphql`
    query {
      wrapper: allMarkdownRemark(filter: {frontmatter: {text_id: {glob: "homepage*"}}}) {
        nodes {
          htmlAst
          frontmatter {
            title
            text_id
          }
        }
      }
    }
  `);

  const items = wrapper.nodes.map(({ frontmatter, ...rest }) => ({
    ...rest,
    ...frontmatter,
  }));

  return items;
};

export default useHomepageBlocks;
