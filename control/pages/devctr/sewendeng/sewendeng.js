// pages/devctr/sewendeng/sewendeng.js
var sewendengs = '';
var username;
var pwd;
var timestamp;
var token;
var sign;
const utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diNames: '',
    diOnoffStatu: '',
    logs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    username = app.globalData.username;
    pwd = app.globalData.pwd;
    timestamp = app.globalData.timestamp;
    token = app.globalData.token;
    sign = app.globalData.sign;
    var sewendeng = decodeURIComponent(options.sewendeng);
    sewendengs = JSON.parse(sewendeng);
    this.setData({
      diNames: sewendengs.diShowName,
      diOnoffStatu: sewendengs.diOnoffStatu
    });
    //获取色温灯的色温值、开关值
    var that = this;
    let url = app.globalData.URL + 'getColorTempInfo?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      act: "gettemperature",
      code: 213,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      ver: '1',
      devs: [{ deviceuid: sewendengs.diDeviceuid }]
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  //打开
  kg: function (e) {
    let url = app.globalData.URL + 'ctrDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    var value;
    if (sewendengs.diOnoffStatu == 0) {
      value = 1;
      sewendengs.diOnoffStatu = 1;
    } else {
      value = 0;
      sewendengs.diOnoffStatu = 0;
    }
    var diOnoffStatu = this.data.diOnoffStatu;
    this.setData({
      diOnoffStatu: value
    })
    let data = {
      bindid: username,
      bindstr: pwd,
      ctrType: 0,
      devs: [{ deviceuid: sewendengs.deviceuid, uuid: sewendengs.diUuid, value: value }],
      var: "2.0"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
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
    var pages = getCurrentPages(); // 当前页面 
    var beforePage = pages[pages.length - 2]; // 前一个页面
    beforePage.onLoad();
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