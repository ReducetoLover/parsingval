var R = {};
var R_week = {};
var R_year = {};

var SELECTED_Currency = location.pathname == "/currency" ? "USD" : "Apple Inc (AAPL)";
var SELECTED_Period = R_week;
var Currency = () => SELECTED_Period[SELECTED_Currency];

function getWeek() {
    Object.keys(R).forEach((e) => {
        R_week[e] = checkWeek(R[e]);
    })
}

function checkWeek(arr){
var date = new Date();
let toArr = {};
    toArr.dates = [];
    toArr.values = [];

for (var minusDay=6; minusDay>=0; minusDay--){

    var yesterday = date - 1000 * 60 * 60 * 24 * minusDay;
    var nDay = new Date(yesterday);
    let index = arr.dates.indexOf(nDay.toJSON().slice(0, 10));

    if(index >= 0){
        toArr.dates.push(arr.dates[index]);
        toArr.values.push(arr.values[index]);
    }
}

return toArr;
}

function getYear() {
    Object.keys(R).forEach((e) => {
        R_year[e] = checkMonth(R[e]);
        console.log(R_year[e]);
    })
}

function checkMonth(arr) {
    let m = "00";
    let y = "2021";

    let result = 0;
    let sum = 0;
    let count = arr.dates.length;

    let toArr = {};
    toArr.dates = [];
    toArr.values = [];

    arr.dates.map((date, i) => {
        if(y !== date.split('-')[0]) return;
        if(m !== date.split('-')[1]) {

            if(sum>0){
                result = sum/count;
                console.log(`${result} = ${sum}/${count}`);
                toArr.values.push(result.toFixed(2));
                sum = 0;
            }

            m = date.split('-')[1];

            count = 0;
            toArr.dates.push(m);
        }
        sum += arr.values[i]*1;
        count++;

        if(i === arr.dates.length-1) {
            result = sum/count;
            console.log(`${result} = ${sum}/${count}`);
            toArr.values.push(result.toFixed(2));
        }
    });

    return toArr;
}

$(document).ready(function() {
    var url = location.pathname == "/currency" ? "curse_csv" : "stock_csv";
    $.ajax({
        type: "GET",
        url: url,
        dataType: "text",
        success: function(data) {
            parse(data);

        }
     });
});
function parse(d) {


    Papa.parse(d, {
        header: false,
        step: function(results, parser) {
        console.log(results);
            if(results.data[0] == '' || results.data[0] == 'Дата') return;
            R[results.data[1]] = R[results.data[1]] || {};
            R[results.data[1]].dates = R[results.data[1]].dates || [];
            R[results.data[1]].values =  R[results.data[1]].values || [];
            R[results.data[1]].dates.push(results.data[0]);
            R[results.data[1]].values.push(results.data[3].replace(",", "."));

        },
        complete: function(results, file) {
            getWeek();
            getYear();
            FirstDraw();
            CurrentValue();
            table();
            console.log(R);
        }}
        )
}
