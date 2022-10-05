import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Authenticate />}>
        <Route path="/" element={<Chat />} />
      </Route>
    </Routes>
  );
};

const Authenticate = () => {
  const token = localStorage.getItem('chat-app-token');
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default App;
