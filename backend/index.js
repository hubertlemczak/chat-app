require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

app.disable('x-powered-by');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

const api = require('./api');
const errorHandler = require('./api/errors');

app.use('/api', api);
app.get('/', (req, res) => {
  res.send('hi');
});

io.on('connection', socket => {
  // socket.join('room1');

  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', data => {
    io.emit('chat message', data);
    console.log(data);
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing');
  });
});

app.use(errorHandler);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`\n[server] runnning on http://localhost:${port}\n`);
});
