import { getPopRecipes } from '../../utils/api';
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
    // $.getJSON("http://127.0.0.1:3000/recipe/pop", function (data) {
    //     // console.log(data);
    //     datav = data.data
    //     console.log(datav)
    //     var str = ""
    //     $(datav).each(function (i, ele) {
    //         if (i > 9) return
    //         console.log(ele)
    //         str += `
    //             <div class="col-sm-6">
    //                 <img src=${this.thumbnail} alt="">
    //             </div>
    //             <div class="col-sm-6 classmid-tit-right">
    //                 <div class="row classmid-tit-small">
    //                     <h4>${this.name}</h4>
    //                 </div>
    //                 <div class="row class-tips">
    //                     <span>独家</span>
    //                     <span>步骤图</span>
    //                 </div>
    //                 <div class="row classmid-material">
    //                     <span>${this.dishStuff}</span>
    //                 </div>
    //                 <div class="row classmid-score">
    //                     <span>综合评分</span>
    //                     span>${this.dishScore}</span>
    //                     <span>${this.stats}</span>
    //                 </div>
    //                 <div class="row classmid-author">
    //                     <span>${this.cookName} <i class="glyphicon glyphicon-fire"></i> </span>
    //                 </div>
    //             </div>
    //             `
    //     })
    //     $(".classmid-content").append(str)
    // })
    function loadRecipe(){
        localStorage.getItem("resArr")
        console.log(resArr)
    }
    loadRecipe()
    getPopRecipes().then(poprecipe => {
        // console.log(poprecipe);
        datav = poprecipe
        console.log(datav)
        var str = ""
        $(datav).each(function (i, ele) {
            if (i > 9) return
            // console.log(ele)
            str += `
                <div class="col-sm-6">
                    <img src=${this.thumbnail} referrer="no-referrer|origin|unsafe-url" alt="">
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
                `
        })
        $(".classmid-content").append(str)
    })
    //下一页
    var currentP = 1, pageNum = 10; //默认的当前页，每页的数据条数
    $("#nextPage").on("click", function () {
        var totP = datav.length / pageNum; //总的页码
        var nextPage = currentP + 1; //currentP*10--nextPage*10
        console.log("nextPage:", nextPage, "totP:", Math.ceil(totP))
        if (nextPage > totP) { alert("已经到了最后一页"); return; }
        var str = "";
        for (let i = currentP * pageNum; i < nextPage * pageNum; i++) {
            str += `
            <div class="col-sm-6">
            <img src=${datav[i].thumbnail} alt="">
        </div>
        <div class="col-sm-6 classmid-tit-right">
            <div class="row classmid-tit-small">
                <h4>${datav[i].name}</h4>
            </div>
            <div class="row class-tips">
                <span>独家</span>
                <span>步骤图</span>
            </div>
            <div class="row classmid-material">
                <span>${datav[i].dishStuff}</span>
            </div>
            <div class="row classmid-score">
                <span>综合评分</span>
                <span>${datav[i].dishScore}</span>
                <span>${datav[i].stats}</span>
            </div>
            <div class="row classmid-author">
                <span>${datav[i].cookName} <i class="glyphicon glyphicon-fire"></i> </span>
            </div>
        </div>

            `
        }
        $(".classmid-content").find("*").remove()
        $(".classmid-content").append(str)
        currentP = nextPage; //修正当前页的值
    })

    //上一页
    $("#beforePage").on("click", function () {
        var totP = datav.length / pageNum;//总的页码
        var beforePage = currentP - 1;
        console.log("beforePage:", beforePage, "totP:", Math.ceil(totP))

        if (beforePage < 1) { alert("已经到了第一页"); return; }

        var str = "";
        for (let i = (beforePage - 1) * pageNum; i < beforePage * pageNum; i++) {
            str += `
            <div class="col-sm-6">
            <img src=${datav[i].thumbnail} alt="">
        </div>
        <div class="col-sm-6 classmid-tit-right">
            <div class="row classmid-tit-small">
                <h4>${datav[i].name}</h4>
            </div>
            <div class="row class-tips">
                <span>独家</span>
                <span>步骤图</span>
            </div>
            <div class="row classmid-material">
                <span>${datav[i].dishStuff}</span>
            </div>
            <div class="row classmid-score">
                <span>综合评分</span>
                <span>${datav[i].dishScore}</span>
                <span>${datav[i].stats}</span>
            </div>
            <div class="row classmid-author">
                <span>${datav[i].cookName} <i class="glyphicon glyphicon-fire"></i> </span>
            </div>
        </div>
            `
        }
        $(".classmid-content").find("*").remove()
        $(".classmid-content").append(str)
        currentP = beforePage; //修正当前页的值
    })
})