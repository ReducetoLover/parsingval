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
    var R = {};

    Papa.parse(d, {
        header: false,
        step: function(results, parser) {
            if(results.data[0] == '' || results.data[0] == 'Дата') return;

            R[results.data[1]] = {};
            R[results.data[1]].dates = [];
            R[results.data[1]].values = [];
            R[results.data[1]].dates.push(results.data[0]);
            R[results.data[1]].values.push(results.data[3]);


        },
        complete: function(results, file) {
            console.log(R);
        }}
        )
}