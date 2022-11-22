import { Process } from '../models/Process';
import pm2 from './PM2Service';

type ActionSerciceState = {
    processes: Process[],
    connected: boolean
}

const state: ActionSerciceState = {
    processes: [],
    connected: false
}

export async function getAllProcessesInfo(useCache: boolean = false) {
    if (useCache) return state.processes;
    const processes = await pm2.list();
    state.processes = processes;
    return processes;
}

export async function getProcessInfo(process: number) {

}