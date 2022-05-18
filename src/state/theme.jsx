import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
  palette: {
    primary: {
      main: '#0c154a',
      // light: '#7b8cea''
      light: '#ccd3fc',
      greyed: '#dbdded'
    },
    secondary: {
      main: '#f50057',
    },
    accent: {
      main: '#CCFF33',
      light: '#defa89'
    },

    success: {
      main: '#4caf50'
    },

    error: {
      main: '#d32f2f',
      light: '#ef5350'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});