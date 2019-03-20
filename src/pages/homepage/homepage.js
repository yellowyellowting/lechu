import $ from 'jquery';
import { add0, format } from '../../utils/format';
import { getPopRecipes } from '../../utils/api';
import { getSelfRecipes } from '../../utils/api';
console.log(333);
console.log($('.nav-tabs a'));
$(".nav-tabs li").on("click", function () {
  $(this).children('a').addClass('clicked');
  $(this).siblings().children('a').removeClass('clicked');
});

(function () {
  var { username, created_at } = JSON.parse(localStorage.getItem('user'));
  add0();
  var creatTime = format(created_at);
  console.log(creatTime);
  $('.time').text(creatTime + ' 加入');
  $('.personname').text(username);

})()

function render(PopRecipes, selector, ) {
  PopRecipes.forEach(element => {
    var tabPane = `
    <div class="col-md-4 column">
        <div class='username'>
            <span>${element.cookName}</span>收藏的菜谱
        </div>
        <img alt="140x140" src="${element.thumbnail}" />
        <p class="title">
            <a href="#">${element.name}</a>
        </p>
        <div class="info">
            <span>${element.stats}</span>做过<span>${2 * element.stats}</span>收藏|<a href="#">${element.cookName}</a>
        </div>
    </div>
  `
    $(selector).append(tabPane);
  });
}


function renderRecipe(PopRecipes, selector, ) {
  var user = JSON.parse(localStorage.getItem('user'));
  PopRecipes.forEach(element => {
    var tabPane = `
    <div class="col-md-4 column">
        <div class='username'>
            <span>${user.username}</span>发表的菜谱
        </div>
        <img class='cover' alt="140x140" src="${element.cover}" />
        <p class="title">
            <a href="#">${element.name}</a>
        </p>
        <div class="info">
            <span>0</span>做过<span>0</span>收藏|<a href="#">${user.name}</a>
        </div>
    </div>
  `
    $(selector).append(tabPane);
    return user;
  });
  $('.creat_recipe').text(PopRecipes.length);
}

// 渲染流行菜谱
getPopRecipes()
  .then(PopRecipes => render(PopRecipes, '.all-box'))

// 渲染自建菜谱
getSelfRecipes()
  .then(selfRecipe => {
    var self = selfRecipe.recipes;
    console.log(self)
    renderRecipe(self, '.creat-box');
  })

