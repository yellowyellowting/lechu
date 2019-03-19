//内容盒子左边的菜单列表
function creatMenuList() {
    var arr = [
        {
            icon: 'icon-jiachangcai',
            name: '家常菜'
        },
        {
            icon: 'icon-kuaishoucai',
            name: '快手菜'
        },
        {
            icon: 'icon-xiafancai',
            name: '下饭菜'
        },
        {
            icon: 'icon-zaocan',
            name: '早餐'
        },
        {
            icon: 'icon-rou',
            name: '肉'
        },
        {
            icon: 'icon-shucai',
            name: '蔬菜'
        },
        {
            icon: 'icon-jidan',
            name: '鸡蛋'
        },
        {
            icon: 'icon-tanggeng',
            name: '汤羹'
        },
        {
            icon: 'icon-hongpei',
            name: '烘培'
        },
        {
            icon: 'icon-zhushi',
            name: '主食'
        },
        {
            icon: 'icon-mian',
            name: '面'
        },
        {
            icon: 'icon-sushi',
            name: '素食'
        },
        {
            icon: 'icon-yunfu',
            name: '孕妇'
        },
        {
            icon: 'icon-chanfu',
            name: '产妇'
        },
        {
            icon: 'icon-yinger',
            name: '婴儿'
        },
        {
            icon: 'icon-ertong',
            name: '儿童'
        }
    ];

    $(arr).each(function () {
        $('.list .list_item').append(`
            <li>
                <a href="#">
                    <i class="iconfont ${this.icon}"></i>
                    <span>${this.name}</span>
                </a>
            </li>
        `)
    })

}
export { creatMenuList }