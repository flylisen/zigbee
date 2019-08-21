//xx.js
const app = getApp()
const utils = require('../../utils/util.js')
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
  },
  control1: function (event) {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({
        url: '../../control/pages/areactr/areactr'
      })
    }
  },
  control2: function (event) {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({
        url: '../../control/pages/scenesctr/scenesctr'
      })
    }
  },
  control3: function (event) {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({
        url: '../../control/pages/devctr/devctr'
      })
}
},   
  onShow: function () {
    this.pageLoading = !1;

  }
})