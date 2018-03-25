// pages/message/message.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        companyName: "",
        conditions: "",
        description: "",
        education: "",
        position: "",
        recruit_num: "",
        requirement: "",
        room_board: "",
        salary: "",
        workPlace: "",
        work_experience: "",
        isCompany: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(app.globalData.isCompany);
        this.setData({
            isCompany:app.globalData.isCompany
        });
    },
    CompanyFromSubmit: function (e) {

        console.log(e.detail.value);
        var that = this;
        //判断是否有内容
        for (var obj in e.detail.value) {
            if (e.detail.value[obj] == '') {
                wx.showToast({
                    title: '信息不完整！'
                });
                return;
            }
        }
        this.setData({//保存数据
            companyName: e.detail.value.companyName,
            conditions: e.detail.value.conditions,
            description: e.detail.value.description,
            education: e.detail.value.education,
            position: e.detail.value.position,
            recruit_num: e.detail.value.recruit_num,
            requirement: e.detail.value.requirement,
            room_board: e.detail.value.room_board,
            salary: e.detail.value.salary,
            workPlace: e.detail.value.workPlace,
            work_experience: e.detail.value.work_experience
        });

        /*提交数据到服务器*/

        wx.request({
            url: 'http://localhost:8888/postJob',
            method: 'post',
            data: {
                companyName: this.data.companyName,
                conditions: this.data.conditions,
                description: this.data.description,
                education: this.data.education,
                position: this.data.position,
                recruit_num: this.data.recruit_num,
                requirement: this.data.requirement,
                room_board: this.data.room_board,
                salary: this.data.salary,
                workPlace: this.data.workPlace,
                work_experience: this.data.work_experience
            },
            success: function (res) {
                console.log(res);
                if (res.statusCode == 200) {
                    wx.showToast({
                        title: '发布成功'
                    });
                    //清空输入框
                    that.setData({
                        companyName: '',
                        conditions: '',
                        description: '',
                        education: '',
                        position: '',
                        recruit_num: '',
                        requirement: '',
                        room_board: '',
                        salary: '',
                        workPlace: '',
                        work_experience: ''
                    });
                } else {
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