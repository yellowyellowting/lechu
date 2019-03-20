// 作品展示列表
function zpList(){
    $.ajax({
        url:'http://127.0.0.1:3000/recipe/pop',
        success:function(data){
            let dataArr=data.data;
            let resArr=dataArr.splice(0,6);
            $(resArr).each(function(){
                $('.zp_item').append(`
                <a href="#" class="list-group-item item">
                <div class="des">
                  <h4 class="list-group-item-heading">
                    ${this.title}
                  </h4><br>
                  <p class="list-group-item-text">
                    ${this.des}
                  </p>
                </div>
                <div>
                  <img src=${this.img.img1} alt="">
                  <img src=${this.img.img2} alt="">
                  <img src=${this.img.img3} alt="">
                </div>
              </a>
                `)
            })
        }
    })
}
export {zpList}