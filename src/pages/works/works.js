// import $ from "jquery";
// import bootstrap from"bootstrap";
import {
    createReview,
    getReview
} from '../../utils/api';
$(function () {

    //点赞事件相关的代码
    // $(document).on("click", ".on-works-image,.works-like-button", function () {
    //     $(".works-like-button").toggleClass("works-like-button-new")
    //     if ($(".works-like-button").css("color") == "rgb(232, 175, 166)") {
    //         $(".on-works-image").html(`<i class='iconfont icon-taoxin'> 赞</i>`)
    //         let likeNumber2 = parseInt($(".works-like-number-num").text())
    //         let newLike = likeNumber2 - 1
    //         $(".works-like-number-num").text(newLike)
    //         $(".works-like-button").css("color", "rgb(141, 137, 134)")
    //         $(".on-works-image").css({
    //             "backgroundColor": "#cc2e0a",
    //             "color": "#ffffff"
    //         })
    //     } else if ($(".works-like-button").css("color") == "rgb(141, 137, 134)") {
    //         let likeNumber2 = parseInt($(".works-like-number-num").text())
    //         let newLike = likeNumber2 + 1
    //         $(".works-like-number-num").text(newLike)
    //         $(".works-like-button").css("color", "rgb(232, 175, 166)")
    //         if ($(".on-works-image").is(":hover")) {
    //             $(".on-works-image").html("取 消")
    //             $(".on-works-image").css({
    //                 "backgroundColor": "#cc2e0a",
    //                 "color": "#ffffff"
    //             })
    //         } else {
    //             $(".on-works-image").html(`<i class='iconfont icon-taoxin'> 已赞</i>`)
    //             $(".on-works-image").css({
    //                 "backgroundColor": "#dddddd",
    //                 "color": "#888888"
    //             })
    //         }
    //     }
    // })
    // //简介图片区域的相关事件
    // $(".on-works-image").mouseenter(function () {
    //     $(".works-image").css("filter", "brightness(108%)")
    //     $(".on-works-image").show()
    //     $(".on-works-image").css({
    //         "backgroundColor": "#cc2e0a",
    //         "color": "#ffffff"
    //     })
    //     if ($(".works-like-button").css("color") == "rgb(232, 175, 166)") {
    //         $(".on-works-image").html('取 消')
    //     }
    // })
    // $(".on-works-image").mouseleave(function () {
    //     if ($(".works-like-button").css("color") == "rgb(232, 175, 166)") {
    //         $(".on-works-image").html(`<i class='iconfont icon-taoxin'> 已赞</i>`)
    //         $(".on-works-image").css({
    //             "backgroundColor": "#dddddd",
    //             "color": "#888888"
    //         })
    //     }
    // })
    // $(".works-image").mouseenter(function () {
    //     $(".works-image").css("filter", "brightness(108%)")
    //     $(".on-works-image").show()
    // })
    // $(".works-image").mouseleave(function () {
    //     $(".works-image").css("filter", "brightness(100%)")
    //     $(".on-works-image").hide()
    // })
    //点击回复添加用户名到input
    $(document).on("click", ".reply-btn", function () {
        var replayuser = $(this).parent().parent().find(".username-content").text()
        $(this).parents(".comment-allin").find(".works-comment").val("@" + replayuser + " ")
    });


    //渲染菜谱列表
    var datav = [];
    //分页查询代码
    $.getJSON("http://127.0.0.1:3000/recipe/pop", function (data) {
        // console.log(data)
        datav = data.data; //存储数据
        // console.log(datav)
        var str = "";


        $(datav).each(function (i, ele) {
            if (i > 9) return
            // console.log(this)
            str += `
            <div class="row works-main" id=${this.id}>
            <div class="top-works-main">
              <div class="top-works-main-left">
                <a href="javascript:void(0);">
                  <img src="./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg" alt="">
                  <span>${this.cookName}</span>
                </a>
                <span>做过</span>
                <a class="works-items" href="javascript:void(0);">${this.name}</a>
              </div>
              <div class="top-works-main-right">
                刚刚
              </div>
            </div>
            <div class="mid-works-main">
              <div class="mid-works-main-image">
                <img class="works-image" src=${this.thumbnail} alt="">
                
              </div>
              <div class="works-intro">
                <p>#午餐 • 2019年3月14日# 满满的一锅 吃得干干净净😋duaiduai表示很好吃</p>
                <span>${this.name}的做法</span>
                
              </div>
            </div>
            <div class="comment-allin">
              <div class="comment-list">
              </div>
              <div class="bottom-works-main">
                <input class="works-comment content" type="text" placeholder="评论">
                <input class="works-comment-button comment" type="button" value="评论">
              </div>
            </div>
          </div>
                `
        })
        $(".attention").after(str)
        //点击评论input弹出按钮
        $(".works-comment").one("click", function () {
            $(this).parent().find(".works-comment-button").animate({
                width: 'toggle'
            }, "fast");

        })

        $(".works-comment-button").on("click", function () {
            // console.log(666)
            if ($(this).siblings(".works-comment").val() == "") {
                alert("评论不能为空!")
            } else {
                var obj = new Object();
                obj.img = "./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg";
                obj.username = "懒人";
                obj.recipeId = $(this).parents(".works-main").attr("id");
                obj.content = $(this).siblings(".works-comment").val();
                $(this).parents(".comment-allin").find(".comment-list").addCommentList({
                    data: [],
                    add: obj
                });
                $(this).parents(".comment-allin").find(".works-comment").val("")
            }
            
            //评论传给后端
            // console.log(obj)
            createReview(obj).then(result => {
                console.log(result)
            })
        });

        //渲染评论相关代码
        let s1 = { recipeId: 103708641 }
        $.getJSON("http://127.0.0.1:3000/comment/list", s1, function (result) {
            // console.log(result)
            var datav = result.data
            // console.log(datav)
            datav.forEach(element => {
                // console.log(element.content)
                // console.log(element.user_id)
                $("#103708641").find(".comment-list").append(
                    `<div class='comment-info'>
                            <div class='comment-info-row'>
                                    <div class="comment-info-left">
                                        <img src='./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg'>
                                    </div>
                                    <div class="comment-info-right">
                                        <div class="comment-info-right-left">
                                            <span class="username-content">${element.user_name}</span>
                                            <span class='content'>${element.content}</span>
                                        </div>
                                        <div class="comment-info-right-right">
                                            <span class='reply-btn'>回复</span>
                                        </div>
                                    </div>
                            </div>
                        </div>         
                    `
                );
            });

        })
        let s2 = { recipeId: 103708642 }
        $.getJSON("http://127.0.0.1:3000/comment/list", s2, function (result) {
            // console.log(result)
            var datav = result.data
            // console.log(datav)
            datav.forEach(element => {
                // console.log(element.content)
                // console.log(element.user_id)
                $("#103708642").find(".comment-list").append(
                    `<div class='comment-info'>
                            <div class='comment-info-row'>
                                    <div class="comment-info-left">
                                        <img src='./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg'>
                                    </div>
                                    <div class="comment-info-right">
                                        <div class="comment-info-right-left">
                                            <span class="username-content">${element.user_name}</span>
                                            <span class='content'>${element.content}</span>
                                        </div>
                                        <div class="comment-info-right-right">
                                            <span class='reply-btn'>回复</span>
                                        </div>
                                    </div>
                            </div>
                        </div>         
                    `
                );
            });

        })
        let s3 = { recipeId: 103708643 }
        $.getJSON("http://127.0.0.1:3000/comment/list", s3, function (result) {
            // console.log(result)
            var datav = result.data
            // console.log(datav)
            datav.forEach(element => {
                // console.log(element.content)
                // console.log(element.user_id)
                $("#103708643").find(".comment-list").append(
                    `<div class='comment-info'>
                            <div class='comment-info-row'>
                                    <div class="comment-info-left">
                                        <img src='./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg'>
                                    </div>
                                    <div class="comment-info-right">
                                        <div class="comment-info-right-left">
                                            <span class="username-content">${element.user_name}</span>
                                            <span class='content'>${element.content}</span>
                                        </div>
                                        <div class="comment-info-right-right">
                                            <span class='reply-btn'>回复</span>
                                        </div>
                                    </div>
                            </div>
                        </div>         
                    `
                );
            });
        })
        let s4 = { recipeId: 103708644 }
        $.getJSON("http://127.0.0.1:3000/comment/list", s4, function (result) {
            // console.log(result)
            var datav = result.data
            // console.log(datav)
            datav.forEach(element => {
                // console.log(element.content)
                // console.log(element.user_id)
                $("#103708644").find(".comment-list").append(
                    `<div class='comment-info'>
                            <div class='comment-info-row'>
                                    <div class="comment-info-left">
                                        <img src='./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg'>
                                    </div>
                                    <div class="comment-info-right">
                                        <div class="comment-info-right-left">
                                            <span class="username-content">${element.user_name}</span>
                                            <span class='content'>${element.content}</span>
                                        </div>
                                        <div class="comment-info-right-right">
                                            <span class='reply-btn'>回复</span>
                                        </div>
                                    </div>
                            </div>
                        </div>         
                    `
                );
            });
        })
        let s5 = { recipeId: 103708645 }
        $.getJSON("http://127.0.0.1:3000/comment/list", s5, function (result) {
            // console.log(result)
            var datav = result.data
            // console.log(datav)
            datav.forEach(element => {
                // console.log(element.content)
                // console.log(element.user_id)
                $("#103708645").find(".comment-list").append(
                    `<div class='comment-info'>
                            <div class='comment-info-row'>
                                    <div class="comment-info-left">
                                        <img src='./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg'>
                                    </div>
                                    <div class="comment-info-right">
                                        <div class="comment-info-right-left">
                                            <span class="username-content">${element.user_name}</span>
                                            <span class='content'>${element.content}</span>
                                        </div>
                                        <div class="comment-info-right-right">
                                            <span class='reply-btn'>回复</span>
                                        </div>
                                    </div>
                            </div>
                        </div>         
                    `
                );
            });
        })
        let s6 = { recipeId: 103708646 }
        $.getJSON("http://127.0.0.1:3000/comment/list", s6, function (result) {
            // console.log(result)
            var datav = result.data
            // console.log(datav)
            datav.forEach(element => {
                // console.log(element.content)
                // console.log(element.user_id)
                $("#103708646").find(".comment-list").append(
                    `<div class='comment-info'>
                            <div class='comment-info-row'>
                                    <div class="comment-info-left">
                                        <img src='./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg'>
                                    </div>
                                    <div class="comment-info-right">
                                        <div class="comment-info-right-left">
                                            <span class="username-content">${element.user_name}</span>
                                            <span class='content'>${element.content}</span>
                                        </div>
                                        <div class="comment-info-right-right">
                                            <span class='reply-btn'>回复</span>
                                        </div>
                                    </div>
                            </div>
                        </div>         
                    `
                );
            });
        })
        let s7 = { recipeId: 103708647 }
        $.getJSON("http://127.0.0.1:3000/comment/list", s7, function (result) {
            // console.log(result)
            var datav = result.data
            // console.log(datav)
            datav.forEach(element => {
                // console.log(element.content)
                // console.log(element.user_id)
                $("#103708647").find(".comment-list").append(
                    `<div class='comment-info'>
                            <div class='comment-info-row'>
                                    <div class="comment-info-left">
                                        <img src='./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg'>
                                    </div>
                                    <div class="comment-info-right">
                                        <div class="comment-info-right-left">
                                            <span class="username-content">${element.user_name}</span>
                                            <span class='content'>${element.content}</span>
                                        </div>
                                        <div class="comment-info-right-right">
                                            <span class='reply-btn'>回复</span>
                                        </div>
                                    </div>
                            </div>
                        </div>         
                    `
                );
            });
        })
        let s8 = { recipeId: 103708648 }
        $.getJSON("http://127.0.0.1:3000/comment/list", s8, function (result) {
            // console.log(result)
            var datav = result.data
            // console.log(datav)
            datav.forEach(element => {
                // console.log(element.content)
                // console.log(element.user_id)
                $("#103708648").find(".comment-list").append(
                    `<div class='comment-info'>
                            <div class='comment-info-row'>
                                    <div class="comment-info-left">
                                        <img src='./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg'>
                                    </div>
                                    <div class="comment-info-right">
                                        <div class="comment-info-right-left">
                                            <span class="username-content">${element.user_name}</span>
                                            <span class='content'>${element.content}</span>
                                        </div>
                                        <div class="comment-info-right-right">
                                            <span class='reply-btn'>回复</span>
                                        </div>
                                    </div>
                            </div>
                        </div>         
                    `
                );
            });
        })
        let s9 = { recipeId: 103708649 }
        $.getJSON("http://127.0.0.1:3000/comment/list", s9, function (result) {
            // console.log(result)
            var datav = result.data
            // console.log(datav)
            datav.forEach(element => {
                // console.log(element.content)
                // console.log(element.user_id)
                $("#103708649").find(".comment-list").append(
                    `<div class='comment-info'>
                            <div class='comment-info-row'>
                                    <div class="comment-info-left">
                                        <img src='./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg'>
                                    </div>
                                    <div class="comment-info-right">
                                        <div class="comment-info-right-left">
                                            <span class="username-content">${element.user_name}</span>
                                            <span class='content'>${element.content}</span>
                                        </div>
                                        <div class="comment-info-right-right">
                                            <span class='reply-btn'>回复</span>
                                        </div>
                                    </div>
                            </div>
                        </div>         
                    `
                );
            });
        })
        let s10 = { recipeId: 103708650 }
        $.getJSON("http://127.0.0.1:3000/comment/list", s10, function (result) {
            // console.log(result)
            var datav = result.data
            // console.log(datav)
            datav.forEach(element => {
                // console.log(element.content)
                // console.log(element.user_id)
                $("#103708650").find(".comment-list").append(
                    `<div class='comment-info'>
                            <div class='comment-info-row'>
                                    <div class="comment-info-left">
                                        <img src='./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg'>
                                    </div>
                                    <div class="comment-info-right">
                                        <div class="comment-info-right-left">
                                            <span class="username-content">${element.user_name}</span>
                                            <span class='content'>${element.content}</span>
                                        </div>
                                        <div class="comment-info-right-right">
                                            <span class='reply-btn'>回复</span>
                                        </div>
                                    </div>
                            </div>
                        </div>         
                    `
                );
            });
        })

    })

    //评论相关事件
    function crateCommentInfo(obj) {
        var el = `<div class='comment-info'>
                        <div class='comment-info-row'>
                                <div class="comment-info-left">
                                    <img src='${obj.img}'>
                                </div>
                                <div class="comment-info-right">
                                    <div class="comment-info-right-left">
                                        <span class="username-content">${obj.username}</span>
                                        <span class='content'>${obj.content}</span>
                                    </div>
                                    <div class="comment-info-right-right">
                                        <span class='reply-btn'>回复</span>
                                    </div>
                                </div>
                        </div>
                    </div>         
                `
        return el;
    }

    $.fn.addCommentList = function (options) {
        var defaults = {
            data: [],
            add: ""
        }
        var option = $.extend(defaults, options);
        //加载数据
        if (option.data.length > 0) {
            var dataList = option.data;
            var totalString = "";
            for (var i = 0; i < dataList.length; i++) {
                var obj = dataList[i];
                var objString = crateCommentInfo(obj);
                totalString = totalString + objString;
            }
            $(this).append(totalString)
        }
        //添加新数据
        if (option.add != "") {
            obj = option.add;
            var str = crateCommentInfo(obj);
            $(this).append(str)
        }
    }


    //初始化数据
    // var arr = [
    //     {
    //     id: 1,
    //     img: "./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg",
    //     replyName: "叔",
    //     beReplyName: "匿名",
    //     content: "同学聚会。",
    // },
    // {
    //     id: 2,
    //     img: "./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg",
    //     replyName: "匿名",
    //     beReplyName: "",
    //     content: "到菜市场买菜，看到一个孩子在看摊，我问：“一只鸡多少钱？” 那孩子回答：“23。” 我又问：“两只鸡多少钱？” 孩子愣了一下，一时间没算过来，急中生智大吼一声：“一次只能买一只！”",
    // }
    // ];
    // ajax评论相关
    // createReview()
    //     .then( => {
    //         console.log()
    //     })


    //评论
    // $(".comment-list").addCommentList({
    //     data: arr,
    //     add: ""
    // });

})