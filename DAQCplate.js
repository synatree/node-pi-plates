var inherits = require('util').inherits;
var BASEplate = require('./BASEplate');
const DAQCbaseADDR = 8;

function DAQCplate(addr) {
	if (! (this instanceof DAQCplate))
		return (new DAQCplate(addr)); 
	BASEplate.call(this, DAQCbaseADDR + addr, "DAQC");
}

inherits(DAQCplate, BASEplate);

DAQCplate.prototype.getADC = function (channel) {
	var resp = this.ppCMD(this.addr, 0x30, channel, 0, 2);
	var value = 256 * resp[0] + resp[1];
	value = (value * 4.096) / 1024;
	return (value);
}

DAQCplate.prototype.getADCall = function () {

}

DAQCplate.prototype.getDINbit = function (bit) {
	var resp = this.ppCMD(this.addr, 0x20, bit, 0, 1);
	if (resp[0] > 0) {
		return (0);
	} else {
		return (1);
	}
}

DAQCplate.prototype.getDINall = function () {
	var resp = this.ppCMD(this.addr, 0x25, 0, 0, 1);
	console.log(resp);
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
	this.ppCMD(this.addr, 0x10, bit, 0, 0);
}

DAQCplate.prototype.clrDOUTbit = function (bit) {
	this.ppCMD(this.addr, 0x11, bit, 0, 0);
}

DAQCplate.prototype.toggleDOUTbit = function (bit) {
	this.ppCMD(this.addr, 0x12, bit, 0, 0);
}

DAQCplate.prototype.getDOUTbit = function (bit) {
	var state = this.getDOUTall();
	return state[bit];
}

DAQCplate.prototype.setDOUTall = function (byte) {

}

DAQCplate.prototype.getDOUTbyte = function () {
	var resp = this.ppCMD(this.addr, 0x14, 0, 0, 1);
	return (resp);
}

DAQCplate.prototype.getDOUTall = function () {
	var state = [];
	var resp = this.getDOUTbyte();
	for (var i = 0; i < 8; i++) {
		state[i] = (resp[0] >> i) & 1;
	}
	return (state);
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

module.exports = DAQCplate;
