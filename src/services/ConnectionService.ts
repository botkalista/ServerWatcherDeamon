import express from 'express';
import io from 'socket.io';
import http from 'http';
import cors from 'cors';

import * as ActionService from './ActionService';

export const app = express();
app.use(cors());

export const server = http.createServer(app);
export const ws = new io.Server(server);

app.post('/exec', express.json(), async (req, res) => {
    try {
        const { action, args } = req.body;
        const result = await ActionService[action](...args);
        return res.json(result);
    } catch (ex) {
        return res.status(500).json({ error: ex.message });
    }
});