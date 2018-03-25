/**
 * Created by Cai on 2018/1/27.
 */
const mongoose = require("mongoose");
const db = require('../model/db.js');
const deliveredSchema  = require('../model/deliver.js');
const jobController  = require('./jobController.js');

var deliveredModel = mongoose.model('deliveredList',deliveredSchema,'deliveredList');

//保存投递的实习
function saveDeliveredJob(obj,cb){
    //先检查有没有已经存在
    deliveredModel.findOne({userOpenId:obj.openid},(err,res)=>{
        if(err){
            console.log(err);
            return;
        }
        //console.log(res._doc.deliveredJobList);
        if(res){
            console.log('存在用户');
            for (var i = 0; i < res._doc.deliveredJobList.length; i++) {
                if(res._doc.deliveredJobList[i] == obj.jobid){
                    console.log('已投递过');
                    cb('请勿重复');
                    return;
                }
            }


            console.log('该实习没有被该用户投递过');
            res._doc.deliveredJobList.push(obj.jobid);
            res.markModified('deliveredJobList');//必须标记已修改!!
            res.save(function (err) {
               if(err){
                   console.log(err);
               }
                console.log('修改成功');
                cb('投递成功');
            });
        }
        else{
            console.log('用户未曾投递');
            var jobidList = [];
            jobidList.push(obj.jobid);
            var newDeliveredJob = new deliveredModel({
                userOpenId:obj.openid,
                deliveredJobList:jobidList
            },false);
            newDeliveredJob.save(err=>{
                if(err){
                    console.log(err);
                    return;
                }
                console.log('已保存首次投递的实习');
                cb('投递成功');
            })
        }
    });
}


//删除投递的实习
function removeDeliveredJob(obj){

}

//根据用户的openid获取用户投递的所有简历
function getDeliveredList(openid,cb){
    var deliveredArr = [];
    deliveredModel.findOne({userOpenId:openid}, function (err, res) {
        if(err){
            console.log(err);
            return;
        }
        var deliveredIdList = res._doc.deliveredJobList;
        deliveredIdList.forEach(function (item,index) {
            jobController.findOne(item, function (res) {
                deliveredArr.push(res);
                //console.log(res);
                if(index == deliveredIdList.length - 1){
                    cb(deliveredArr);
                    //console.log(deliveredArr);
                }
            });
        });
    })
}


module.exports={
    saveDeliveredJob:saveDeliveredJob,
    removeDeliveredJob:removeDeliveredJob,
    getDeliveredList:getDeliveredList
};