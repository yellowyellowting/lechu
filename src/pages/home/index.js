
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
            $('.list').append(`
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

    // 轮播1
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

    //轮播图2

})