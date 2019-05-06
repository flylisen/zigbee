// pages/areaconfig/areaconfig.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  onLoad: function (options) {

    console.log('onLoad')
    var that = this;
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');
    wx.request({
      url: 'https://localhost:8443/areaList', //真实的接口地址            
      data: {
        bindid: username,
        bindstr: pwd
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  bindAdd: function () {
    wx.redirectTo({
      url: '../areaconfig/areaadd/areaadd',
    }, 2000)
  },

  /** 
   * 生命周期函数--监听页面初次渲染完成 
   */ 
  onShareAppMessage: function () {

  }
})