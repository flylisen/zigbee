//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    
  },
  onLoad: function () {
    //test
  },
  getUserInfo: function(e) {
    wx.request({
      url: 'http://localhost:8080/dev/hello',
      success:function(res) {
        console.log(res);
      }
    })
  }
})
