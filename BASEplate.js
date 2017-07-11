var rpio = require('rpio');

const ppFRAME = 22;
const ppINT = 15;

rpio.init({gpiomem: false});
rpio.open(ppFRAME, rpio.OUTPUT, rpio.LOW);
rpio.msleep(1);

//rpio.open(ppINT, rpio.INPUT, rpio.PULL_UP);

rpio.spiBegin();
rpio.spiChipSelect(1);

function BASEplate(addr, plate_type) {
	this.addr = addr;
	this.plate_type = plate_type;
}

BASEplate.prototype.ppCMD = function (addr, cmd, param1, param2, bytes2return) {
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

		// to sleep, or not to sleep; that is the question
		rpio.usleep(100);
		for (var i = 0; i < bytes2return; i++) {
			rpio.spiTransfer(txbuf, rxbuf, txbuf.length);
			res.push(rxbuf[0]);
			// sleep here on fast pi3 to give the device time to ready the next value
			rpio.usleep(1);
		}
	}
	if (this.plate_type == "RELAY")
		rpio.usleep(930);

	rpio.write(ppFRAME, rpio.LOW);

	if (this.plate_type == "RELAY") {
		rpio.usleep(930);
	} else if (this.plate_type == "DAQC") {
		rpio.usleep(230);
	}

	return (res);
}

BASEplate.prototype.getID = function () {
        var recv = [];
        var buf = Buffer.from([this.addr, 0x01, 0, 0]);
        rpio.spiSetClockDivider(850);
        rpio.write(ppFRAME, rpio.HIGH)
        rpio.spiWrite(buf, buf.length);
	rpio.usleep(0);
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
		rpio.usleep(0);
        }
        rpio.write(ppFRAME, rpio.LOW);
        var rb = Buffer.from(recv);
        var id = rb.toString('ascii');
        return (id);
}

BASEplate.prototype.getHWrev = function() {
	var resp = this.ppCMD(this.addr, 0x02, 0, 0, 1);
	var rev = resp[0];
	var whole = rev >> 4;
	var point = rev & 0x0F;
	return (whole + (point / 10.0));
}

BASEplate.prototype.getFWrev = function() {
	var resp = this.ppCMD(this.addr, 0x03, 0, 0, 1);
	var rev = resp[0];
	var whole = rev >> 4;
	var point = rev & 0x0F;
	return (whole + (point / 10.0));
}

module.exports = BASEplate;
