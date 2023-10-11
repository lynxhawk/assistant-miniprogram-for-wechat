Page({
  data: {
    source: '',
    article:'',
    title:'',
    date:'',
    location:'',
    id:''
  },
  onLoad: function () {
      this.setData({
        id:getApp().globalData.userId
      })
  },
  uploading: function () {
    var that = this;
    wx.chooseImage({  //从本地相册选择图片或使用相机拍照
      count: 1,
      //sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      //sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        that.setData({
          source: res.tempFilePaths[0]
        })
      }
    });

  },
  bindChange:function(e){
    this.setData({
      date:e.detail.value
    })
  },
  getLocation(e) {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res.address)
        console.log(res.latitude)
        console.log(res.longitude)
        console.log(res.name)
        var location = res.address
        that.setData({
          location: location
        })
      }
    })
  },
  submitForm:function(){
    var that=this;
    console.log(that.data.source);
    wx.request({
      url: 'http://192.168.43.58:8080/personalAssistant/photodiary/addPhotodiary',
      method: 'POST',
      data: JSON.stringify({ userId: that.data.id, phdDiary: that.data.article, phdPosition: that.data.location, phdDate: that.data.date,phdPhoto:that.data.source}),
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
  handleTitleInput:function(e){
    this.setData({
      title:e.detail.value
    })
  },
  handleContentInput:function(e){
    this.setData({
      article:e.detail.value
    })
  }




})