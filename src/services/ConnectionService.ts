import express from 'express';
import io from 'socket.io';
import http from 'http';
import cors from 'cors';

import * as ActionService from './ActionService';

import { ShellSession } from './SessionManager';

export const app = express();
app.use(cors());

export const server = http.createServer(app);
export const ws = new io.Server(server, {
    cors: {
        allowedHeaders: '*',
        origin: '*'
    }
});

app.post('/exec', express.json(), async (req, res) => {
    try {
        const { action, args } = req.body;
        const result = await ActionService[action](...args);
        return res.json(result);
    } catch (ex) {
        return res.status(500).json({ error: ex.message });
    }
});


const shell = new ShellSession();

shell.onMessage((msg, isError) => {
    ws.emit('out', { msg, isError });
});

ws.on('connection', client => {
    client.on('write', (msg: string) => {
        shell.write(msg);
    });
});

process.on('SIGTERM', () => {
    shell.close();
});