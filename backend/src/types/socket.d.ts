import { Socket } from 'socket.io';

export type TSocketWithUser = {
  user?: TDecodedUser;
} & Socket;
