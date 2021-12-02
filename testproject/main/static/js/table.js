var count=6;

function createtable()
{
    const table=document.querySelector(".table-border");
    table.innerHTML=`<tr><td class="table-rad currency-td"><b>Дата</b></td><td class="table-rad currency-td"><b>Курс</b></td></tr>
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
    var a = Currency().dates.length-1;

    while (a>=Currency().dates.length-7)
    {

        var i =".date_"+ count;
        var k = ".cost_"+ count;
        {

            var date= document.querySelector(i);
            var cost= document.querySelector(k);
            if (Currency().dates[a]==undefined && R[SELECTED_Currency].values[a]==undefined)
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
    $('.currency').click(function () {
        SELECTED_Currency = $(this).find("td").eq(0).html();
        console.log(1);
         count=6;
         createtable();
         table();

    });
});

var i = 0;
var j = 0;
var tables = document.getElementById("tbl");
var tr;
var newRow;
var newCell;
var flag=0;

function TableShow(countRow)
{
    for (i = 0; i < countRow; i++)
    {
        if (Object.keys(R)[i]==SELECTED_Currency)
        {
        continue
        }

            newRow = tables.insertRow(-1);


           newCell = newRow.insertCell(0);
            newCell.innerHTML = Object.keys(R)[i];
            newCell.setAttribute('width','150');
            newCell.setAttribute('class','currency-spisok-values');
            newCell = newRow.insertCell(1);
            newCell.setAttribute('class','currency-spisok-rubls');
            newCell.innerHTML = Object.values(R)[i].values[Object.values(R)[i].values.length-1]+" руб";



    }

           // tr.classList.toggle('select');
flag = 1;
}


function TableHide(countRow){
    for (i = countRow-1; i > -1; i--)
    {
        newRow = tables.deleteRow(-1);
    };
    flag = 0;
}

function ShowHide(){
    switch(flag){
        case 0:
            TableShow(Object.keys(R).length);
            break;
        case 1:
            TableHide(Object.keys(R).length);
            break ;
    };
}
function CurrentValue(){
    $("#currency").html(SELECTED_Currency);
    $("#price").prepend(Currency().values[Currency().values.length-1]);
}



