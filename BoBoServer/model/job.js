/**
 * Created by Cai on 2018/1/7.
 */

let DB = require("./db.js");
let mongoose = require("mongoose");

var JobSchema = mongoose.Schema({
    id: Number,
    companyName: String,
    position: String,
    updateTime: Date,
    salary: Number,
    workPlace: String
});



module.exports = JobSchema;

