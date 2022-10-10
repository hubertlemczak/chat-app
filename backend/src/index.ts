import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
require('express-async-errors');
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';

import api from './api';
import errorHandler from './api/errors';
import sockets from './sockets';

const app: Express = express();
const server = http.createServer(app);

app.disable('x-powered-by');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', api);

app.use(errorHandler);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:*', 'https://raychat.netlify.app'],
  },
});

const port = process.env.PORT || 4040;

server.listen(port, () => {
  console.log(`\n[server] runnning on http://localhost:${port}\n`);

  sockets({ io });
});
