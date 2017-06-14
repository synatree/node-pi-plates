var rpio = require('rpio');

const ppFRAME = 22;
const ppINT = 15;

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

function BASEplate(addr) {
	this.addr = addr;
}

BASEplate.prototype.getID = function () {
        var recv = [];
        var buf = Buffer.from([this.addr, 0x01, 0, 0]);
        rpio.spiSetClockDivider(850);
        rpio.write(ppFRAME, rpio.HIGH)
        rpio.spiWrite(buf, buf.length);
        var count = 0;
        var rxbuf = new Buffer(1);
        var txbuf = new Buffer([0]);
        rpio.spiSetClockDivider(500);
        while (count < 20) {
                rpio.spiTransfer(txbuf, rxbuf, txbuf.length);
                if (rxbuf[0] !== 0) {
                        recv.push(rxbuf[0]);
                        count++;
                } else {
                        count = 20;
                }
        }
        rpio.write(ppFRAME, rpio.LOW);
        var rb = Buffer.from(recv);
        var id = rb.toString('ascii');
        return (id);
}

BASEplate.prototype.getHWrev = function() {
	var resp = ppCMD(this.addr, 0x02, 0, 0, 1);
	var rev = resp[0];
	var whole = rev >> 4;
	var point = rev & 0x0F;
	return (whole + (point / 10.0));
}

BASEplate.prototype.getFWrev = function() {
	var resp = ppCMD(this.addr, 0x03, 0, 0, 1);
	var rev = resp[0];
	var whole = rev >> 4;
	var point = rev & 0x0F;
	return (whole + (point / 10.0));
}

module.exports = {
	BASEplate: BASEplate,
	ppCMD: ppCMD,
	rpio:rpio
}
