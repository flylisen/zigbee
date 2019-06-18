var app = getApp();
var username;
var pwd;
var rommid;
Page({
  data: {
    ins: -1,
    ins2: -1,
    ins3: -1,
  },
  kindToggle: function (e) {
    var ins = e.currentTarget.id;//获得下标
    if (this.data.ins == ins) {
      this.setData({
        ins: -1,
      })
    } else {
      this.setData({
        ins: ins,
      })
    }
  },
  kindToggle2: function (e) {
    var ins2 = e.currentTarget.id;//获得下标
    if (this.data.ins2 == ins2) {
      this.setData({
        ins2: -1,
      })
    } else {
      this.setData({
        ins2: ins2,
      })
    }
  },
  kindToggle3: function (e) {
    var ins3 = e.currentTarget.id;//获得下标
    if (this.data.ins3 == ins3) {
      this.setData({
        ins3: -1,
      })
    } else {
      this.setData({
        ins3: ins3,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    username = app.globalData.username;
    this.setData({
      username: username
    });
  },
  logout: function () {
    wx.closeSocket();
    var that = this;
    rommid = app.globalData.rommid
    console.log(rommid)
    if (rommid == 'rs') {
      wx.reLaunch({
         url: '../login/login',
      })
    } else {
      wx.reLaunch({
        url: '../romm/romm',
      })
    }
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  }
})