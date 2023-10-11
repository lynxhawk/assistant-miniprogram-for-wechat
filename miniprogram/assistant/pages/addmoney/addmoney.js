const app = getApp();
const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
//获取年
for (let i = 2019; i <= date.getFullYear() + 5; i++) {
  years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}
Page({
  data: {
    title:'',
    date: '',
    multiArray: [years, months, days],
    multiIndex: [0, 6, 14],
    choose_year: '',
    money: 0,
    rate:0,
    type:''
  },

  onLoad: function () {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();

    //设置默认的年份
    this.setData({
      choose_year: this.data.multiArray[0][0],
      multiIndex: [0, month, day, 10, 0],
      id:app.globalData.userId
    })
  },
  bindChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  inputrate:function(e){
    this.setData({
      rate:e.detail.value
    })
  },
  notichange: function (e) {
    this.setData({
      choice: e.detail.value
    })
  },
  inputmoney:function(e){
    this.setData({
      money:e.detail.value
    })
  },
  inputtype:function(e){
    this.setData({
      type:e.detail.value
    })
  },
  submit: function (e) {
    var that = this;
    wx.request({
      url: 'http://192.168.43.58:8080/personalAssistant/investment/addInvestment',
      method: 'POST',
      data: JSON.stringify({ userId: that.data.id, invName: that.data.title, invMoney: that.data.money, invRate: that.data.rate, invStartDate: that.data.date }),
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        var result = res.data.success
        var toastText = "操作成功！";
        if (result != true) {
          toastText = "操作失败" + res.data.errMsg;
        }
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });
      }
    })
  },

})