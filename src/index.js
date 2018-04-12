let express    = require('express'),
port = 8081,
app        = express(),
bodyParser = require('body-parser'),
service = require('./service'),
Sample = require('./model/Sample'),
swissArmy = require('./util/swissarmy')
trend_interval = 5; //sec

//let t = new Temperature(2);
//storage.save(t);
/*
//client.client.lpush('ranges',last_label);
var storage = service.resolve('storage');
storage.lpush('ranges',last_label);
console.log('created label: '+last_label);*/

swissArmy = new swissArmy(service);
let storage = service.resolve('storageHelper')
storage.setBaseLabel()
    .then(swissArmy.clockActions(trend_interval));

swissArmy.onEvent('check-sensor',checkSensor)

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

//app.listen(port);

var io = require('socket.io').listen(app.listen(port));

io.sockets.on("connection",function(socket){
    socket.emit("Start_Chart",trend_interval);
})


console.log('server on port ' + port);

//For Tracking When User Disconnects:
io.sockets.on("disconnect",function(socket){
//var socket is the socket for the client who has disconnected.
})


function checkSensor(){
    let sensor = service.resolve('sensor');
    sensor.read();
    let t = new Sample(sensor.getTemperature(),sensor.getHumidity(),new Date().toISOString());
    storage.save(t);
    io.emit('sensor-checked',t)
}
/**
 * manca la gestione del cambio label ogni 24h  ((new Date() - new Date('2018-04-06 11:01:00'))/(3600*1000) > 24)
 *
 * **/