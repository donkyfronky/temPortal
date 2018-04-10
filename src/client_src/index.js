var Chart = require('chart.js');

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

var Samples = global.Samples || (global.Samples = {});

Samples.utils = {
    // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    srand: function(seed) {
        this._seed = seed;
    },

    rand: function(min, max) {
        var seed = this._seed;
        min = min === undefined ? 0 : min;
        max = max === undefined ? 1 : max;
        this._seed = (seed * 9301 + 49297) % 233280;
        return min + (this._seed / 233280) * (max - min);
    },

    numbers: function(config) {
        var cfg = config || {};
        var min = cfg.min || 0;
        var max = cfg.max || 1;
        var from = cfg.from || [];
        var count = cfg.count || 8;
        var decimals = cfg.decimals || 8;
        var continuity = cfg.continuity || 1;
        var dfactor = Math.pow(10, decimals) || 0;
        var data = [];
        var i, value;

        for (i = 0; i < count; ++i) {
            value = (from[i] || 0) + this.rand(min, max);
            if (this.rand() <= continuity) {
                data.push(Math.round(dfactor * value) / dfactor);
            } else {
                data.push(null);
            }
        }

        return data;
    },

    labels: function(config) {
        var cfg = config || {};
        var min = cfg.min || 0;
        var max = cfg.max || 100;
        var count = cfg.count || 8;
        var step = (max - min) / count;
        var decimals = cfg.decimals || 8;
        var dfactor = Math.pow(10, decimals) || 0;
        var prefix = cfg.prefix || '';
        var values = [];
        var i;

        for (i = min; i < max; i += step) {
            values.push(prefix + Math.round(dfactor * i) / dfactor);
        }

        return values;
    },

    months: function(config) {
        var cfg = config || {};
        var count = cfg.count || 12;
        var section = cfg.section;
        var values = [];
        var i, value;

        for (i = 0; i < count; ++i) {
            value = Months[Math.ceil(i) % 12];
            values.push(value.substring(0, section));
        }

        return values;
    },

    color: function(index) {
        return COLORS[index % COLORS.length];
    },

    transparentize: function(color, opacity) {
        var alpha = opacity === undefined ? 0.5 : 1 - opacity;
        return Color(color).alpha(alpha).rgbString();
    }
};
Samples.utils.srand(Date.now());
window.randomScalingFactor = function() {
    return Math.round(Samples.utils.rand(-100, 100));
};

var lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'My First dataset',
        borderColor: window.chartColors.red,
        backgroundColor: window.chartColors.red,
        fill: false,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ],
        yAxisID: 'y-axis-1',
    }, {
        label: 'My Second dataset',
        borderColor: window.chartColors.blue,
        backgroundColor: window.chartColors.blue,
        fill: false,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ],
        yAxisID: 'y-axis-2'
    }]
};

window.onload = function() {
    var ctx = document.getElementById('myfirstchart').getContext('2d');
    window.myLine = Chart.Line(ctx, {
        data: lineChartData,
        options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text: 'Chart.js Line Chart - Multi Axis'
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
};
