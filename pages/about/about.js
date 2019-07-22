var app = getApp();
var username;
var pwd;
var rommid;
const util = require('../../utils/util.js')
//把winHeight设为常量，不要放在data里（一般来说不用于渲染的数据都不能放在data里）
const winHeight = wx.getSystemInfoSync().windowHeight
Page({
  data: {
    logs: []
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
    this.setData({
      winH: wx.getSystemInfoSync().windowHeight,
      opacity: 1,
      //这个是微信官方给的获取logs的方法 看了收益匪浅
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
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
    this.hide()
    this.pageLoading = !1;
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
  //核心方法，线程与setData
  hide: function () {
    var vm = this
    var interval = setInterval(function () {
      if (vm.data.winH > 0) {
        //清除interval 如果不清除interval会一直往上加
        clearInterval(interval)
        vm.setData({ winH: vm.data.winH - 5, opacity: vm.data.winH / winHeight })
        vm.hide()
      }
    }, 5);
  }
})