var ctx = document.getElementById('myChart').getContext('2d');


var CUR_YEAR = {
    USD : {
        dates : ["01.01.2021","01.02.2021","01.03.2021","01.04.2021","01.05.2021","01.06.2021","01.07.2021","01.08.2021","01.09.2021","01.10.2021","01.11.2021","01.12.2021"],
        values: [70,72,72,71,74,72.5,72,73,73,71.3,72,70]
    },
    AUD : {
        dates : ["01.01.2021","01.02.2021","01.03.2021","01.04.2021","01.05.2021","01.06.2021","01.07.2021","01.08.2021","01.09.2021","01.10.2021","01.11.2021","01.12.2021"],
        values: [71,74,72.5,72,73,73,71.3,72,70,70,72,72]
    },
    EUR : {
        dates : ["01.01.2021","01.02.2021","01.03.2021","01.04.2021","01.05.2021","01.06.2021","01.07.2021","01.08.2021","01.09.2021","01.10.2021","01.11.2021","01.12.2021"],
        values: [72,73,73,71.3,72,70,70,72,72,71,74,72.5]
    },
    KZT : {
        dates : ["01.01.2021","01.02.2021","01.03.2021","01.04.2021","01.05.2021","01.06.2021","01.07.2021","01.08.2021","01.09.2021","01.10.2021","01.11.2021","01.12.2021"],
        values: [,72,72,71,74,72.5,72,73,73]
    },
        QWE: {
        dates: ["11.11.2021","12.11.2021"],
        values: [100,99]
    }
}

var CUR_WEEK = {
    USD : {
        dates : ["01.07.2021","02.07.2021","03.07.2021","04.07.2021","05.07.2021","06.07.2021","07.07.2021"],
        values: [70,72,72,71,74,72.5,72]
    },
    AUD : {
        dates : ["01.07.2021","02.07.2021","03.07.2021","04.07.2021","05.07.2021","06.07.2021","07.07.2021"],
        values: [74,72.5,72,73,73,71.3,72]
    },
    EUR : {
        dates : ["01.07.2021","02.07.2021","03.07.2021","04.07.2021","05.07.2021","06.07.2021","07.07.2021","07.07.2021","07.07.2021","07.07.2021","07.07.2021"],
        values: [70,70,72,72,71,74,72.5,72.5,72.5,72.5,72.5]
    },
    KZT : {
        dates : ["01.07.2021","02.07.2021","03.07.2021","04.07.2021","05.07.2021","06.07.2021","07.07.2021"],
        values: [71.3,72,70,70,71,74,72.5]
    },
    QWE: {
        dates: ["11.11.2021","12.11.2021"],
        values: [100,99]
    }

}
var SELECTED_Currency = "EUR";
var SELECTED_Period = CUR_WEEK;
var Currency = () => SELECTED_Period[SELECTED_Currency];



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


var myChart =
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

function changeChartData(chart) {
    var C = chart.data;
    C.labels = Currency().dates;
    C.datasets[0].data = Currency().values;
    chart.update();
}

$(document).ready(function() {
    $('.dropdown-item').click(function () {
        SELECTED_Currency = $(this).html();
        changeChartData(myChart);
    });

    $('#WEEKbutton').click(function(){
        SELECTED_Period = CUR_WEEK;
        changeChartData(myChart);
    });

    $('#YEARbutton').click(function(){
        SELECTED_Period = CUR_YEAR;
        changeChartData(myChart);
    });
});

