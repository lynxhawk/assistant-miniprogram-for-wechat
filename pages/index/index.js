const app = getApp();
var util = require('../../utils/util.js');
var bmap = require('../../utils/bmap-wx.min.js');
Page({
  data: {
    loadingStatus: false,
    userLocation: 0, // 0默认没有状态，1获取到用户定位，2用户拒绝提供定位信息，3无法获取正确定位
    cityInfo: {}, //城市信息
    weatherInfo: {}, //天气信息
    currentTime: '', // 当前时间
    open: false,
    mark: 0,
    newmark: 0,
    istoright: true,
    userInfo: {},
    sum:'',
    sumcount:'',
    sumincome:'',
    sumoutcome:'',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    id:'',
    notify: [
      // {
      //   title: '取快递'
      // }
    ],
    income: [
      // {
      //   money: 100,
      //   info: 111,
      //   type: '其他'
      // }
    ],
    invest: [
      // {
      //   startdate: '2019-07-01',
      //   enddate: '2019-08-17',
      //   money: 10000,
      //   rate: 0.02,
      //   type: '银行存款',
      //   profit: '2'
      // }
    ]
    
  },

  //获取提醒
  onShow: function () {
    var that = this;
    console.log(getApp().globalData.userInfo.nickName);
    wx.request({
      url: "http://192.168.43.58:8080/personalAssistant/user/addUser",
      data: { "userName": getApp().globalData.userInfo.nickName },
      method: 'POST',
      success: function (res) {
        var id = res.data.userId;
        if (id == '') {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        }else{
          console.log("2", getApp().globalData);
          getApp().globalData.userId = id;
          that.data.id = id;
          console.log("3", getApp().globalData);
         
          wx.request({
            url: "http://192.168.43.58:8080/personalAssistant/investment/updateInvestment",
            data: { "userId": getApp().globalData.userId},
            method: 'GET',
            success: function (res) {
              console.log(getApp().globalData.userId);
            }
          });

          wx.request({
            url: "http://192.168.43.58:8080/personalAssistant/user/sumInvPf",
            data: { "userId": getApp().globalData.userId },
            method: 'GET',
            success: function (res) {
              var sum = res.data.sumInvPf;
              if (sum == null) {
                var toastText = '获取数据失败' + res.data.errMsg;
                wx.showToast({
                  title: toastText,
                  icon: '',
                  duration: 2000
                });
              } else {
                that.setData({
                  sum: sum
                });
              }
            }
          });

          wx.request({
            url: "http://192.168.43.58:8080/personalAssistant/user/sumInv",
            data: { "userId": getApp().globalData.userId },
            method: 'GET',
            success: function (res) {
              var sum = res.data.sumInv;
              if (sum == null) {
                var toastText = '获取数据失败' + res.data.errMsg;
                wx.showToast({
                  title: toastText,
                  icon: '',
                  duration: 2000
                });
              } else {
                that.setData({
                  sumcount: sum
                });
              }
            }
          });

          wx.request({
            url: "http://192.168.43.58:8080/personalAssistant/user/sumIncome",
            data: { "userId": getApp().globalData.userId },
            method: 'GET',
            success: function (res) {
              var sum = res.data.sumIncome;
              if (sum == null) {
                var toastText = '获取数据失败' + res.data.errMsg;
                wx.showToast({
                  title: toastText,
                  icon: '',
                  duration: 2000
                });
              } else {
                that.setData({
                  sumincome: sum
                });
              }
            }
          });

          wx.request({
            url: "http://192.168.43.58:8080/personalAssistant/user/sumExcepses",
            data: { "userId": getApp().globalData.userId },
            method: 'GET',
            success: function (res) {
              var sum = res.data.sumExcepses;
              if (sum == null) {
                var toastText = '获取数据失败' + res.data.errMsg;
                wx.showToast({
                  title: toastText,
                  icon: '',
                  duration: 2000
                });
              } else {
                that.setData({
                  sumoutcome: sum
                });
              }
            }
          });
        }
      }
    });

    
  },

  updateUserLocation: function (v) {
    this.setData({
      loadingStatus: true,// 加载完成，隐藏加载动画
      userLocation: v //更新当前页面的变量值
    });
  },

  // 跳转到授权页面
  gotoAuthPage: function () {
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
    });
  },

  // 刷新当前页面（相当于下拉刷新页面）
  refreshCurrentPage: function () {
    wx.startPullDownRefresh({});
  },

  // 获取地理位置和天气的方法
  getLocationAndWeather: function () {
    var that = this;
    // 使用百度地图提供的ak标记，初始化地图数据
    var BMap = new bmap.BMapWX({
      ak: app.globalData.bmap_ak
    });
    // 失败执行的方法
    var fail = function (data) {
      if (data.errMsg == 'getLocation:fail auth deny') {
        // 更新页面状态为2，用户拒绝提供位置信息
        that.updateUserLocation(2);
      } else {
        // 更新页面状态为3，获取定位信息错误，或者定位不在大陆境内
        that.updateUserLocation(3);
      }
    };
    // 获取城市信息成功执行的方法
    var regeocoding_success = function (data) {
      // 获取地址数据
      var city_info = data.originalData.result;
      // 二次处理数据，将经纬度的数据，保留四舍五入保留五位小数
      city_info.location.lat = city_info.location.lat.toFixed(5);
      city_info.location.lng = city_info.location.lng.toFixed(5);
      // 更新页面状态为1，用户允许授权定位信息
      that.updateUserLocation(1);
      // 将相关数据，写到初始化的data数据中
      that.setData({
        cityInfo: city_info
      });
    };
    // 获取天气成功执行的方法
    var weather_success = function (data) {
      // 获取天气基本数据
      var weatherInfo = data.currentWeather[0];
      // 获取天气扩展信息
      var weatherInfoExt = data.originalData.results[0].weather_data;
      // 将天气预报数据写入定义（初始化）的变量中
      that.setData({
        weatherInfo: weatherInfo,
        weatherInfoExt: weatherInfoExt
      });
      // 天气获取成功之后，再调用其他数据（regeocoding接口有BUG，没有数据依然返回成功状态）
      // 调用接口获取城市地区信息
      BMap.regeocoding({
        fail: fail,
        success: regeocoding_success
      });
    };
    // 调用接口获取天气信息
    BMap.weather({
      fail: fail,
      success: weather_success
    });
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); // 显示顶部刷新图标
    this.getLocationAndWeather(); // 调用获取天气和地理位置的方法
    wx.hideNavigationBarLoading(); // 隐藏导航栏加载框
    wx.stopPullDownRefresh(); // 停止下拉动作
  },

  onLoad: function () {

    app.checkUserLocation();
    // 获取当前时间，并拆分成日期和时间两部分
    var current_time = util.formatTime(new Date()).split(' ');
    // 将时间部分记录，用于判断早晚
    this.setData({
      currentTime: current_time[1]
    });
    // 调用获取天气和地理位置的方法
    this.getLocationAndWeather();
    var that = this;
      wx.request({
      url: "http://192.168.43.58:8080/personalAssistant/investment/updateInvestment",
      data: { "userId": that.data.id },
      method: 'GET',
      success: function (res) {
        console.log(that.data.id);
      }
    });
  },

  tap_ch: function (e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  },
  tap_start: function (e) {
    // touchstart事件
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },
  tap_drag: function (e) {
    // touchmove事件
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if (this.data.mark < this.data.newmark) {
      this.istoright = true;
    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if (this.data.mark > this.data.newmark) {
      this.istoright = false;

    }
    this.data.mark = this.data.newmark;

  },
  tap_end: function (e) {
    // touchend事件
    this.data.mark = 0;
    this.data.newmark = 0;
    if (this.istoright) {
      this.setData({
        open: true
      });
    } else {
      this.setData({
        open: false
      });
    }
  }

})