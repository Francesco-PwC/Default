var myChart_TEMP;
var ctx_TEMP;
ctx_TEMP = document.getElementById('fieldTempChart');
cont_TEMP = ctx_TEMP.getContext("2d");
var gradient_TEMP = cont_TEMP.createLinearGradient(0, 0, 0, 500);
gradient_TEMP.addColorStop(0, "rgba(0,212,255,0.1)");   
gradient_TEMP.addColorStop(0.63, "rgba(121,9,115,0.1)");
gradient_TEMP.addColorStop(1, "rgba(19,19,19,0.1)");
myChart_TEMP = new Chart(ctx_TEMP, {
    type: 'line',
    data: {
        datasets: [{
            label: '°C',
            notifies: [],
            data: [],
            backgroundColor: gradient_TEMP,
            borderColor: [
                'rgba(70,102,255, 1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        tooltips: {
            callbacks: {
                title: function(tooltipItem,data){
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
            xAxes: [{
                ticks: {
                    max: 10,
                    min: 0,
                    stepSize: 1,
                    callback: function(value) {
                        return value.substr(16,5);//truncate on seconds
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

var myChart_HUM;
var ctx_HUM = document.getElementById('fieldHumChart');
myChart_HUM = new Chart(ctx_HUM, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Humidity',
            data: [],
            notifies: [],
            backgroundColor: [
                'rgba(19, 19, 19, 0.1)'
            ],
            borderColor: [
                'rgba(70,102,255, 1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        tooltips: {
            callbacks: {
                title: function(tooltipItem,data){
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
            xAxes: [{
                ticks: {
                    max: 10,
                    min: 0,
                    stepSize: 1,
                    callback: function(value) {
                        return value.substr(16,5);//truncate on seconds
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
