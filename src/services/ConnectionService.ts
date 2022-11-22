import express from 'express';
import io from 'socket.io';
import http from 'http';
import cors from 'cors';

export const app = express();
app.use(cors());

export const server = http.createServer(app);
export const ws = new io.Server(server);

