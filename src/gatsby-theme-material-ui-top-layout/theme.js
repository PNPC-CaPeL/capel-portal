import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    primary: {
      main: '#3991aa',
    },
    secondary: {
      main: '#f0373d',
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: 'Raleway, sans-serif',

    h1: {
      fontSize: '4.768rem',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    h2: {
      fontSize: '3.5rem',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    h4: {
      fontSize: '1.4rem',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    h5: {
      fontSize: '1.2rem',
    },
  },
}));

export default theme;
