//最近流行
function newFashionList() {
    $.ajax({
        url: 'http://127.0.0.1:3000/recipe/pop',
        success: function (data) {
            console.log(data.data)
            let dataArr = data.data;
            dataArr.forEach(function (ele) {
                $('.fash_h3').after(`
                <a href="./detail.html?id=${ele.id}">
                    <div class="col-sm-6 col-md-6">
                        <div class="thumbnail">
                            <img src=${ele.thumbnail} alt="通用的占位符缩略图">
                        <div class="caption text-center">
                            <p>${ele.cookName}</p>
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