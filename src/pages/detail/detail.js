import $ from 'jquery';
import { getQueryString } from '../../utils/url';
import { getRecipeDetail } from '../../utils/api';

//获取节点

/**
 * 数据渲染
 */

function render(recipe) {
    $('.add').val(recipe.name);
    $('.preview-image').attr("src", recipe.cover);
    $('.describe .textcontent').val(recipe.description);
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
        })
        .catch(error => {
            console.log(error);
        });
})()




