import { useEffect } from 'react';
import { useState } from 'react';
import client from '../../../client';

const SideBar = ({
  setConversationId,
  chatNotifications,
  setChatNotifications,
}) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    async function getConversations() {
      try {
        const res = await client.get('/conversations?user=true');
        setConversations(res.data.conversations);
      } catch (err) {
        console.error(err.response);
      }
    }

    getConversations();
  }, []);

  return (
    <div>
      <ul>
        {conversations.map(conversation => {
          return (
            <li
              key={conversation.id}
              onClick={() => {
                setConversationId(conversation.id);
                setChatNotifications(prev => ({
                  ...prev,
                  [conversation.id]: 0,
                }));
              }}
            >
              {conversation.name}
              {chatNotifications[conversation.id]
                ? ' New Chats: ' + chatNotifications[conversation.id]
                : ''}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
