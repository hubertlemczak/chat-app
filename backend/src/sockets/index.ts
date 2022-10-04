import { JsonWebTokenError } from 'jsonwebtoken';
import { Server } from 'socket.io';
import { verifyToken } from '../auth';
import { TSocketWithUser, TDecodedUser } from '../types/socket';
import messagesHandler from './handlers/messages.handler';

export default function sockets({ io }: { io: Server }) {
  io.use((socket: TSocketWithUser, next) => {
    try {
      const token = socket.handshake.auth.token;
      const user = verifyToken(token);

      socket.user = user as TDecodedUser;

      next();
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        next(err);
      }
    }
  });

  const onConnection = (socket: TSocketWithUser) => {
    console.log('a user connected');

    messagesHandler(socket, io);

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  };

  io.on('connection', onConnection);
}
