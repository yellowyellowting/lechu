 // 下厨房的厨友们 渲染数据
 function friendsList(){
    $.ajax({
        url:'http://127.0.0.1:3000/recipe/pop',
        success:function(data){
            let dataArr=data.data;
            let resArr=dataArr.slice(0,7);
            $(resArr).each(function(){
                $('.friends .itemlist').append(`
                <div class="row item">
                          <div class="col-xs-3 col-sm-3">
                            <img class="img-circle" src=${this.zp.photo} alt="">
                          </div>
                          <div class="col-xs-6 col-sm-6">
                            <h4>${this.zp.username}</h4>
                            <p><span>${this.zp.watchNum}</span>关注</p>
                            <p><span>${this.zp.menu}</span>个菜谱&nbsp<span>${this.zp.zpNum}</span>个作品</p>
                          </div>
                          <div class="col-xs-3 col-sm-3 pull-right" style="padding-right: 0">
                            <div id="watch">
                              <span>关注</span>
                            </div>
                          </div>
                      </div>
                `)
            })
        }
    })
}
export {friendsList};