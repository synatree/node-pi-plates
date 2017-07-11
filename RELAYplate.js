var rpio = require('rpio');
var inherits = require('util').inherits;
var BASEplate = require('./BASEplate');
const RELAYbaseADDR = 24;

function RELAYplate(addr) {
	if (! (this instanceof RELAYplate))
		return (new RELAYplate(addr)); 
	BASEplate.call(this, RELAYbaseADDR + addr, "RELAY");
}

inherits(RELAYplate, BASEplate);

RELAYplate.prototype.relayON = function(relay) {
	// TODO add bounds check for relay arg
	this.ppCMD(this.addr, 0x10, relay, 0, 0);
}

RELAYplate.prototype.relayOFF = function(relay) {
	// TODO add bounds check for relay arg
	this.ppCMD(this.addr, 0x11, relay, 0, 0);
}

RELAYplate.prototype.relayTOGGLE = function(relay) {
	// TODO add bounds check for relay arg
	this.ppCMD(this.addr, 0x12, relay, 0, 0);
}

RELAYplate.prototype.relayALL= function(state) {
	// TODO add bounds check for state arg (0-127)
	this.ppCMD(this.addr, 0x13, state, 0, 0);
}

RELAYplate.prototype.relaySTATE= function() {
	var state = [];
	var resp = this.ppCMD(this.addr, 0x14, 0, 0, 1);
	for (var i = 0; i < 8; i++) {
		state[i] = (resp[0] >> i) & 1;
	}
	return (state);
}

RELAYplate.prototype.RESET = function() {
	this.ppCMD(this.addr, 0x0F, 0, 0, 0);
	rpio.msleep(100);
}

module.exports = RELAYplate;
