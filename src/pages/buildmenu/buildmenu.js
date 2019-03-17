import $ from 'jquery';
console.log(333);
console.log($('.nav-tabs a'));
$(".nav-tabs li").on("click",function(){
    $(this).children('a').addClass('clicked');
    $(this).siblings().children('a').removeClass('clicked');
  });

  
