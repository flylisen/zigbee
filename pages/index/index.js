//xx.js
const util = require('../../utils/util.js')
const app = getApp()
//把winHeight设为常量，不要放在data里（一般来说不用于渲染的数据都不能放在data里）
const winHeight = wx.getSystemInfoSync().windowHeight

Page({
  data: {
    logs: [],
    loadFlag: '',
    imageHeight: ''
  },
  bindload: function (res) {
    this.setData({
      loadFlag: true,
      imageHeight: res.detail.height
    })
  }, 
  onLoad: function () {
    this.setData({
      winH: wx.getSystemInfoSync().windowHeight,
      opacity: 1,
      //这个是微信官方给的获取logs的方法 看了收益匪浅
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  control1: function (event) {
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
  onShow: function () {
    this.hide()
    this.pageLoading = !1;
    //回调
    app.globalData.callback = function (res) {
      console.log('当前页面在index');
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
    }, 10);
  }
})