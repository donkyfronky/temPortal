import wretch from "wretch"
function setTheHigh(val){
     document.getElementById('max').innerHTML=val;
 }
function setTheLow(val){
     document.getElementById('min').innerHTML=val;
 }
function setTheNow(val){
   return document.getElementById('right-now').innerHTML=val;
 }
function setBoxSummary(now,min,max){
    setTheNow(now)
    setTheHigh(max)
    setTheLow(min)
}
function loadRanges(){
    return     wretch('/range/list/')
        .get()
        .json(json => {
            if(json.data.length){

                let select = document.getElementById('ranges');

                let options = json.data.map(function(range) {

                    var date_to_show = new Date(range.date);
                    var option = document.createElement('option');
                    option.text = date_to_show.getFullYear()+'-'+(date_to_show.getMonth()+1)+'-'+date_to_show.getDate();
                    option.value = range.label;

                    select.appendChild(option);
                });
            }else{
                alert(json.data.message);
            }
        }).then(()=>
            {
                let select = document.getElementById('ranges');
                var selectedElement = select.options[select.selectedIndex];
                return Promise.resolve(selectedElement.value)
            }
        );
}
function updateDataAndGraph(label){
    let temperatures,
        humidities,
        labels = [];

    wretch('/sample/'+label+'/')
        .get()
        .json(json => {


            if(json.data.length) {

                let max=0;
                let min=100;
                let now=0;

                let arr_to_pars = json.data.reverse();
                temperatures = arr_to_pars.map((elem)=>{
                    let val = parseFloat(elem.temperature);
                    if(val > max){
                        max=val;
                    }else if(val < min){
                        min = val
                    }
                    return val
                });
                humidities = arr_to_pars.map((elem)=>{return parseFloat(elem.humidity)});
                labels = arr_to_pars.map((elem)=>{
                    let d = new Date(elem.date);
                    return d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
                });

                setBoxSummary(arr_to_pars[0].temperature,min,max)

                window.lineChartData.datasets[0].data = temperatures;
                window.lineChartData.datasets[1].data = humidities;
                window.lineChartData.labels = labels
                window.ThermChart.update();
            }
        })
}

export {setTheHigh,setTheLow,setTheNow,loadRanges,setBoxSummary,updateDataAndGraph}