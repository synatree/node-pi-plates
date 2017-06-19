var RP = require('./RELAYplate');
var rp0 = new RP(0);

var i = 0;

setInterval(function () {
	i = (i % 7) + 1;
	rp0.relayTOGGLE(i);
}, 300)
