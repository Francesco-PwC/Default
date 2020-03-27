var top_limit;
//ADDABLE VALUES BEFORE THE GRAPH PUSHES OUT THE FIRST POINT
var addable_values = 0;
function addData(chart, label, d, index, type) {
    chart.data.labels.push(label);
    var dat = parseInt(d);
    
    /*
    switch (type) {
        case 'heartrate':
            addable_values = 10;
            break;
        case 'altitude':
    }
    */
    if (index >= top_limit + addable_values){
        removeData(chart,type);
    }
    //Graphs limits
    /*
    if (type != "altitude" && index > 10){
        if (type != "heartrate"){
            removeData(chart, type);
        } else if (index > 50){
            removeData(chart, type);
        }
    } else if (index > 20){
        removeData(chart, type);
    }
    */
    
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(dat);
        var input = dataset.data;
        //debug
        if (type === "heartrate"){
            console.log("HEARTRATE:");
            console.log(input);
            console.log(pointBackgroundColors);
        }
        
        if (type === "altitude"){
            console.log("ALTITUDE:");
            console.log(input);
            dataset.backgroundColor = gradient;
            dataset.hoverBackgroundColor = "rgba(0,212,255,0.2)";
            dataset.borderColor = ("transparent");
        }
        if (type === "heartrate"){
            chart.config.data.datasets[0].backgroundColor = gradientHE;
            //chart.config.data.datasets[0]["pointBackgroundColor"] = 'rgba(70,102,255, 1)';
            console.log("dataset: "+ dataset.data[0].pointBackgroundColor);
            if (typeof min !== 'undefined' && typeof max !== 'undefined'){
                if (dat >= min && dat <= max) {
                    console.log("normal value: "+dat);
                    pointBackgroundColors.push("transparent");
                }
                if (dat > max){
                    console.log(dat+ " > " +max);
                    //input.pointBackgroundColor = 'red';
                    //chart.config.data.datasets[0].data.radius = '5';
                    pointBackgroundColors.push("red");
                } 
                if (dat < min) {
                    console.log(dat+ " < " +max);
                    pointBackgroundColors.push("red");
                    //chart.config.data.datasets[0]['pointBackgroundColor'][0] = 'green';
                    //chart.config.data.datasets[0].radius = '5';
                    //dataset.pointBackgroundColor = "green";
                }
            }
        }
        if (type === "roundPerMinute"){
            console.log("RPM - dataset: "+dataset);
            console.log("RPM - dataset.data: "+dataset.data);
            console.log("RPM - dasets[0].data: "+chart.config.data.datasets[0].data);
            console.log("RPM - dataset: "+dataset[0])
            //chart.config.data.datasets[0].pointBackgroundColor ="rgba(255,255,255,1)";
        }
    });
    chart.update();
}

function removeData(chart, t){
    chart.data.labels.shift();
    //var meta = myChart.getDatasetMeta(0);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
        if (t === "heartrate"){
            pointBackgroundColors.shift();
        }
    });
    chart.update();
}

function refreshGraphRoutineByType(graph, times, value, type, counter){
    addData(graph,times,value,counter, type);
}
function refreshGraphRoutineByType(graph, times, value, type, counter, storical_time){
    //Storical graph Limits
    var addable_values = 10;
    let top_lim = storical_time;
    switch(top_lim){
        case(30):
            top_lim = 4;
            break;
        case(60):
            top_lim = 6;
            break;
        case(300):
            top_lim = 30 + addable_values;
            break;
        case(600):
            top_lim = 60 + addable_values;
            break;
        case(1800):
            top_lim = 180 + addable_values;
            break;
        case(3000):
            top_lim = 300 + addable_values;
            break;
    }
    top_limit = top_lim;
    addData(graph,times,value,counter,type);
}

const max_zoom = 10;
var zoom_in = 0;
var zoom_out = 0;
function updateGraphOnScroll(graph, chart, device, refresh, index){
    var refresh_time = refresh.options[refresh.selectedIndex].value;
    console.log("refresh time: "+ refresh_time);
    console.log("setting listener...");
    graph.addEventListener("wheel", event => {
        delta = Math.sign(event.deltaY);
        if (delta > 0){
            increaseBar(zoom_in, delta);
            var device_id = device.options[device.selectedIndex].value;
            zoom_in++;
            zoom_out = 0;
            if (zoom_in >= max_zoom){
                removeDataSet(chart, index);
                prev_val = selectElement('smartwatch_times', delta);
                var msg = {
                    DEVICE_ID: device_id,
                    TIMERANGE: parseInt(prev_val)
                }
                console.log("sending message while scrolling UP on graph: " + msg);
                scope_SMARTW.send({
                    payload: msg,
                    topic: "TEST HTTP REQUEST ON SCROLL - SMARTWATCH"
                });
                zoom_in = 0;
            }
        }
        if (delta < 0){
            increaseBar(zoom_out, delta);
            var device_id = device.options[device.selectedIndex].value;
            zoom_out++;
            zoom_in = 0;
            if (zoom_out >= max_zoom){
                removeDataSet(chart, index);
                next_val = selectElement('smartwatch_times', delta);
                var msg = {
                    DEVICE_ID: device_id,
                    TIMERANGE: parseInt(next_val)
                }
                console.log("sending message while scrolling DOWN on graph: " + msg);
                scope_SMARTW.send({
                    payload: msg,
                    topic: "TEST HTTP REQUEST ON SCROLL - SMARTWATCH"
                });
                zoom_out = 0;
            }
        }
        console.info("DIFF: "+delta);
        event.preventDefault();
    });
    console.log("listener set.");
}


function selectElement(id, delta) {    
    let element = document.getElementById(id);
    let value_to_select = element.options[element.selectedIndex].value;
    if (delta > 0){
        if (typeof element.options[element.selectedIndex - 1] !== "undefined"){
            value_to_select = element.options[element.selectedIndex - 1].value;
        }
    }
    if (delta < 0){
        if (typeof element.options[element.selectedIndex + 1] !== "undefined"){
            value_to_select = element.options[element.selectedIndex + 1].value;
        }
    }
    return element.value = value_to_select;
}

function increaseBar(incr_val, diff) {
    var elem = document.getElementById("Bar");
    var incr;
    var increase = true;
    if (incr_val == 0){
        incr = elem.style.width;
    } else {
        incr = incr_val * 10 * diff;
    }
    console.log("INCREASE: "+ incr);
    elem.style.width = incr + "%"; //10 for %
}

/*
var i = 0;
function increaseBar(incr_val, diff) {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("Bar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= incr_val) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        var incr = incr_val * 10 * diff;
        console.log("INCREASE: "+ incr);
        elem.style.width = incr + "%"; //10 for %
      }
    }
  }
}*/
