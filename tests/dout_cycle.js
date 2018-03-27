const DAQCplate = require('../DAQCplate');

DP0 = new DAQCplate(0);

const obj = {args: {}};
let i = 0;
setInterval( () => {
    if (i > 6)
        i = 0;
    obj.cmd = "toggleDOUTbit"
    obj.args.bit = i;
    DP0.send(obj, (reply) => {});
    i += 1;
}, 500);
