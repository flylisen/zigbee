var app=getApp();
var util = require('../../utils/md5.js'); 
Page({

  data: {
    username:'',
    pwd:'',
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
  login:function(){
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
            //建立websocket连接 
            if (res.data.gwId != -1) {
              app.initWebSocket(res.data.gwId);
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
  }
})