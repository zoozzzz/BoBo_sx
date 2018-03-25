/**
 * Created by Cai on 2018/1/7.
 */
const db = require("../model/db.js");
const StudentSchema = require("../model/user.js").StudentSchema;
const CompanySchema = require("../model/user.js").CompanySchema;
const jobController = require("./jobController.js");
const mongoose = require("mongoose");

/**
 *
 * @param jobId
 * @param status
 */
StudentSchema.methods.updateStatus = function (jobId, status) {
    this.deliveredList.forEach(function (item, index) {
        if (item.jobId == jobId) {
            item.status = status;
        }
    });
    this.save();
};

/**
 * @param jobId
 * @param studentOpenId
 */
CompanySchema.methods.addReceivedList = function (jobId, studentOpenId) {
    this.publishList.forEach(function (item, index) {
        if (item.jobId == jobId) {
            item.receivedList.push(studentOpenId);
        }
    });
    this.save();
};

/**
 *
 * @param jobId
 * @param studentOpenId
 */
CompanySchema.methods.removeReceivedList = function (jobId, studentOpenId) {
    this.publishList.forEach(function (item, index) {
        if (item.jobId == jobId) {
            item.receivedList.splice(item.receivedList.indexOf(studentOpenId), 1);
        }
    });
    this.save();
};

const StudentModel = mongoose.model('student', StudentSchema);
const CompanyModel = mongoose.model('company', CompanySchema);

/**
 * 插入个人用户信息
 * @param info
 * @param cb
 */
function insertStudent(info, cb) {
    var student = new StudentModel({
        "openId": info.openId,//微信用户的唯一标识
        "resume": {//简历
            "name": info.resume.name,//姓名,
            "age": info.resume.age,//年龄
            "sex": info.resume.sex,//性别
            "born": info.resume.born,//出生日期
            "telephone": info.resume.telephone,//电话号码
            "mail": info.resume.mail,//邮箱
            "home": info.resume.home,//居住地
            "education": info.resume.education,//最高学历
            "college": info.resume.college,//毕业院校
            "major": info.resume.major,//主修专业
            "introduction": info.resume.introduction,//个人介绍
            "skill": info.resume.skill,//个人技能
            "project_experience": info.resume.project_experience,//项目经历
            "school_experience": info.resume.school_experience,//在校经历
            "certificate": info.resume.certificate,//获得证书
            "hobbies": info.resume.hobbies//兴趣爱好
        },
        "deliveredList": info.deliveredList
    });

    student.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('学生信息插入成功');
        cb({res: 'insert success'});
    })
}
/*
 insertStudent({
 "openId": 'asdfasdfdsf',//微信用户的唯一标识
 "resume": {//简历
 "name":'aaa',//姓名,
 "age":22,//年龄
 "sex":'男',//性别
 "born":'2222-34-3',//出生日期
 "telephone":13232323232,//电话号码
 "mail":'sdas@11.com',//邮箱
 "home":'广金',//居住地
 "education":'本科',//最高学历
 "college":'gduf',//毕业院校
 "major":'计算机',//主修专业
 "introduction":'个人介绍哔哩吧啦',//个人介绍
 "skill":'个人技能哔哩吧啦',//个人技能
 "project_experience":'项目经历哔哩吧啦',//项目经历
 "school_experience":'在校经历哔哩吧啦',//在校经历
 "certificate":'驾驶证',//获得证书
 "hobbies":'睡觉'//兴趣爱好
 },
 "deliveredList": [{jobId:'asdfasdf',status:'sadfasdfas'}]
 });*/

/**
 * 插入企业信息
 * @param info
 * @param cb
 */
function insertCompany(info, cb) {
    var company = new CompanyModel({
        "openId": info.openId,//企业用户的id
        "companyName": info.companyName,//公司名称
        "companyType": info.companyType,//公司类型
        "buildTime": info.buildTime,//成立时间
        "companyNum": info.companyNum,//员工人数
        "telephone": info.telephone,//联系电话
        "address": info.address,//地址
        "introduction": info.introduction,//公司简介
        "publishList": info.publishList//公司发布的实习
    });

    company.save(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('公司信息插入成功');
        if(cb){
            cb();
        }
    })
}
/*insertCompany({
    "openId": 'ov38Q0atYa_LV-8wLl7Z5VsFPmIU',//企业用户的id
    "companyName": '布吉岛有限公司',//公司名称
    "companyType": '互联网企业',//公司类型
    "buildTime": '2020-09-01',//成立时间
    "companyNum": '1',//员工人数
    "telephone": '11111234567',//联系电话
    "address": '广东广州。。。',//地址
    "introduction": '此处省略很多简介',//公司简介
    "publishList": [
        {
            "jobId": '5a689b7d129a502dc43a2ffd',//实习的id
            "receivedList": [
                'ov38Q0eZGshcwWmGUlxN_0gTVpZo',
                'testStudentOpenId'
            ]//收到的简历的用户id
        }
    ]//公司发布的实习
});*/


