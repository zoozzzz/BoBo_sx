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
        applyList: [
            {
                position: 'testPosition',
                salary: 'testSalary',
                updateTime: '2018-3-24',
                workPlace: 'testPlace'
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
        circular: true,
        isOnLoad: false,
        renderJobList: [],
        isCompany: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //options为页面跳转带来的参数
        if (this.data.isOnLoad == false) {
            wx.showModal({
                title: '用户选择',
                content: '是否为企业用户',
                cancelText: '否',
                confirmText: '是',
                success: res=> {
                    if (res.confirm) {
                        console.log("企业用户");
                        app.globalData.isCompany = true;
                        //console.log(app.globalData.isCompany);
                        this.setData({
                            isCompany: true
                        });
                    } else {//个人用户才获取实习列表
                        console.log("个人用户");
                        wx.request({
                            url: "http://localhost:8888/jobList",
                            method: "get",
                            success: res=> {
                                console.log(res);
                                this.setData({
                                    jobList: res.data.jobList.reverse(),
                                    renderJobList: res.data.jobList.reverse()
                                });
                            },
                            fail: err=> {
                                console.log(err);
                            }
                        });
                    }
                }
            });
        }


        this.setData({
            isOnLoad: true
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    //进入详情页
    goListDetail: function (e) {
        var detail = e.currentTarget.dataset.detail.detail;
        detail._id = e.currentTarget.dataset.detail._id;
        detail = JSON.stringify(detail);
        console.log(detail);
        if (detail) {
            wx.navigateTo({
                url: './position/position?detail=' + detail
            })
        }
    },

    //输入进行搜索
    searchJob: function (e) {
        if (e.detail.value) {
            var inputContent = e.detail.value;
            var renderJobList = [];
            this.data.jobList.forEach(function (item, index) {
                if (item.position.indexOf(inputContent) != -1) {
                    renderJobList.push(item);
                }

            });
            console.log(renderJobList);
            this.setData({
                renderJobList: renderJobList
            })
        } else {
            this.setData({
                renderJobList: this.data.jobList
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