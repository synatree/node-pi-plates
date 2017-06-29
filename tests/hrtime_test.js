var rpio = require('rpio');
rpio.init({gpiomem: false});
rpio.open(22, rpio.OUTPUT, rpio.LOW);

function flipflop() {
	while (true) {
		rpio.write(22, rpio.HIGH);
		rpio.write(22, rpio.LOW);
	}
}
