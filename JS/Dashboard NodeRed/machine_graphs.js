var myChart;
var ctx = document.getElementById('machineChart');
cont = ctx.getContext("2d");
var gradient_RPM = cont.createLinearGradient(0, 0, 0, 500);
gradient_RPM.addColorStop(0, "rgba(0,212,255,0.1)");   
gradient_RPM.addColorStop(0.63, "rgba(121,9,115,0.1)");
gradient_RPM.addColorStop(1, "rgba(19,19,19,0.1)");

myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Round per Minute',
            data: [0],
            backgroundColor: gradient_RPM,
            borderColor: [
                'rgba(70,102,255, 1)'
            ],
            borderWidth: 1,
            pointBackgroundColor: function(ctx) {
                var index = ctx.dataIndex;
                var value = ctx.dataset.data[index];
                var data_length = ctx.dataset.data.length - 1;
                return index < data_length - 1 ? 'transparent' : 'green';
                //return index === 0 ? 'red' : 'green';
            }
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    max: 10,
                    min: 0,
                    stepSize: 1
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
        },
        tooltips: {
			mode: "index"
		},
		hover: {
			mode: "index"
		},
        annotation: {
              annotations: 
              [{
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: 500,
                borderColor: 'rgb(255, 255, 255)',
                borderWidth: 2,
                label: 
                {
                  enabled: true,
                  content: 'min'
                }
              },
              {
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: 1000,
                borderColor: 'rgb(255, 0, 0)',
                borderWidth: 2,
                label: 
                {
                  enabled: true,
                  content: 'max'
                }
              }]
        }
    }
});

var myChart_2;
var ctx_2 = document.getElementById('tempChart');

myChart_2 = new Chart(ctx_2, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Temperature',
            data: [0],
            backgroundColor: gradient_RPM,
            borderColor: [
                'rgba(70,102,255, 1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    max: 10,
                    min: 0,
                    stepSize: 1
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
