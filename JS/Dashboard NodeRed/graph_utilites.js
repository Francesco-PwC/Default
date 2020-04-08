var top_limit;
//ADDABLE VALUES BEFORE THE GRAPH PUSHES OUT THE FIRST POINT
var addable_values = 0;
function addData(chart, label, d, index, type, notify) {
    //label seconds
    //var l  = label.substring(22,24); 
    
    chart.data.labels.push(label);
    var dat = parseInt(d);
    if (typeof notify == 'undefined' || notify == '' || notify == null){
        notify = "No relevant actions";
    }
    /*
    switch (type) {
        case 'heartrate':
            addable_values = 10;
            break;
        case 'altitude':
    }
    */
    /*if (index >= top_limit + addable_values){
        console.log("index: "+index);
        removeData(chart,type);
    }*/
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
        dataset.notifies.push(notify);
        var input = dataset.data;
        //debug
        if (type === "heartrate"){
            //console.log("HEARTRATE:");
            //console.log(input);
            //console.log(pointBackgroundColors);
        }
        
        if (type === "altitude"){
            //console.log("ALTITUDE:");
            //console.log(input);
            dataset.backgroundColor = gradientAH;
            dataset.hoverBackgroundColor = "rgba(0,212,255,0.2)";
            dataset.borderColor = ("transparent");
        }
        if (type === "heartrate"){
            chart.config.data.datasets[0].backgroundColor = gradientHE;
            //chart.config.data.datasets[0]["pointBackgroundColor"] = 'rgba(70,102,255, 1)';
            //console.log("dataset: "+ dataset.data[0].pointBackgroundColor);
            //@TODO evaluate null instead of undefined
            if (typeof min !== 'undefined' && typeof max !== 'undefined'){
                if (dat >= min && dat <= max) {
                    console.log("normal value: "+dat);
                    pointBackgroundColors.push("rgba(255,110,199,1)");
                }
                if (dat > max){
                    console.log(dat+ " > " +max);
                    //input.pointBackgroundColor = 'red';
                    //chart.config.data.datasets[0].data.radius = '5';
                    pointBackgroundColors.push("rgba(255,110,199,1)");
                } 
                if (dat < min) {
                    console.log(dat+ " < " +max);
                    pointBackgroundColors.push("rgba(255,110,199,1)");
                    //chart.config.data.datasets[0]['pointBackgroundColor'][0] = 'green';
                    //chart.config.data.datasets[0].radius = '5';
                    //dataset.pointBackgroundColor = "green";
                }
            }
        }
        if (type === "roundPerMinute"){
            //console.log("RPM - dataset: "+dataset);
            //console.log("RPM - dataset.data: "+dataset.data);
            //console.log("RPM - dasets[0].data: "+chart.config.data.datasets[0].data);
            //console.log("RPM - dataset: "+dataset[0])
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
        console.log(dataset.notifies);
        dataset.notifies.shift();
        if (t === "heartrate"){
            pointBackgroundColors.shift();
        }
    });
    chart.update();
}
/*
function refreshGraphRoutineByType(graph, times, value, type, counter){
    addData(graph,times,value,counter, type);
}*/
function refreshGraphRoutineByType(graph, times, value, type, counter, storical_time, notify){
    //Storical graph Limits
    var addable_values = 10;
    /*let top_lim = storical_time;
    var t = 0;
    console.log(top_lim);
    switch(top_lim){
        case 30:
            t = 4;
            break;
        case 60:
            t = 6;
            break;
        case 300:
            t = 30 + addable_values;
            break;
        case 600:
            t = 60 + addable_values;
            break;
        case 1800:
            t = 180 + addable_values;
            break;
        case 3600:
            //top_lim = 300 + addable_values;
            t = 60 + addable_values;
            break;
    }
    top_limit = t;*/
    addData(graph,times,value,counter,type, notify);
}
/*
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
}*/
/*
function increaseBar(incr_val, diff) {
    var elem = document.getElementById("Bar");
    var incr = 0;
    var increase = true;
    if (diff == 0){
        incr = elem.offsetWidth;
    } else if (diff > 0){
        incr += incr_val * 10;
    } else {
        incr -= incr_val * 10;
    }
    console.log("INCREASE: "+ incr);
    elem.style.width = incr + "%"; //10 for %
}*/

var zoom_in = 0;
var zoom_out = 0;

var is_zoomable = false;
var first_z = false;

