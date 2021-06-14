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
      fontSize: '3.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.4rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.2rem',
    },
  },
}));

export default theme;
