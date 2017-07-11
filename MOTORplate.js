var inherits = require('util').inherits;
var BASEplate = require('./BASEplate');
const MOTORbaseADDR = 16;

function MOTORplate(addr) {
	if (! (this instanceof MOTORplate))
		return (new MOTORplate(addr)); 
	BASEplate.call(this, MOTORbaseADDR + addr, "MOTOR");
}

inherits(MOTORplate, BASEplate);

MOTORplate.prototype.foo = function () {

}

module.exports = MOTORplate;