function scroll(graph, max_length, chart) {
  console.log("CHART: "+chart);
  graph.addEventListener("wheel", (event) => {
    delta = Math.sign(event.deltaY);
    if (delta > 0) {
      //SCROLL DOWN
      if (zoom_out < 0) {
        zoom_in = -zoom_out + 1;
      }
      console.log("zoom in: " + zoom_in);
      if (increaseBar(zoom_in, delta, max_length) <= 100) {
        is_zoomable = true;
      } else {
        is_zoomable = false;
      }
      if (is_zoomable && zoom_in < Math.floor(max_length / 2)) {
        zoomGraph(chart, delta, zoom_in);
        zoom_in++;
        zoom_out = 0;
      }
    }
    if (delta < 0) {
      //SCROLL UP
      if (zoom_in > 0) {
        zoom_out = -zoom_in;
      } 
      console.log("zoom out: " + zoom_out);
      if (increaseBar(zoom_out, delta, max_length) >= 0) {
        is_zoomable = true;
      } else {
        is_zoomable = false;
      }
      if (is_zoomable && zoom_out <= 0) {
        zoomGraph(chart, delta, zoom_out);
        console.log
        zoom_out++;
        zoom_in = 0;
      }
    }
    event.preventDefault();
  });
}

function increaseBar(incr_val, diff, max_l) {
  var elem = document.getElementById("Bar");
  var increase = true;
  var incr = 0;
  var step = Math.ceil(100 / max_l * 2);
  if (diff > 0 && incr <= max_l) {
    incr += incr_val * step;
  }
  if (diff < 0) {
    incr -= incr_val * step;
  }
  if (incr < 100 || incr > 0) {
    elem.style.width = incr + "%"; //10 for %
    if(incr >= 95){
      elem.style.width = "100%"; //10 for %
    }
  }
  return incr;
}

var graphBuffer;
var labelBuffer;
var zoomBuffer;
var can_zoom;
var is_ready = 0;
var tracking_dataset_head = [];
var tracking_dataset_head_lab = [];
var tracking_dataset_tail = [];
var tracking_dataset_tail_lab = [];
var counter_heart_T;

function zoomGraph(graph_obj, delta, index) {
  var full_info_dataset;
  var COMPLETE_dataset;
  var COMPLETE_labels;
  var zoomed_dataset;
  var zoomed_labels;
  console.log("graph_obj.data: "+graph_obj.data);
  if (is_ready === 0) {
    is_ready++;
    full_info_dataset = graph_obj.data;
    console.log("full info dataset: "+full_info_dataset);
    COMPLETE_dataset = full_info_dataset.datasets[0].data.slice(0);
    COMPLETE_labels = full_info_dataset.labels.slice(0);
    graphBuffer = COMPLETE_dataset;
    labelBuffer = COMPLETE_labels;
    zoomed_dataset = COMPLETE_dataset.slice(0); //copy
    zoomed_labels = COMPLETE_labels.slice(0); //copy
    zoomBuffer = zoomed_dataset;
  } else {
    COMPLETE_dataset = graphBuffer;
    COMPLETE_labels = labelBuffer;
    zoomed_dataset = zoomBuffer;
    zoomed_labels = labelBuffer;
  }
  if (COMPLETE_dataset.length >= 10) {
    if (delta > 0 && can_zoom) {
      if (zoomed_dataset.length >= 4) {
        tracking_dataset_head.push(zoomed_dataset.shift()); // put head val in "cache"
        tracking_dataset_head_lab.push(zoomed_labels.shift()); // put head label in "cache"
        tracking_dataset_tail.push(zoomed_dataset.pop()); // put tail val in "cache"
        tracking_dataset_tail_lab.push(zoomed_labels.pop()); // put tail label in "cache"
      }
      can_zoom = false;
    }
    if (delta < 0 && can_zoom) {
      if (zoomed_dataset.length < graphBuffer.length) {
        zoomed_dataset.unshift(tracking_dataset_head.pop());
        zoomed_labels.unshift(tracking_dataset_head_lab.pop());
        zoomed_dataset.push(tracking_dataset_tail.pop());
        zoomed_labels.push(tracking_dataset_tail_lab.pop());
      }
      can_zoom = false;
    }
    for (var i = 0; i < COMPLETE_dataset.length; i++) {
      var x = graph_obj.data.datasets[0].data.shift();
      var y = graph_obj.data.labels.shift();
    }
    for (var l = 0; l < zoomed_dataset.length; l++) {
      graph_obj.data.datasets[0].data.push(zoomed_dataset[l]);
      graph_obj.data.labels.push(zoomed_labels[l]);
      graph_obj.update();
    }
    can_zoom = true;
  }
}

function getChartLength(chart) {
  var l = chart.chart.data.datasets[0].data.length;
  return l;
}
