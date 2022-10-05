import { useEffect } from 'react';
import { useState } from 'react';
import { useLoggedInUser } from '../context/LoggedInUser';

import { useSocket } from '../context/SocketProvider';

const Chat = () => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userTyping, setUserTyping] = useState('');
  const { user } = useLoggedInUser();
  const { socket } = useSocket();

  useEffect(() => {
    socket.on('chat-message', messageHandler);

    let interval;
    socket.on('typing', data => {
      clearInterval(interval);
      interval = typingHandler(data);
    });

    return () => {
      socket.off('chat-message');
      socket.off('typing');
    };
  }, []);

  const messageHandler = data => {
    setMessages(prev => [...prev, data]);
  };

  const typingHandler = data => {
    setUserTyping(data);

    return setTimeout(() => {
      setUserTyping('');
    }, 1000);
  };

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('chat-message', {
      content: chatInput,
      conversationId: '4c840108-35ff-472f-811a-3c379a928b6a',
      userId: user.id,
    });
  };

  const handleChange = e => {
    socket.emit('typing');
    setChatInput(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={chatInput} />
        <button>send</button>
      </form>
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>
            {(msg.user.username === user?.username
              ? 'You'
              : msg.user.username) +
              ': ' +
              msg.content}
          </li>
        ))}
        {userTyping && <li>{userTyping} is typing...</li>}
      </ul>
    </div>
  );
};

export default Chat;
