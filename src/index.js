import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Mengimport App.js sebagai komponen utama
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';  // Mengimport CssBaseline dari Material UI untuk normalisasi gaya


const theme = createTheme();
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>, 
  document.getElementById('root')
);

