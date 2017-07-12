// there->index.js
// 获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'I am here!',
    userInfo: {},
    //地图数据
    markers: [{
      iconPath: '',
      id: 0,
      latitude: 38.493193,
      longitude: 106.237611,
      width: 50,
      height: 50
    }],
    controls: [{
      id: 1,
      iconPath: '',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  //事件处理函数
  onLoad: function(){
    var that = this
    wx.setNavigationBarTitle({
      title: '我去那儿'
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