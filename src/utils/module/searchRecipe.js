//导航栏搜索
function searchRecipe() {
    var resArr=[];
    var str='';
    localStorage.removeItem("resArr");
    $('.searchBtn').on('click', function () {
        var searchVal = $('.searchV').val();
        console.log(searchVal)
        $.ajax({
            url: 'http://127.0.0.1:3000/recipe/pop',
            type: 'post',
            data: searchVal,
            success: function (data) {
                var dataArr = data.data;
                console.log(dataArr)
                resArr = dataArr.filter(function (ele) {
                    return ele.name.includes(searchVal);
                })
                str=JSON.stringify(resArr)
                localStorage.setItem("resArr",str);
                location.href='./class.html';
            }
        })
    })
}
export {searchRecipe};