// pages/home/home.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        jobList: [
            {
                _id: 1,
                companyName: '波波有限公司',
                position: '铲屎官',
                updateTime: '2017-12-06',
                salary: 787,
                workPlace: '广金'
            }
        ],
        imgUrls: [
            './image/banner1.jpg',
            './image/banner2.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 1000,
        circular: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //options为页面跳转带来的参数

        wx.request({
            url: "http://localhost:8888/jobList",
            method: "get",
            success: res=> {
                console.log(res);
                this.setData({
                    jobList:res.data.jobList
                });
            },
            fail:err=>{
                console.log(err);
            }
        });

        app.getOpenIdTap();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    //进入详情页
    goListDetail: function (e) {
        var detail = e.currentTarget.dataset.detail;
        detail = JSON.stringify(detail);
        console.log(detail);
        if (detail) {
            wx.navigateTo({
                url: './position/position?detail=' + detail
            })
        }
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