import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
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
    h1: { fontSize: '3rem' },
    h2: { fontSize: '2.125rem' },
    h3: { fontSize: '1.5rem' },
    h4: { fontSize: '1.25rem' },
    h5: { fontSize: '1.125rem' },
    h6: { fontSize: '1rem' },
    fontFamily: 'Raleway, sans-serif',
  },
});

export default theme;
