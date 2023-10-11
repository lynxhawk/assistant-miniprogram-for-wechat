//app.js
App({
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
             


          
            }
          })
        }
      }
    });

    //获取或添加用户id
    // wx.request({
    //   url: "http://192.168.43.58:8080/personalAssistant/user/addUser",
    //   data: { "userName": globalData.userInfo.nickName},
    //   method: 'GET',
    //   success: function (res) {
    //     var id = res.data.userId;
    //     if (id == '') {
    //       var toastText = '获取数据失败' + res.data.errMsg;
    //       wx.showToast({
    //         title: toastText,
    //         icon: '',
    //         duration: 2000
    //       });
    //       app.globalData.userId = id;
    //       // that.setData({
    //       //   id: id
    //       // })
    //       }


    //     }

    // });      




  },
  globalData: {
    userInfo: null,
    userId:null,
    userInfoAuth: 0,//0无状态，1用户已经授权用户信息，2用户拒绝授权用户信息
    bmap_ak: 'gZiG9QRKKo6pDhuTy8N6tGZHB1ec3bmK'
  },
  onShow: function () {

    // wx.request({
    //   url: "http://192.168.43.58:8080/personalAssistant/user/addUser",
    //   data: { "userName": globalData.userInfo.nickName },
    //   method: 'GET',
    //   success: function (res) {
    //     var id = res.data.userId;
    //     if (id == '') {
    //       var toastText = '获取数据失败' + res.data.errMsg;
    //       wx.showToast({
    //         title: toastText,
    //         icon: '',
    //         duration: 2000
    //       });
    //       app.globalData.userId = id;
    //       // that.setData({
    //       //   id: id
    //       // })
    //     }


    //   }

    // });      
   },//监听显示（进入前台）
  onHide: function () { },//监听隐藏（进入后台：按home离开微信）


  checkUserLocation: function () {
    var that = this;
    // 获取授权信息  
    wx.getSetting({
      success: function (res) {
        // 判断是否已经操作过授权操作
        if (res.authSetting.hasOwnProperty("scope.userLocation")) {
          if (res.authSetting["scope.userLocation"] == true) {
            // 已经授权位置信息，暂时无操作
          } else {
            // 没有授权位置信息，弹出选择框提示用户选择操作
            wx.showModal({
              title: '信息授权',
              content: '提示：位置授权暂未开启，无法获取相关信息',
              confirmText: '开启授权',
              cancelText: '仍然拒绝',
              // confirmColor: '#345391',
              cancelColor: '#666',
              success: function (res) {
                if (res.confirm) {
                  // 用户选择“允许”，则开启授权页面
                  wx.openSetting({
                    fail: function () {
                      wx.showModal({
                        title: '操作失败',
                        content: '请到微信中自行设置授权操作',
                        confirmText: '知道了',
                        confirmColor: '#345391',
                        showCancel: false
                      })
                    }
                  })
                }
                // 用户选择“拒绝”，则弹层提示无法获取数据
                if (res.cancel) {
                  wx.showModal({
                    title: '授权失败',
                    content: '无法使用定位权限，不能获取到数据',
                    confirmText: '知道了',
                    confirmColor: '#345391',
                    showCancel: false
                  })
                }
              }
            })
          }
        } else {
          // 还没有操作位置授权，暂时不做处理
        }
      }
    })
  }


})