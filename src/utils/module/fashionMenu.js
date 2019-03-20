 // 流行菜单 
 function fashionMenu(){
    $.ajax({
        url: 'http://127.0.0.1:3000/recipe/pop',
        success:function(data){
            let dataArr=data.data;
            let resArr=dataArr.splice(5,4);
            // console.log(resArr)
            $(resArr).each(function(){
                $('.menu .item').append(`
                    <div class="thumbnail">
                        <img src=${this.thumbnail} alt="通用的占位符缩略图">
                        <div class="caption text-center">
                            <p>${this.name}</p>
                        </div>
                    </div>
                `)
            })
        }
    })
}
export {fashionMenu};