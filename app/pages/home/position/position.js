// pages/position/position.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{
      position:'铲屎官',
      salary:'3千',
      company_name:'波波有限公司',
      update_time:'2017-10-11',
      recruit_num:3,
      education:'本科',
      room_board:'包食宿',
      conditions:'18-45'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var detail = JSON.parse(options.detail);
    console.log(detail);
    this.setData({
      detail:detail
    });
  },

  deliver: function () {
    var openid = app.globalData.openId;
    var jobid = this.data.detail._id;
    console.log('openid:'+openid);
    console.log('jobid:'+jobid);
    wx.request({
      //提交openid和jobid
        url:"http://localhost:8888/deliver?jobid="+jobid+'&openid='+openid,
        success:res=>{
          console.log(res);
          wx.showToast({
            title: '已投递'
          });
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