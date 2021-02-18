// pages/diary/diary.js
const app = getApp();
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    id:'',
    diary:[
      // {
      //   img:"img/google-earth-view-1140.jpg",
      //   title:"呼伦贝尔之行第一天",
      //   txt:"今日游览了额尔古纳的根河湿地，拾级而上支在草原上的木桥，将美景一览无余，清风微拂，阳光微照，近处的野花点缀着青葱的绿草，远处的山丘随着光线变幻着颜色，河流蜿蜒到远方...",
      //   date:"2016-06-01",
      //   location:"内蒙古 呼伦贝尔"
      // }
    ]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        id:app.globalData.userId
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: "http://192.168.43.58:8080/personalAssistant/photodiary/getPhotodiaryList",
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
            list[index].phdDate = list[index].phdDate.substring(0, 10)
          }
          that.setData({
            diary: list
          });
        }
      }
    });
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showmore:function(){
    wx.navigateTo({
      url: '/pages/article/article',
    })
  },
  delete: function(e) {
    var that = this;
    var idx = e.target.dataset.index;
    console.log(idx);
    wx.showModal({
      title: '提示',
      content: '确定要删除日记吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          wx.request({
            url: "http://192.168.43.58:8080/personalAssistant/photodiary/deletePhotodiary",
            data: { phdId: that.data.diary[e.target.dataset.index].phdId },
            method: 'GET',
            success: function (res) {
              var result = res.data.success
              var toastText = "删除成功！";
              if (result != true) {
                toastText = "删除失败" + res.data.errMsg;
              } else {
                that.data.diary.splice(e.target.dataset.index, 1)
                //渲染数据
                that.setData({
                  diary: that.data.diary
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
    }
})