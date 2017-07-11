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
                url: 'https://root.com/tt-server/manage/weixin/codeGetSession3rd',
                data: {
                  code: res.code
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function(info){
                  console.log(info.data)
                  wx.setStorageSync('3rdsession',info.data);                 
                  var session3rd = wx.getStorageSync('3rdsession');
                  wx.request({
                        url: 'https://root.com/tt-server/manage/weixin/getSe3',
                        data:{
                             se3 : session3rd
                        },
                        header:{
                            'content-type': 'application/json'
                        },
                        success: function(res_sk){
                          console.log(res_sk.data)
                          if(res_sk.data !== 0){
                                wx.getUserInfo({
                                withCredentials: true,
                                success: function(res){
                                  //that.globalData.userInfo = res.userInfo
                                  var sessionKey = res_sk.data
                                  var rawData = res.rawData
                                  var signature = res.signature
                                  var encryptedData = res.encryptedData
                                  var iv = res.iv
                                  wx.request({
                                          url: 'https://root.com/tt-server/manage/weixin/onLogin',
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
                                            that.globalData.userInfo = res.data
                                            console.log(res.data)
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
            }else{
              console.log('获取用户登录态失败！' + res.errmsg)
            }
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    //url:'https://root.com/tt-server/manage/weixin/onlogin',
  }
})