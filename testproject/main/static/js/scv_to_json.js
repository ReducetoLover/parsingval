var R = {};
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
            console.log(R);
        }}
        )
}
