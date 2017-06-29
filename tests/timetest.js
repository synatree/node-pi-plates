
setInterval(function () {
	var diff = process.hrtime(process.hrtime());
	console.log(diff);
}, 500);
