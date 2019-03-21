import $ from 'jquery';
import { getQueryString } from '../../utils/url';
import { getRecipeDetail, createCollection } from '../../utils/api';
import { add0, format } from '../../utils/api';

//获取节点

/**
 * 数据渲染
 */

function render(recipe) {
    $('.add').val(recipe.name);
    $('.preview-image').attr("src", recipe.cover);
    $('.describe .textcontent').val(recipe.description);
    $('.nav-name').text(recipe.name);
    $('.creat_time').text(recipe.created_at);
    recipe.steps.forEach((ele) => {
        console.log(ele);
        const step = `<div class="row clearfix step">
        <div class="col-md-1">
            <span class="step-index">${ele.order}</span>
        </div>
        <div class="col-md-6">
            <p class="step-description">${ele.description}</p>
        </div>
        <div class="col-md-4">
            <img class="step-cover" src="${ele.pic_url}">
        </div>
    </div>`;
        $('.step_box').append(step);
    });
}

function renderMoadl(recipe) {
    $('#myModalLabel').text('把' + recipe.name + '加入到你的菜单专辑');
    $('.collection_img').attr("src", recipe.cover);
}

(function () {
    var user = JSON.parse(localStorage.getItem('user'));
    $('.name').text(user.username);
})()


var id = getQueryString('id'); //传入字符串
console.log(id);
(function () {
    if (!id) {
        alert("餐馆ID不能为空");
        location.assign('./home.html');
    }
    getRecipeDetail(id)
        .then(recipe => {
            console.log(recipe);
            render(recipe);
            renderMoadl(recipe);
        })
        .catch(error => {
            console.log(error);
        });
})()

$('.btn-primary').on('click', function() {
    var id = getQueryString('id'); //传入字符串
    console.log(id);
    var name = $('#myModalLabel').text();
    var cover = $('.collection_img').attr('src');
    var collectionMenu = $('.collection_menu').val();
    var collectionDerection = $('.collection_derection').val();
    var collection = {
        id,
        name,
        cover,
        collectionMenu,
        collectionDerection
    }
    console.log(collection);
    createCollection(collection).then(collection => {
        console.log(collection);
    })

    $('#myModal').hide();
    $('.modal-backdrop').hide();
})

