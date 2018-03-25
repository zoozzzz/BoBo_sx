/**
 * Created by Cai on 2018/1/7.
 */
let DB = require("./db.js");
let mongoose = require("mongoose");

/*var StudentDeliveredListSchema = mongoose.Schema({
    "jobId":String,//投递的实习的id
    "status":String//投递的实习的状态 "0"未查看  "1"被查看  "2"被接受  "3"被拒绝
});*/

var StudentSchema = mongoose.Schema({
    "openId": String,//微信用户的唯一标识
    "resume": {//简历
        "name":String,//姓名,
        "age":Number,//年龄
        "sex":String,//性别
        "born":String,//出生日期
        "telephone":Number,//电话号码
        "mail":String,//邮箱
        "home":String,//居住地
        "education":String,//最高学历
        "college":String,//毕业院校
        "major":String,//主修专业
        "introduction":String,//个人介绍
        "skill":String,//个人技能
        "project_experience":String,//项目经历
        "schlool_experience":String,//在校经历
        "certificate":String,//获得证书
        "hobbies":String//兴趣爱好
    },
    "deliveredList": [{
        "jobId":String,//投递的实习的id
        "status":String//投递的实习的状态 "0"未查看  "1"被查看  "2"被接受  "3"被拒绝
    }]
});


var CompanyPublishListSchema = mongoose.Schema({
    "jobId":String,//实习的id
    "receivedList": Array//收到的简历的用户id
});
var CompanySchema = mongoose.Schema({
    "openId": String,//企业用户的id
    "companyName":String,//公司名称
    "companyType":String,//公司类型
    "buildTime":String,//成立时间
    "companyNum":Number,//员工人数
    "telephone":Number,//联系电话
    "address":String,//地址
    "introduction":String,//公司简介
    "publishList": [{
        "jobId":String,//实习的id
        "receivedList": Array//收到的简历的用户id
    }]
});
//var UserModel = mongoose.model("User",UserSchema);

//module.exports = UserModel;
module.exports = {
    StudentSchema,
    CompanySchema,
    CompanyPublishListSchema,
    //StudentDeliveredListSchema
};