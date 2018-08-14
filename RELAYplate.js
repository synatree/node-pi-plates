const BASEplate = require('./BASEplate');

class RELAYplate extends BASEplate {
    constructor (addr) {
        super(addr, "RELAY");
    }

    async relayOn(num){
        return await new Promise((resolve,reject)=>{
            this.send({cmd: "relayON", args: { relay: num}}, resolve);
        });  
    }

    async relayOff(num){
        return await new Promise((resolve,reject)=>{
            this.send({cmd: "relayOFF", args: { relay: num}}, resolve);
        });
    }

    async relayToggle(num){
        return await new Promise((resolve,reject)=>{
            this.send({cmd: "relayTOGGLE", args: { relay: num}}, resolve);
        });
    }

    async relayState(num){
        return await new Promise((resolve,reject)=>{
            this.send({cmd: "relaySTATE", args: { relay: num}}, resolve);
        });
    }
}

module.exports = RELAYplate;
