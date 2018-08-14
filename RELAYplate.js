const BASEplate = require('./BASEplate');
var lock = new AwaitLock();
class RELAYplate extends BASEplate {
    constructor (addr, governor=0) {
        super(addr, "RELAY");
        if(governor)
        {
            // it's important to know how many are currently on so that we can enforce the governing rule.
            this.totalOn = 0;
            [0,1,2,3,4,5,6,7].forEach((n)=>{
                var v = await this.relayState(n);
                if(v)
                {
                    this.totalOn++;
                }
            });
            this.governor = governor;
        }
        
    }

    async relayOn(num){
        
        return await new Promise((resolve,reject)=>{
         
            if(this.totalOn+1 > this.governor)
            {
                console.log("Cannot Turn On Relay, Too Many Open");
                reject();
            }
            this.send({cmd: "relayON", args: { relay: num}}, resolve);
        }).then(()=>{
            this.totalOn++;
        });  
    }

    async relayOff(num){
        return await new Promise((resolve,reject)=>{
            this.send({cmd: "relayOFF", args: { relay: num}}, resolve);
        }).then(()=>{
            this.totalOn--;
        });
    }

    async relayToggle(num){
        return await new Promise(async (resolve,reject)=>{
            var cur = await this.relayState(num)
            if(! cur)
            {
                return this.relayOn(num)
            }
            else
            {
                return this.relayOff(num);
            }
        });
    }

    async relayState(num){
        return await new Promise((resolve,reject)=>{
            this.send({cmd: "relaySTATE", args: { relay: num}}, resolve);
        });
    }


}

module.exports = RELAYplate;
