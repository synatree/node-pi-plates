var inherits = require('util').inherits;
var BASEplate = require('./BASEplate');
var ppCMD = require('./plate_comms').ppCMD;
var MOTORbaseADDR =  require('./plate_comms').MOTORbaseADDR;

function MOTORplate(addr) {
	if (! (this instanceof MOTORplate))
		return (new MOTORplate(addr)); 
	BASEplate.call(this, MOTORbaseADDR + addr);
}

inherits(MOTORplate, BASEplate);

MOTORplate.prototype.foo = function () {

}

module.exports = MOTORplate;
