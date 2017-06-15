var rpio = require('rpio');
var ppCMD = require('./plate_comms').ppCMD;

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
	var ppCMD = this.ppCMD;
	var resp = ppCMD(this.addr, 0x03, 0, 0, 1);
	var rev = resp[0];
	var whole = rev >> 4;
	var point = rev & 0x0F;
	return (whole + (point / 10.0));
}

module.exports = BASEplate;
