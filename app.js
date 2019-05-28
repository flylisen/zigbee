//app.js
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
    localWebsocket: {},      //websocket对象
    URL: 'https://dev.rishuncloud.com:8443/',  
    gwId: -1,
    onReceiveWebsocketMessageCallback: function () { },
  },
  onLaunch:function(){

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
    that.globalData.localWebsocket.onOpen(function (res) {
      console.log('websocket已建立连接');
    });
    //websocket连接出错
    that.globalData.localWebsocket.onError(function (res) {
      console.log('websocket连接出错');
    });
    //连接关闭 重连
    that.globalData.localWebsocket.onClose(function (res) {
      console.log('websocket连接关闭');
      /**if (that.globalData.gwId != -1) {
        console.log('执行websocket重连');
        that.initWebSocket(that.globalData.gwId);
      }**/
    });
    //websocket接收到信息
    that.globalData.localWebsocket.onMessage(function (res) {
        console.log('-------------------------');
        that.globalData.onReceiveWebsocketMessageCallback(res);
    });
  }
})