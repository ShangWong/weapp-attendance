// pages/timecard/normal/normal.js
//获取应用实例
var app = getApp()
var util = require('../../../utils/util.js')
var amapFile = require('../../../utils/amap-wx.js');

const AV = require('../../../utils/av-weapp-min');
const Check = require('../../../model/check')

Page({
  data:{
    displayTime: null,
    uindex: null,
    index: 0,
    title: null,
    // checkType: [["上班", "下班"], ["Clock in", "Clock out"]],
    checkType: [
      [{id: "clockIn", msg: "上班"}, {id: "clockOut", msg: "下班"}],
      [{id: "clockIn", msg: "Clock In"}, {id: "clockOut", msg: "Clock Out"}],
      [{id: "clockIn", msg: "出勤"}, {id: "clockOut", msg: "退勤"}],
      
    ],  
    checkMode: {},
    loading: false, // 更新地理位置加载状态
    UI: [
      {checkType: "打卡目的", current: "当前选择", locName: "位置名称", locDesc: "详细位置", locNameContent: "等待获取", locDescContent: "等待获取", locButton: "更新定位", submitButton: "提交"},
      {checkType: "Type", current: "Current", locName: "Location", locDesc: "Detail", locNameContent: "Waiting", locDescContent: "Waiting", locButton: "Update Location", submitButton: "Submit"},
      {checkType: "打刻種類", current: "選択項目", locName: "現在場所", locDesc: "詳細位置", locNameContent: "取得待ち", locDescContent: "取得待ち", locButton: "場所再取得", submitButton: "打刻"}
      ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({      
      loading: true
    })
    var selectedLanguage = app.globalData.settings.language;
    var toastTitle = ['定位成功', 'Got Location', '取得完了'][selectedLanguage];
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
      }
    })
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
    console.log('Current Language:' + selectedLanguage + ' (0: ZH-ch 1: ENG 2:JP)');
    var title = ["打卡", "Timecard", "打刻"][selectedLanguage];
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
    var toastTitle = ['定位成功', 'Got Location', '取得完了'][selectedLanguage];
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
      }
    })
    
  },
  formSubmit: function(e){
    var currentTime = new Date();
    // store the check
    new Check({
      timestamp: currentTime,
      checkType: e.detail.value.type,
      location: e.detail.value.name,
      address: e.detail.value.address
    }).save().then(wx.navigateTo({
      url: '../history/history',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })); 
    
    
    // wx.showModal({
    //   title: '打卡',
    //   content: e.detail.value.type + '\n' + e.detail.value.name + '\n' + e.detail.value.address,
    //   success: function(res) {
    //     if (res.confirm) {
    //       console.log(app.globalData.settings.employeeId)
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })



  }
})