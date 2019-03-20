import $ from 'jquery';
import {fashionSearch} from '../../utils/module/search';
import {creatMenuList} from '../../utils/module/creatMenuList';
import {newFashionList} from '../../utils/module/newFashionList';
import {newRecipe} from '../../utils/module/newRecipe';
// import {slide} from '../../utils/module/search';
import {timeList} from '../../utils/module/timeList';
import {fashionMenu} from '../../utils/module/fashionMenu';

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

    // 流行搜索渲染
    var arr1=[
        {
            name:'可乐鸡翅',
            rank:'icon-up'
        },
        {
            name:'早餐',
            rank:'icon-up'
        },
        {
            name:'鱼香茄子',
            rank:'icon-up'
        },
        {
            name:'青团',
            rank:'icon-down'
        },
        {
            name:'汤',
            rank:'icon-up'
        }
    ];
    var arr2=[
        {
            name:'红烧肉',
            rank:'icon-up'
        },
        {
            name:'凉拌黄瓜',
            rank:'icon-down'
        },
        {
            name:'牛肉',
            rank:'icon-up'
        },
        {
            name:'蛋糕',
            rank:'icon-down'
        },
        {
            name:'排骨',
            rank:'icon-up'
        }
    ];
    var dom1=$('.search .sleft');
    var dom2=$('.search .sright');
    fashionSearch(arr1,dom1,1);
    fashionSearch(arr2,dom2,6);

    // 流行菜单 
    fashionMenu();

    // 下厨房的厨友们 渲染数据
    function friendsList(){
        var arr=[
            {
                username:'悦己2016',
                watchNum:'123',
                menu:'46',
                zpNum:'234'
            },
            {
                username:'悦己2016',
                watchNum:'123',
                menu:'46',
                zpNum:'234'
            },
            {
                username:'悦己2016',
                watchNum:'123',
                menu:'46',
                zpNum:'234'
            },
            {
                username:'悦己2016',
                watchNum:'123',
                menu:'46',
                zpNum:'234'
            },
            {
                username:'悦己2016',
                watchNum:'123',
                menu:'46',
                zpNum:'234'
            },
            {
                username:'悦己2016',
                watchNum:'123',
                menu:'46',
                zpNum:'234'
            },
            {
                username:'悦己2016',
                watchNum:'123',
                menu:'46',
                zpNum:'234'
            }
        ];
        // console.log($('.friends .itemlist'))
        $(arr).each(function(){
            $('.friends .itemlist').append(`
            <div class="row item">
                      <div class="col-xs-3 col-sm-3">
                        <img class="img-circle" src="./img/1.jpg" alt="">
                      </div>
                      <div class="col-xs-6 col-sm-6">
                        <h4>悦己2016</h4>
                        <p><span>123</span>关注</p>
                        <p><span>46</span>个菜谱<span>567</span>个作品</p>
                      </div>
                      <div class="col-xs-3 col-sm-3 pull-right" style="padding-right: 0">
                        <div id="watch">
                          <span>关注</span>
                        </div>
                      </div>
                  </div>
            `)
        })
    }
    friendsList();

    //用户信息显示
    function getUserInfo(){
        var userinfo={
            headimg:'./img/1.jpg',
            username:'手机用户123323',
            collection:'1收藏',
            zp:'1作品',
            menu:'1菜谱'
        }
        userinfo=null;
        if(userinfo==null){
            //用户未登陆
            //1.内容部分更换用户信息
            $('.info').append(`
            <div>
            <button type="button" class="btn btn-danger">
              <i class="iconfont icon-qq"></i>
              <span>QQ登陆</span>
            </button><br>
            <button type="button" class="btn btn-danger">
              <i class="iconfont icon-weibo"></i>
              <span>微博登陆</span>
            </button>
            <p>
              <a href="#">手机/邮箱登录</a>
              <span>|</span>
              <a href="#">注册</a>
            </p>
            <p><a href="#">网上不良信息举报专区</a></p>
          </div>
            `)
            //2.nav部分更换用户信息
            // console.log($('.userinfo'))
            $('.userinfo').append(`
            <li><a href="#"><span class="glyphicon glyphicon-user"></span> 注册</a></li>
            <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> 登录</a></li>
            `)
        }else{
            //用户已登录
            //1.内容部分更换用户信息
            $('.info').append(`
            <div class="show haslogin">
                <div class="headimg">
                    <img src=${userinfo.headimg} alt="" class="img-circle">
                </div>
                <h4><span>${userinfo.username}</span>的厨房</h4>
                <h6>
                    <span>${userinfo.collection} </span>|&nbsp
                    <span>${userinfo.zp} </span>|&nbsp
                    <span>${userinfo.menu} </span>|&nbsp
                    <span>草稿箱 </span>
                </h6>
                <div class="create">
                    <a href="#">创建菜谱</a>
                </div>
                <p><a href="#">网上不良信息举报专区</a></p>
            </div>
            `)
            //2.nav部分更换用户信息
            $('.userinfo').append(`
            <li><a href="#"><img src="./img/1.jpg" alt="" class="img-circle"></a></li>
            <li><i class="iconfont icon-vertical_line"></i></li>
            <li><i class="iconfont icon-favorite"></i></li>
            `)
        }
    }
    getUserInfo();
})