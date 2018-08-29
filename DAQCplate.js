const BASEplate = require('./BASEplate');

class DAQCplate extends BASEplate {
    constructor (addr) {
        super(addr, "DAQC");
    }

    async clearDOUT(bit)
    {
        return await new Promise((resolve,reject)=>{
            this.send({cmd: "clrDOUTbit", args: { bit }}, resolve);
        });
    }

    
    async setDOUT(bit)
    {
        return await new Promise((resolve,reject)=>{
            this.send({cmd: "setDOUTbit", args: { bit }}, resolve);
        });
    }

    async getDIN(bit)
    {
        return await new Promise((resolve,reject)=>{
            this.send({cmd: "getDINbit", args: { bit }}, resolve);
        });
    }

}

module.exports = DAQCplate;
