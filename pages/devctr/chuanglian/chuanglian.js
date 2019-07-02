var Industrys;
const app = getApp();
var username;
var pwd;
var timestamp;
var token;
var sign;
const utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diOnoffStatu:'',
    diDeviceid:'',
    diZonetype:'',
    k:'/images/chuanglian/kwdj.png',
    tz:'/images/chuanglian/tzwdj.png',
    g:'/images/chuanglian/gwdj.png',
    ktest:false,
    tztest:false,
    gtext:false,
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
    var deviceuid = decodeURIComponent(options.deviceuid);
    Industrys = JSON.parse(deviceuid);
    this.setData({
      diDeviceid: Industrys.diDeviceid,
      diZonetype: Industrys.diZonetype,
      diOnoffStatu: Industrys.diOnoffStatu
    })
    if(this.data.diDeviceid==514&&this.data.diZonetype==2){
      wx.setNavigationBarTitle({
        title: '窗帘'
      })
    }
  },
  chuangliank: utils.throttle(function(e){
      this.setData({
        k: '/images/chuanglian/kdj.png',
        ktest: true
      })
      let url = app.globalData.URL + 'ctrDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
      let data = {
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: Industrys.diDeviceuid, uuid: Industrys.diUuid, value: 1 }],
        var: '2.0'
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
        if (res.data.code == 1) {
          this.setData({
            k: '/images/chuanglian/kwdj.png',
            ktest: false
          })
        }
      },
        (err) => {
          console.log(err.errMsg)
        }
      )
  },3000),
  chuangliantz: utils.throttle(function(e){
    this.setData({
        tz: '/images/chuanglian/tzdj.png',
        tztest:true
    })
    let url = app.globalData.URL + 'ctrDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      bindid: username,
      bindstr: pwd,
      ctrType: 0,
      devs: [{ deviceuid: Industrys.diDeviceuid, uuid: Industrys.diUuid, value: 2}],
      var: '2.0'
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      if (res.data.code == 1) {
        this.setData({
          tz: '/images/chuanglian/tzwdj.png',
          tztest: false
        })
      }
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },3000),
  chuangliag: utils.throttle(function(e){
      this.setData({
        g: '/images/chuanglian/gdj.png',
        gtext: true
      })
      let url = app.globalData.URL + 'ctrDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
      let data = {
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: Industrys.diDeviceuid, uuid: Industrys.diUuid, value: 0 }],
        var: '2.0'
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
        if (res.data.code == 1) {
          this.setData({
            g: '/images/chuanglian/gwdj.png',
            gtext: false
          })
        }
      },
        (err) => {
          console.log(err.errMsg)
        }
      )
  
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
    //回调
    app.globalData.callback = function (res) {
      console.log('接收到服务器信息', res);
      var nodeType;
      var uuid;
      var value;
      var showname;
      var strs = new Array();
      strs = res.data.split(","); //字符分割 
      nodeType = strs[0].split('=')[1];
      uuid = strs[1].split('=')[1];
      value = strs[2].split('=')[1];
      showname = strs[3].split('=')[1];
      console.log('nodeType', nodeType);
      console.log('uuid', uuid);
      console.log('value', value);
      console.log('showname', showname);
      //找到当前页面的page
      var pageArray = getCurrentPages();
      var curPage;
      for (var j = 0; j < pageArray.length; j++) {
        if (pageArray[j].route == 'pages/devctr/chuanglian/chuanglian') {
          curPage = pageArray[j];
        }
      }
      console.log('curPage', curPage);
      if (nodeType == 4) {
        //设备开关状态发生改变
        var diOnoffStatu = curPage.data.diOnoffStatu;
        curPage.setData({
          diOnoffStatu: value
        })
      }
      console.log('当前页面在窗帘');
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