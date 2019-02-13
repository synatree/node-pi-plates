// Test changing voltage on DAC0 by monitoring on ADC0
// assumes that analog input 0 is connected to analog output 0
// on a DAQC2 set to address 3 via jumpers

const DAQC2plate = require('../DAQC2plate');

DP0 = new DAQC2plate(3);

const obj = {args: {}};
let i = 0;
setInterval( () => {
    if (i > 4.097)
        i = 0;
    obj.cmd = "setDAC"
    obj.args.channel = 0;
    obj.args.value = i;
    DP0.send(obj, (reply) => {
        DP0.send({cmd: "getADC", args: {channel: 0}}, (reply) => {
            console.log('voltage is ' + reply.voltage);
        });
    });
    i += 0.5;
}, 1000);
