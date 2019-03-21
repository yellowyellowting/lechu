//用户信息显示
function getUserInfo() {
    let userStr = localStorage.user;
    let headPhoto=localStorage.src;
    console.log(userStr)
    var userinfo = {
        headimg: './img/1.jpg',
        collection: '1收藏',
        zp: '1作品',
        menu: '1菜谱'
    }
    if (userStr) {
        let user = JSON.parse(userStr);
        console.log(user)
        let username = user.username;
        userinfo.username=username;
        userinfo.headPhoto=headPhoto;
    }else{
        userinfo.username = null;
    }

    if (userinfo.username == null) {
        //用户未登陆
        //1.内容部分更换用户信息
        $('.info').append(`
        <div>
        <button type="button" class="btn btn-danger">
          <i class="iconfont icon-qq"></i>
          <span>QQ登陆</span>
        </button><br>
        <button type="button" class="btn btn-danger">
          <i class="iconfont icon-weibo"></i>
          <span>微博登陆</span>
        </button>
        <p>
          <a href="./login.html">手机/邮箱登录</a>
          <span>|</span>
          <a href="./register.html">注册</a>
        </p>
        <p><a href="#">网上不良信息举报专区</a></p>
      </div>
        `)
        //2.nav部分更换用户信息
        // console.log($('.userinfo'))
        $('.userinfo').append(`
        <li><a href="./register.html"><span class="glyphicon glyphicon-user"></span> 注册</a></li>
        <li><a href="./login.html"><span class="glyphicon glyphicon-log-in"></span> 登录</a></li>
        `)
    } else {
        //用户已登录
        //1.内容部分更换用户信息
        $('.info').append(`
        <div class="show haslogin">
            <div class="headimg">
                <img src=${userinfo.headPhoto} alt="" class="img-circle">
            </div>
            <h4><span>${userinfo.username}&nbsp</span>的厨房</h4>
            <h6>
                <span>${userinfo.collection} </span>|&nbsp
                <span>${userinfo.zp} </span>|&nbsp
                <span>${userinfo.menu} </span>|&nbsp
                <span>草稿箱 </span>
            </h6>
            <div class="create">
                <a href="./buildemenu.html">创建菜谱</a>
            </div>
            <p><a href="#">网上不良信息举报专区</a></p>
        </div>
        `)
        //2.nav部分更换用户信息
        $('.userinfo').append(`
        <li class="headPhoto">
        <a href="#"><img src=${userinfo.headPhoto} alt="" class="img-circle" title="退出登陆" id="exitbtn">
        </a>
      </li>
      <li><i class="iconfont icon-vertical_line"></i></li>
      <li><a href="./homepage.html" class="homepage" title="个人主页"><i class="iconfont icon-favorite"></i></a></li>
        `)
        exit();
    }
}

//增加退出按钮
function exit(){
    $('#exitbtn').on('click',function(){
        localStorage.removeItem('user');
        location.href='./login.html';
    })
}
export { getUserInfo };