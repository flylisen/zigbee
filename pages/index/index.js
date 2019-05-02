//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
  },
  onLoad: function () {
    console.log(app.globalData.gwId);
    var gwId = wx.getStorageSync('gwId');
    console.log(gwId);

    //建立连接
    wx.connectSocket({
      url: "wss://localhost:8443/websocket/" + gwId,
    })

    //连接成功
    wx.onSocketOpen(function () {
      console.log('websocket已成功连接！');
    })

    //接收数据
    wx.onSocketMessage(function (data) {
      console.log(data);
      var objData = JSON.parse(data.data);
      var type = objData.noteType
      switch (type) {
        case 1:   //新设备入网
          wx.showModal({
            title: '入网提示',
            content: '有新设备入网，确认添加该设备？',
            success(res) {
              if (res.confirm) {
                var username = wx.getStorageSync('username');
                var pwd = wx.getStorageSync('pwd');
                wx.request({
                  url: 'https://localhost:8443/getDev', //真实的接口地址           
                  data: {
                    bindid: username,
                    bindstr: pwd
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.log(res.data)
                    this.setData({
                      Industry: res.data.devs
                    })

                  },
                  fail: function (err) {
                    console.log(err)
                  }
                })
              } else if (res.cancel) {
                return;
              }
            }
          })

          break;
        case 2:   //设备上线
          var username = wx.getStorageSync('username');
          var pwd = wx.getStorageSync('pwd');
          wx.request({
            url: 'https://localhost:8443/getDev', //真实的接口地址           
            data: {
              bindid: username,
              bindstr: pwd
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)

            },
            fail: function (err) {
              console.log(err)
            }
          })
          break;
        case 3:   //设备删除
          var username = wx.getStorageSync('username');
          var pwd = wx.getStorageSync('pwd');
          wx.request({
            url: 'https://localhost:8443/delDev', //真实的接口地址           
            data: {
              bindid: username,
              bindstr: pwd
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)

              that.setData({
                Industry: res.data.devs,
                collected1: res.data.devs[14].diOnoffStatu,
                collected2: res.data.devs[15].diOnoffStatu
              })
              wx.setStorage({
                key: "diOnoffStatu",
                data: res.data.devs[6].diOnoffStatu,
              })
              wx.setStorage({
                key: "diDeviceuid",
                data: res.data.devs[6].diDeviceuid
              })
              wx.setStorage({
                key: "diName",
                data: res.data.devs[6].diName
              })
            },
            fail: function (err) {
              console.log(err)
            }
          })
          break;
        case 4:   //设备控制开关
          var username = wx.getStorageSync('username');
          var pwd = wx.getStorageSync('pwd');
          wx.request({
            url: 'https://localhost:8443/ctrDev', //真实的接口地址           
            data: {
              bindid: username,
              bindstr: pwd
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)

              that.setData({
                Industry: res.data.devs,
                collected1: res.data.devs[14].diOnoffStatu,
                collected2: res.data.devs[15].diOnoffStatu
              })
              wx.setStorage({
                key: "diOnoffStatu",
                data: res.data.devs[6].diOnoffStatu,
              })
              wx.setStorage({
                key: "diDeviceuid",
                data: res.data.devs[6].diDeviceuid
              })
              wx.setStorage({
                key: "diName",
                data: res.data.devs[6].diName
              })
            },
            fail: function (err) {
              console.log(err)
            }
          })
          break;
        case 5:   //修改名称
          var username = wx.getStorageSync('username');
          var pwd = wx.getStorageSync('pwd');
          wx.request({
            url: 'https://localhost:8443/editDevName', //真实的接口地址           
            data: {
              bindid: username,
              bindstr: pwd
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)

              that.setData({
                Industry: res.data.devs,
                collected1: res.data.devs[14].diOnoffStatu,
                collected2: res.data.devs[15].diOnoffStatu
              })
              wx.setStorage({
                key: "diOnoffStatu",
                data: res.data.devs[6].diOnoffStatu,
              })
              wx.setStorage({
                key: "diDeviceuid",
                data: res.data.devs[6].diDeviceuid
              })
              wx.setStorage({
                key: "diName",
                data: res.data.devs[6].diName
              })
            },
            fail: function (err) {
              console.log(err)
            }
          })
          break;
      }

    })

    //连接失败
    wx.onSocketError(function () {
      console.log('websocket连接失败！');
    })

    //连接关闭
    wx.onSocketClose(function () {
      console.log('WebSocket 已关闭！');
    })
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
