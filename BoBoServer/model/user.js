/**
 * Created by Cai on 2018/1/7.
 */
let DB = require("./db.js");
let mongoose = require("mongoose");
var UserSchema = mongoose.Schema({
    username:String,
    password:String
});

//var UserModel = mongoose.model("User",UserSchema);

//module.exports = UserModel;
module.exports = UserSchema;