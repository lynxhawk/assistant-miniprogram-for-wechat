//获取应用实例
const app = getApp()

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    money:0,
    out:0,
    id:app.globalData.userId,
    income:[
      // {
      //   date:'2019-07-01',
      //   money:100,
      //   info:111,
      //   type:'其他'
      // },
    ],
    outcome: [
      // {
      //   date: '2019-07-01',
      //   money: 100,
      //   info: 111,
      //   type: '饮食'
      // },
    ]
  },
  onShow:function(){
    var that = this;
    console.log(that.data.id);
    wx.request({ 
      url:"http://192.168.43.58:8080/personalAssistant/expenses/getExpensesList",
      data: {"userId":that.data.id},
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
            list[index].expDate=list[index].expDate.substring(0,10)
          }
          that.setData({
            outcome: list
          });
        }
      }
    });
      wx.request({
      url: "http://192.168.43.58:8080/personalAssistant/income/getIncomeList",
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
              list[index].incDate = list[index].incDate.substring(0, 10)
            }
            that.setData({
              income: list
            });
          }
        }
      });
    wx.request({
      url: "http://192.168.43.58:8080/personalAssistant/user/sumExcepses",
      data: { "userId": that.data.id },
      method: 'GET',
      success: function (res) {
        var out = res.data.sumExcepses;
        if (out == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({
            out: out
          });
        }
      }
    });
    wx.request({
      url: "http://192.168.43.58:8080/personalAssistant/user/sumIncome",
      data: { "userId": that.data.id },
      method: 'GET',
      success: function (res) {
        var money = res.data.sumIncome;
        if (money == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          }); 
        } else {
          that.setData({
            money: money
          });
        }
      }
    })
  },
  onLoad: function () {
    var that = this;
    that.setData({
      id: app.globalData.userId
    });
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
          console.log('点击确定了');

          if(that.data.currentTab==0){
            wx.request({
              url: "http://192.168.43.58:8080/personalAssistant/income/deleteIncome",
              data: { incId: that.data.income[e.target.dataset.index].incId },
              method: 'GET',
              success: function (res) {
                var result = res.data.success
                var toastText = "删除成功！";
                if (result != true) {
                  toastText = "删除失败" + res.data.errMsg;
                } else {
                  that.data.income.splice(e.target.dataset.index, 1)
                  //渲染数据
                  that.setData({
                    income: that.data.income
                  });
                }
                wx.showToast({
                  title: toastText,
                  icon: '',
                  duration: 2000
                });
              }
            })
          }else{
          wx.request({
            url: "http://192.168.43.58:8080/personalAssistant/expenses/deleteExpenses",
            data: { expId: that.data.outcome[e.target.dataset.index].expId},
            method: 'GET',
            success: function (res) {
              var result = res.data.success
              var toastText = "删除成功！";
              if (result != true) {
                toastText = "删除失败" + res.data.errMsg;
              } else {
                that.data.outcome.splice(e.target.dataset.index, 1)
                //渲染数据
                that.setData({
                  outcome: that.data.outcome
                });
              }
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000
              });
            }
          })
          }
          
        } else if (res.cancel) {
      
        }
        
      }
    })
  }
})