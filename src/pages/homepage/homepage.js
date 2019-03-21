import $ from 'jquery';
import { add0, format } from '../../utils/format';
import { getPopRecipes, getSelfRecipes, getCollection, getRecipeDetail } from '../../utils/api';
import imageUpload from '../../widgets/image-upload';
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
        <img class='cover' alt="140x140" src="${element.thumbnail}" />
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

// 头像初始化上传能力
$('.avatar-box').initImageUpload({
  uploadUrl: '/upload/recipe',
  adjustHeight: false,
  onFinish: function (url) {
    if (url) {
     localStorage.setItem('src', url);
    }
  }
});

var src = localStorage.getItem('src');
console.log(src);
$('.preview-image').attr('src', src);

function renderCollection(collectionRecipes, selector, ) {
  var user = JSON.parse(localStorage.getItem('user'));
  collectionRecipes.forEach(element => {
    var tabPane = `
    <div class="col-md-4 column">
        <div class='username collection-username'>
        用户<span>${user.username}</span>收藏的菜谱
        </div>
        <img class='collection_cover' alt="140x140" src="${element.cover}" />
        <p class="title">
            <a href="#">${element.name}</a>
        </p>
        <div class="info">
            <span>210</span>做过<span>12875</span>收藏|<a href="#">风中彩虹</a>
        </div>
    </div>
    `
    $(selector).append(tabPane);
    return user;
  });
  $('.colection_recipe').text(collectionRecipes.length);
}

var collectionId = JSON.parse(localStorage.getItem('collectionId'));
getCollection().then(collectionRecipes => {
  console.log(collectionRecipes);
  renderCollection(collectionRecipes, '.collection-box');
})

