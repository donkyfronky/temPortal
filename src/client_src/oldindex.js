import  'morris.js/morris';
function setTheHigh(temp){
    $('#max').html(temp)
}
function setTheLow(temp){
    $('#min').html(temp)
}
function setTheNow(temp){
    $('#right-now').html(temp)
}
var graph = new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'myfirstchart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: [],
    lineColors: ['green','red'],
    xkey: 'date',
    //parseTime: false,
    xLabels:"5min",
    ykeys: ['temperature', 'humidity'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Temperature','Humidity']
});

$.get('/range/list/',function(res){

    $.each(res.data, function (i, item) {
        var date_to_show = new Date(item.date);
        $('#ranges').append($('<option>', {
            value: item.label,
            text : date_to_show.getFullYear()+'-'+(date_to_show.getMonth()+1)+'-'+date_to_show.getDate()
        }));
    });

}).done(function(){updateGraph(graph,$('#ranges :selected').val());});

function updateGraph(gr,key) {

    var d1 = $.get('/sample/'+key+'/');

    d1.done(function (v1) {

        var graph_data = [];
        var max = 0;
        var min = 1000;

        v1 = v1.data.reverse();
        setTheNow(v1[0].temperature);

        for (var i in v1) {
            if (v1[i].temperature > max) {
                max = v1[i].temperature;
            }
            if (v1[i].temperature < min) {
                min = v1[i].temperature;
            }

            graph_data.push(v1[i])
        }

        setTheHigh(max);
        setTheLow(min);
        gr.setData(graph_data);
    });
}

setInterval(function() {
    updateGraph(graph,$('#ranges :selected').val());
}, 2000);