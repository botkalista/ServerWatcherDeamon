
import pm2 from './services/PM2Service';
import { server } from './services/ConnectionService';

pm2.start().then(async () => {
    console.log('PM2 connected');
    await pm2.list();
    console.log('Read all processes');
    server.listen(6921, () => console.log('Listening on port 6921'));
});