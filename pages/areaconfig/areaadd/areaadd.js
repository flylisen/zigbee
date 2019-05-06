// pages/areaconfig/areaadd/areaadd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  submit: function (e) {
    var that = this
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    var name = e.detail.value.areaname;
    console.log(e.detail.value.areaname);
    wx.request({
      url: 'https://localhost:8443/addArea',
      method: "POST",
      data: {
        actCode: "106",
        bindid: username,
        areaName: e.detail.value.areaname,
        devs: [{
          deviceuid: 1184401,
          deviceuid: 730503,
        }],
        ver: "1"
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      
      }
    })
  },
  go: function(){
    wx.redirectTo({
      url: '../areaconfig',
    }, 2000)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})