/**
 * 获取个人用户信息
 * @param studentOpenID
 * @param cb
 */
function getStudentInfo(studentOpenID, cb) {
    StudentModel.findOne({openId: studentOpenID}, function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        //console.log(res);
        cb(res);
    })
}
/*getStudentInfo('ov38Q0eZGshcwWmGUlxN_0gTVpZo', function (res) {
 console.log(res);
 });*/

/**
 * 获取学生用户投递的实习
 * @param studentOpenID
 * @param cb
 */
function getDeliveredList(studentOpenID, cb) {
    let job = {};
    job.deliveredList = [];
    job.checkedList = [];
    job.invitedList = [];
    job.rejectedList = [];
    getStudentInfo(studentOpenID, function (res) {
        for (let i = 0; i < res.deliveredList.length; i++) {
            let obj = res.deliveredList[i];

            //if(obj.status == status){
            jobController.findOne(obj.jobId, function (re) {
                if (obj.status == 0) {
                    job.deliveredList.push(re);
                } else if (obj.status == 1) {
                    job.checkedList.push(re);
                } else if (obj.status == 2) {
                    job.invitedList.push(re);
                } else if (obj.status == 3) {
                    job.rejectedList.push(re);
                }

                if (job.deliveredList.length + job.checkedList.length + job.invitedList.length + job.rejectedList.length == res.deliveredList.length) {
                    cb(job);
                }
            })
            //}

        }
    });
}

/*getDeliveredList('ov38Q0eZGshcwWmGUlxN_0gTVpZo', function (res) {
 console.log(res);
 });*/

/**
 * 获取企业户信息
 * @param companyOpenID
 * @param cb
 */
//ov38Q0atYa_LV-8wLl7Z5VsFPmIU
function getCompanyInfo(companyOpenID, cb) {
    CompanyModel.findOne({openId: companyOpenID}, function (err, res) {
        if (err) {
            console.log(err);
            return;
        }
        cb(res);
    })
}
//getCompanyInfo('companyID');

/**
 * 修改个人用户简历
 * @param openId
 * @param name
 * @param value
 */
function updateStudentResume(openId, name, value) {
    StudentModel.findOne({openId: openId}, function (err, doc) {
        if (err) {
            throw err;
            return;
        }
        switch (name) {
            case "name":
                doc.set({resume: {name: value}});
                doc.save();
                break;
            case "age":
                doc.set({resume: {age: value}});
                doc.save();
                break;
            case "sex":
                doc.set({resume: {sex: value}});
                doc.save();
                break;
            case "born":
                doc.set({resume: {born: value}});
                doc.save();
                break;
            case "telephone":
                doc.set({resume: {telephone: value}});
                doc.save();
                break;
            case "mail":
                doc.set({resume: {mail: value}});
                doc.save();
                break;
            case "education":
                doc.set({resume: {education: value}});
                doc.save();
                break;
            case "college":
                doc.set({resume: {college: value}});
                doc.save();
                break;
            case "major":
                doc.set({resume: {major: value}});
                doc.save();
                break;
            case "introduction":
                doc.set({resume: {introduction: value}});
                doc.save();
                break;
            case "skill":
                doc.set({resume: {home: value}});
                doc.save();
                break;
            case "project_experience":
                doc.set({resume: {project_experience: value}});
                doc.save();
                break;
            case "certificate":
                doc.set({resume: {certificate: value}});
                doc.save();
                break;
            case "hobbies":
                doc.set({resume: {hobbies: value}});
                doc.save();
                break;
        }
    });

}
//updateStudentResume('asdfasdfdsf', [{name:'hah'},{age:33}]);

/**
 * 修改企业信息
 * @param openId
 * @param name
 * @param value
 */
