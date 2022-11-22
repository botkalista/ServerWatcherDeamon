
import pm2 from 'pm2';
import { Process } from '../models/Process';

class PM2 {

    start() {
        return new Promise<void>((res, rej) => {
            pm2.connect((e) => {
                if (e) rej(e);
                res();
            });
        });
    }

    list() {
        return new Promise<Process[]>((res, rej) => {
            pm2.list((e, data) => {
                if (e) rej(e);
                res(data.map(k => new Process(k)));
            });
        });
    }
    describe(process: number) {
        return new Promise<Process>((res, rej) => {
            pm2.describe(process, (e, data) => {
                if (e) rej(e);
                res(new Process(data[0]));
            });
        });
    }
}

const instance = new PM2();

export default instance;