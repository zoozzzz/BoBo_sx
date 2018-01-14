let express = require('express');
let router = express.Router();
let jobController = require("../controller/jobController.js");
/* GET home page. */
router.get('/', function (req, res, next) {
    jobController.findAllJob((err,res)=>{
        //console.log(res);
        //return res;
        //res.send(res);
    });
    res.render('index', { title: 'Express' });
});

module.exports = router;
