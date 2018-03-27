const RELAYplate = require('../RELAYplate');

RP1 = new RELAYplate(1);

RP1.send({cmd: "RESET", args: {}}, (reply) => {
    console.log('reset: ' + reply.RESET);
});

let i = 1;
obj = {cmd: "relayTOGGLE", args: {relay: i}};
setTimeout( () => {
    setInterval( () => {
        if (i > 7)
            i = 1;
        obj.args.relay = i;
        RP1.send(obj, (reply) => {});
        i += 1;
    }, 500);
}, 1000);
