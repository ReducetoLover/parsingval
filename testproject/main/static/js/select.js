$('.vector .item').on("click",function(){
    $(".item").toggleClass('active');
});
$('.m-auto').hover(function() {
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
        currencyText.innerHTML=`${currency}`;
        const priceText=document.querySelector('#price');
        priceText.innerHTML=`${price}`;
        TableHide(Object.keys(CUR_WEEK).length);
        $(".item").toggleClass('active');
    }
    };
select();
});




