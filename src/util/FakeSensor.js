"user stric"

class FakeSensor{
    read() {
        return true;
    }

    getTemperature() {
        return this._randomFloatBetween(10,50,1);
    }

    getHumidity() {
        return this._randomFloatBetween(20,35,1);
    }

    _randomFloatBetween(minValue,maxValue,precision){
        if(typeof(precision) == 'undefined'){
            precision = 2;
        }
        return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
    }
}

module.exports = FakeSensor;