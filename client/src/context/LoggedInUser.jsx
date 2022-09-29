import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import jwt_decode from 'jwt-decode';
import client from '../client';
import useLocalStorage from '../hooks/useLocalStorage';

const LoggedInUserContext = createContext();

export const useLoggedInUser = () => useContext(LoggedInUserContext);

export const LoggedInUserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useLocalStorage('chat-app-token', '');

  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      client
        .get(`/users/${decodedToken.id}`)
        .then(res => setUser(res.data.user))
        .catch(err => err.response);
    }
  }, [token]);

  return (
    <LoggedInUserContext.Provider value={{ user, token, setToken }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

export default LoggedInUserProvider;
