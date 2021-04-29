import { graphql, useStaticQuery } from 'gatsby';

export const useHomepageBlocks = () => {
  const { wrapper, pictures } = useStaticQuery(graphql`
    query {
      wrapper: allMarkdownRemark(filter: {
        frontmatter: {
          text_id: { glob: "homepage*" }
        }
      }) {
        nodes {
          id
          htmlAst
          frontmatter {
            title
            text_id
          }
        }
      }

      pictures: allMarkdownRemark(filter: {
        frontmatter: {
          text_id: { glob: "homepage*" }
          picture: { ne: null }
        }
      }) {
        nodes {
          id
          pictureFile { childImageSharp { gatsbyImageData(
            aspectRatio: 1.3333333
            width: 800
            placeholder: BLURRED
          ) } }
        }
      }
    }
  `);

  const items = wrapper.nodes.map(({ frontmatter, ...rest }) => ({
    ...(pictures.nodes.find(({ id }) => (id === rest.id)) || {}),
    ...rest,
    ...frontmatter,
  }));

  return items;
};

export default useHomepageBlocks;
