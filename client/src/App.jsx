import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:4040');

const App = () => {
  const [state, setState] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('chat message', msg => {
      console.log(msg);
    });

    socket.on('typing', () => {
      console.log('typing');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat message');
      socket.off('typing');
    };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('chat message', state);
  };

  const handleChange = e => {
    socket.emit('typing');
    setState(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={state} />
        <button>send</button>
      </form>
    </div>
  );
};

export default App;
