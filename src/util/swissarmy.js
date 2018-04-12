class swissArmy{
    constructor(service){
        this.service=service;
    }

    clockActions(trend_interval){
        console.log('getted interval of '+trend_interval+' secs');
        let storage = this.service.resolve('storageHelper')
        setInterval(()=>{storage.setBaseLabel()}, (trend_interval*1000)/2);
        setInterval(()=>{this.emitEvent('check-sensor',{j:'s'});}, (trend_interval*1000));
    }

    emitEvent(event,payload){
        let e  = this.service.resolve('thermPortalEvent')
            e.emit(event,payload)
        console.log('emitted '+event+' event');
    }
    onEvent(event,cb){
        let e  = this.service.resolve('thermPortalEvent')
        e.on(event, (evt) => {
            console.log('catched event '+event+' payload: ',evt);
            cb(evt)
        });
    }
}

module.exports = swissArmy;