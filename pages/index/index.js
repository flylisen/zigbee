//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background1:'url("/images/TIM图片20190530145022.png")',
    background2: 'url("/images/TIM图片20190530145022.png")',
    background3: 'url("/images/TIM图片20190530145022.png")',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  control1: function (event){
      this.setData({
        background1: 'url("/images/TIM图片20190530153000.png")'
      })
    wx.navigateTo({
      url: '../areactr/areactr'
    })
  },
  control2: function (event) {
    this.setData({
      background2: 'url("/images/TIM图片20190530153000.png")'
    })
    wx.navigateTo({
      url: '../scenesctr/scenesctr'
    })
  },
  control3: function (event) {
    this.setData({
      background3: 'url("/images/TIM图片20190530153000.png")'
    })
    wx.navigateTo({
      url: '../devctr/devctr'
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
    //回调
    app.globalData.onReceiveWebsocketMessageCallback = function (res) {
      console.log('接收到服务器信息', res);
      console.log('当前页面在index');
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      background1: 'url("/images/TIM图片20190530145022.png")',
      background2: 'url("/images/TIM图片20190530145022.png")',
      background3: 'url("/images/TIM图片20190530145022.png")',
    })
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
