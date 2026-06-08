import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './App.css';

//Finds the root div in index.html and renders the React app into it.
createRoot(document.getElementById('root')).render(
  //Helps catch common React issues 
  <StrictMode>
    <App />
  </StrictMode>,
);
