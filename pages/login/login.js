var app=getApp();
var util = require('../../utils/md5.js'); 
Page({

  data: {
    showModal: false,
    username:'',
    pwd:'',
    rommid:'',
    btn:'',
  },
  username: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  pwd: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  rommid: function (e) {
    this.setData({
      rommid: e.detail.value
    })
  },
  /**
 * 隐藏模态对话框
 */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
  * 弹窗
  */
  glz: function () {
    this.setData({
      showModal: true,
      index: 1,
    }),
    this.data.btn=1;
  },
  kh: function () {
    this.setData({
      showModal: true,
      index: 2
    })
    this.data.btn = 2;
  },
  /**
 * 对话框取消按钮点击事件
 */
  onCancel: function () {
    this.hideModal();
  },
  onConfirm:function(){
    var username = this.data.username;
    var pwd = this.data.pwd;
    if (this.data.btn==1){
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
            app.globalData.index = 1;
            wx.reLaunch({
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
  if (this.data.btn==2){
    if (this.data.rommid != '') {
      let url = app.globalData.URL + 'identify';
      let data = {
        roomName: this.data.rommid,
        var: "2.0"
      }
      var roomid = this.data.rommid
      console.log(roomid)
      app.room(roomid)
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
        var username = res.data.gwLoginName;
        var pwd = res.data.gwLoginPwd;
        app.user(username, pwd);
        console.log(username);
        console.log(pwd);
        if (username != '' && pwd != '') {  //客人
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
                  "pagePath": "/pages/about/about",
                  "iconPath": "/images/wode.png",
                  "selectedIconPath": "/images/wode2.png",
                  "text": "关于我"
                }
              ]
              app.globalData.index=2;
              wx.reLaunch({
                url: '../index/index', 
              })
            } else {
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
        }
        (err) => {
          console.log(err.errMsg)
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请输入房间号'
      })
    }
  }
  }
})