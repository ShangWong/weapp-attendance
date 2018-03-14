// pages/info/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: "test",
      authContent: '',
      success: function(res) {
        console.log('auth success')
        console.log(res)
      },
      fail: function(res) {
        console.log('auth failed')
        console.log(res)
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  auth: function () {
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: "test",
      authContent: '',
      success: function (res) {
        wx.showToast({
          title: '认证成功',
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '认证失败',
          icon: "none"
        })
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})