const app = getApp()
var util = require('../../utils/md5.js');
const utils = require('../../utils/util.js')
Page({
  data: {
    rommid: '',
    userInfo: {},
    usernoneSrc: "/images/wo.png",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  rommid: function (e) {
    this.setData({
      rommid: e.detail.value
    })
  },
  //登录获取code
  login: function () {
    let that=this;
    wx.login({
      success: function (res) {
        //发送请求
        wx.request({
          url: 'https://dev.rishuncloud.com:8443/ConnectTest', //接口地址
          data: { code: res.code },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            var devss = res.data.devss;//获取用户openid和session_key
            var jsonstr = JSON.parse(devss);//json字符串转换为hson对象
            console.log(jsonstr);
            app.devss(jsonstr);
          },
          fail: function (res) {
            console.log("Fail to connect...");
          }
        })
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(res.userInfo);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail.userInfo);
    if (typeof (e.detail.userInfo) == "undefined"){
       this.setData({
         hasUserInfo:false,
       })
    }else{
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },
  logins: utils.throttle(function () {
    var jsonstr = app.globalData.jsonstr;
    console.log(jsonstr.openid);
    if (this.data.rommid != '') {
      let url = app.globalData.URL + 'identify';
      let data = {
        roomName: this.data.rommid,
        openid: jsonstr.openid,
        var: "2.0"
      }
      var roomid = this.data.rommid;
      app.room(roomid)
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
        var username = res.data.gwLoginName;
        var pwd = res.data.gwLoginPwd;
        var rstatus=res.data.rstatus;//入住状态
        var hoteid = res.data.hoteid;//酒店ID
        app.user(username,pwd);
        app.hotel(rstatus, hoteid);
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
              app.gw(res.data.gwId);
              //建立websocket连接
              if (res.data.gwId != -1) {
                app.initSocket();
              }
              wx.switchTab({
                url: '../index/index',
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '网关不在线或用户名与密码错误',
              })
              this.setData({
                rommid: '',
              })
            }
          },
            (err) => {
              console.log(err.errMsg)
            }
          )
        } else if (roomid == 'RS@xcx12') {
          wx.redirectTo({
            url: '../login/login'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '请输入正确的房间号'
          })
          this.setData({
            rommid: '',
          })
        }
        (err) => {
          console.log(err.errMsg)
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入房间号'
      })
    }
  }, 500)
})
