const app = getApp()
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
    date: '',
    multiArray: [years, months, days],
    multiIndex: [0, 6, 14],
    choose_year: '',
    array: ['饮食', '交通', '娱乐', '生活用品','服饰','住宿','其他'],
    array1:['工资','补贴','奖金','投资','其他'],
    info:'',
    money:0,
    ty:'',
    choice:'',
    choice1:'',
    id:''
  },
  onLoad: function () {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();

    //设置默认的年份
    this.setData({
      choose_year: this.data.multiArray[0][0],
      multiIndex: [0, month, day, 10, 0]
    });
    this.setData({
      id: app.globalData.userId
    });
  },
  bindChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  notichange: function (e) {
    this.setData({
      choice: e.detail.value
    })
  },
  notichange1: function (e) {
    this.setData({
      choice1: e.detail.value
    })
  },
  radioChange:function(e){
    this.setData({
      ty:e.detail.value
    })
  },
  submit:function(){
    var that=this;
      if(that.data.ty=='收入'){
        wx.request({
          url: 'http://192.168.43.58:8080/personalAssistant/income/addIncome',
          method: 'POST',
          data: JSON.stringify({ incDate: that.data.date, incMoney: that.data.money, incType: that.data.array1[that.data.choice1], incName:that.data.info,userId:that.data.id}),
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

      }else{
        wx.request({
          url: 'http://192.168.43.58:8080/personalAssistant/expenses/addExpenses',
          method: 'POST',
          data: JSON.stringify({ expDate: that.data.date, expMoney: that.data.money, expType: that.data.array[that.data.choice], expName: that.data.info, userId: that.data.id }),
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
      }
  }


})