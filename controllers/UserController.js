var  userModel = require('../models/user');
module.exports = {
    get_index : function(req, res) {
        //寻找模型方法
        var msg = userModel.test();
        res.send(msg);
    },
    get_myuser : function(req, res) {
        var arr;
        userModel.showUser(req,res,function(err,result) {
            arr = result;
            res.render('userShow',{user :arr});
        });
    }
}