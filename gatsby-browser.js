/* eslint-disable import/prefer-default-export */
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const wrapRootElement = ({ element }) => (
  <QueryClientProvider client={queryClient}>
    {element}
  </QueryClientProvider>
);

/**
 * Trust All Scripts
 *
 * This is a dirty little script for iterating over script tags
 * of your Ghost posts and adding them to the document head.
 *
 * This works for any script that then injects content into the page
 * via ids/classnames etc.
 *
 */
const trustAllScripts = () => {
  const scriptNodes = Array.from(document.querySelectorAll('.load-external-scripts script'));
  const placeholder = document.createDocumentFragment();
  const [headElement] = Array.from(document.getElementsByTagName('head'));

  scriptNodes.forEach(node => {
    const script = document.createElement('script');
    script.type = node.type || 'text/javascript';

    if (node.attributes.src) {
      script.src = node.attributes.src.value;
    } else {
      script.innerHTML = node.innerHTML;
    }

    placeholder.appendChild(script);
  });

  headElement.appendChild(placeholder);
};

export const onRouteUpdate = () => { trustAllScripts(); };
