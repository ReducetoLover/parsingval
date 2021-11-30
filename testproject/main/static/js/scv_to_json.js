var R = {};
var R_week = {};
var R_year = {};

function getWeek() {
    let c = R[SELECTED_Currency].dates.length >= 7 ? 7 : R[SELECTED_Currency].dates.length;
    let len = R[SELECTED_Currency].dates.length-1;
    R_week[SELECTED_Currency] = {};
    R_week[SELECTED_Currency].dates = [];
    R_week[SELECTED_Currency].values = [];

    for (var i=0; i<c; i++){
        R_week[SELECTED_Currency].dates[i] = R[SELECTED_Currency].dates[len-i];
        R_week[SELECTED_Currency].values[i] = R[SELECTED_Currency].values[len-i];
    }
}

function getYear() {

    Object.keys(R).forEach((e) => {
        R_year[e] = splitDaysByMonth(R[e]);
    })
}

function splitDaysByMonth(arr) {
    let m = "00";

    let result = 0;
    let sum = 0;
    let count = arr.dates.length;

    let toArr = {};
    toArr.dates = [];
    toArr.values = [];

    arr.dates.map((date, i) => {
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
    $.ajax({
        type: "GET",
        url: "curse_csv",
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
            FirstDraw();
            getWeek();
            getYear();
            console.log(R);
        }}
        )
}
