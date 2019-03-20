// 新秀菜谱
function newRecipe() {
    $.ajax({
        url: 'http://127.0.0.1:3000/recipe/pop',
        success: function (data) {
            var dataArr = data.data;
            var resArr = dataArr.splice(1, 3)
            $(resArr).each(function () {
                $('.box .boxlist').append(`
                <div class="col-sm-4 col-md-4">
                    <div class="thumbnail img">
                        <img src=${this.thumbnail} alt="通用的占位符缩略图">
                        <div class="caption text-center">
                            <p id="name">${this.name}</p>
                        </div>
                    </div>
                </div>
                `)
            })
        }
    })
}
export {newRecipe};