import {getPopRecipes} from '../../utils/api';
$(function () {

    //右边的部分数据
    function aboutdish() {
        var aboutdishArr1 = [
            {
                url: "./img/creatricepe_step4.jpg",
                dishName: "翠竹报春"
            },
            {
                url: "./img/cuizhubaochun.jpg",
                dishName: "红烧熊猫"
            },
            {
                url: "./img/gullutou_cover.jpg",
                dishName: "凉拌熊掌"
            }
        ]
        var aboutdishArr2 = [
            {
                url: "./img/creatricepe_step4.jpg",
                dishName: "翠竹报春"
            },
            {
                url: "./img/cuizhubaochun.jpg",
                dishName: "红烧熊猫"
            },
            {
                url: "./img/gullutou_cover.jpg",
                dishName: "凉拌熊掌"
            }
        ]
        $(aboutdishArr1).each(function () {
            // console.log(this)
            $(".aboutdish1").append(`<div class="col-sm-4 classright">
                        <img src=${this.url} alt="">
                        <p>${this.dishName}</p>
                    </div>`)
        })
        $(aboutdishArr2).each(function () {
            // console.log(this)
            $(".aboutdish2").append(`<div class="col-sm-4 classright">
                        <img src=${this.url} alt="">
                        <p>${this.dishName}</p>
                    </div>`)
        })
    }
    aboutdish()
    //最新菜谱渲染
    function newdish() {
        var newdishArr = [
            {
                img: "./img/hongsaozhuti.jpg",
                dishName: "红烧猪蹄",
                dishStuff: "猪蹄,猪蹄,猪蹄",
                dishAuthor: "tangtang糖糖"
            },
            {
                img: "./img/hongsaozhuti.jpg",
                dishName: "红烧猪蹄",
                dishStuff: "猪蹄,猪蹄,猪蹄",
                dishAuthor: "tangtang糖糖"
            },
            {
                img: "./img/hongsaozhuti.jpg",
                dishName: "红烧猪蹄",
                dishStuff: "猪蹄,猪蹄,猪蹄",
                dishAuthor: "tangtang糖糖"
            },
            {
                img: "./img/hongsaozhuti.jpg",
                dishName: "红烧猪蹄",
                dishStuff: "猪蹄,猪蹄,猪蹄",
                dishAuthor: "tangtang糖糖"
            },
            {
                img: "./img/hongsaozhuti.jpg",
                dishName: "红烧猪蹄",
                dishStuff: "猪蹄,猪蹄,猪蹄",
                dishAuthor: "tangtang糖糖"
            }
        ]
        $(newdishArr).each(function () {
            $(".newdish-title").after(`
            <div class="row classright-new">
            <div class="col-sm-6">
                <img src=${this.img} alt="">
            </div>
            <div class="col-sm-6">
                <div class="row classright-new-tit">
                    <h4>${this.dishName}</h4>
                </div>
                <div class="row class-tips">
                    <span>独家</span>
                    <span>步骤图</span>
                </div>
                <div class="row classright-new-material">
                    <span>${this.dishStuff}</span>
                </div>
                <div class="row classright-new-author">
                    <span>${this.dishAuthor} <i class="glyphicon glyphicon-fire"></i> </span>
                </div>
            </div>
        </div>
            `)
        })
    }
    newdish()
    //家常菜的相关菜单
    function dishlast() {
        var dishlastArr = [
            {
                img: "./img/recipe.jpg",
                dishName: "家常菜"
            },
            {
                img: "./img/gullutou_cover.jpg",
                dishName: "家常菜"
            },
            {
                img: "./img/recipe_cover.jpg",
                dishName: "家常菜"
            }
        ]
        $(dishlastArr).each(function () {
            $(".classright-new-all").after(`
            <div class="row classright-new-all-content">
                    <div class="row">
                        <img src=${this.img} alt="">
                    </div>
                    <div class="row">
                        <p>${this.dishName}</p>
                    </div>
                </div>
            `)
        })
    }
    dishlast()

    //分页-前端分页
    //发起请求获取所有数据，且加载第一页数据
    var datav = [];
    //分页查询代码
    getPopRecipes().then(poprecipe => {
        console.log(poprecipe);
        datav = poprecipe
            console.log(datav)
            var str = ""
            $(datav).each(function (i, ele) {
                if (i > 9) return
                // console.log(ele)
                str += `<div class="row classmid-content">
                <div class="col-sm-6">
                <img src=${ele.thumbnail} alt="">
            </div>
            <div class="col-sm-6 classmid-tit-right">
                <div class="row classmid-tit-small">
                    <h4>${this.name}</h4>
                </div>
                <div class="row class-tips">
                    <span>独家</span>
                    <span>步骤图</span>
                </div>
                <div class="row classmid-material">
                    <span>${this.dishStuff}</span>
                </div>
                <div class="row classmid-score">
                    <span>综合评分</span>
                    <span>${this.dishScore}</span>
                    <span>${this.stats}</span>
                </div>
                <div class="row classmid-author">
                    <span>${this.cookName} <i class="glyphicon glyphicon-fire"></i> </span>
                </div>
            </div>
            </div>
                `
            })
            $(".classmid-tittoo").after(str)

    })

})