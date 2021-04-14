import { withStyles } from '@material-ui/core/styles';
import { Button as MUIButton } from 'gatsby-theme-material-ui';

const Button = withStyles({
  root: {
    letterSpacing: '0.2em',
    textTransform: 'none',
  },
})(MUIButton);

export default Button;
