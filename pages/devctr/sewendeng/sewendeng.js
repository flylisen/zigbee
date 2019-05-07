// pages/devctr/sewendeng/sewendeng.js
var sewendengs = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diNames: '',
    chuanglians: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sewendeng = decodeURIComponent(options.sewendeng);
    sewendengs = JSON.parse(sewendeng);
    this.setData({
      diNames: sewendengs.diName,
      chuanglians: sewendengs.diOnlineStatu
    });
    //获取色温灯的色温值、开关值
    var that = this;
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');
    wx.request({
      url: 'https://dev.rishuncloud.com:8443/getColorTempInfo', //真实的接口地址            
      data: {
        act: "gettemperature",
        code: "213",
        AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
        key: "bq6wqzasjwtkl0i21pi9fbeq4",
        bindid: username,
        bindstr: pwd,
        ver: '1',
        devs: [{ deviceuid: sewendengs.diDeviceuid }]
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