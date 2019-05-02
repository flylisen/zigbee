//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
  },
  onLoad: function () {
   
  },
  onReady : function() {
    //回调
    app.globalData.onReceiveWebsocketMessageCallback = function (res) {
      console.log('接收到服务器信息', res);
      console.log('当前页面在index');
    }
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
