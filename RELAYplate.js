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
}

RELAYplate.prototype.relayOFF = function(relay) {
}

RELAYplate.prototype.relayTOGGLE = function(relay) {
}

RELAYplate.prototype.relayALL= function(state) {
}

RELAYplate.prototype.relaySTATE= function() {
}

RELAYplate.prototype.RESET = function() {
}

module.exports = RELAYplate;
