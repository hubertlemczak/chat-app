import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { io } from 'socket.io-client';

import useLocalStorage from '../hooks/useLocalStorage';

const socket = io('http://localhost:4040');

const SocketContext = createContext({ socket });
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [token] = useLocalStorage('chat-app-token', '');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
      socket.emit('login', token, decodedUser => {
        socket.user = decodedUser;
      });
    });

    socket.on('connect_failed', () => {
      console.log('whoops');
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('chat-message', msg => {
      console.log(msg);
    });

    socket.on('typing', () => {
      console.log('typing');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat-message');
      socket.off('typing');
      socket.off('login');
      socket.off('connect_failed');
    };
  }, [socket, token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
