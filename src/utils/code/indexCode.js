var express = require("express");
var bodyParser = require("body-parser");
var getDBCon = require("./conDB.js");

var app = express();//得到服务器相关对象
app.listen(8081, function () {
    console.log("服务器开启成功，地址与端口为：http://127.0.0.1:8082");
}); //监听端口，开启服务器

//使用bodyParser模块，接收post参数
app.use(bodyParser.urlencoded({ entend: false }));
app.use(bodyParser.json());

//设置跨域访问（设置在所有的请求前面即可）
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == 'OPTIONS')
        res.send(200); //让options尝试请求快速结束
    else
        next();
});

app.get("/", function (req, res) {
    res.send("你好，已经收到你的请求！");
});

app.get('/getRecipeList',function(req,res){
    var sql='SELECT * FROM recipe_list';
    var conObj=getDBCon();
    conObj.query(sql,function(error,result){
        var resObj={}
        if(error){
            //查询失败
            resObj.msg='查询失败';
            resObj.err=error;
        }else{
            //查询成功
            resObj.msg='查询成功';
            resObj.res=result;
        }
        res.send(resObj)
    })
})