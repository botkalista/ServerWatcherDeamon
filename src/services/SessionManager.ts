
import child from 'child_process';

type callback = (msg: string, isError: boolean) => any;

export class ShellSession {

    shell: child.ChildProcess;
    handlers: (callback)[] = [];

    constructor() { }

    open() {
        this.shell = child.exec('sh');
        this.shell.stdout?.on('data', (buffer: Buffer) => {
            const msg = buffer.toString();
            this.handlers.forEach(h => h(msg, false));
        });
        this.shell.stderr?.on('data', (buffer: Buffer) => {
            const msg = buffer.toString();
            this.handlers.forEach(h => h(msg, true));
        });
    }

    close() {
        if (!this.shell) return;
        this.shell.kill();
    }

    write(str: string) {
        if (!this.shell) return;
        this.shell.stdin?.write(str + '\n');
    }

    onMessage(cb: callback) {
        this.handlers.push(cb);
    }

}