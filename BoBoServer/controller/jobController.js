/**
 * Created by Cai on 2018/1/7.
 */
let JobSchema = require("../model/job.js");
let mongoose = require("mongoose");



var JobModel = mongoose.model('Job',JobSchema);

//查询所有实习
function findAllJob(callback){
    JobModel.find({},callback);
}

//查询某类实习
function findOne(){

}

//插入一条实习
function insertOne(){

}
/*
var job = new JobModel({
    id: 23432,
    companyName: "哥斯拉有限公司",
    position: "大佬",
    updateTime: new Date(),
    salary: 20,
    workPlace: "越南"
});

job.save((err,res)=>{
    if(err){
        throw err;
        return;
    }
    console.log(res);
});*/
module.exports = {
    findAllJob:findAllJob,
    findOne:findOne,
    insertOne:insertOne
}