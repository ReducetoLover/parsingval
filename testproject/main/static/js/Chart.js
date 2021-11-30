
var ctx = document.getElementById('myChart').getContext('2d');

var SELECTED_Currency = "USD";
var SELECTED_Period = R_week;
var Currency = () => SELECTED_Period[SELECTED_Currency];

function FirstDraw()
{
    var data = {
    labels: Currency().dates,
        datasets: [
        {
            label: "Стоимость",
            lineTension: 0,
            backgroundColor: ["rgba(6,128,153,255)"],
            borderColor: "rgba(21,21,49,255)",
            borderWidth: 2,
            hoverOffset: 4,
            pointStyle: 'star',
            pointRadius: 3,
            pointBackgroundColor: "#535353",
            pointBorderColor: "rgba(6,128,153,255)",
            data: Currency().values
        }
           ]
    };
    myChart =
    new Chart(document.getElementById('myChart'), {
    type: 'line',
    data: data,
    options: {
        animation: true,
        plugins:{
            legend: {
            display: true,
            labels: {color: 'rgba(21,21,49,255)'}
            }
        },
        maintainAspectRatio: true,
        responsive: true,
        responsiveAnimationDuration: 0
    }
    });
}

console.log(R);



var myChart;

function changeChartData(chart = myChart) {
    var C = chart.data;
    C.labels = Currency().dates;
    C.datasets[0].data = Currency().values;
    chart.update();
}

$(document).ready(function() {
    $('#WEEKbutton').click(function(){
        SELECTED_Period = R_week;
        changeChartData();
    });

    $('#YEARbutton').click(function(){
        SELECTED_Period = R_year;
        changeChartData();
    });
});

