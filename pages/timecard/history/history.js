// pages/timecard/history/history.js
const AV = require('../../../utils/av-weapp-min');
const Check = require('../../../model/check')

Page({
  data:{
    checks: null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  fetchChecks: function () {
    return new AV.Query(Check).descending('createdAt')
    .find().then(this.setChecks);
  },
  setChecks: function(checks){
    console.log(checks);
    this.setData({
      checks: checks.map(check => Object.assign(check.toJSON(), {
          timestamp: check.timestamp.toLocaleString(),
        }))
    })
  },
  onReady:function(){
    // 页面渲染完成
    this.fetchChecks();
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})