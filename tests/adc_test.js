var DP = require('../DAQCplate');

var dp0 = new DP(0);

setInterval(function () {
	console.log(dp0.getADC(6));
}, 500);
