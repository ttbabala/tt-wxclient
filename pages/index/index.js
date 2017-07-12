//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    wx.setNavigationBarTitle({
      title: '首 页',
    })
    wx.checkSession({
        success:function(){
              //调用应用实例的方法获取全局数据
              app.getUserInfo(function(userInfo){
                //更新数据
                that.setData({
                  userInfo:userInfo
                })
              })
        },
        fail:function(){
            app.getUserInfo();
        }
    })
  }
})
