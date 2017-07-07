//here->index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'I am here!',
    userInfo: {},
    //初始化地图数据
    markers: [{
      iconPath: '',
      id: 0,
      title: '',
      latitude: 38.493193,
      longitude: 106.237611,
      width: 50,
      height: 50,
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
    }],
    //初始化地图数据结束
    //选择完位置后的地理位置信息
    locationName:'',
    locationAddress:'',
    latitude:'',//经度
    longitude:''
  },
  //事件处理函数
  onLoad: function(){
    var that = this
    wx.checkSession({
        success: function(){
            that.setData({
                "userInfo":app.globalData.userInfo
            })
            wx.chooseLocation({
              success: function(res){
                that.setData({
                    locationName:res.name,
                    locationAddress:res.address,
                    latitude:res.latitude,
                    longitude:res.longitude,
                    markers: [{
                    latitude: res.latitude,
                    longitude: res.longitude,
                    }]
                })
              },
              fail: function(res) {
                // fail
              },
              complete: function(res) {
                // complete
              }
            })
        },
        fail: function(){
            //登录态过期
            app.getUserInfo()
        }
    })
  }
})
