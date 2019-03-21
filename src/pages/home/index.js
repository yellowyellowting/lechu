import $ from 'jquery';
import { fashionSearch } from '../../utils/module/search';
import { creatMenuList } from '../../utils/module/creatMenuList';
import { newFashionList } from '../../utils/module/newFashionList';
import { newRecipe } from '../../utils/module/newRecipe';
// import {slide} from '../../utils/module/search';
import { timeList } from '../../utils/module/timeList';
import { fashionMenu } from '../../utils/module/fashionMenu';
import { zpList } from '../../utils/module/zpList';
import { friendsList } from '../../utils/module/friendsList';
import { chart } from '../../utils/module/chart';
import { getUserInfo } from '../../utils/module/getUserInfo';
import {searchRecipe} from '../../utils/module/searchRecipe';


// 头像
var src = localStorage.getItem('src');
console.log(src);
$('.headimg .img-circle').attr('src', src);

$(function () {
    //内容盒子左边的菜单列表
    creatMenuList();

    // 轮播图
    function slide() {
        var mySwiper = new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            autoplay: true,
        })
    }
    slide();

    // 新秀菜谱
    newRecipe();

    //最近流行
    newFashionList();

    // 时令食材
    timeList();

    // 作品展示列表
    zpList();

    // 流行搜索渲染
    var arr1 = [
        {
            name: '可乐鸡翅',
            rank: 'icon-up'
        },
        {
            name: '早餐',
            rank: 'icon-up'
        },
        {
            name: '鱼香茄子',
            rank: 'icon-up'
        },
        {
            name: '青团',
            rank: 'icon-down'
        },
        {
            name: '汤',
            rank: 'icon-up'
        }
    ];
    var arr2 = [
        {
            name: '红烧肉',
            rank: 'icon-up'
        },
        {
            name: '凉拌黄瓜',
            rank: 'icon-down'
        },
        {
            name: '牛肉',
            rank: 'icon-up'
        },
        {
            name: '蛋糕',
            rank: 'icon-down'
        },
        {
            name: '排骨',
            rank: 'icon-up'
        }
    ];
    var dom1 = $('.search .sleft');
    var dom2 = $('.search .sright');
    fashionSearch(arr1, dom1, 1);
    fashionSearch(arr2, dom2, 6);

    // 流行菜单 
    fashionMenu();

    // 下厨房的厨友们 渲染数据
    friendsList();

    //用户信息显示
    getUserInfo();

    // 图表
    chart();

    //导航栏搜索
    searchRecipe();
})
