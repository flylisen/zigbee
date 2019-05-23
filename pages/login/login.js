var app=getApp();
var util = require('../../utils/md5.js'); 
Page({

  data: {
    
  },
  //管理者
  submit: function (e) {
    var username = e.detail.value.username;
    var pwd = e.detail.value.pwd;
    app.user(username,pwd);
    var that=this;
    if (username != '' && pwd!=''){
      let url = app.globalData.URL + 'login';
      let data = {
        actCode: 100,
        loginName: username,
        loginPwd: pwd,
        var: "2.0"
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
        if (res.data.code == 1 && res.data.giOnlineStatus==1) {
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          var token = res.data.token;
          var sign = util.hexMD5(timestamp + token + "rishun");
          console.log("令牌:" + token);
          console.log("时间戳" + timestamp);
          console.log("签名:" + sign);
          app.safety(timestamp, token, sign);
          //建立websocket连接 
          if (res.data.gwId != -1) {
            app.initWebSocket(res.data.gwId);
          }
          app.globalData.list = [
            {
              "pagePath": "/pages/index/index",
              "iconPath": "/images/kongzhitaishouye.png",
              "selectedIconPath": "/images/kongzhitaishouye2.png",
              "text": "控制"
            },
            {
              "pagePath": "/pages/config/config",
              "iconPath": "/images/dashujukeshihuaico-.png",
              "selectedIconPath": "/images/dashujukeshihuaico2-.png",
              "text": "配置"
            },
            {
              "pagePath": "/pages/about/about",
              "iconPath": "/images/wode.png",
              "selectedIconPath": "/images/wode2.png",
              "text": "关于我"
            }
          ]
          wx.switchTab({
            url: '../index/index',
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '网关不在线'
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