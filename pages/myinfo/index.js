// there->index.js
// 获取应用实例
var app = getApp()
Page({
  data: {
  },
  //事件处理函数
  onLoad: function(){
    var that = this
    wx.setNavigationBarTitle({
      title: '我'
    })
    wx.checkSession({
        success: function(){
            that.setData({
                "userInfo":app.globalData.userInfo
            })
        },
        fail: function(){
            //登录态过期
            app.getUserInfo();
        }
    })
  }
})