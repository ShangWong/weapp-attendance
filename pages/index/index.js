//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    uindex: null,
    UI: [
      {greeting: "欢迎回来!"}, // Chinese UI
      {greeting: "Welcome back!"}  // English UI
    ],
    list: [
      {
        id: 'timecard',
        name: ['打卡', 'Time Card'],
        open: false,        
        pages: [
          {path: "normal", title: ["正常出勤", "Normal Checkin"]},
          {path: "go_direct", title: ["直行申请", "Go directly"]},
          {path: "return_direct", title: ["直归申请", "Return directly"]}
          ]
      }, {
        id: 'overwork',
        name: ['加班记录', 'Overwork Record'],
        open: false,        
        pages: [
          {path: "create", title: ["新建加班记录", "Create new record"]},
          {path: "list", title: ["查看加班记录", "Check record list"]}
          ]
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  kindToggle: function (e) {        
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  onLoad: function () {
    console.log('onLoad')

    
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShow:function(){
    // 设置app语言的全局变量  
    var selectedLanguage = app.globalData.settings.language;
    console.log('Current Language:' + selectedLanguage + ' (0: ZH-ch 1: ENG)');
    this.setData({
      uindex: selectedLanguage    
    })
  }
})
