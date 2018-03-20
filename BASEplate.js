const vasync = require('vasync');
const readline = require('readline');
const { spawn } = require('child_process');
const assert = require('assert');

const child = spawn('python', ['-u', __dirname + '/plate_io.py']);

const rl = readline.createInterface({
    input: child.stdout
});

function do_cmd(task, cb) {
    const cmd_str = JSON.stringify(task) + '\n';
    child.stdin.write(cmd_str);
    assert.equal(rl.listenerCount('line'), 0);
    rl.once('line', (line) => {
        const reply = JSON.parse(line);
        cb(reply);
    });
}

const queue = vasync.queue(do_cmd, 1);

class BASEplate {
    constructor (addr, plate_type) {
        this.addr = addr;
        this.plate_type = plate_type;
        this.queue = queue;
    }
    send (obj, receive_cb) {
        // send a request to this plate using the form:
        // {cmd: <pi-plate command>, args: {<command-specific args>}
        // e.g. {cmd: "relayTOGGLE", args: { relay: 4}}

        obj['plate_type'] = this.plate_type;
        obj['addr'] = this.addr;

        this.queue.push(obj, receive_cb);
    }
}

module.exports = BASEplate;
