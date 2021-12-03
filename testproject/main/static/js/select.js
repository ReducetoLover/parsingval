$('.button-day').on('click', function(){
    $('.button-day').removeClass('selected');
    $(this).addClass('selected');
});
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
        let currency = $(this).find("td").eq(0).html();
        let price = $(this).find("td").eq(1).html();
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




