var inherits = require('util').inherits;
var BP = require('./BASEplate');
var BASEplate = BP.BASEplate;

var MOTORbaseADDR = 16;

function MOTORplate(addr) {
	if (! (this instanceof MOTORplate))
		return (new MOTORplate(addr)); 
	BASEplate.call(this, MOTORbaseADDR + addr);
}

inherits(MOTORplate, BASEplate);

MOTORplate.prototype.foo = function () {

}

module.exports = MOTORplate;
