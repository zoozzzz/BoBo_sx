/**
 * Created by Cai on 2018/1/25.
 */
let db = require("./db.js");
let mongoose = require("mongoose");


var deliveredSchema = mongoose.Schema({
    userOpenId : String,
    deliveredJobList : String
});

module.export =  deliveredSchema;