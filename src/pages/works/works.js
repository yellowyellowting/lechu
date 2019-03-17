// import $ from "jquery";
// import "bootstrap";

$(function () {
    //点击评论input弹出按钮
    $(".works-comment").one("click", function () {
        $(".works-comment-button").animate({
            width: 'toggle'
        }, "fast");
    })
    //点赞事件相关的代码
    $(document).on("click", ".on-works-image,.works-like-button", function () {
        $(".works-like-button").toggleClass("works-like-button-new")
        if ($(".works-like-button").css("color") == "rgb(232, 175, 166)") {
            $(".on-works-image").html(`<i class='iconfont icon-taoxin'> 赞</i>`)
            let likeNumber2 = parseInt($(".works-like-number-num").text())
            let newLike = likeNumber2 - 1
            $(".works-like-number-num").text(newLike)
            $(".works-like-button").css("color", "rgb(141, 137, 134)")
            $(".on-works-image").css({
                "backgroundColor": "#cc2e0a",
                "color": "#ffffff"
            })
        } else if ($(".works-like-button").css("color") == "rgb(141, 137, 134)") {
            let likeNumber2 = parseInt($(".works-like-number-num").text())
            let newLike = likeNumber2 + 1
            $(".works-like-number-num").text(newLike)
            $(".works-like-button").css("color", "rgb(232, 175, 166)")
            if ($(".on-works-image").is(":hover")) {
                $(".on-works-image").html("取 消")
                $(".on-works-image").css({
                    "backgroundColor": "#cc2e0a",
                    "color": "#ffffff"
                })
            } else {
                $(".on-works-image").html(`<i class='iconfont icon-taoxin'> 已赞</i>`)
                $(".on-works-image").css({
                    "backgroundColor": "#dddddd",
                    "color": "#888888"
                })
            }
        }
    })
    //简介图片区域的相关事件
    $(".on-works-image").mouseenter(function () {
        $(".works-image").css("filter", "brightness(108%)")
        $(".on-works-image").show()
        $(".on-works-image").css({
            "backgroundColor": "#cc2e0a",
            "color": "#ffffff"
        })
        if ($(".works-like-button").css("color") == "rgb(232, 175, 166)") {
            $(".on-works-image").html('取 消')
        }
    })
    $(".on-works-image").mouseleave(function () {
        if ($(".works-like-button").css("color") == "rgb(232, 175, 166)") {
            $(".on-works-image").html(`<i class='iconfont icon-taoxin'> 已赞</i>`)
            $(".on-works-image").css({
                "backgroundColor": "#dddddd",
                "color": "#888888"
            })
        }
    })
    $(".works-image").mouseenter(function () {
        $(".works-image").css("filter", "brightness(108%)")
        $(".on-works-image").show()
    })
    $(".works-image").mouseleave(function () {
        $(".works-image").css("filter", "brightness(100%)")
        $(".on-works-image").hide()
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
                                        <span class="username-content">${obj.replyName}</span>
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
    var arr = [{
            id: 1,
            img: "./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg",
            replyName: "叔",
            beReplyName: "匿名",
            content: "同学聚会。",
        },
        {
            id: 2,
            img: "./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg",
            replyName: "匿名",
            beReplyName: "",
            content: "到菜市场买菜，看到一个孩子在看摊，我问：“一只鸡多少钱？” 那孩子回答：“23。” 我又问：“两只鸡多少钱？” 孩子愣了一下，一时间没算过来，急中生智大吼一声：“一次只能买一只！”",
        }
    ];
    //评论
    $(".comment-list").addCommentList({
        data: arr,
        add: ""
    });
    $("#comment").click(function () {
        if ($(this).siblings(".works-comment").val() == "") {
            alert("评论不能为空!")
        } else {
            var obj = new Object();
            obj.img = "./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg";
            obj.replyName = "懒人";
            obj.content = $("#content").val();
            $(".comment-list").addCommentList({
                data: [],
                add: obj
            });
            $(this).parents(".comment-allin").find(".works-comment").val("")
        }
        //返回每个回复体内容
        $(".reply-btn").on("click", function () {
            var replayuser = $(this).parent().parent().find(".username-content").text()
            $(this).parents(".comment-allin").find(".works-comment").val("@" + replayuser + " ")

        })
    });
})