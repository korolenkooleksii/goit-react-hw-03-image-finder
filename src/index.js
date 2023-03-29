import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { ThemeProvider } from '@emotion/react';
import App from 'components/App/App';

const theme = {
  colors: {
    dark: '#041d51',
    greey: '#313131',
    white: 'white',
    accent: '#739ceda4',
    shadow: '1px 2px 2px rgb(0 0 0 / 0.5)',
    shadowAccent: '2px 5px 2px rgb(0 0 0 / 0.5)',
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
