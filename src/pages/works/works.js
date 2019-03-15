// import $ from "jquery";
// import "bootstrap";

$(function () {
    //点击评论input弹出按钮
    $(".works-comment").one("click", function () {
        $(".works-comment-button").animate({ width: 'toggle' }, "fast");
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
            $(".on-works-image").css({ "backgroundColor": "#cc2e0a", "color": "#ffffff" })
        }
        else if ($(".works-like-button").css("color") == "rgb(141, 137, 134)") {
            let likeNumber2 = parseInt($(".works-like-number-num").text())
            let newLike = likeNumber2 + 1
            $(".works-like-number-num").text(newLike)
            $(".works-like-button").css("color", "rgb(232, 175, 166)")
            if ($(".on-works-image").is(":hover")) {
                $(".on-works-image").html("取 消")
                $(".on-works-image").css({ "backgroundColor": "#cc2e0a", "color": "#ffffff" })
            }
            else {
                $(".on-works-image").html(`<i class='iconfont icon-taoxin'> 已赞</i>`)
                $(".on-works-image").css({ "backgroundColor": "#dddddd", "color": "#888888" })
            }
        }
    })
    //简介图片区域的相关事件
    $(".on-works-image").mouseenter(function () {
        $(".works-image").css("filter", "brightness(108%)")
        $(".on-works-image").show()
        $(".on-works-image").css({ "backgroundColor": "#cc2e0a", "color": "#ffffff" })
        if ($(".works-like-button").css("color") == "rgb(232, 175, 166)") {
            $(".on-works-image").html('取 消')
        }
    })
    $(".on-works-image").mouseleave(function () {
        if ($(".works-like-button").css("color") == "rgb(232, 175, 166)") {
            $(".on-works-image").html(`<i class='iconfont icon-taoxin'> 已赞</i>`)
            $(".on-works-image").css({ "backgroundColor": "#dddddd", "color": "#888888" })
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
                    <header><img src='${obj.img}'></header>
                        <div class='row'>
                            <div class='col-md-2'>
                                <p>${obj.replyName}</p>
                            </div>
                            <div class='col-md-8'>
                                <p class='content'>${obj.content}</p>
                            </div>
                            <div class='col-md-2'>
                                <span class='reply-btn'>回复</span>
                            </div>
                        </div>
                    
                    <div class='comment-right'>
                    
                    <div class='comment-content-header'>
                </div>
                   
                <div class='comment-content-footer'>
                    
                </div>
            <div class='reply-list'>
        `

        
        if (obj.replyBody != "" && obj.replyBody.length > 0) {
            var arr = obj.replyBody;
            for (var j = 0; j < arr.length; j++) {
                var replyObj = arr[j];
                el = el + createReplyComment(replyObj);
            }
        }
        el = el + "</div></div></div>";
        return el;
    }
    
    //返回每个回复体内容
    function createReplyComment(reply) {
        var replyEl = "<div class='reply'><div><a href='javascript:void(0)' class='replyname'>" + reply.replyName + "</a>:<a href='javascript:void(0)'>@" + reply.beReplyName + "</a><span>" + reply.content + "</span></div>"
            + "<p><span>" + "</span> <span class='reply-list-btn'>回复</span></p></div>";
        return replyEl;
    }

    function replyClick(el) {
        el.parent().parent().append(`<div class='replybox'></div><textarea cols='80' rows='2' placeholder='来说几句吧......' class='mytextarea' ></textarea><span class='send'>发送</span></div>`)
            .find(".send").click(function () {
                var content = $(this).prev().val();
                if (content != "") {
                    var parentEl = $(this).parent().parent().parent().parent();
                    var obj = new Object();
                    obj.replyName = "匿名";
                    if (el.parent().parent().hasClass("reply")) {
                        console.log("1111");
                        obj.beReplyName = el.parent().parent().find("a:first").text();
                    } else {
                        console.log("2222");
                        obj.beReplyName = parentEl.find("h3").text();
                    }
                    obj.content = content;
                    var replyString = createReplyComment(obj);
                    $(".replybox").remove();
                    parentEl.find(".reply-list").append(replyString).find(".reply-list-btn:last").click(function () { alert("不能回复自己"); });
                } else {
                    alert("空内容");
                }
            });
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
            $(this).append(totalString).find(".reply-btn").click(function () {
                if ($(this).parent().parent().find(".replybox").length > 0) {
                    $(".replybox").remove();
                } else {
                    $(".replybox").remove();
                    replyClick($(this));
                }
            });
            $(".reply-list-btn").click(function () {
                if ($(this).parent().parent().find(".replybox").length > 0) {
                    $(".replybox").remove();
                } else {
                    $(".replybox").remove();
                    replyClick($(this));
                }
            })
        }

        //添加新数据
        if (option.add != "") {
            obj = option.add;
            var str = crateCommentInfo(obj);
            $(this).prepend(str).find(".reply-btn").click(function () {
                replyClick($(this));
            });
        }
    }

    //初始化数据
    var arr = [
        { id: 1, img: "./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg", replyName: "帅大叔", beReplyName: "匿名", content: "同学聚会，看到当年追我的屌丝开着宝马车带着他老婆来了，他老婆是我隔壁宿舍的同班同学，心里后悔极了。", replyBody: [] },
        { id: 2, img: "./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg", replyName: "匿名", beReplyName: "", content: "到菜市场买菜，看到一个孩子在看摊，我问：“一只鸡多少钱？” 那孩子回答：“23。” 我又问：“两只鸡多少钱？” 孩子愣了一下，一时间没算过来，急中生智大吼一声：“一次只能买一只！”", replyBody: [{ id: 3, img: "", replyName: "帅大叔", beReplyName: "匿名", content: "来啊，我们一起吃鸡" }] },
        { id: 3, img: "./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg", replyName: "帅大叔", beReplyName: "匿名", content: "同学聚会，看到当年追我的屌丝开着宝马车带着他老婆来了，他老婆是我隔壁宿舍的同班同学，心里后悔极了。", replyBody: [] }
    ];
    //评论
    $(".comment-list").addCommentList({ data: arr, add: "" });
    $("#comment").click(function () {
        var obj = new Object();
        obj.img = "./img/b503afedea09449da16a4e15fcc71ecc_1280w_1280h.jpg";
        obj.replyName = "懒人";
        obj.content = $("#content").val();
        obj.replyBody = "";
        $(".comment-list").addCommentList({ data: [], add: obj });
    });


})


