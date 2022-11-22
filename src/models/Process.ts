

export type ProcessMonit = { memory: number, cpu: number };

export type ProcessPM2envAxmData = {
    value: string,
    type: string,
    unit: string,
    historic: boolean
}

export type ProcessPM2env = {
    created_at: number,
    restart_time: number,
    pm_uptime: number,
    status: 'online' | string,
    pm_pid_path: string,
    pm_err_log_path: string,
    pm_out_log_path: string,
    exec_mode: 'cluster_mode' | 'fork_mode' | 'UNKNOWN',
    axm_monitor: { [key in string]: ProcessPM2envAxmData }
}

export class Process {
    pid: number;
    name: string;
    monit: ProcessMonit;
    pm_id: number;
    pm2_env: ProcessPM2env

    constructor(data: any) {
        this.pid = data.pid;
        this.name = data.name;
        this.monit = { cpu: 0, memory: 0 }
        this.monit.cpu = data.monit.cpu;
        this.monit.memory = data.monit.memory;
        this.pm_id = data.pm_id;
        this.pm2_env = {
            axm_monitor: {},
            created_at: -1,
            exec_mode: 'UNKNOWN',
            pm_err_log_path: '',
            pm_out_log_path: '',
            pm_pid_path: '',
            pm_uptime: -1,
            restart_time: -1,
            status: ''

        }
        this.pm2_env.created_at = data.pm2_env.created_at;
        this.pm2_env.exec_mode = data.pm2_env.exec_mode;
        this.pm2_env.pm_err_log_path = data.pm2_env.pm_err_log_path;
        this.pm2_env.pm_out_log_path = data.pm2_env.pm_out_log_path;
        this.pm2_env.pm_pid_path = data.pm2_env.pm_pid_path;
        this.pm2_env.pm_uptime = data.pm2_env.pm_uptime;
        this.pm2_env.restart_time = data.pm2_env.restart_time;
        this.pm2_env.status = data.pm2_env.status;
        this.pm2_env.axm_monitor = data.pm2_env.axm_monitor;
    }
}