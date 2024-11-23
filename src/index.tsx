import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FontSizeProvider } from './contexts/FontSizeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FontSizeProvider>
      <App />
    </FontSizeProvider>
  </React.StrictMode>
);
