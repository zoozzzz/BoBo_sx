/**
 * Created by Cai on 2018/1/7.
 */
//let UserModel = require("../model/user.js");
let UserSchema = require("../model/user.js");
var mongoose = require("mongoose");

let UserModel = mongoose.model('user',UserSchema);

function insertUser(username,password){
    var user = new UserModel({
        username:username,
        password:password
    });

    user.save(function (err) {
        if(err){
            console.log(err);
            return;
        }
        console.log('注册成功');
    })
}
insertUser('admin','admin');