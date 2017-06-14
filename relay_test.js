var RP = require('./RELAYplate');
var rp0 = new RP(0);

setInterval(function () {
	rp0.relayTOGGLE(1);
}, 1000)
