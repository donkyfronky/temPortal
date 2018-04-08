'use strict';
let Sample = require('../model/Sample');
let Label = require('../model/Label');


class storage_helper{
    constructor() {
        this.base_label='';
        this.sample_label='sample';
        this.ranges_label='ranges';
        this.storage = null;
    }

    getBaseLabel(){
        return this.base_label;
    }
    setBaseLabel(){
        this.findBaseLabel()
            .then(result_label=>{

                if(result_label ===null ){

                    this.base_label = new Label(this.uuidv4(),new Date());
                    this.save(this.base_label);
                    return this.base_label.getLabel();
                }else {


                    let last_label = result_label;

                            let nowDate =new Date();
                            let last_nowDate = new Date(result_label.date);


                            if (!(last_nowDate.setHours(0,0,0,0) == nowDate.setHours(0,0,0,0))) {

                                this.base_label = new Label(this.uuidv4(), new Date());
                                this.save(this.base_label);
                                return this.base_label.getLabel();
                            } else {

                                this.base_label = new Label(last_label.label, last_label.date);

                                return this.base_label.getLabel();
                            }
                }});
    }

    setStorage(storage){
        this.storage = storage;
    }
    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    findBaseLabel(){
        return this.getRangeList()
            .then(result => {
                    if(result[0]!==null){
                        return JSON.parse(result[0]);
                    }
                },err=>{
                return null;

                }
            );
    }
    getData(key) {
        return this.storage.exists(key)
            .then(e => {
                if (!e) {
                    return Promise.reject(key + ' not exist');
                }
                return this.storage.lrange(key, 0, 96);
            });
    }
    getRangeList(){
        return this.getData(this.ranges_label);
    }
    getRange(key){
        return this.getRangeList()
            .then(list=>{
                if(list.indexOf(key) === -1){
                    return Promise.reject(key + ' not exist');
                }

                return this.storage.get('date_'+key)
                    .then(value=>{
                       return value
                    })
            })
    }
    getSampleFromRange(label){
        label = this.sample_label+'_'+label;
        return this.getData(label);
    }

    save(obj){

        switch (obj.constructor){

            case Sample:
                var label = this.sample_label+'_'+this.base_label.getLabel();
                this.storage.lpush(label,JSON.stringify(obj));
                break;

            case Label:
                this.storage.lpush('ranges',JSON.stringify(obj));
                break;

            default:
                console.log('Object '+obj.constructor.name+' is unknown!!');
        }
    }

}

module.exports = storage_helper;

