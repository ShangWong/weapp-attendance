// pages/timecard/normal/normal.js
//获取应用实例
var app = getApp()
var util = require('../../../utils/util.js')
var amapFile = require('../../../utils/amap-wx.js');

Page({
  data:{
    displayTime: null,
    uindex: null,
    index: 0,
    title: null,
    // checkType: [["上班", "下班"], ["Clock in", "Clock out"]],
    checkType: [
      [{id: "clockIn", msg: "上班"}, {id: "clockOut", msg: "下班"}],
      [{id: "clockIn", msg: "Clock In"}, {id: "clockOut", msg: "Clock Out"}]
    ],  
    checkMode: {},
    locName: 'Status',
    locDesc: 'Waiting for locating...',
    loading: false,
    UI: [
      {checkType: "打卡目的", current: "当前选择", locName: "位置名称", locDesc: "详细位置", locNameContent: "等待获取", locDescContent: "等待获取", locButton: "获取定位", submitButton: "提交"},
      {checkType: "Type", current: "Current", locName: "Location", locDesc: "Detail", locNameContent: "Waiting", locDescContent: "Waiting", locButton: "Get Location", submitButton: "Submit"}
      ]
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
  relocate: function(){
    this.setData({      
      loading: true
    })
    var selectedLanguage = app.globalData.settings.language;
    var toastTitle = ['定位成功', 'Got Location'][selectedLanguage];
    var that = this;
    var ui = that.data.UI
    var amap = new amapFile.AMapWX({key:'8ebbe699d71eed6674889848604e411a'});
    
    amap.getRegeo({      
      success: function(data){
        console.log(data)
        //成功回调
        wx.showToast({
          title: toastTitle,
          icon: 'success',
          duration: 1000
        })
        // 改写UI，反映在视图层
        ui[selectedLanguage].locNameContent =  data[0].name
        ui[selectedLanguage].locDescContent =  data[0].desc
        that.setData({
          UI: ui,
          loading: false      
        })  
        // wx.setStorage({
        // key: 'loc',
        // data: data[0],
        // success: function(res){
        //   // success
        // }})      
      }
    })
    
  },
  formSubmit: function(e){
    console.log(e.detail.value)
    wx.showModal({
      title: '打卡',
      content: e.detail.value.type + '\n' + e.detail.value.name + '\n' + e.detail.value.address,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})