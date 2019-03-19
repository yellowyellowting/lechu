var mysql=require("mysql");

var connection={
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'lechu'
};

function getDBcon(DBcon=connection){
    var connection=mysql.createConnection(DBcon);
    connection.connect();
    return connection;
}
module.exports=getDBcon;