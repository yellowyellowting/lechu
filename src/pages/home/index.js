import $ from 'jquery';
// import 'bootstrap';
import {fashionSearch} from '../../utils/module/search';

$(function () {
    //内容盒子左边的菜单列表
    var arr = [
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        },
        {
            icon: 'icon-food',
            name: '家常菜'
        }
    ];
    function creatList(arr) {

        $(arr).each(function () {
            // console.log(this)
            $('.list').prepend(`
                <li>
                    <a href="#">
                        <i class="iconfont ${this.icon}"></i>
                        <span>${this.name}</span>
                    </a>
                </li>
        `)
        })

    }
    creatList(arr);

    // 轮播
    function slide1() {
        var mySwiper = new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },
            autoplay: true,
        })
    }
    slide1();

    //最近流行
    function fashList(){
        var fashArr=[
            {
            url:'./img/1.jpg',
            name:'鱼香茄子0',
            num:'234人做过'
            },
            {
                url:'./img/1.jpg',
                name:'鱼香茄子1',
                num:'234人做过'
            },
            {
                url:'./img/1.jpg',
                name:'鱼香茄子2',
                num:'234人做过'
            },
            {
                url:'./img/1.jpg',
                name:'鱼香茄子3',
                num:'234人做过'
            },
            {
                url:'./img/1.jpg',
                name:'鱼香茄子4',
                num:'234人做过'
            },
            {
                url:'./img/1.jpg',
                name:'鱼香茄子5',
                num:'234人做过'
            },
            {
                url:'./img/1.jpg',
                name:'鱼香茄子6',
                num:'234人做过'
            },
            {
                url:'./img/1.jpg',
                name:'鱼香茄子7',
                num:'234人做过'
            },
            {
                url:'./img/1.jpg',
                name:'鱼香茄子8',
                num:'234人做过'
            },
            {
                url:'./img/1.jpg',
                name:'鱼香茄子9',
                num:'234人做过'
            },
            {
                url:'./img/1.jpg',
                name:'鱼香茄子8',
                num:'234人做过'
            },
            {
                url:'./img/1.jpg',
                name:'鱼香茄子9',
                num:'234人做过'
            }
         ]
         fashArr.forEach(function(ele){
            $('.fash_h3').after(`
            <div class="col-sm-6 col-md-6">
                <div class="thumbnail">
                    <img src=${ele.url} alt="通用的占位符缩略图">
                <div class="caption text-center">
                    <p>${ele.name}</p>
                    <h6>${ele.num}</h6>
                </div>
                </div>
            </div>
            `)
         })
         
    }
    fashList();

    // 时令食材
    function timeList(){
        var timeArr=[
            {
                url:'./img/1.jpg',
                name:'草莓'
            },
            {
                url:'./img/1.jpg',
                name:'草莓'
            },
            {
                url:'./img/1.jpg',
                name:'草莓'
            },
            {
                url:'./img/1.jpg',
                name:'草莓'
            },
            {
                url:'./img/1.jpg',
                name:'草莓'
            },
            {
                url:'./img/1.jpg',
                name:'草莓'
            },
            {
                url:'./img/1.jpg',
                name:'草莓'
            },
            {
                url:'./img/1.jpg',
                name:'草莓'
            }
        ];
        $(timeArr).each(function(){
            $('.time_list').append(`
            <div class="col-sm-3 col-md-3">
                <div class="thumbnail">
                    <img src=${this.url} alt="通用的占位符缩略图">
                <div class="caption text-center">
                    <h6>${this.name}</h6>
                </div>
                </div>
            </div>
            `)
        })
    }
    timeList();

    // 作品展示列表
    function zpList(){
        var zpArr=[
            {
                title:'#蜜桃☞早餐日记#',
                des:'便当做起来，早餐也不能落后',
                img1:'./img/1.jpg',
                img2:'./img/1.jpg',
                img3:'./img/1.jpg'
            },
            {
                title:'#蜜桃☞早餐日记#',
                des:'便当做起来，早餐也不能落后',
                img1:'./img/1.jpg',
                img2:'./img/1.jpg',
                img3:'./img/1.jpg'
            },
            {
                title:'#蜜桃☞早餐日记#',
                des:'便当做起来，早餐也不能落后',
                img1:'./img/1.jpg',
                img2:'./img/1.jpg',
                img3:'./img/1.jpg'
            },
            {
                title:'#蜜桃☞早餐日记#',
                des:'便当做起来，早餐也不能落后',
                img1:'./img/1.jpg',
                img2:'./img/1.jpg',
                img3:'./img/1.jpg'
            },
            {
                title:'#蜜桃☞早餐日记#',
                des:'便当做起来，早餐也不能落后',
                img1:'./img/1.jpg',
                img2:'./img/1.jpg',
                img3:'./img/1.jpg'
            },
            {
                title:'#蜜桃☞早餐日记#',
                des:'便当做起来，早餐也不能落后',
                img1:'./img/1.jpg',
                img2:'./img/1.jpg',
                img3:'./img/1.jpg'
            }
        ];
        $(zpArr).each(function(){
            $('.zp_item').append(`
            <a href="#" class="list-group-item item">
            <div class="des">
              <h4 class="list-group-item-heading">
                ${this.title}
              </h4><br>
              <p class="list-group-item-text">
                ${this.des}
              </p>
            </div>
            <div>
              <img src=${this.img1} alt="">
              <img src=${this.img2} alt="">
              <img src=${this.img3} alt="">
            </div>
          </a>
            `)
        })
    }
    zpList();
    console.log(fashionSearch)
    window.fashionSearch=fashionSearch;

    fashionSearch();
    
})