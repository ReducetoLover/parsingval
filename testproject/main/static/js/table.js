var SELECTED_Currency ="EUR";
var count=10;
table();
function createtable()
{
    const table=document.querySelector(".table-border");
    table.innerHTML=`<tr><td class="table-rad currency-td"><b>Дата</b></td><td class="table-rad currency-td"><b>Курс</b></td></tr>
                        <tr><td class="table-rd currency-td date_10">&nbsp;</td><td class="table-rd currency-td cost_10">&nbsp;</td></tr>
                        <tr><td class="table-rd currency-td date_9">&nbsp;</td><td class="table-rd currency-td cost_9">&nbsp;</td></tr>
                        <tr><td class="table-rd currency-td date_8" >&nbsp;</td><td class="table-rd currency-td cost_8">&nbsp;</td></tr>
                        <tr><td class="table-rd currency-td date_7">&nbsp;</td><td class="table-rd currency-td cost_7">&nbsp;</td></tr>
                        <tr><td class="table-rd currency-td date_6">&nbsp;</td><td class="table-rd currency-td cost_6">&nbsp;</td></tr>
                        <tr><td class="table-rd currency-td date_5">&nbsp;</td><td class="table-rd currency-td cost_5">&nbsp;</td></tr>
                        <tr><td class="table-rd currency-td date_4">&nbsp;</td><td class="table-rd currency-td cost_4">&nbsp;</td></tr>
                        <tr><td class="table-rd currency-td date_3">&nbsp;</td><td class="table-rd currency-td cost_3">&nbsp;</td></tr>
                        <tr><td class="table-rd currency-td date_2">&nbsp;</td><td class="table-rd currency-td cost_2">&nbsp;</td></tr>
                        <tr><td class="table-rd currency-td date_1">&nbsp;</td><td class="table-rd currency-td cost_1">&nbsp;</td></tr>
                        <tr><td class="table-rd currency-td date_0">&nbsp;</td><td class="table-rd currency-td cost_0">&nbsp;</td></tr>`;
}
function table()
{
     SELECTED_Period = CUR_WEEK;
     Currency = () => SELECTED_Period[SELECTED_Currency];
    var a = Currency().dates.length-1;
    console.log(a);



    while (a>=Currency().dates.length-11)
    {

        var i =".date_"+ count;

        var k = ".cost_"+ count;
        {

            var date= document.querySelector(i);
            var cost= document.querySelector(k);
            if (Currency().dates[a]==undefined && Currency().values[a]==undefined)
            {

               //date.remove();
               //cost.remove();

            }
            else
            {
            date.innerHTML=`${Currency().dates[a]}`;
            cost.innerHTML=`${Currency().values[a]} руб`;
            }
            count--;
            a--;
        }
    }
}
$(document).ready(function() {
    $('.dropdown-item').click(function () {
        SELECTED_Currency = $(this).html();
         count=10;
         createtable();
         table();

    });
});