const app = getApp()
Page({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    day:0,
    id:app.globalData.userId,
    dateNum:'',
    remind:[
      // {
      //   title:'取快递'
      // },
    ]
  },
  onLoad: function () {
    var that = this;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    this.dateInit();
      this.setData({
        year: year,
        month:month,
        isToday: '' + year + month + now.getDate(),
        day: day,
      });
    console.log(year + '-' + '0'+month + '-' + day);
    var that = this;
    this.setData({
      id: app.globalData.userId
    })
    wx.request({
      url: "http://192.168.43.58:8080/personalAssistant/schedule/getTodayScheduleList",
      data: { userId: that.data.id
            ,date: year+'-'+'0'+month+'-'+day},
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
            list[index].scStartDate = list[index].scStartDate.substring(0, 10);
            list[index].scEndDate = list[index].scEndDate.substring(0, 10)
          }
          that.setData({
            remind: list
          });
        }
      }
    });
  },
  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];                       //需要遍历的日历数组数据
    let arrLen = 0;                         //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();                 //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();                          //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();               //获取目标月有多少天
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month + 1) + num,
          dateNum: num,
          weight: 5
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  /**
   * 上月切换
   */
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  /**
   * 下月切换
   */
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  deletesc:function(e){
    var that = this;
    var idx = e.target.dataset.index;
    console.log(idx);
    wx.showModal({
      title: '提示',
      content: '确定要删除日程提醒吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          wx.request({
            url: "http://192.168.43.58:8080/personalAssistant/schedule/deleteSchedule",
            data: { scId: that.data.remind[e.target.dataset.index].scId },
            method: 'GET',
            success: function (res) {
              var result = res.data.success
              var toastText = "删除成功！";
              if (result != true) {
                toastText = "删除失败" + res.data.errMsg;
              } else {
                that.data.remind.splice(e.target.dataset.index, 1)
                //渲染数据
                that.setData({
                 remind: that.data.remind
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
      }
    })
  },


  lookHuoDong:function(e){
    // var cur_day = e.currentTarget.dataset.dateNum;
    // this.setData({
    //   todayIndex: cur_day
    // })
    // console.log(this.data.todayIndex);
    var that=this;
    wx.request({
      url: "http://192.168.43.58:8080/personalAssistant/schedule/getTodayScheduleList",
      data: {
        userId: that.data.id
        , date: that.data.year + '-' + '0' + that.data.month + '-' + that.data.day
      },
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
            list[index].scStartDate = list[index].scStartDate.substring(0, 10);
            list[index].scEndDate = list[index].scEndDate.substring(0, 10)
          }
          that.setData({
            remind: list
          });
        }
      }
    });
  }

})