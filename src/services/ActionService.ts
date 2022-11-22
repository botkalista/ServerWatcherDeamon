import { Process } from '../models/Process';
import child from 'child_process';
import pm2 from './PM2Service';
import os from 'os';

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
export async function getProcessInfo(process: number, useCache: boolean = false) {
    if (useCache) return state.processes[process];
    const p = await pm2.describe(process);
    state.processes[process] = p;
    return p;
}
export async function getProcessLogs(process: number, lines: number = 20) {
    const target = state.processes[process];
    if (!target) return;
    const logPath = target.pm2_env.pm_out_log_path;
    const tail = child.execSync(`tail ${logPath} -n ${lines}`);
    return tail.toString().split('\n').filter(e => e.length > 0);
}
export async function getProcessErrors(process: number, lines: number = 20) {
    const target = state.processes[process];
    if (!target) return;
    const logPath = target.pm2_env.pm_err_log_path;
    const tail = child.execSync(`tail ${logPath} -n ${lines}`);
    return tail.toString().split('\n').filter(e => e.length > 0);
}
export function getRam() {
    return { max: os.totalmem(), free: os.freemem() }
}