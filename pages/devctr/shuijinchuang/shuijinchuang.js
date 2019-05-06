// pages/devctr/shuijinchuang/shuijinchuang.js
var shuijinchuangs='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diNames: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shuijinchuang = decodeURIComponent(options.shuijinchuang);
    shuijinchuangs = JSON.parse(shuijinchuang);
    this.setData({
      diNames: shuijinchuangs.diName,
    });
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    wx.request({
      url: 'https://localhost:8443/getSensorAttrValue', 
      method: 'POST',
      data: {
        actCode:"110",
        bindid: username,
        bindstr: pwd,
        deviceuid: shuijinchuangs.diDeviceuid,
        ver:"1"
      },
      header:
      {
        'content-type': 'application/json' // 默认值 
      },
      success: function (res) {
        console.log(res.data)
      }
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