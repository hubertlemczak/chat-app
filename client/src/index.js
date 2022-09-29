import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import LoggedInUserProvider from './context/LoggedInUser';
import SocketProvider from './context/SocketProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoggedInUserProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </LoggedInUserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
