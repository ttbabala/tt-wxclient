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
                url: that.globalData.url,
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
                      wx.getStorage({
                        key: '3rdsession',
                        success: function(res){
                          console.log(res.data);
                          wx.request({
                            url: that.globalData.url,
                            data:{
                              se3 : res.data
                            },
                            header:{
                              'content-type': 'application/json'
                            },
                            success: function(res_sk){
                              if(res_sk.data !== 0){
                                  wx.getUserInfo({
                                    withCredentials: true,
                                    success: function(res){
                                      that.globalData.userInfo = res.userInfo
                                      var sessionKey = res_sk.data
                                      var rawData = res.rawData
                                      var signature = res.signature
                                      var encryptedData = res.encryptedData
                                      var iv = res.iv
                                      wx.request({
                                          url:that.globalData.url,
                                          data: {
                                            sessionKey:sessionKey,
                                            rawData:rawData,
                                            signature:signature,
                                            encryptedData:encryptedData,
                                            iv:iv
                                          },
                                          header: {
                                            'content-type': 'application/json'
                                          },
                                          success:function(res){
                                            that.globalData.userInfo = res.data;
                                            console.log(res.data);
                                          }
                                      })
                                    }                            
                                  })
                              }else{
                                 console.log('您的登陆状态已过期！');
                              }
                            }
                          })
                        }
                      })
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
    userInfo:null,
    url:'https://root.com/tt-server/manage/weixin/onlogin',
  }
})