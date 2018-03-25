// pages/deliver/deliver.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0,
        deliveredList: [
            {
                _id: 1,
                companyName: '已投递有限公司',
                position: '铲屎官',
                updateTime: '2017-12-06',
                salary: 787,
                workPlace: '广金'
            }
        ],
        checkedList: [
            {
                _id: 1,
                companyName: '已查看有限公司',
                position: '铲屎官',
                updateTime: '2017-12-06',
                salary: 787,
                workPlace: '广金'
            }
        ],
        invitedList: [
            {
                _id: 1,
                companyName: '邀请有限公司',
                position: '铲屎官',
                updateTime: '2017-12-06',
                salary: 787,
                workPlace: '广金'
            }
        ],
        rejectedList: [
            {
                _id: 1,
                companyName: '不合适有限公司',
                position: '铲屎官',
                updateTime: '2017-12-06',
                salary: 787,
                workPlace: '广金'
            }
        ],
        receivedList:[],
        isCompany:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            isCompany:app.globalData.isCompany
        });
        let openid = app.globalData.openId;
        console.log(openid);
        if(!this.data.isCompany){//个人用户才请求投递列表
            wx.request({
                url: "http://localhost:8888/getDeliveredList",
                data: {
                    openId: openid,
                    type:'studentInfo'
                },
                success: res=> {
                    console.log(res.data.deliveredList);
                    this.setData({
                        deliveredList: res.data.deliveredList,
                        checkedList:res.data.checkedList,
                        invitedList:res.data.invitedList,
                        rejectedList:res.data.rejectedList
                    });
                }
            })
        }
        else{//企业用户获取学生简历
            openid = 'ov38Q0atYa_LV-8wLl7Z5VsFPmIU';
            wx.request({
                url: "http://localhost:8888/getPublishJobList",
                data: {
                    openId: openid,
                    type:'companyInfo'
                },
                success: res=> {
                    console.log(res.data);
                    this.setData({
                        receivedList: res.data.receivedList
                    });
                }
            })
        }

    },
    switchSlider: function (e) {
        let current = e.currentTarget.dataset.index;
        this.setData({
            currentIndex: current
        });
        /*const openid = app.globalData.openId;
        //根据current发送请求
        var type = '';
        switch (current) {
            case 0:
                type = 'getDeliveredList';
                break;
            case 1:
                type = 'getCheckedList';
                break;
            case 2:
                type = 'getInvitedList';
                break;
            case 3:
                type = 'getRejectedList';
                break;
        }*/
    },
    toReceivedList: function (e) {
        console.log('toReceivedList');
        let jobId = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: './detailList/detailList?jobId=' + jobId
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