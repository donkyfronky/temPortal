var ContainerModule = require('ioc-js');
var builder = new ContainerModule();

builder
    .register('sampleController', ['storageHelper'],function(storageHelper) {
        let c = require('./controller/controller_sample');
        c.setHelper(storageHelper)
        return c;
    })
    .register('rangesController', ['storageHelper'],function(storageHelper) {
        let c = require('./controller/controller_ranges');
        c.setHelper(storageHelper)
        return c;
    })
    .register('storage', function() {
        let createClient = require('then-redis').createClient;
        let db = createClient('tcp://localhost:6379');
        db.select('3');
        return db;
    })
    .register('sensor', function() {
        let sensor;
        if(process.arch === 'arm'){
            console.log('i\'m on Raspberry');
            let t = require('./util/SensorDHT11');
            sensor = new t(4);
        }else{
            console.log('i\'m on Docker');
            let t = require('./util/FakeSensor');
            sensor = new t(4);
        }

        return sensor;
    })
    .register('storageHelper', ['storage'], function(storage) {
            let storage_helper = require('./helper/storage_helper');
            let s = new storage_helper();
            s.setStorage(storage);
            return s;
    });


builder.init();
module.exports = builder