import { useRef } from 'react';
import { useEffect, useState } from 'react';

import client from '../../../client';
import { useLoggedInUser } from '../../../context/LoggedInUser';
import { useSocket } from '../../../context/SocketProvider';
import SideBar from './SideBar';

const ChatRoom = () => {
  const [chatNotifications, setChatNotifications] = useState({});
  const [conversationId, setConversationId] = useState();
  const [conversation, setConversation] = useState({});
  const [userTyping, setUserTyping] = useState('');
  const chatInput = useRef();

  const { user } = useLoggedInUser();
  const { socket } = useSocket();

  useEffect(() => {
    console.log(conversationId);
    async function getConversation() {
      try {
        const res = await client.get(`/conversations/${conversationId}`);
        setConversation(res.data.conversation);
      } catch (err) {
        console.error(err.response);
      }
    }

    if (conversationId) getConversation();
    console.log(conversationId);
  }, [conversationId]);

  console.log(conversationId);
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
  }, [conversationId]);

  const messageHandler = data => {
    console.log('data', data);
    console.log('conversationId', conversationId);
    if (conversationId === data.conversationId) {
      console.log('here');
      setConversation(prev => ({
        ...prev,
        messages: [...prev.messages, data],
      }));
    } else {
      setChatNotifications(prev => ({
        ...prev,
        [data.conversationId]: prev[data.conversationId] + 1 || 1,
      }));
    }
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
      content: chatInput.current.value,
      conversationId,
      userId: user.id,
    });
  };

  const handleChange = () => {
    socket.emit('typing', {
      conversationId,
    });
  };

  return (
    <div className="flex gap-10">
      <SideBar
        {...{ setConversationId, chatNotifications, setChatNotifications }}
      />
      <div>
        <ul>
          {conversation?.messages?.map(msg => (
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
        <form onSubmit={handleSubmit}>
          <input
            className="border border-black rounded-l-md"
            type="text"
            onChange={handleChange}
            ref={chatInput}
          />
          <button className="border border-black border-l-0 rounded-r-md px-2">
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
