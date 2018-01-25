/**
 * Created by Cai on 2018/1/7.
 */
let JobSchema = require("../model/job.js").JobSchema;
let mongoose = require("mongoose");
let db = require('../model/db.js');


var JobModel = mongoose.model('jobList', JobSchema, 'jobList');

//查询所有实习
function findAllJob(cb) {
    JobModel.find({}, function (err, res) {
        if (err) {
            console.log(err);
        }
        //console.log(res);
        cb(res);
        //db.close();
    });
}
//findAllJob();

//通过id查询某个实习
function findById(id) {
    JobModel.find({_id: id}, function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        //console.log(res);
        return res[0];
    });
}
//findById('5a621166ac72efe014aa05af');

//通过公司名字查询
function findByName(companyName) {
    JobModel.find({companyName: companyName}, function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(res[0]);
        return res[0];
    });
}
//console.log(findByName('我我我哦'));

//插入一条实习
function insertOne(obj) {

    //先判断是否存在实习
    JobModel.find({companyName: obj.companyName}, function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        if (res[0]) {
            console.log('存在');
            db.close();
        } else {
            console.log('数据不存在');
            //处理日期
            var date = new Date();
            obj.updateTime = date.getFullYear() + '-' + (date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1) + '-' + date.getDate();


            //创建实习对象
            var newJob = new JobModel({
                companyName: obj.companyName,
                position: obj.position,
                updateTime: obj.updateTime,
                salary: obj.salary,
                workPlace: obj.workPlace,
                detail: {
                    position: obj.position,
                    salary: obj.salary,
                    company_name: obj.companyName,
                    update_time: obj.updateTime,
                    recruit_num: obj.detail.recruit_num,
                    education: obj.detail.education,
                    room_board: obj.detail.room_board,
                    conditions: obj.detail.conditions,
                    work_place: obj.workPlace,
                    work_experience: obj.detail.work_experience,
                    full_time: obj.detail.full_time,
                    description: obj.detail.description,
                    requirement: obj.detail.requirement
                }
            });

            newJob.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("已保存!");
                db.close();
            });
        }
    });
}
/*insertOne({
    companyName: '咿咿有效公司',
    position: '铲屎官',
    salary: 666666,
    workPlace: '波波家',
    detail: {
        recruit_num: 999,
        education: '本科',
        room_board: '包食宿',
        conditions: '26-24',
        work_experience: '5 年',
        full_time: '兼职',
        description: '主要负责铲屎和铲尿',
        requirement: '研究生以上'
    }
});*/

//修改实习
function updateOneById(id, options) {
    JobModel.update({_id: id}, {$set: options}, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('修改成功');
        db.close();
    })
}
//updateOnebyId('5a643bf72a2a574c64e652e0',{companyName:'好累啊'});

//删除一条实习
function removeOneById(id) {
    JobModel.remove({_id: id}, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('删除成功');
        db.close();
    })
}
//removeOneById('5a643b36b13aa63ec0fc512e');


module.exports = {
    findAllJob: findAllJob,
    findOne: findById,
    insertOne: insertOne,
    findByName: findByName,
    removeOneById: removeOneById,
    updateOneById: updateOneById
}