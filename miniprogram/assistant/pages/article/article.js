// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "img/google-earth-view-1140.jpg",
    title: "呼伦贝尔之行第一天",
    txt: "今日游览了额尔古纳的根河湿地，拾级而上支在草原上的木桥，将美景一览无余，清风微拂，阳光微照，近处的野花点缀着青葱的绿草，远处的山丘随着光线变幻着颜色，河流蜿蜒到远方...",
    date: "2016-06-01",
    location: "内蒙古 呼伦贝尔"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  onShareAppMessage: function (res) {
    var that = this;
    // var goods_id = that.data.goods_id;//获取产品id
    // var goods_title = that.data.goods_title;//获取产品标题
    // var goods_img = that.data.goods_img;//产品图片
    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        img: "img/google-earth-view-1140.jpg",
        title: "呼伦贝尔之行第一天",
        txt: "今日游览了额尔古纳的根河湿地，拾级而上支在草原上的木桥，将美景一览无余，清风微拂，阳光微照，近处的野花点缀着青葱的绿草，远处的山丘随着光线变幻着颜色，河流蜿蜒到远方...",
        date: "2016-06-01",
        location: "内蒙古 呼伦贝尔"
      }
    }
  }
})