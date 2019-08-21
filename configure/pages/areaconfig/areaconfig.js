// pages/areaconfig/areaconfig.js
var app = getApp();
var username;
var pwd;
var timestamp;
var token;
var sign;
var username;
var pwd;
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortedAreas: '',
    tp:'/images/xzwdj.png',
    hidden: false,
    bindsc: '',
    sc: '/images/scwdj.png',
    xz: false,
    logs: [],
    sx: '/images/sx.png',
  },
  //删除
  bindsc: function () {
    var sc = this.data.sc;
    if (sc == '/images/scwdj.png') {
      this.setData({
        sc: '/images/scdj.png',
        xz: true
      })
    } else {
      this.setData({
        sc: '/images/scwdj.png',
        xz: false
      })
    }
  },
  sxym: function () {
    wx.showLoading({
      title: '刷新',
    })
    setTimeout(function () {
      const pages = getCurrentPages()
      const perpage = pages[pages.length - 1]
      perpage.onLoad()
      wx.hideLoading()
    })
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
      that.setData({
        sortedAreas: areaResult,
        hidden: true
      });
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  bindAdd: function () {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      this.setData({
        tp: '/images/xzdj.png',
      })
    wx.navigateTo({
      url: '../areaconfig/areaadd/areaadd',
    }, 2000)
    }
  },
  //删除区域
  deletes: utils.throttle(function (event) {
    var areaid = event.currentTarget.dataset['id'];
    wx.showModal({
      title: '提示',
      content: '确定要删除该区域吗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let url = app.globalData.URL + 'delArea?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
          let data = {
            actCode: "108",
            bindid: username,
            areaId: areaid.aiId,
            ver: "2"
          };
          app.wxRequest('POST', url, data, (res) => {
            console.log(res.data)
            if (res.data.code == 1) {
              if (getCurrentPages().length != 0) {
                //刷新当前页面的数据
                getCurrentPages()[getCurrentPages().length - 1].onLoad()
              }
            } else {
              wx.showModal({
                title: '提示',
                content: '删除失败'
              })
            }
          },
            (err) => {
              console.log(err.errMsg)
            }
          )
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }, 1000),
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.pageLoading = !1;
    //回调
    app.globalData.callback = function (res) {
      console.log('接收到服务器信息', res);
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
    if (!this.pageLoading) {
      this.pageLoading = !0;
    wx.navigateTo({
      url: 'areainfo/areainfo?aiid=' + aiid
    })
    }
  },
  onHide(){
    this.setData({
      tp: '/images/xzwdj.png',
    })
  }
})