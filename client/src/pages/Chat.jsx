import { useState } from 'react';

import { useSocket } from '../context/SocketProvider';

const Chat = () => {
  const [chatInput, setChatInput] = useState('');
  const { socket } = useSocket();

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('chat message', {
      content: chatInput,
      conversationId: '4c840108-35ff-472f-811a-3c379a928b6a',
      userId: socket.user.id,
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
    </div>
  );
};

export default Chat;
