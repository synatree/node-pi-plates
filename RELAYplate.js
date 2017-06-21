var rpio = require('rpio');
var inherits = require('util').inherits;
var BASEplate = require('./BASEplate');
var ppCMD = require('./plate_comms').ppCMD;
var RELAYbaseADDR = require('./plate_comms').RELAYbaseADDR;

function RELAYplate(addr) {
	if (! (this instanceof RELAYplate))
		return (new RELAYplate(addr)); 
	BASEplate.call(this, RELAYbaseADDR + addr);
/*
	// take a few practice swings first
	for (var i = 0; i < 3; i++) {
		ppCMD(this.addr, 0x00, 0, 0, 1);
	}

	// now see if our address checks out
	console.log('getADDR: ' + ppCMD(this.addr, 0x00, 0, 0, 1));
 */
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

module.exports = RELAYplate;
