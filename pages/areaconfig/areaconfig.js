// pages/areaconfig/areaconfig.js
var app=getApp();
var timestamp;
var token;
var sign;
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
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');
    let url = app.globalData.URL + 'areaList?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      actCode:107,
      bindid: username,
      bindstr: pwd
    };
    app.wxRequest('POST', url, data, (res) => {
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
      wx.setStorageSync('areaResult',areaResult);
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
    wx.redirectTo({
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
   * 生命周期函数--监听页面初次渲染完成 
   */ 
  onShareAppMessage: function () {

  },
  areainfo:function(event){
    // var aiId = event.currentTarget.id;
    console.log(event.currentTarget.dataset['id']);
    var aiid = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['id']));//函数可把字符串作为 URI
    console.log(aiid)
    wx.navigateTo({
      url: 'areainfo/areainfo?aiid=' + aiid
    })
  }
})