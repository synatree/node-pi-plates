var DAQCplate = require('../DAQCplate');
var DP3 = new DAQCplate(3);

setInterval(function () {
	DP3.getDINall();
}, 500);
