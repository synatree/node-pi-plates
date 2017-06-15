var inherits = require('util').inherits;
var BASEplate = require('./BASEplate');
var ppCMD = require('./plate_comms').ppCMD;
var DAQCbaseADDR =  require('./plate_comms').DAQCbaseADDR;

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

module.exports = DAQCplate;
