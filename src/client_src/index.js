var Chart = require('chart.js');
import wretch from "wretch"
import * as utils from './util';
import io from 'socket.io-client'

var socket = io.connect(window.location.host);
socket.on("Start_Chat",function(e){
    console.log(e)
})


window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};



window.lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Temperature',
        borderColor: window.chartColors.red,
        backgroundColor: window.chartColors.red,
        fill: false,
        data: [],
        yAxisID: 'y-axis-1',
    }, {
        label: 'Humidity',
        borderColor: window.chartColors.blue,
        backgroundColor: window.chartColors.blue,
        fill: false,
        data: [],
        yAxisID: 'y-axis-2'
    }]
};

    let ctx = document.getElementById('myfirstchart').getContext('2d');
    window.ThermChart = Chart.Line(ctx, {
        data: lineChartData,
        options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text: ''
            },
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }, {
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',

                    // grid line settings
                    gridLines: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                }],
            }
        }
    });

document.getElementById('button-loader').addEventListener('click', function() {
    let select = document.getElementById('ranges');
    let selectedElement = select.options[select.selectedIndex];
    utils.updateDataAndGraph(selectedElement.value)
});


function updateDivCounter(counter){
    if(counter < 10) {
        document.getElementById('timer').innerHTML = '0'+counter;
    }else{
        document.getElementById('timer').innerHTML = counter;
    }
}
window.onload = function() {

utils.loadRanges().then(last=>{
    utils.updateDataAndGraph(last)

    var failTime = 15,      //Refresh time when no connection
        counter;            //Holds the count number (Seconds)

    function countDown(cb){

        if(counter == 0){
            counter = failTime;
            cb();
        }else{
            counter--;
        }
        updateDivCounter(counter);
    }

    counter = failTime;
    updateDivCounter(counter);

    setInterval(()=>{
        countDown(()=>{
            let select = document.getElementById('ranges');
            let selectedElement = select.options[select.selectedIndex];
            utils.updateDataAndGraph(last)
        })
    },1000);
});

};
