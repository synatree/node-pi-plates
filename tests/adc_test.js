var DP = require('../DAQCplate');

var dp0 = new DP(3);

setInterval(function () {
	console.log(dp0.getADC(0));
}, 500);
