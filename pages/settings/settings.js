// pages/settings/settings.js
//获取应用实例
var app = getApp()
Page({
  data:{
    languages: ["简体中文", "English"], // "繁体中文", "日本語" may be supported in the future
    index: 0,                           // current default selected item
    UI: [ 
      {title: "设置", language: "选择语言", currentLan: "当前选择", employeeIdTitle: "雇员编号", currentId: "如有疑问请联系人事部门", save: "保存"},
      {title: "Settings", language: "Change Language", currentLan: "Current", employeeIdTitle: "Employee ID", currentId: "Contact HR Dept.", save: "Save Changes"}
      ]
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    
    //储存用户对语言的选择
    try {
      wx.setStorageSync('selectedLanguage', e.detail.value);
      app.globalData.settings.language = e.detail.value; //setting global value for app language
    } catch (e) {    
      console.log('储存用户语言选择失败！');
    }
  },
  onLoad:function(options){
    // 设置app语言的全局变量
    var selectedLanguage = app.globalData.settings.language;
    this.setData({      
      index: selectedLanguage    
    })
  },
  onReady:function(){
    // 页面渲染完成
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