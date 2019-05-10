// pages/areaconfig/areainfo/areainfo.js
var Industrys;
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortedDevs: '',
    aiNames:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var aiid = decodeURIComponent(options.aiid);
    Industrys = JSON.parse(aiid);
    console.log("id="+Industrys)
     this.setData({
       aiNames: Industrys.aiName
     })
    console.log('onLoad')
    var that = this;
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');
    let url = app.globalData.URL + 'getAreaDev';
    let data = {
      actCode: "108",
      bindid: username,
      areaId: Industrys.aiId,
      ver: "1"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data);
      var tmp = {};
      for (var index in res.data.devs) {
        var tag = res.data.devs[index].diDeviceid + res.data.devs[index].diZonetype + '';
        if (tmp[tag] == null || tmp[tag] == undefined) {
          tmp[tag] = new Array();
        }
        tmp[tag].push(res.data.devs[index]);
      };
      var sortResult = [];
      for (var key in tmp) {
        for (var j = 0; j < tmp[key].length; j++) {
          sortResult.push(tmp[key][j]);
        }
      }
      console.log(sortResult);
      that.setData({
        sortedDevs: sortResult
      });
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  //开关事件
  kaiguanguan: function (event) {
    var tp = event.currentTarget.dataset['tp'];
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    var temSet;
    var dd = tp.diOnoffStatu;
    if (tp.diOnoffStatu >= 1) {
      temSet = 0;
    } else {
      temSet = 1;
    }
    console.log(temSet);
    var index = event.currentTarget.id;//获得下标
    var tmp = 'sortedDevs[' + index + '].diOnoffStatu';
    this.setData({
      [tmp]: temSet
    })
    wx.request({
      url: 'https://dev.rishuncloud.com:8443/ctrDev',
      method: 'POST',
      data: {
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: tp.diDeviceuid, value: temSet }]
      },
      header:
      {
        'content-type': 'application/json' // 默认值 
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  //灯事件
  deng: function (event) {
    var deng = event.currentTarget.dataset['deng'];
    console.log(deng)
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    var temSet;
    if (deng.diOnoffStatu >= 1) {
      temSet = 0;
    } else {
      temSet = 1;
    }
    console.log(temSet);
    var index = event.currentTarget.id;//获得下标
    var tmp = 'sortedDevs[' + index + '].diOnoffStatu';
    this.setData({
      [tmp]: temSet
    })
    wx.request({
      url: 'https://dev.rishuncloud.com:8443/ctrDev',
      method: 'POST',
      data: {
        actCode: "102",
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: deng.diDeviceuid, value: temSet }],
        ver: "1"
      },
      header:
      {
        'content-type': 'application/json' // 默认值 
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  chuangliandk: function (event) {
    console.log(event.currentTarget.dataset['deviceuid']);
    var deviceuid = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['deviceuid']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: '../../devctr/chuanglian/chuanglian?deviceuid=' + deviceuid
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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