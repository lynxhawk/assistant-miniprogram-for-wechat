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
    time: '',
    date:'',
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [0, 6, 13, 10, 1],
    choose_year: '',
    des:'',

    check:0,
    array:['每天重复','每月重复'],
    repeattimes:'',
    location:'',
    id:'',
    datetime:'',
    times:'',
    alldate:'',
    yy:null,
    mm:null,
    dd:null,
    index:''
  },
  onLoad: function () {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    this.setData({
      id: app.globalData.userId
    })
    //设置默认的年份
    this.setData({
      choose_year: this.data.multiArray[0][0],
      multiIndex:[0,month,day,10,0],
    })
  },
  bindinputtimes:function(e){
    this.setData({
      times:e.detail.value
    })
  },
  bindinputdes:function(e){
    this.setData({
      des:e.detail.value
    })
  },
  //获取时间日期
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    this.setData({
      time: hour + ':' + minute+':'+'00',
      date: year + '-' + month + '-' + day,
      datetime: year + '-' + month + '-' + day + ' ' + hour + ':' + minute,
      yy:year,
      mm:month,
      dd:day
    })
    console.log(year + '-' + month + '-' + day + ' ' + hour + ':' + minute);
  },

  bindMultiPickerColumnChange: function (e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      console.log(choose_year);
      this.setData({
        choose_year
      })
    }
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);

        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  repeatchange:function(e){
     this.setData({
      index: e.detail.value
    })
  },
  notichange: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  bindinputtitle:function(e){
    this.setData({
      title:e.detail.value
    })
  },
  submit:function(){
    var that = this;
    const tt = this.data.times;
    var str = '';
    if(that.data.array[that.data.index]=='每天重复'){
      for(var i = 0;i<tt;i++){
        this.data.dd =parseInt(this.data.dd)+1;
        str = str+this.data.yy+"-"+this.data.mm+'-'+this.data.dd+',';
      } 
      that.setData({
        alldate:str
      })
    }else if(that.data.array[that.data.index]=='每月重复'){
      for (var i = 0; i < tt; i++) {
        this.data.mm = parseInt(this.data.mm)+1;
        str = str + this.data.yy + "-" + this.data.mm + '-' + this.data.dd + ',';
      }
      that.setData({
        alldate: str
      })
    }
      wx.request({
        url: 'http://192.168.43.58:8080/personalAssistant/schedule/addSchedule',
        method: 'POST',
        data: JSON.stringify({ userId: that.data.id, scName: that.data.title,scStartTime:that.data.time,scRepeatType:that.data.array[that.data.index],scRepeatTimes:that.data.times,scStartDate: that.data.date,scRemindDays:that.data.alldate}),
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

})