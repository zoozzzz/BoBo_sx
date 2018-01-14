/**
 * Created by Cai on 2018/1/7.
 */
let UserModel = require("../model/user.js");

function insertUser(){
    var user = new UserModel({
        userName:"波波",
        userSex:"公",
        userAge:1
    });

    user.save((err,res)=>{
        if(err){
            throw err;
            return;
        }
        console.log(res);
    })
}
insertUser();