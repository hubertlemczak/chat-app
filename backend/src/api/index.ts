import express from 'express';

const api = express.Router();

import userController from './controllers/users.controller';
import authController from './controllers/auth.controller';

api.get('/users', userController.getAll);
api.get('/users/:id', userController.getById);
api.post('/login', authController.login);

export default api;
