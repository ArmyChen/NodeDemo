/**
 * Created by jun on 2016/4/23.
 * 用户模型
 */
var mysql = require('mysql');
var dbconfig = require("../config/database");

//使用连接池
var pool = mysql.createPool(dbconfig.mysql);

module.exports = {
    showUser : function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            var p = req.query.p||1;
            var limit = req.query.limit||10;

            var data = {currentPage:p,totalPages:0};

            connection.query("SELECT count(0) count FROM `member` ",function(err,cresult){
                //定义查询语句
                if(cresult){
                    data.totalPages = Math.ceil(cresult[0].count/limit);
                    //console.log("获取总数："+data.totalPages);
                }

                connection.query("SELECT * FROM `member`  LIMIT "+(p-1)*limit+","+limit,function(err,result){
                    data.items = result;
                    callback(err,data);
                    // 释放连接
                    connection.release();
                });
            });
        });
    },
    test:function() {
        return "hello world from test";
    }
}