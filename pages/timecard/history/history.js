// pages/timecard/history/history.js
const AV = require('../../../utils/av-weapp-min');
const Check = require('../../../model/check')

Page({
  data:{
    checks: null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数    
    if(AV.User.current() == null){
      wx.showModal({
        title: '当前无绑定账户',
        content: '请绑定账户后，再查看考勤历史',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })      
    }
  },
  fetchChecks:function () {    
    return AV.Promise.resolve(AV.User.current()).then(user =>
    {
      console.log('uid', user.id);
      return new AV.Query(Check)
      // .equalTo('user', AV.Object.createWithoutData('User', user.id))
      .descending('createdAt')
      .find().then(this.setChecks)  
    });
  },
  setChecks:function(checks){
    console.log(checks);
    this.setData({
      checks: checks.map(check => Object.assign(check.toJSON(), {
          timestamp: check.timestamp.toLocaleString(),
        }))
    })
  },
  onReady:function(){
    this.setChecks();
  }
})