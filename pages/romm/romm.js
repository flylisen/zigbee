// pages/romm/romm.js
var app=getApp();
var util = require('../../utils/md5.js'); 
const utils = require('../../utils/util.js')
const winHeight = wx.getSystemInfoSync().windowHeight
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rommid:'',
  },
  rommid: function (e) {
    this.setData({
      rommid: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      winH: wx.getSystemInfoSync().windowHeight,
      opacity: 1,
      //这个是微信官方给的获取logs的方法 看了收益匪浅
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  login: utils.throttle(function(){
     if (this.data.rommid != '') {
       let url = app.globalData.URL + 'identify';
       let data = {
         roomName: this.data.rommid,
         var: "2.0"
       }
       var roomid = this.data.rommid;
       app.room(roomid)
       app.wxRequest('POST', url, data, (res) => {
         console.log(res.data)
         var username = res.data.gwLoginName;
         var pwd = res.data.gwLoginPwd;
         app.user(username, pwd);
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
         }else if(roomid == 'RS@xcx12'){
           wx.redirectTo({
             url: '../login/login'
           })
         }else{
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
   },3000),
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.hide()
  },
  //核心方法，线程与setData
  hide: function () {
    var vm = this
    var interval = setInterval(function () {
      if (vm.data.winH > 0) {
        //清除interval 如果不清除interval会一直往上加
        clearInterval(interval)
        vm.setData({ winH: vm.data.winH - 5, opacity: vm.data.winH / winHeight })
        vm.hide()
      }
    }, 10);
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