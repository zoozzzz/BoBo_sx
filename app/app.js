const APP_ID = 'wx10133b063f1dbbe6';//输入小程序appid  
const APP_SECRET = '4cab7bed0965b23bb621f915fee78cf4';//输入小程序app_secret 

App({
  onLaunch: function () {
    // 调用API获取用户地址;
    let that = this;
    wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          var latitude = res.latitude;
          var longitude = res.longitude; //获取用户的地理位置
          that.globalData.latitude = res.latitude;
          that.globalData.longitude = res.longitude;
        }
      })
  },
  getUserInfo:function(cb){
    var that = this;
    //that.getOpenIdTap();
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          that.globalData.code = res.code;
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;  //用户信息对象，不包含 openid 等敏感信息
              that.globalData.rawData = res.rawData;  //不包括敏感信息的原始数据字符串，用于计算签名
              that.globalData.signature = res.signature; //使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
              that.globalData.encryptedData = res.encryptedData;  //包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法
              that.globalData.iv = res.iv ;       //加密算法的初始向量，详细见加密数据解密算法
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getOpenIdTap: function () {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data);
            that.globalData.openId = res.data.openid;//获取到的openid  
            that.globalData.sessionKey = res.data.session_key;//获取到session_key  
            console.log(that.globalData.openId.length);
            console.log(that.globalData.sessionKey.length);
          }
        })
      }
    })
  },
  globalData:{
    userInfo:null,
    logs:false,
    rawData:null,
    signature:null,
    encryptedData:null,
    iv:null,
    latitude:'',
    longitude:'',
    openId:'',
    sessionKey:''
  },
  data:{
    searchId:'111'
  }
})