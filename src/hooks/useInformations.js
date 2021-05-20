import React from 'react';

export const useInformations = () => {
  // To be replaced with fetched blog posts from Ghost
  const articles = React.useMemo(() => ([]), []);

  return articles;
};

export default useInformations;
