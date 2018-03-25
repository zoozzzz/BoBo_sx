let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let jobController = require("../controller/jobController.js");
let deliverController = require("../controller/deliverController.js");
let userController = require("../controller/userController.js");
/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('index', {title: 'index'});
});

router.get('/login', function (req, res, next) {
    //res.send('respond with a resource');
    //res.json({
    //  "name":"bobo"
    //})
    res.render("login", {title: 'login'})

});

router.post('/usercenter', function (req, res, next) {
    let loginQuery = {
        username: req.body.username,
        password: req.body.password
    };
    console.log(loginQuery.username);
    console.log(loginQuery.password);
    res.render('usercenter', {title: "用户中心"})
});

//首页实习列表
router.get('/jobList', function (req, res, next) {
    jobController.findAllJob(function (result) {
        res.json({jobList: result});//终于获取到数据！！
    });
});

//提交简历
router.get('/deliver', function (req, res, next) {
    //console.log(req.query);
    var openid = req.query.openid;
    var jobId = req.query.jobid;
    var status = req.query.status;

    //检查是否有创建简历
    userController.getStudentInfo(openid, function (re) {
        console.log(openid,re);
        if(re){
            userController.pushStudentDeliverList(openid,{
                jobId: jobId,
                status:status
            }, function (msg) {
                //res.json({msg:msg});
                res.json(msg)
            });
        }else{
            //没有简历，创建
            res.json({
                res:"no resume"
                //status:
            })
        }
    });
    //res.json({openid:openid,jobid:jobid});
});

router.get('/getDeliveredList', function (req, res, next) {
    var userOpenid = req.query.openId;
    var type = req.query.type;
    if(type == 'studentInfo'){
        userController.getDeliveredList(userOpenid, function (result) {
            res.json(result);
        })
    }

});

router.get('/getPublishJobList', function (req,res,next) {
    let companyOpenId = req.query.openId;
    userController.getCompanyPublishJob(companyOpenId, function (re) {
        res.json({receivedList:re});
    });

});

router.get('/getResumeList', function (req, res, next) {
    userController.getResumeList(req.query.openId,req.query.jobId, function (re) {
        res.json({resumeList:re});
    })
});

router.post('/postJob',function (req, res, next) {
    //console.log(req.body);//发布实习的信息
    jobController.insertOne({
        companyName: req.body.companyName,
        position: req.body.position,
        salary: req.body.salary,
        workPlace: req.body.workPlace,
        detail: {
            recruit_num: req.body.recruit_num,
            education: req.body.education,
            room_board: req.body.room_board,
            conditions: req.body.conditions,
            work_experience: req.body.work_experience,
            full_time: req.body.full_time,
            description: req.body.description,
            requirement: req.body.requirement
        }
    });
    res.send('发布成功');
});


/**
 * 获取个人信息/公司信息
 * 包括个人投递的实习
 * 企业接受的简历
 */
router.get('/getInfo', function (req, res, next) {
    let type = req.query.type;
    let openId = req.query.openId;
    type = decodeURIComponent(type);
    console.log(type);
    if(type == 'studentInfo'){
        userController.getStudentInfo(openId, function (re) {
            res.json(re);
        });
    }else{
        userController.getCompanyInfo(openId,function(re){
            res.json(re);
            //re.publishList
        })
    }

});

router.post('/postInfo', function (req, res, next) {
    var info = req.body;
    info.deliveredList=[];
    userController.insertStudent(info, function (re) {
        //console.log(re.res);
        res.send('创建成功');
    });
});

module.exports = router;
