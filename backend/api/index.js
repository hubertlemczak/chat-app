const express = require('express');

const api = express.Router();

api.get('/users', (req, res) => {
  res.send('hi');
});

module.exports = api;
