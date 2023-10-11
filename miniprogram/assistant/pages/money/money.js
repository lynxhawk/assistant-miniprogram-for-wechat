//获取应用实例
const app = getApp()

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    sum: 0,
    id:'',
    invest: [
      // {
      //   startdate: '2019-07-01',
      //   money: 100,
      //   rate: 0.03,
      //   type: '余额宝',
      //   profit:'0.01'
      // }
    ],
    outcome: [
      // {
      //   type: '余额宝',
      //   profit: '5.01'
      // },
    ]
  },
  onLoad: function () {
    var that = this;
    that.setData({
      id:app.globalData.userId
    })
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  onShow:function(e){
    var that = this;
    wx.request({
      url: "http://192.168.43.58:8080/personalAssistant/investment/getInvestmentList",
      data: { "userId": that.data.id },
      method: 'GET',
      success: function (res) {
        var list = res.data.list;
        if (list == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          for (var index in list) {
            list[index].invStartDate = list[index].invStartDate.substring(0, 10)
          }
          that.setData({
            invest: list
          });
        }
      }
    });
    wx.request({
      url: "http://192.168.43.58:8080/personalAssistant/investment/getCount",
      data: { "userId": that.data.id },
      method: 'GET',
      success: function (res) {
        var list = res.data.list;
        if (list == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({
            outcome: list
          });
        }
      }
    });
    wx.request({
      url: "http://192.168.43.58:8080/personalAssistant/user/sumInvPf",
      data: { "userId": that.data.id },
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

  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  delete: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定要删除此条记录吗？',

      success: function (res) {
        if (res.confirm) {
            wx.request({
              url: "http://192.168.43.58:8080/personalAssistant/investment/deleteInvestment",
              data: { invId:that.data.invest[index].invId,userId: that.data.id},
              method: 'GET',
              success: function (res) {
                var result = res.data.success
                var toastText = "删除成功！";
                if (result != true) {
                  toastText = "删除失败" + res.data.errMsg;
                } else {
                  that.data.invest.splice(e.target.dataset.index, 1)
                  //渲染数据
                  that.setData({
                    invest: that.data.invest
                  });
                }
                wx.showToast({
                  title: toastText,
                  icon: '',
                  duration: 2000
                });
              }
            });
        } else if (res.cancel) {
          console.log('点击取消了');

        }

      }
    })
  },
 

})