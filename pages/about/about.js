var app = getApp();
var pwd;
var rommid;
Page({
  data: {
    logs: [],
    avatarUrl:'',
    nickName:''
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
    var user = app.globalData.userInfo;//获取用户的信息
    this.setData({
      avatarUrl: user.avatarUrl,
      nickName: user.nickName
    })
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
        url: '../appid/appid',
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
  },
})