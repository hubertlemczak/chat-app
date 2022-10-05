import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { io } from 'socket.io-client';
import { useLoggedInUser } from './LoggedInUser';

const SocketContext = createContext({});
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { token } = useLoggedInUser();
  const [socket] = useState(() =>
    io('http://localhost:4040', {
      auth: {
        token,
      },
      autoConnect: false,
    })
  );

  useEffect(() => {
    if (!token) return;
    socket.auth.token = token;
    socket.connect();

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    socket.on('exception', err => {
      console.log('error', err);
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('connect_error', err => {
      console.error(err.message);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('exception');
      socket.offAny();
      socket.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
