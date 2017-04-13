// pages/timecard/normal/normal.js
//获取应用实例
var app = getApp()
var util = require('../../../utils/util.js')

Page({
  data:{
    displayTime: null,
    uindex: null,
    index: 0,
    title: null,
    checkType: [["上班", "下班"], ["Clock in", "Clock out"]]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    this.setData({
        displayTime: util.currentTime()    
      });
  },
  onShow:function(){
    // 设置app语言的全局变量  
    var selectedLanguage = app.globalData.settings.language;
    console.log('Current Language:' + selectedLanguage + ' (0: ZH-ch 1: ENG)');
    var title = ["打卡", "Timecard"][selectedLanguage];
    this.setData({
      uindex: selectedLanguage,
      title: title
    })
    // 时间显示
    var that = this;
    setInterval(function(){
      that.setData({
        displayTime: util.currentTime()    
      });
    }, 1000)
  },
  bindPickerChange:function(e){
    // 页面隐藏
    this.setData({
      index: e.detail.value
    })
  },
  onUnload:function(){
    // 页面关闭
  }
})