// pages/mycenter/mycenter.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        itemList: [
            {
                icon: './image/dingyue_03.png',
                text: '个人信息'
            },

            {
                icon: './image/more_10.png',
                text: '关于我们'
            }
        ],
        avatarUrl:'',
        type:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(app.globalData.isCompany == true){
            this.setData({
                itemList: [
                    {
                        icon: './image/dingyue_03.png',
                        text: '企业信息'
                    },

                    {
                        icon: './image/more_10.png',
                        text: '关于我们'
                    }
                ]
            });
        }
      var that = this;
        app.getUserInfo(function (res) {
            console.log(res);
            that.setData({
                avatarUrl:res.avatarUrl,
                nickName:res.nickName
            });
        });
        // app.getOpenIdTap();
    },

    getType: function () {

    },

    toDetail: function (e) {
        let type = e.currentTarget.dataset.type;
        switch (type){
            case '个人信息':
                wx.navigateTo({
                  url: './myinfo/myinfo?type=studentInfo'
                });
                break;
            case '企业信息':
                wx.navigateTo({
                    url: './myinfo/myinfo?type=companyInfo'
                });
                break;
            default:
                wx.navigateTo({
                    url: './about/about'
                });
                break;
        }
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