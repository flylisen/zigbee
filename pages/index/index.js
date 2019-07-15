//index.js
//获取应用实例
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    loadFlag:'',
    imageHeight:'',
  },
  bindload: function (res) {
    this.setData({
      loadFlag: true,
      imageHeight: res.detail.height

    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  control1: function (event){
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({
        url: '../areactr/areactr'
      })
    }
  },
  control2: function (event) {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({
        url: '../scenesctr/scenesctr'
      })
    }
  },
  control3: function (event) {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({
        url: '../devctr/devctr'
      })
    }    
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
    this.pageLoading = !1;
    //回调
    app.globalData.callback= function (res) {
      console.log('当前页面在index');
    }
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
    
  }
})
