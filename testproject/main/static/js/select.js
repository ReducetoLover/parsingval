$('.vector .item').on("click",function(){
    $("#scroll").toggleClass('activescroll');
    $(".item").toggleClass('active');

});
$('.t_select').hover(function() {
  $(this).children('tbody').children('tr').toggleClass('select-tr');
  $(this).children('tbody').children('tr').children('td').toggleClass('select-td');
      let select =function(){
    let selectItem = document.querySelectorAll("tr");
    selectItem.forEach(item=>{
        item.addEventListener('click',selectChoose,true)
    });
    function selectChoose(){
        let currency = $(this).find("td")[0].innerText;
        let price = $(this).find("td")[1].innerText;
        const currencyText=document.querySelector('#currency');
        currencyText.innerHTML=currency;
        const priceText=document.querySelector('#price');
        priceText.innerHTML=price;
        TableHide(Object.keys(R).length);
        $(".item").toggleClass('active');
        $("#scroll").toggleClass('activescroll');
        SELECTED_Currency = currency;
        changeChartData();
        count=6;
         createtable();
         table();
    }

    };
select();
});




