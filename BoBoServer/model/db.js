/**
 * Created by Cai on 2018/1/7.
 */


/**
*连接数据库
* */
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/bobo");

let DB = mongoose.connection;
DB.once('open',(err)=>{
    if(err){
        throw err;
        return;
    }
    console.log("mongodb opened");
});


module.exports = DB;
