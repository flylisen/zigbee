var Industrys;
var chuangsu;
const app = getApp();
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
    diOnoffStatu:'',
    diDeviceid:'',
    diZonetype:'',
    diShowName:'',
    k:'../../../../images/chuanglian/kwdj.png',
    tz:'../../../../images/chuanglian/tzwdj.png',
    g:'../../../../images/chuanglian/gwdj.png',
    ktest:false,
    tztest:false,
    gtext:false,
    setTime: '',
    showpic: null,
    hidepic: null,
    logs: [],
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
        diOnoffStatu: Industrys.diOnoffStatu,
        diShowName: Industrys.diShowName
      })
    wx.setNavigationBarTitle({
       title: Industrys.diShowName
    })
    var _this = this;
    var animation = wx.createAnimation({}) //创建一个动画实例
    _this.setData({
      //创建一个计时器
      setTime: setInterval(function () {
        //淡入
        animation.opacity(1).step({
          duration: 1500
        }) //描述动画
        _this.setData({
          showpic: animation.export()
        }) //输出动画
        //淡出
        animation.opacity(0).step({ duration: 1500 })
        _this.setData({ hidepic: animation.export()})
      },1000)
    })
  }, 
  chuangliank: utils.throttle(function(e){
      this.setData({
        k: '../../../../images/chuanglian/kdj.png',
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
            k: '../../../../images/chuanglian/kwdj.png',
            ktest: false
          })
        }
      },
        (err) => {
          console.log(err.errMsg)
        }
      )
  },1000),
  chuangliantz: utils.throttle(function(e){
    this.setData({
      tz: '../../../../images/chuanglian/tzdj.png',
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
          tz: '../../../../images/chuanglian/tzwdj.png',
          tztest: false,
        })
      }
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },1000),
  chuangliag: utils.throttle(function(e){
      this.setData({
        g: '../../../../images/chuanglian/gdj.png',
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
            g: '../../../../images/chuanglian/gwdj.png',
            gtext: false,
          })
        }
      },
        (err) => {
          console.log(err.errMsg)
        }
      )
  
  },1000),
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
      //找到当前页面的page
      var pageArray = getCurrentPages();
      var curPage;
      for (var j = 0; j < pageArray.length; j++) {
        if (pageArray[j].route == 'control/pages/devctr/chuanglian/chuanglian') {
          curPage = pageArray[j];
        }
      }
      if (nodeType == 4) {
        //设备开关状态发生改变
        console.log("开关状态发生改变"+new Date);
        var diOnoffStatu = curPage.data.diOnoffStatu;
        curPage.setData({
          diOnoffStatu: value
        })
      }
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