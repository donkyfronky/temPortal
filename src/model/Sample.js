"use strict"
class Sample {
    constructor(temperature,humidity,date) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.date = date;
        console.log(this.temperature,this.humidity,this.date);
    }

    getTemperature(){
        return this.temperature;
    }
    getHumidity(){
        return this.humidity;
    }
    getDate(){
        return this.date;
    }
}

module.exports = Sample;