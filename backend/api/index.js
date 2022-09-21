const express = require('express');

const api = express.Router();

const userController = require('./controllers/users.controller');
const authController = require('./controllers/auth.controller');

api.get('/users', userController.getAll);
api.post('/login', authController.login);

module.exports = api;
