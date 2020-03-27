var top_limit;

function addData(chart, label, d, index, type) {
    chart.data.labels.push(label);
    var dat = parseInt(d);
    
    switch (type) {
        case ('heartrate'):
            if (index > top_limit){
                removeData(chart, type);
            }
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

