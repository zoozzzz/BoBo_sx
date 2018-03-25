// pages/deliver/detailList/detailList.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        resumeList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let openId = app.globalData.openId;
        let jobId = options.jobId;
        openId  = 'ov38Q0atYa_LV-8wLl7Z5VsFPmIU';
        wx.request({
            url: "http://localhost:8888/getResumeList",
            data: {
                openId: openId,
                jobId: jobId
            },
            success: res=> {
                console.log(res);
                this.setData({
                    resumeList:res.data.resumeList
                });
            }
        })
    },

    toStudentInfo: function (e) {
        let resume = e.currentTarget.dataset.resume;
        wx.navigateTo({
          url: './studentInfo/studentInfo?resume='+JSON.stringify(resume)
        })
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