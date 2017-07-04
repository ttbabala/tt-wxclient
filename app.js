//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
          success: function (res) {
            if(res.code){
              wx.request({
                url: 'https://root.com/case/manage/weixin/onlogin',
                data: {
                  code: res.code
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function(info){
                  wx.setStorage({
                    key: '3rdsession',
                    data: info.data,
                    success: function(res){
                      console.log('success');
                    }
                  })
                }
              })
            }else{
              console.log('获取用户登录态失败！' + res.errmsg)
            }
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})