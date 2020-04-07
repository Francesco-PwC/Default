/*
*   BPM GRAPH
*/
/*
GESTIONE SHADOW E STILE SINGOLI PUNTI DEL GRAFICO
myChart_ALT.controller.ctx.shadowColor = "rgba(0,0,0,0)";
myChart_ALT.controller.ctx.shadowBlur = 25;
myChart_ALT.controller.ctx.shadowOffsetX = 5;
myChart_ALT.controller.ctx.shadowOffsetY = 5;
myChart_ALT.controller.ctx.transform = "rotate(90deg)";
*/
//To manage different colors
var pointBackgroundColors = ["transparent"];

var myChart_HEART;
var ctx_H = document.getElementById('heartChart');

cont_HE = ctx_H.getContext("2d");
/*
var gradientHE = cont_HE.createLinearGradient(0, 0, 0, 500);
gradientHE.addColorStop(0, "rgba(0,212,255,0.1)");   
gradientHE.addColorStop(0.53, "rgba(121,9,115,0.1)");
gradientHE.addColorStop(1, "rgba(19,19,19,0.1)");
*/
var gradientHE = cont_HE.createLinearGradient(0, 0, 0, 400);  
gradientHE.addColorStop(0, "rgba(244,0,255,0.1)");
gradientHE.addColorStop(0.6, "rgba(255,0,241,0.1)");
gradientHE.addColorStop(1, "rgba(120,0,124,0.1)"); 

myChart_HEART = new Chart(ctx_H, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Bpm',
            notifies: [],
            data: [],
            backgroundColor: gradientHE,
            borderColor: [
                'rgba(255,110,199,1)'//'rgba(70,102,255, 0.7)'
            ],
            borderWidth: 1,
            pointBackgroundColor: pointBackgroundColors
        }]
    },
    options: {
        tooltips: {
            callbacks: {
                title: function(tooltipItem,data){
                    console.log(tooltipItem);
                    return data.labels[tooltipItem[0].index];
                },
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += Math.round(tooltipItem.yLabel * 100) / 100;
                    return label;
                }
            }
        },
        scales: {
            xAxes: 
            [{
                ticks: {
                    max: 50,
                    min: 0,
                    stepSize: 1,
                    callback: function(value) {
                        return value.substr(22,24);//truncate on seconds
                    }
                }
            }],
            yAxes: 
            [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: false
        }
    }
});

/*
*   ALTITUDE GRAPH
*/
var myChart_ALT;
var ctx_ALT = document.getElementById('altitudeChart');

cont_ALT = ctx_ALT.getContext("2d");
var gradient = cont_ALT.createLinearGradient(0, 0, 0, 500);
gradient.addColorStop(0, "rgba(0,212,255,0.1)");   
gradient.addColorStop(0.63, "rgba(121,9,115,0.1)");
gradient.addColorStop(1, "rgba(19,19,19,0.1)");
/*
var gradientAH = cont_ALT.createLinearGradient(0, 0, 0, 200);
gradientAH.addColorStop(0, "rgba(0,212,255,0.5)");   
gradientAH.addColorStop(0.53, "rgba(121,9,115,0.4)");
gradientAH.addColorStop(1, "rgba(19,19,19,0.4)");
*/
var gradientAH = cont_ALT.createLinearGradient(0, 0, 0, 200);  
gradientAH.addColorStop(0, "rgba(244,0,255,0.9)");
gradientAH.addColorStop(0.6, "rgba(255,0,241,0.7)");
gradientAH.addColorStop(1, "rgba(120,0,124,0.5)"); 

var gradient_ALT_BORDER = cont_ALT.createLinearGradient(0, 0, 0, 200);
gradient.addColorStop(0, "rgba(0,212,255,1)");   
gradient.addColorStop(0.63, "rgba(121,9,115,0.8)");
gradient.addColorStop(1, "rgba(19,19,19,0.6)");

myChart_ALT = new Chart(ctx_ALT, {
    type: 'bar',
    data: {
        datasets: [{
            notifies: [],
            data: [],
            categoryPercentage: 0.5,
            barPercentage: 0.5,
            barThickness: 1,
            label: 'Altitude',
            fillColor: gradient,
            hoverBackgroundColor: gradientAH,
            borderColor: "white",
            borderWidth: 1
        }]
    },
    options: {
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) {
                        label += ': ';
                    }
                    label += Math.round(tooltipItem.yLabel * 100) / 100;
                    return label;
                }
            }
        },
        scales: {
            xAxes: [{
                ticks: {
                    max: 20,
                    min: 15,
                    stepSize: 1,
                    callback: function(value) {
                        return value.substr(22,24);//truncate on seconds
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            display: false
        }
    }
});

var id_select = document.getElementById('smartwatch_ids');
var ref_select = document.getElementById('refresh_times');
var containerH = document.getElementById('containerHeart');
//updateGraphOnScroll(ctx_H, myChart_HEART, id_select, ref_select, 0);

