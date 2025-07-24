import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n';
import { ThemeProvider } from './contexts/ThemeProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
