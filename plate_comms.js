var rpio = require('rpio');

// initialize communication with plate stack

const ppFRAME = 22;
const ppINT = 15;

const RELAYbaseADDR = 24;
const DAQCbaseADDR = 8;
const MOTORbaseADDR = 16;

rpio.init({gpiomem: false});
rpio.open(ppFRAME, rpio.OUTPUT, rpio.LOW);
rpio.msleep(1);

rpio.open(ppINT, rpio.INPUT, rpio.PULL_UP);

rpio.spiBegin();
rpio.spiChipSelect(1);

function ppCMD(addr, cmd, param1, param2, bytes2return) {
	rpio.spiSetClockDivider(850);
	var res = [];
	var args = [addr, cmd, param1, param2];
	var buf = Buffer.from(args);
	rpio.write(ppFRAME, rpio.HIGH);
	rpio.spiWrite(buf, buf.length)
	if (bytes2return > 0) {
		var rxbuf = new Buffer(1);
		var txbuf = new Buffer([0]);
		rpio.spiSetClockDivider(500);
		rpio.usleep(400);
		for (var i = 0; i < bytes2return; i++) {
			rpio.spiTransfer(txbuf, rxbuf, txbuf.length);
			res.push(rxbuf[0]);
		}
	}
	rpio.msleep(1);
	rpio.write(ppFRAME, rpio.LOW);
	rpio.msleep(1);
	return (res);
}

module.exports = {
	ppCMD: ppCMD,
	RELAYbaseADDR: RELAYbaseADDR,
	DAQCbaseADDR: DAQCbaseADDR,
	MOTORbaseADDR: MOTORbaseADDR
}
