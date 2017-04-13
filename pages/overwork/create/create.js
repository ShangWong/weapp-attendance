// pages/overwork/create/create.js
//获取应用实例
var app = getApp()

Page({
  data:{
    uindex: null,
    UI: [
      {title: "新建", current: "当前选择", datepicker: "加班日期", timepicker: "加班时长", reasonpicker: "加班理由", memo: "备注", save: "保存"},
      {title: "Create new record", current: "Current", datepicker: "Choose date", timepicker: "Choose overwork time", reasonpicker: "Reason", memo: "Memo",save: "Save"}
    ],
    overworkReasons: [
      ["无特殊理由","客户紧急情况","项目延迟"], 
      ["No special reason", "Customer Situation", "Project Delay"]      
      ]
    },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    // 设置app语言的全局变量  
    var selectedLanguage = app.globalData.settings.language;
    console.log('Current Language:' + selectedLanguage + ' (0: ZH-ch 1: ENG)');
    this.setData({
      uindex: selectedLanguage    
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})