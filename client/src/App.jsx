import React from 'react';
import { useEffect } from 'react';
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Chat from './pages/chat/Chat';
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

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && location.pathname !== '/register') {
      navigate('/login');
    }
  }, [token]);

  return token && <Outlet />;
};

export default App;
