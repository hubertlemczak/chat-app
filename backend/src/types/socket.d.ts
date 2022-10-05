import { Socket } from 'socket.io';
import { TDecodedUser } from '../api/types/auth';

export type TSocketWithUser = {
  user?: TDecodedUser;
} & Socket;
