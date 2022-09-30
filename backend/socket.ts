import { JwtPayload } from 'jsonwebtoken';
import { Server } from 'socket.io';
import messagesModel, { TCreateMessage } from './api/models/messages.model';
import { decodeToken } from './auth';
import { CreateMessage, messagesCmdBus } from './commands/messages.command';

export default function socket({ io }: { io: Server }) {
  io.on('connection', socket => {
    console.log('a user connected');

    socket.on(
      'login',
      (token: string, cb: (user: string | JwtPayload | null) => void) => {
        const user = decodeToken(token);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (socket as any).user = user;
        cb(user);
      }
    );

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on(
      'chat-message',
      async ({ content, userId, conversationId }: TCreateMessage) => {
        try {
          const createdMessage = await messagesCmdBus.dispatch(
            new CreateMessage({ content, userId, conversationId })
          );

          if (createdMessage) {
            io.emit('chat-message', createdMessage);
          }

          console.log('With Command', createdMessage);
        } catch (err) {
          console.error(err);
        }

        try {
          const createdMessage = await messagesModel.createMessage({
            content,
            conversationId,
            userId,
          });

          if (createdMessage) {
            io.emit('chat-message', createdMessage);
          }

          console.log('With model', createdMessage);
        } catch (err) {
          console.error('err', err);
        }
      }
    );

    socket.on('typing', () => {
      socket.broadcast.emit('typing');
    });
  });
}
