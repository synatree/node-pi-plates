const { inherits } = require('util');
const BASEplate = require('./BASEplate');

function DAQCplate(addr) {
	if (! (this instanceof DAQCplate))
		return (new DAQCplate(addr)); 
	BASEplate.call(this, addr, "DAQC");
}

inherits(DAQCplate, BASEplate);

module.exports = DAQCplate;
