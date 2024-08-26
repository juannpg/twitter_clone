import express from 'express'
import cors from 'cors'
import usersRouter from './routers/users'
import tweetsRouter from './routers/tweets'
import repliesRouter from './routers/replies'

import * as dotenv from 'dotenv';
dotenv.config();

export const server = express();
server.use(express.json());
server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));

server.use('/api/routers/users', usersRouter);
server.use('/api/routers/tweets', tweetsRouter);
server.use('/api/routers/replies', repliesRouter);

const PORT = 4000;
const IP = process.env.CASA_IP;
server.listen(PORT, `${IP}`, () => {
  console.log(`Server is running!`);
});