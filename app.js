//app.js
let socketMsgQueue = []
let isLoading = false
App({
 //设置全局对象  
  globalData: {
    userInfo: null,
    username:'',
    list:[],
    index:0,
    pwd:'',
    rommid:'',
    timestamp:'',
    token:'',
    sign:'',
    data:'',
    URL: 'https://dev.rishuncloud.com:8443/',
    gwId: -1,  
    localSocket: {},
    callback: function () { }
  },
  /**  
  * 
  * 封装wx.request请求  
  * method： 请求方式  
  * url: 请求地址  
  * data： 要传递的参数  
  * callback： 请求成功回调函数  
  * errFun： 请求失败回调函数  
  **/
  wxRequest(method, url, data, callback, errFun) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        callback(res);
      },
      fail: function (err) {
        errFun(res);
      }
    })
  },
  //获取用户名与密码
  user: function (username, pwd){
    let that = this;
    that.globalData.username=username;
    that.globalData.pwd=pwd;
  },
  gw:function(gwId){
    let that = this;
    that.globalData.gwId = gwId;
  },
  room: function(roomid){
    let that = this;
    that.globalData.rommid = roomid;
  },
  //获取timestamp(时间戳)，token(令牌)，sign（签名）
  safety: function (timestamp,token,sign){
    let that = this;
    that.globalData.timestamp = timestamp;
    that.globalData.token = token;
    that.globalData.sign = sign;
  },
  showLoad() {
    if (!isLoading) {
      wx.showLoading({
        title: '请稍后...',
      })
      isLoading = true
    }
  },
  hideLoad() {
    wx.hideLoading()
    isLoading = false
  },
  initSocket() {
    let that = this
    that.globalData.localSocket = wx.connectSocket({
      url: 'wss://dev.rishuncloud.com:8443/websocket/'+that.globalData.gwId
    })
    that.showLoad()
    that.globalData.localSocket.onOpen(function (res) {
      console.log('WebSocket连接已打开！readyState=' + that.globalData.localSocket.readyState)
      that.hideLoad()
      while (socketMsgQueue.length > 0) {
        var msg = socketMsgQueue.shift();
        that.sendSocketMessage(msg);
      }
    })
    that.globalData.localSocket.onMessage(function (res) {
      that.hideLoad()
      that.globalData.callback(res)
    })
    that.globalData.localSocket.onError(function (res) {
      console.log('readyState=' + that.globalData.localSocket.readyState)
    })
    that.globalData.localSocket.onClose(function (res) {
      console.log('WebSocket连接已关闭！readyState=' + that.globalData.localSocket.readyState)
    })
  },
  //统一发送消息
  sendSocketMessage: function (msg) {
    if (this.globalData.localSocket.readyState === 1) {
      this.showLoad()
      this.globalData.localSocket.send({
        data: JSON.stringify(msg)
      })
    } else {
      socketMsgQueue.push(msg)
    }
  },
   onShow: function (options) {
     let that = this;
     console.log(that.globalData.gwId);
     if(that.globalData.gwId==-1){
       console.log("还不能建立连接")
     }else{
     if (this.globalData.localSocket.readyState !== 0 && this.globalData.localSocket.readyState !== 1) {
       console.log('开始尝试连接WebSocket！readyState=' + this.globalData.localSocket.readyState)
       this.initSocket()
     }
   }
   }
})