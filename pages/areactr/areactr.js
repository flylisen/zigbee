// pages/areactr/areactr.js
const app = getApp();
var username;
var pwd;
var timestamp;
var token;
var sign;
var rommid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false
  },
  bindAdd: function () {
    wx.navigateTo({
      url: '../areaconfig/areaconfig'
    })
  },
  go: function () {
    this.setData({
      showModal: false
    });
    wx.redirectTo({
      url: '../areactr/areactr',
    }, 2000)
  },
  //跳转到区域配置页面
  scenesctr: function () {
    wx.navigateTo({
      url: '../areaconfig/areaconfig'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this;
    username = app.globalData.username;  //网关账号 
    pwd = app.globalData.pwd;  //网关密码 
    timestamp = app.globalData.timestamp;
    token = app.globalData.token;
    sign = app.globalData.sign;
    console.log(username)
    rommid = app.globalData.rommid;
    console.log(rommid);
    that.setData({
      rommid
    })
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
      var sortResult = [];
      for (var key in tmp) {
        for (var j = 0; j < tmp[key].length; j++) {
          sortResult.push(tmp[key][j]);
        }
      }
      console.log(sortResult)
      that.setData({
        sortedAreas: sortResult
      });
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  areainfo: function (event) {
    // var aiId = event.currentTarget.id;
    console.log(event.currentTarget.dataset['id']);
    var aiid = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['id']));//函数可把字符串作为 URI
    console.log(aiid)
    wx.navigateTo({
      url: 'areainfo/areainfo?aiid=' + aiid
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //回调
    app.globalData.onReceiveWebsocketMessageCallback = function (res) {
      console.log('接收到服务器信息', res);
      console.log('当前页面在areactr');
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})