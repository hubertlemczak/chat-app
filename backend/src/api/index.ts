import express from 'express';

const api = express.Router();

import userController from './controllers/users.controller';
import authController from './controllers/auth.controller';
import { authenticateUser } from '../auth';

// auth
api.post('/login', authController.login);
api.post('/register', authController.register);

// users
api.get('/users', authenticateUser, userController.getAll);
api.get('/users/:id', authenticateUser, userController.getById);

api.patch(
  '/users/:id/follows/:followId',
  authenticateUser,
  userController.createFollow
);

api.delete(
  '/users/:id/follows/:followId',
  authenticateUser,
  userController.deleteFollow
);

export default api;
