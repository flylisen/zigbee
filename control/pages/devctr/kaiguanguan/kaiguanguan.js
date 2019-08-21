// pages/devconfig/kaiguanguan/kaiguanguan.js
var kaiguanguans=null;
var app=getApp();
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
    chuanglians: '',
    diDeviceid:'',
    diZonetype:'',
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
    var kaiguanguan = decodeURIComponent(options.kaiguanguan);
    kaiguanguans = JSON.parse(kaiguanguan);
    this.setData({
      diNames: kaiguanguans.diShowName,
      chuanglians: kaiguanguans.diOnlineStatu,
      diDeviceid: kaiguanguans.diDeviceid,
      diZonetype: kaiguanguans.diZonetype
    })
    //获得获取传感器属性值
    var that = this;
    let url = app.globalData.URL + 'getSensorAttrValue?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      actCode: "110",
      bindid: username,
      bindstr: pwd,
      uuid: kaiguanguans.diUuid,
      ver: "2.0"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      that.setData({
        points: res.data.points
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //回调
    app.globalData.callback = function (res) {
      console.log('接收到服务器信息', res);
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