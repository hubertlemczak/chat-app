import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { io } from 'socket.io-client';
import { useLoggedInUser } from './LoggedInUser';

const SocketContext = createContext({});
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const { token } = useLoggedInUser();

  useEffect(() => {
    const newSocket = io('http://localhost:4040', {
      auth: {
        token,
      },
      autoConnect: false,
    });

    if (token) {
      newSocket.connect();
    }
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('connected');
    });

    newSocket.onAny((event, ...args) => {
      console.log(event, args);
    });

    newSocket.on('exception', err => {
      console.log('error', err);
    });

    newSocket.on('disconnect', () => {
      console.log('disconnected');
    });

    newSocket.on('chat-message', msg => {
      console.log(msg);
    });

    newSocket.on('typing', () => {
      console.log('typing');
    });

    newSocket.on('connect_error', err => {
      console.error(err.message);
    });

    return () => {
      newSocket.off('connect');
      newSocket.off('disconnect');
      newSocket.off('connect_error');
      newSocket.off('exception');
      newSocket.off('login');
      newSocket.off('typing');
      newSocket.off('chat-message');
      newSocket.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
