import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
require('express-async-errors');
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';

const app: Express = express();
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

import api from './api';
import errorHandler from './api/errors';
import socket from './socket';

app.use('/api', api);
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'hi' });
});

app.use(errorHandler);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`\n[server] runnning on http://localhost:${port}\n`);

  socket({ io });
});
