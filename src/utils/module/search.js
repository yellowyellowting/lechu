function fashionSearch(arr,dom,num){
    // $('.search .left')
    $(arr).each(function(index){
        dom.append(`
        <li class="row col-xs-12">
        <span>${index+num}</span>
        <span>${this.name}</span>
        <i class="iconfont ${this.rank}"></i>
        </li>
        `);
    })
}
export {fashionSearch}