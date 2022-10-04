import express from 'express';

const api = express.Router();

import userController from './controllers/users.controller';
import authController from './controllers/auth.controller';

api.post('/login', authController.login);

api.get('/users', userController.getAll);
api.get('/users/:id', userController.getById);

export default api;
