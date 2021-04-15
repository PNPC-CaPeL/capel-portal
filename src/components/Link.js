import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

import { Link as MuiLink } from '@material-ui/core';

const Link = React.forwardRef((props, ref) => (
  <MuiLink to={props.href} component={GatsbyLink} innerRef={ref} {...props} />
));

Link.displayName = 'Link';

export default Link;
