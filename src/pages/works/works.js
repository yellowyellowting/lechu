// import $ from "jquery";
// import "bootstrap";

$(function () {
    //点击评论input弹出按钮
    $(".works-comment").one("click", function () {
        $(".works-comment-button").animate({ width: 'toggle' }, "fast");
    })
    //点击赞的响应事件
    $(".works-like-button").on("click", function () {
        $(".works-like-button").toggleClass("works-like-button-new")
        if ($(".works-like-button").css("color") == "rgb(232, 175, 166)") {
            let likeNumber = $(".works-like-number-num").text()
            let likeNumber2 = parseInt(likeNumber)
            let newLike = likeNumber2 + 1
            $(".works-like-number-num").text(newLike)
        }
        if ($(".works-like-button").css("color") == "rgb(141, 137, 134)") {
            let likeNumber = $(".works-like-number-num").text()
            let likeNumber2 = parseInt(likeNumber)
            let newLike = likeNumber2 - 1
            $(".works-like-number-num").text(newLike)
        }
    })
    //简介图片区域的相关事件
    $(".on-works-image").mouseenter(function () {
        $(".works-image").css("filter", "brightness(108%)")
        $(".on-works-image").show()
    })
    $(".works-image").mouseenter(function () {
        $(".works-image").css("filter", "brightness(108%)")
        $(".on-works-image").show()
    })
    $(".works-image").mouseleave(function () {
        $(".works-image").css("filter", "brightness(100%)")
        $(".on-works-image").hide()
    })
    //图片点赞事件
    $(".on-works-image").on("click",function(){
        if($(".works-like-button").css("color") == "rgb(232, 175, 166)"){
            $(".on-works-image").html(`<i class='iconfont icon-taoxin'> 赞</i>`)
            let likeNumber = $(".works-like-number-num").text()
            let likeNumber2 = parseInt(likeNumber)
            let newLike = likeNumber2 - 1
            $(".works-like-number-num").text(newLike)
            $(".works-like-button").css("color","rgb(141, 137, 134)")
        }
        else if($(".works-like-button").css("color") == "rgb(141, 137, 134)"){
            $(".on-works-image").html("取消")
            let likeNumber = $(".works-like-number-num").text()
            let likeNumber2 = parseInt(likeNumber)
            let newLike = likeNumber2 + 1
            $(".works-like-number-num").text(newLike)
            $(".works-like-button").css("color","rgb(232, 175, 166)")
        }
    })
})
