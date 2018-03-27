const RELAYplate = require('../RELAYplate');
const DAQCplate = require('../DAQCplate');

RP1 = new RELAYplate(1);
DP0 = new DAQCplate(0);

RP1.send({cmd: "RESET", args: {}}, (reply) => {
    console.log('relay plate reset: ' + reply.RESET);
});

let i = 1;
let j = 0;
r_obj = {cmd: "relayTOGGLE", args: {relay: i}};
d_obj = {cmd: "toggleDOUTbit", args: {bit: j}};
setTimeout( () => {
    setInterval( () => {
        if (i > 7)
            i = 1;
        if (j > 6)
            j = 0
        r_obj.args.relay = i;
        RP1.send(r_obj, (reply) => {});
        i += 1;
        d_obj.args.bit = j;
        DP0.send(d_obj, (reply) => {});
        j += 1;
    }, 500);
}, 1000);
