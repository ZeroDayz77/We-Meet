import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AuthRouter from './components/AuthRouter.jsx';
import App from './App.jsx';
import './index.css';

// Perform authentication check
const isAuthenticated = localStorage.getItem('userData') !== null;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {isAuthenticated ? <App /> : <AuthRouter />}
    </BrowserRouter>
  </React.StrictMode>,
);