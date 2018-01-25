/**
 * Created by Cai on 2018/1/7.
 */

let db = require("./db.js");
let mongoose = require("mongoose");

var JobDetailSchema = mongoose.Schema({
    position:String,
    salary:String,
    company_name:String,
    update_time:String,
    recruit_num:Number,
    education:String,
    room_board:String,
    conditions:String,
    work_place:String,
    work_experience:String,
    full_time:String,
    description:String,
    requirement:String
});

var JobSchema = mongoose.Schema({
    companyName: String,
    position: String,
    updateTime: String,
    salary: Number,
    workPlace: String,
    detail:JobDetailSchema
});



module.exports = {
    JobSchema,
    JobDetailSchema
};

