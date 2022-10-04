import { Socket } from 'socket.io';

export type TSocketWithUser = {
  user?: TDecodedUser;
} & Socket;

export type TDecodedUser = {
  id: string;
  username: string;
  email: string;
  iat: number;
};
