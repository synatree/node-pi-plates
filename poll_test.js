var plate_comms = require('./plate_comms');
var RELAYplate = require('./RELAYplate');
var DAQCplate = require('./DAQCplate');
var MOTORplate = require('./MOTORplate');

var ppCMD = plate_comms.ppCMD;
var RELAYbaseADDR = plate_comms.RELAYbaseADDR;
var DAQCbaseADDR = plate_comms.DAQCbaseADDR;
var MOTORbaseADDR = plate_comms.MOTORbaseADDR;

var DAQCplates = [];
var RELAYplates = [];
var MOTORplates = [];

function init() {
	// poll for attached plates of each type
	console.log('Scanning for Pi Plates');

	function getADDR(addr) {
		var res = ppCMD(addr, 0x00, 0, 0, 1);
		return (res);
	}

	for (var i = 0; i < 8; i++) {
		var resp;
		resp = getADDR(i + RELAYbaseADDR);
		//console.log('relay response: ' + resp);
		if (resp - RELAYbaseADDR == i) {
			console.log('found RELAYplate at address: ' + i);
			RELAYplates[i] = new RELAYplate(i);

		}
		resp = getADDR(i + DAQCbaseADDR);
		//console.log('daqc response: ' + resp);
		if (resp - DAQCbaseADDR == i) {
			//console.log('found DAQCplate at address: ' + i);
			DAQCplates[i] = new DAQCplate(i);

		}
		resp = getADDR(i + MOTORbaseADDR);
		console.log('motor response: ' + resp);
		if (resp - MOTORbaseADDR == i) {
			console.log('found MOTORplate at address: ' + i);
			MOTORplates[i] = new MOTORplate(i);
		}
	}
}

function getADDR(addr) {
	var res = ppCMD(addr, 0x00, 0, 0, 1);
	return (res);
}
console.log('checking address: ' + RELAYbaseADDR)
console.log(getADDR(RELAYbaseADDR));
