// Test changing voltage on DAC by monitoring on ADC
// on 2 plates (DAQC with addr=2 and DAQC2 with addr=3
// To keep things separate, the DAQC test circuit is DAC0->ADC0 while the
// DAQC2 test circuit is DAC1->ADC1

const DAQCplate = require('../DAQCplate');
const DAQC2plate = require('../DAQC2plate');

foo = new DAQCplate(2);
bar = new DAQC2plate(3);

const foo_obj = {args: {}};
const bar_obj = {args: {}};
let i = 0;
setInterval( () => {
    if (i > 4.097)
        i = 0;
    foo_obj.cmd = "setDAC"
    bar_obj.cmd = "setDAC"
    foo_obj.args.channel = 0;
    bar_obj.args.channel = 1;
    foo_obj.args.value = i;
    bar_obj.args.value = i/2;

    foo.send(foo_obj, (reply) => {
        foo.send({cmd: "getADC", args: {channel: 0}}, (reply) => {
            console.log('DAQC voltage is ' + reply.voltage);
        });
    });
    bar.send(bar_obj, (reply) => {
        bar.send({cmd: "getADC", args: {channel: 1}}, (reply) => {
            console.log('DAQC2 voltage is ' + reply.voltage);
        });
    });
    i += 0.5;
}, 1000);
