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
export {slide};