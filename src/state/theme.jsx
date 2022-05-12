import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
  palette: {
    primary: {
      main: '#0c154a',
    },
    secondary: {
      main: '#f50057',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});