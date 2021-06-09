import unified from 'unified';
import markdown from 'remark-parse';

import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

export const mdProcessor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehypeStringify);

export const md2hast = md =>
  mdProcessor.runSync(mdProcessor.parse(md));
