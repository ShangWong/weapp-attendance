//app.js
App({
  onLaunch: function () {
    //进入应用时检查语言设置
    var language = wx.getStorageSync('selectedLanguage');
    if(language){
      this.globalData.settings.language = language;
    }else{
      //使用系统语言设定 user-info COUNTRY, 暂时默认为中文 
      this.globalData.settings.language = 0; 
    }

    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              console.log(res.userInfo)
              //在LocalStorage中储存用户信息 
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo
              })
            }
          })
        }
      })
    }
  },
  globalData:{
    settings:{
      language: null
    },
    userInfo:null
  }
})