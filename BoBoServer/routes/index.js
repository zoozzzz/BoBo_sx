let express = require('express');
let router = express.Router();
let jobController = require("../controller/jobController.js");
/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('index', { title: 'index' });
});

router.get('/login', function(req, res, next) {
    //res.send('respond with a resource');
    //res.json({
    //  "name":"bobo"
    //})
    res.render("login",{title:'login'})

});

router.post('/usercenter', function (req,res,next) {
    let loginQuery = {
        username:req.body.username,
        password:req.body.password
    };
    console.log(loginQuery.username);
    console.log(loginQuery.password);
    res.render('usercenter', {title:"用户中心"})
});

//首页实习列表
router.get('/jobList', function (req, res, next) {
    jobController.findAllJob(function (result) {
        //console.log(result);
        res.json({jobList:result});//终于获取到数据！！
    });
    //res.send("hahahhah")

});

//提交简历
router.get('/deliver', function (req, res, next) {
    console.log(req.query);
    var openid = req.query.openid;
    var jobid = req.query.jobid;
    res.json({openid:openid,jobid:jobid});
});

router.get('', function (req, res, next) {

});

module.exports = router;
