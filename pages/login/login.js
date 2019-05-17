var app=getApp();
var util = require('../../utils/md5.js'); 
Page({

  data: {
    
  },
  submit: function (e) {
    var username = e.detail.value.username;
    var pwd = e.detail.value.pwd;
    app.user(username,pwd);
    wx.request({
      url: 'https://dev.rishuncloud.com:8443/login',
      data: {
        loginName: username,
        loginPwd: pwd,
        ver:'2.0'
      },
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.setStorage({
          key: "gwId",
          data: res.data.gwId,
        })
        if (res.statusCode == 200) {
          if (res.data.code == 1) {
            console.log(res.data);
            var timestamp = Date.parse(new Date());
            timestamp = timestamp / 1000;
            var token = res.data.token;
            var sign =util.hexMD5(timestamp + token +"rishun");
            console.log("令牌:" + token);
            console.log("时间戳"+timestamp);
            console.log("签名:"+sign);
            app.safety(timestamp,token,sign);
            if (res.data.error == true) {
              wx.showToast({
                title: '网络错误',
                icon: 'none',
                duration: 2000
              });
            } else {
              //建立websocket连接 
              if (res.data.gwId != -1) {
                app.initWebSocket(res.data.gwId);
              }
              wx.showToast({
                title: "登录成功",
                icon: "Yes",
                duration: 2000,
                success: function () {
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../index/index',
                    }, 2000)
                  })
                }
              })
            }
          } else {
            wx.showToast({
              title: "登录失败",
              icon: "No",
              duration: 2000,
            })
          }
        }
      }
    })
   }
})