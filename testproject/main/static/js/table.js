var SELECTED_Currency ="EUR";
SELECTED_Period = CUR_WEEK;
     Currency = () => SELECTED_Period[SELECTED_Currency];
    var a = 6;
    while (a>=0)
    {
        var i =".date_"+ a;
        var k = ".cost_"+ a;
        const date= document.querySelector(i);
        date.innerHTML=`${Currency().dates[a]}`;
        const cost= document.querySelector(k);
        cost.innerHTML=`${Currency().values[a]} руб`;
        a--;
    }
function table()
{

     SELECTED_Period = CUR_WEEK;
     Currency = () => SELECTED_Period[SELECTED_Currency];
    var a = 6;
    while (a>=0)
    {
        var i =".date_"+ a;
        var k = ".cost_"+ a;
        const date= document.querySelector(i);
        date.innerHTML=`${Currency().dates[a]}`;
        const cost= document.querySelector(k);
        cost.innerHTML=`${Currency().values[a]} руб`;
        a--;
    }
}

$(document).ready(function() {
    $('.dropdown-item').click(function () {
        SELECTED_Currency = $(this).html();
        console.log(SELECTED_Currency);
         table();
    });



});