function updateCompanyInfo(openId, name, value) {
    /**
     * "companyType" : "互联网",
     "buildTime" : "2018-09-01",
     "companyNum" : 44,
     "telephone" : 12345678910.0,
     "address" : "广东清远xxxx",
     "introduction" : "简介",
     */
    switch (name) {
        case 'companyName':
            CompanyModel.findOneAndUpdate({openId: openId}, {companyName: value}, function (err) {
                if (err) {
                    throw err;
                }
                console.log('updated');
            });
            break;
        case 'buildTime':
            CompanyModel.findOneAndUpdate({openId: openId}, {buildTime: value}, function (err) {
                if (err) {
                    throw err;
                }
                console.log('updated');
            });
            break;
        case 'companyNum':
            CompanyModel.findOneAndUpdate({openId: openId}, {companyNum: value}, function (err) {
                if (err) {
                    throw err;
                }
                console.log('updated');
            });
            break;
        case 'telephone':
            CompanyModel.findOneAndUpdate({openId: openId}, {telephone: value}, function (err) {
                if (err) {
                    throw err;
                }
                console.log('updated');
            });
            break;
        case 'address':
            CompanyModel.findOneAndUpdate({openId: openId}, {address: value}, function (err) {
                if (err) {
                    throw err;
                }
                console.log('updated');
            });
            break;
        case 'introduction':
            CompanyModel.findOneAndUpdate({openId: openId}, {introduction: value}, function (err) {
                if (err) {
                    throw err;
                }
                console.log('updated');
            });
            break;
    }
}
//updateCompanyInfo('ov38Q0atYa_LV-8wLl7Z5VsFPmIU','companyName','company1');

/**
 * 增加学生投递的实习和状态
 * @param openId
 * @param obj
 */
function pushStudentDeliverList(openId, obj, cb) {
    obj.status = obj.status || 0;
    StudentModel.update({openId: openId}, {
        $push: {
            deliveredList: {
                jobId: obj.jobId,
                status: obj.status
            }
        }
    }, function (err, res) {
        if (err) return console.error(err);
        cb(res);
    });
}
//pushStudentDeliverList('asdfasdfdsf',{jobId:'123',status:0});

/**
 * 删除投递的实习
 * @param openId
 * @param jobId
 */
function pullStudentDeliverList(openId, jobId) {
    StudentModel.update({openId: openId}, {$pull: {deliveredList: {jobId: jobId}}}, function (err, res) {
        if (err) return console.error(err);
        console.log(res);
    });
}
//pullStudentDeliverList('asdfasdfdsf','123');


/**
 * 更新投递实习的状态
 * @param openId
 * @param status  "0"未查看  "1"被查看  "2"被接受  "3"被拒绝
 */
function updateDeliveredJobStatus(openId, jobId, status) {
    StudentModel.findOne({openId: openId}, function (err, res) {
        if (err) {
            throw err;
            return;
        }
        //console.log(res);
        res.updateStatus(jobId, status);
    });
}
//updateDeliveredJobStatus('ov38Q0eZGshcwWmGUlxN_0gTVpZo','5a6dd7096ddf415e3c2ab5be',1);

/**
 * 增加公司收到的简历
 * @param companyOpenId
 * @param jobId
 * @param studentOpenId
 */
function pushCompanyReceivedList(companyOpenId, jobId, studentOpenId) {
    CompanyModel.findOne({openId: companyOpenId}, function (err, res) {
        res.addReceivedList(jobId, studentOpenId);
    });
}
//pushCompanyReceivedList('companyID','5a689b7d129a502dc43a2ffd','asdfasdfdsf');

function pullCompanyReceivedList(companyOpenId, jobId, studentOpenId) {
    CompanyModel.findOne({openId: companyOpenId}, function (err, res) {
        res.addReceivedList(jobId, studentOpenId);
    });
}

/**
 * 获取企业发布的实习信息
 * @param companyOpenId
 */
function getCompanyPublishJob(companyOpenId,cb){
    let publishList = [];
    getCompanyInfo(companyOpenId, function (res) {
        for (let i = 0; i < res.publishList.length; i++) {
            let jobId = res.publishList[i].jobId;
            jobController.findOne(jobId, function (re) {
                publishList.push(re);
                if(i == res.publishList.length - 1){
                    cb(publishList);
                }
            })
        }
    })

}
/*getCompanyPublishJob('ov38Q0atYa_LV-8wLl7Z5VsFPmIU');*/

function getResumeList(companyOpenId,jobId,cb){
    let resumeList = [];
    getCompanyInfo(companyOpenId,function(res){
        for (let i = 0; i < res.publishList.length; i++) {
            let obj = res.publishList[i];
            if(obj.jobId == jobId){
                for (let j = 0; j < obj.receivedList.length; j++) {
                  getStudentInfo(obj.receivedList, function (re) {
                      resumeList.push(re);
                      if(j == obj.receivedList.length - 1){
                          cb(resumeList);
                      }
                  })
                }
                break;
            }
        }
    })
}
/*getResumeList('ov38Q0atYa_LV-8wLl7Z5VsFPmIU','5a689b7d129a502dc43a2ffd');*/

module.exports = {
    getCompanyInfo,
    getStudentInfo,
    insertCompany,
    insertStudent,
    updateStudentResume,
    updateCompanyInfo,
    pushStudentDeliverList,
    pullStudentDeliverList,
    updateDeliveredJobStatus,
    pushCompanyReceivedList,
    getDeliveredList,
    pullCompanyReceivedList,
    getCompanyPublishJob,
    getResumeList
};