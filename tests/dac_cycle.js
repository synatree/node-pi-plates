// Test changing voltage on DAC0 by monitoring on ADC0
// assumes that analog input 0 is connected to analog output 0
// on a DAQC set to address 2 via jumpers

const DAQCplate = require('../DAQCplate');

DP0 = new DAQCplate(2);

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
