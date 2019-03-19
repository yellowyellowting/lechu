// 时令食材
function timeList(){
    $.ajax({
        url:'http://127.0.0.1:3000/recipe/pop',
        success:function(data){
            let dataArr=data.data;
            let resArr=dataArr.splice(3,8);
            $(resArr).each(function(){
                $('.time_list').append(`
                <div class="col-sm-3 col-md-3">
                    <div class="thumbnail">
                        <img src=${this.thumbnail} alt="通用的占位符缩略图">
                    <div class="caption text-center">
                        <h6>${this.name}</h6>
                    </div>
                    </div>
                </div>
                `)
            })
        }
    })
}
export {timeList}