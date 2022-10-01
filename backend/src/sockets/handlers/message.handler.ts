import { Server } from 'socket.io';
import messagesModel, { TCreateMessage } from '../../api/models/messages.model';
import { TSocketWithUser } from '../../types/socket';

const messageHandler = (socket: TSocketWithUser, io: Server) => {
  const createMessage = async ({
    content,
    userId,
    conversationId,
  }: TCreateMessage) => {
    try {
      console.log(socket.user);
      const createdMessage = await messagesModel.createMessage({
        content,
        conversationId,
        userId,
      });

      if (createdMessage) {
        io.emit('chat-message', createdMessage);
      }
    } catch (err) {
      socket.emit('exception', err);
      console.error('err', err);
    }
  };

  const handleTyping = () => {
    try {
      socket.broadcast.emit('typing');
    } catch (err) {
      socket.emit('exception', err);
      console.error('err', err);
    }
  };

  socket.on('chat-message', createMessage);
  socket.on('typing', handleTyping);
};

export default messageHandler;
