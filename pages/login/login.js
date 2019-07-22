var app=getApp();
var util = require('../../utils/md5.js'); 
const utils = require('../../utils/util.js')
const winHeight = wx.getSystemInfoSync().windowHeight
Page({

  data: {
    username:'',
    pwd:'',
    bool:true,
    tp:'/images/yc.png'
  },
  phoneInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  pass:function(){
    if (this.data.tp =='/images/xs.png'){
    this.setData({
      bool: true,
      tp: '/images/yc.png'
    })
   }else{
      this.setData({
        bool: false,
        tp: '/images/xs.png'
    })
   }
  },
  login: utils.throttle(function(){
    var username = this.data.username;
    var pwd = this.data.pwd;
      if (username != '' && pwd != '') {
        app.user(username, pwd);
        var that = this;
        let url = app.globalData.URL + 'login';
        let data = {
          actCode: 100,
          loginName: username,
          loginPwd: pwd,
          var: "2.0"
        };
        app.wxRequest('POST', url, data, (res) => {
          console.log(res.data)
          if (res.data.code == 1 && res.data.giOnlineStatus == 1) {
            var timestamp = Date.parse(new Date());
            timestamp = timestamp / 1000;
            var token = res.data.token;
            var sign = util.hexMD5(timestamp + token + "rishun");
            app.safety(timestamp, token, sign);
            app.gw(res.data.gwId);
            //建立websocket连接
            if (res.data.gwId != -1) {
              app.initSocket();
            }
            wx.switchTab({
              url: '../index/index',
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '网关不在线或用户名与密码错误'
            })
            this.setData({
              username: '',
              pwd:'',
            })
          }
        },
          (err) => {
            console.log(err.errMsg)
          }
        )
      }else{
        wx.showModal({
          title: '提示',
          content: '请输入用户名和密码'
        })
      }
  },3000),
  onLoad:function(){
    this.setData({
      winH: wx.getSystemInfoSync().windowHeight,
      opacity: 1,
      //这个是微信官方给的获取logs的方法 看了收益匪浅
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onShow:function(){
    this.hide()
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
  },
})