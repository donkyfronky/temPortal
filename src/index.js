var express    = require('express'),
port = 8081,
app        = express(),
bodyParser = require('body-parser'),
service = require('./service'),
Sample = require('./model/Sample'),
trend_interval = 10; //sec

//let t = new Temperature(2);
//storage.save(t);
/*
//client.client.lpush('ranges',last_label);
var storage = service.resolve('storage');
storage.lpush('ranges',last_label);
console.log('created label: '+last_label);*/

let storage = service.resolve('storageHelper')
storage.setBaseLabel()
    .then(()=>{
        setInterval(()=>{storage.setBaseLabel()}, (trend_interval*1000)/2);
        setInterval(()=>{service.resolve('thermPortalEvent').emit('check-sensor');}, (trend_interval*1000));
    });

//app.set('json spaces', 2),
/**Middleware**/
//app.use(client);
app.use(express.static('public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/*
app.get('/',function(req, res){

    res.sendfile('index.html');

});*/

var router = express.Router();

router.get('/sample/:range/', service.resolve('sampleController').getFromRange);
router.get('/range/last/', service.resolve('rangesController').getLastRange);
router.get('/range/list/', service.resolve('rangesController').getRangeList);
router.get('/range/date/:range/', service.resolve('rangesController').getRange);

/**group route**/
app.use('/', router);

app.listen(port);
console.log('server on port ' + port);

service.resolve('thermPortalEvent').on('check-sensor', () => {
    console.log('check sensor');
    checkSensor();
});

function checkSensor(){
    let sensor = service.resolve('sensor');
    sensor.read();
    let t = new Sample(sensor.getTemperature(),sensor.getHumidity(),new Date().toISOString());
    storage.save(t);
}
/**
 * manca la gestione del cambio label ogni 24h  ((new Date() - new Date('2018-04-06 11:01:00'))/(3600*1000) > 24)
 *
 * **/