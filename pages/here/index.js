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
    wx.setNavigationBarTitle({
      title: '我在这儿',
    })
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
              }
            })
        },
        fail: function(){
            //登录态过期
            app.getUserInfo(cb);
        }
    })
  },
  uploadImage:function(){
    wx.chooseImage({
      count: 3, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res){
        console.log(res.tempFilePaths)
        var tempFilePaths = res.tempFilePaths
        wx.showToast({
          icon: "loading",
          title: "正在上传"
        })
        wx.uploadFile({
          url: 'https://root.com/tt-server/manage/weixin/uploadImg',
          filePath:tempFilePaths[0],
          name:'photo',
          //header:{"content-type":'application/x-www-form-urlencoded'},
          formData: {
            'name':encodeURI('name'),
            'address':encodeURI('address')
          }, // HTTP 请求中其他额外的 form data
          success: function(res){
            console.log(res.errMsg);
          },
          fail: function(res) {
            console.log(res.errMsg);
            console.log('failed');
          },
          complete: function(res) {
            console.log(res.errMsg);
            console.log('completa')
          }
        })
      }
    })
  }
})
