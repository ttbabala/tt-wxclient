//here->index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'I am here!',
    userInfo: {}
  },
  //事件处理函数
  onLoad: function(){
      wx.request({
            url: 'https://root.com/tt-server/manage/weixin/index',
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/json'
            },
            success: function(res){
                console.log(app.globalData.userInfo);
            },
            fail: function(res) {
                console.log(res.data);
            },
            complete: function(res) {
                console.log(res.data);
            }
        })
  }
})
