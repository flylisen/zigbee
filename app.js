//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    localWebsocket: {},      //websocket对象
    gwId: -1,
    onReceiveWebsocketMessageCallback: function(){}                
  },
  //初始化websocket
  initWebSocket: function (gwId) {
    let that = this;
    that.globalData.gwId = gwId;
    //建立websocket连接
    console.log('初始化建立websocket连接');
    that.globalData.localWebsocket = wx.connectSocket({
      url: 'wss://dev.rishuncloud.com:8443/websocket/' + that.globalData.gwId,
    });
    //websocket连接打开
    that.globalData.localWebsocket.onOpen(function(res) {
      console.log('websocket已建立连接');
    });
    //websocket连接出错
    that.globalData.localWebsocket.onError(function(res) {
      console.log('websocket连接出错');
    });
    //连接关闭 重连
    that.globalData.localWebsocket.onClose(function(res) {
      console.log('websocket连接关闭');
      /**if (that.globalData.gwId != -1) {
        console.log('执行websocket重连');
        that.initWebSocket(that.globalData.gwId);
      }**/
    });
    //websocket接收到信息
    that.globalData.localWebsocket.onMessage(function(res) {
      console.log('-------------------------');
      that.globalData.onReceiveWebsocketMessageCallback(res);
    }); 
  }
})