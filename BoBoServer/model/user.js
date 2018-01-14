/**
 * Created by Cai on 2018/1/7.
 */
let DB = require("./db.js");
let mongoose = require("mongoose");
var UserSchema = mongoose.Schema({
    userName:{type:String},
    userSex:{type:String},
    userAge:{type:Number}
});

var UserModel = mongoose.model("User",UserSchema);

module.exports = UserModel;