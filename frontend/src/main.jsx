import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { UseAuthProvider } from './context/Authcontext';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UseAuthProvider>
         <App />
      </UseAuthProvider>
    </Router>
  </React.StrictMode>
);
