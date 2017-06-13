
var rpio = require('rpio');
var inherits = require('util').inherits;

const DAQCbaseADDR = 8;
const MOTORbaseADDR = 16;
const RELAYbaseADDR = 24;

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


function RELAYplate(addr) {
	if (! (this instanceof RELAYplate))
		return (new RELAYplate(addr)); 
	BASEplate.call(this, RELAYbaseADDR + addr);
}

inherits(RELAYplate, BASEplate);

RELAYplate.prototype.relayON = function(relay) {
	// TODO add bounds check for relay arg
	ppCMD(this.addr, 0x10, relay, 0, 0);
}

RELAYplate.prototype.relayOFF = function(relay) {
	// TODO add bounds check for relay arg
	ppCMD(this.addr, 0x11, relay, 0, 0);
}

RELAYplate.prototype.relayTOGGLE = function(relay) {
	// TODO add bounds check for relay arg
	ppCMD(this.addr, 0x12, relay, 0, 0);
}

RELAYplate.prototype.relayALL= function(state) {
	// TODO add bounds check for state arg (0-127)
	ppCMD(this.addr, 0x13, state, 0, 0);
}

RELAYplate.prototype.relaySTATE= function() {
	var state = [];
	var resp = ppCMD(this.addr, 0x14, 0, 0, 1);
	for (var i = 0; i < 8; i++) {
		state[i] = (resp[0] >> i) & 1;
	}
	return (state);
}

RELAYplate.prototype.RESET= function() {
	ppCMD(this.addr, 0x0F, 0, 0, 0);
	rpio.msleep(100);
}


function DAQCplate(addr) {
	if (! (this instanceof DAQCplate))
		return (new DAQCplate(addr)); 
	BASEplate.call(this, DAQCbaseADDR + addr);
}

inherits(DAQCplate, BASEplate);

DAQCplate.prototype.getADC = function (channel) {

}

DAQCplate.prototype.getADCall = function () {

}

DAQCplate.prototype.getDINbit = function (bit) {

}

DAQCplate.prototype.getDINall = function () {

}

DAQCplate.prototype.enableDINint = function (bit, edge) {

}

DAQCplate.prototype.disableDINint = function (bit) {

}

DAQCplate.prototype.getTEMP = function (channel, scale) {

}

DAQCplate.prototype.getRANGE = function (channel, units) {

}

DAQCplate.prototype.getSWstate = function () {

}

DAQCplate.prototype.enableSWint = function () {

}

DAQCplate.prototype.disableSWint = function () {

}

DAQCplate.prototype.enableSWpower = function () {

}

DAQCplate.prototype.disableSWpower = function () {

}

DAQCplate.prototype.setDOUTbit = function (bit) {

}

DAQCplate.prototype.clrDOUTbit = function (bit) {

}

DAQCplate.prototype.toggleDOUTbit = function (bit) {

}

DAQCplate.prototype.setDOUTall = function (byte) {

}

DAQCplate.prototype.getDOUTall = function (byte) {

}

DAQCplate.prototype.setPWM = function (channel, value) {

}

DAQCplate.prototype.getPWM = function (channel) {

}

DAQCplate.prototype.setDAC= function (channel, value) {

}

DAQCplate.prototype.getDAC= function (channel) {

}

DAQCplate.prototype.calDAC= function () {

}

DAQCplate.prototype.intEnable = function () {

}

DAQCplate.prototype.intDisable = function () {

}

DAQCplate.prototype.getINTflags = function () {

}



function MOTORplate(addr) {
	if (! (this instanceof MOTORplate))
		return (new MOTORplate(addr)); 
	BASEplate.call(this, MOTORbaseADDR + addr);
}

inherits(MOTORplate, BASEplate);

MOTORplate.prototype.foo = function () {

}

var DAQCplates = [];
var RELAYplates = [];
var MOTORplates = [];

function init() {
	// poll for attached plates of each type
	console.log('Scanning for Pi Plates');

	function getADDR(addr) {
		var res = ppCMD(addr, 0x00, 0, 0, 1);
		return (res);
	}

	for (var i = 0; i < 8; i++) {
		var resp;
		resp = getADDR(i + RELAYbaseADDR);
		if (resp - RELAYbaseADDR == i) {
			console.log('found RELAYplate at address: ' + i);
			RELAYplates[i] = new RELAYplate(i);

		}
		resp = getADDR(i + DAQCbaseADDR);
		if (resp - DAQCbaseADDR == i) {
			console.log('found DAQCplate at address: ' + i);
			DAQCplates[i] = new DAQCplate(i);

		}
		resp = getADDR(i + MOTORbaseADDR);
		if (resp - MOTORbaseADDR == i) {
			console.log('found MOTORplate at address: ' + i);
			MOTORplates[i] = new MOTORplate(i);
		}
	}
}

init();

module.exports = {
	DAQCplates: DAQCplates,
	RELAYplates: RELAYplates,
	MOTORplates: MOTORplates
}
