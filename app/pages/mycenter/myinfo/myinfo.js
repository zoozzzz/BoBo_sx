// pages/mycenter/myinfo.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [
            {text: '姓名', name: 'name'},
            {text: '性别', name: 'sex'},
            {text: '年龄', name: 'age'},
            {text: '出生日期', name: 'born'},
            {text: '电话号码', name: 'telephone'},
            {text: '邮箱', name: 'mail'},
            {text: '居住地', name: 'home'},
            {text: '最高学历', name: 'education'},
            {text: '毕业院校', name: 'college'},
            {text: '主修专业', name: 'major'},
            {text: '个人介绍', name: 'introduction'},
            {text: '个人技能', name: 'skill'},
            {text: '项目经历', name: 'project_experience'},
            {text: '在校经历', name: 'school_experience'},
            {text: '获得证书', name: 'certificate'},
            {text: '兴趣爱好', name: 'hobbies'}
        ],
        //info:{
        //    openId:'',
            resume: {//简历
                "name": '',//姓名,
                "age": 0,//年龄
                "sex": '',//性别
                "born": '',//出生日期
                "telephone": '',//电话号码
                "mail": '',//邮箱
                "home": '',//居住地
                "education": '',//最高学历
                "college": '',//毕业院校
                "major": '',//主修专业
                "introduction": '',//个人介绍
                "skill": '',//个人技能
                "project_experience": '',//项目经历
                "school_experience": '',//在校经历
                "certificate": '',//获得证书
                "hobbies": ''//兴趣爱好
            }
        //}

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.type);
        let type = options.type || 'studentInfo';
        let openId = app.globalData.openId;
        type  = encodeURIComponent(type);
        openId = encodeURIComponent(openId);
        wx.request({
            url: "http://localhost:8888/getInfo?type=" + type + "&openId=" + openId,
            success: res=> {
                console.log(res);
                this.setData({
                    isResume: true,
                    resume:res.data.resume
                })
            },
            fail: ()=> {
                console.log('fail');
                this.setData({
                    isResume: false
                });
            }
        })
    },
    updateInfo: function () {
        this.setData({
            isResume:false
        })
    },

    studentInfoSubmit: function (e) {
        let that = this;
        console.log(e.detail.value);
        this.setData({
            openId:app.globalData.openId,
            resume: {//简历
                "name": e.detail.value.name,//姓名,
                "age": e.detail.value.age,//年龄
                "sex": e.detail.value.sex,//性别
                "born": e.detail.value.born,//出生日期
                "telephone": e.detail.value.telephone,//电话号码
                "mail": e.detail.value.mail,//邮箱
                "home": e.detail.value.home,//居住地
                "education": e.detail.value.education,//最高学历
                "college": e.detail.value.college,//毕业院校
                "major": e.detail.value.major,//主修专业
                "introduction": e.detail.value.introduction,//个人介绍
                "skill": e.detail.value.skill,//个人技能
                "project_experience": e.detail.value.project_experience,//项目经历
                "school_experience": e.detail.value.school_experience,//在校经历
                "certificate": e.detail.value.certificate,//获得证书
                "hobbies": e.detail.value.hobbies//兴趣爱好
            }
        });

        wx.request({
            url: "http://localhost:8888/postInfo",
            method: 'post',
            data:{
                resume:this.data.resume,
                openId:app.globalData.openId
            },
            success: res=> {
                console.log(res);
                if (res.statusCode == 200) {
                    wx.showToast({
                        title: '创建成功'
                    });

                    /*清空输入框*/
                    that.setData({
                        resume: {//简历
                            "name": '',//姓名,
                            "age": '',//年龄
                            "sex": '',//性别
                            "born": '',//出生日期
                            "telephone": '',//电话号码
                            "mail": '',//邮箱
                            "home": '',//居住地
                            "education": '',//最高学历
                            "college": '',//毕业院校
                            "major": '',//主修专业
                            "introduction": '',//个人介绍
                            "skill": '',//个人技能
                            "project_experience": '',//项目经历
                            "school_experience": '',//在校经历
                            "certificate": '',//获得证书
                            "hobbies": ''//兴趣爱好
                        }
                    });
                }else {
                    wx.showToast({
                        title: '发布失败'
                    });
                }
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})