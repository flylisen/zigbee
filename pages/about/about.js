var app = getApp();
var username;
var pwd;
var rommid;
Page({
  data: {
  },
  kindToggle: function (e) {
    if (!this.pageLoading) {
      this.pageLoading = !0;
    wx.navigateTo({
      url: '../about/guide/guide',
    })
    }
  },
  kindToggle2: function (e) {
    if (!this.pageLoading) {
      this.pageLoading = !0;
    wx.navigateTo({
      url: '../about/idea/idea',
    })
    }
  },
  kindToggle3: function (e) {
    if (!this.pageLoading) {
      this.pageLoading = !0;
    wx.navigateTo({
      url: '../about/aboutus/aboutus',
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    username = app.globalData.rommid;
    if (username == 'RS@xcx12'){
    this.setData({
      username: app.globalData.username,
    });
    }else{
      this.setData({
        username:username,
      })
    }
  },
  logout: function () {
    wx.closeSocket();
    var that = this;
    rommid = app.globalData.rommid
    console.log(rommid)
    if (rommid == 'RS@xcx12') {
      if (!this.pageLoading) {
        this.pageLoading = !0;
      wx.reLaunch({
         url: '../login/login',
      })
      }
    } else {
      if (!this.pageLoading) {
        this.pageLoading = !0;
      wx.reLaunch({
        url: '../romm/romm',
      })
      }
    }
  },
  onShow: function () {
    this.pageLoading = !1;
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  }
})