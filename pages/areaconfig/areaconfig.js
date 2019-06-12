// pages/areaconfig/areaconfig.js
var app = getApp();
var username;
var pwd;
var timestamp;
var token;
var sign;
var username;
var pwd;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortedAreas: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    username = app.globalData.username;  //网关账号 
    pwd = app.globalData.pwd;  //网关密码 
    timestamp = app.globalData.timestamp;
    token = app.globalData.token;
    sign = app.globalData.sign;
    let url = app.globalData.URL + 'areaList?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      actCode: 107,
      bindid: username,
      bindstr: pwd
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      var tmp = {};
      for (var index in res.data.areas) {
        var tag = res.data.areas[index].aiId + res.data.areas[index].aiName + '';
        if (tmp[tag] == null || tmp[tag] == undefined) {
          tmp[tag] = new Array();
        }
        tmp[tag].push(res.data.areas[index]);
      };
      var areaResult = [];
      for (var key in tmp) {
        for (var j = 0; j < tmp[key].length; j++) {
          areaResult.push(tmp[key][j]);
        }
      }
      console.log(areaResult);
      that.setData({
        sortedAreas: areaResult
      });
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  bindAdd: function () {
    wx.navigateTo({
      url: '../areaconfig/areaadd/areaadd',
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    //回调
    app.globalData.onReceiveWebsocketMessageCallback = function (res) {
      console.log('接收到服务器信息', res);
      console.log('当前页面在areaconfig');
    }
  },
  /**
    * 生命周期函数--监听页面卸载
    */
  onUnload: function () {
    var pages = getCurrentPages(); // 当前页面 
    var beforePage = pages[pages.length - 2]; // 前一个页面
    beforePage.onLoad();
  },
  /** 
   * 生命周期函数--监听页面初次渲染完成 
   */
  onShareAppMessage: function () {

  },
  areainfo: function (event) {
    // var aiId = event.currentTarget.id;
    var aiid = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['id']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'areainfo/areainfo?aiid=' + aiid
    })
  }
})