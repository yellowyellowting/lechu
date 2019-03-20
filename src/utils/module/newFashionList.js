//最近流行
function newFashionList() {
    $.ajax({
        url: 'http://127.0.0.1:3000/recipe/pop',
        success: function (data) {
            let dataArr = data.data;
            let resArr=dataArr.slice(0,12);
            console.log(resArr)
            resArr.forEach(function (ele) {
                $('.fash_h3').after(`
                <a href="./detail.html?id=${ele.id}" class="item">
                    <div class="col-sm-6 col-md-6">
                        <div class="thumbnail">
                            <img src=${ele.thumbnail} alt="通用的占位符缩略图">
                        <div class="caption text-center">
                            <p>${ele.name}</p>
                            <h6>${ele.stats}</h6>
                        </div>
                        </div>
                    </div>
                </a>
                `)
            })
        }
    })
}
export { newFashionList };