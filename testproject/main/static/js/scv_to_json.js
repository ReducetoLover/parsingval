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
    toArr.valuta = [];

for (var minusDay=6; minusDay>=0; minusDay--){

    var yesterday = date - 1000 * 60 * 60 * 24 * minusDay;
    var nDay = new Date(yesterday);
    let index = arr.dates.indexOf(nDay.toJSON().slice(0, 10));

    if(index >= 0){
        toArr.dates.push(arr.dates[index]);
        toArr.values.push(arr.values[index]);
        toArr.valuta.push(arr.valuta[index]);
    }
}

return toArr;
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}

function getAllDays(m, y, koeff){
var _m = daysInMonth(m, y);
m = m < 10 ? `0${m}` : m;

var allT = [];

for(var i=1; i<=_m; i++){
    let _i = i < 10 ? `0${i}` : i;

    Object.keys(R).forEach((e) => {
        let _name = e;
        let _valute = R[e].valuta[R[e].valuta.length-1];
        let _value = ((R[e].values[R[e].values.length-1]*1)+getRandomFloat(-koeff,koeff));
        _value = _value < 0 ? -_value+getRandomInt(0,10) : _value;

        allT.push(`${y}-${m}-${_i};${_name};${_valute};${_value.toFixed(2)}`);
    })
}

return allT;
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
    toArr.valutes = [];

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
            toArr.valutes.push(arr.valutes[i]);
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
    var url = location.pathname == "/currency" ? "curse_json_" : "stock_json_";

    $.ajax({
        type: "GET",
        url: url+"week",
        dataType: "text",
        success: function(data) {
            R_week = JSON.parse(data);
            SELECTED_Period = R_week;

            FirstDraw();
            CurrentValue();
            table();
            console.log(R_week);
        },
        error: function (e){console.warn(e)}
    });

    $.ajax({
        type: "GET",
        url: url+"year",
        dataType: "text",
        success: function(data) {
            R_year = JSON.parse(data);
            getYear();
        }
    });

    $.ajax({
        type: "GET",
        url: url+"all",
        dataType: "text",
        success: function(data) {
            R = JSON.parse(data);
        }
    });
});
function parse(d) {


    Papa.parse(d, {
        header: false,
        step: function(results, parser) {
        console.log(results);
            if(results.data[0] == '' || results.data[0] == 'Date') return;
            R[results.data[1]] = R[results.data[1]] || {};
            R[results.data[1]].dates = R[results.data[1]].dates || [];
            R[results.data[1]].values =  R[results.data[1]].values || [];
            R[results.data[1]].valuta =  R[results.data[1]].valuta || [];

            R[results.data[1]].dates.push(results.data[0]);
            R[results.data[1]].valuta.push(results.data[2]);
            R[results.data[1]].values.push(results.data[3]);

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
