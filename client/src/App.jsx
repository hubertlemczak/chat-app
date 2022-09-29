import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Chat from './pages/Chat';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Authenticate />}>
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  );
};

const Authenticate = () => {
  const token = localStorage.getItem('chat-app-token');
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default App;
