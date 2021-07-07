import { makeStyles } from '@material-ui/core/styles';

const useBlockStyles = makeStyles(theme => ({
  fullbleed: {
    marginLeft: 'calc(50% - 50vw)',
    marginRight: 'calc(50% - 50vw)',
    width: '100vw',
  },

  spacings: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },

  map: {
    height: '50vh',
  },

  blueback: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default useBlockStyles;
