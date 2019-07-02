// pages/romm/romm.js
var app=getApp();
var util = require('../../utils/md5.js'); 
const utils = require('../../utils/util.js')
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
    //判断网关是否在线
    let url = 'https://dev.fbeecloud.com/devcontrol/';
    let data = {
      act: "getgatewayinfo",
      code: "217",
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: "4459",
      bindstr: "09z4",
      ver: "2.0"
    }
    app.wxRequest('POST', url, data, (res) => {
       console.log(res.data)
      ,(err) => {
        console.log(err.errMsg)
      }
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
         }else if(roomid == 'rs'){
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
  getPhoneNumber: function (e) {

    var that = this

    // console.log("errMsg:" + e.detail.errMsg)

    console.log("iv:" + e.detail.iv)

    console.log("未转 encryptedData:" + e.detail.encryptedData)

    // console.log("encryptedData:" + encodeURIComponent(e.detail.encryptedData))

    console.log("js_code:" + encodeURIComponent(app.data.js_code))

    wx.request({

      url: url1,

      data: {

        act: "binding_little_program",

        code: encodeURIComponent(app.data.js_code),

        encryptedData: encodeURIComponent(e.detail.encryptedData),

        iv: encodeURIComponent(e.detail.iv),

      },

      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT

      header: {

        'content-type': 'application/json'

      },

      success: function (res) {

        // success

        console.log(res)

        console.log("result_msg:" + res.data.result_msg)

        if (res.data.result_code == 0) {

          util.showAlert(res.data.result_msg)

        } else {

          console.log(res.data.uid)

          util.showAlert1(res.data.result_msg, 'success')

          app.globalData.uid = res.data.uid

          app.globalData.card_id = res.data.card_id

          app.globalData.fullname = res.data.fullname

          app.globalData.photo_img = res.data.photo_img

          app.globalData.usertel = res.data.telephone

          app.globalData.sex = res.data.sex

          console.log('aaphoto = ' + app.globalData.usertel)



          wx.setStorage({
            key: "uid",
            data: res.data.uid,
            success: function (res) { console.log(res) },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) },
          })
          wx.setStorage({
            key: "usertel",
            data: res.data.telephone,
            success: function (res) { console.log(res) },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) },
          })
          wx.setStorage({
            key: "card_id",
            data: res.data.card_id,
            success: function (res) { console.log(res) },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) },
          })
          wx.setStorage({
            key: "fullname",
            data: res.data.fullname,
            success: function (res) { console.log(res) },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) },
          })
          wx.setStorage({
            key: "photo_img",
            data: res.data.photo_img,
            success: function (res) { console.log(res) },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) },
          })
          wx.setStorage({
            key: "sex",
            data: res.data.sex,
            success: function (res) { console.log(res) },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) },
          })
          var pages = getCurrentPages();
          console.log("length" + pages.length);
          //更新ui
          that.setData({
            uid: res.data.uid
          })
          if (that.data.uid > 0) { that.getUserInfo(); }
        }
      },
      fail: function () {
        // fail
        util.showAlert('操作失败')
      },
      complete: function () {
        // complete
      }
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