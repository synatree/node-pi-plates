
var RP = require('./RELAYplate');
var DP = require('./DAQCplate');
var rp0 = new RP(0);
var dp0 = new DP(0);

process.on('SIGINT', function() {
	exit(0);
});

process.on('beforeExit', function() {
	rp0.relayALL(0);
});




var id = rp0.getID();
console.log('RP id: ' + id);
id = dp0.getID();
console.log('DP id: ' + id);
