// import $ from 'jquery';
function fashionSearch(){
    var arr=[
        {
            name:'可乐鸡翅',
            rank:'icon-up'
        },
        {
            name:'可乐鸡翅',
            rank:'icon-down'
        },
        {
            name:'可乐鸡翅',
            rank:'icon-up'
        },
        {
            name:'可乐鸡翅',
            rank:'icon-down'
        },
        {
            name:'可乐鸡翅',
            rank:'icon-up'
        },
        {
            name:'可乐鸡翅',
            rank:'icon-down'
        }
    ];
    // console.log($('search>left'));
    $('search>left')
    $(arr).each(function(){
        $('search>left').append(`
        <li class="row col-xs-12 left">
        <span>1</span>
        <span>可乐鸡翅</span>
        <i class="iconfont icon-up"></i>
        </li>
        `);
    })
    alert(66)
    console.log($('search>left'))
}
export {fashionSearch}