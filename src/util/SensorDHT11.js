"use strict"
class SensorDHT11 {
    constructor(pin) {
        this.sensorLib = require('node-dht-sensor');
        this.sensorType=11;
        this.sensorPin = pin;
        if (!this.sensorLib.initialize(this.sensorType, this.sensorPin)) {
            console.warn('Failed to initialize sensor');
            process.exit(1);
        }
        this.readout = null;
    }

    read(){
        this.readout = this.sensorLib.read();
    }

    getTemperature(){

        return this.readout.temperature.toFixed(1);

    }

    getHumidity(){

        return this.readout.humidity.toFixed(1);
    }

}

module.exports = SensorDHT11;

