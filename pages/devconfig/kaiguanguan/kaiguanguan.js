// pages/devconfig/kaiguanguan/kaiguanguan.js
var kaiguanguans=null;
var app=getApp();
var username;
var pwd;
var timestamp;
var token;
var sign;
var diName=[];
var diShowName=[];
const utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diNames: '',
    diName:'',
    chuanglians: '',
    diDeviceid:'',
    diZonetype:'',
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
      diNames: kaiguanguans.diShowName,//显示名称
      diName: kaiguanguans.diName,//内存名称
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
  //修改设备名称
  submit: utils.throttle(function (e) {
    var that = this;
    var name = e.detail.value.name;//内存名称
    var showname = e.detail.value.showname;//显示名称
    var diNames = this.data.diName;  
    let url = app.globalData.URL + 'getDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      bindid: username,
      bindstr: pwd
    };
    app.wxRequest('POST', url, data, (res) => {
      var diName=[];
      for (var i in res.data.devs){
        if (res.data.devs[i].diName != diNames){
          diName.push(res.data.devs[i].diName);
        }
      }
      for (var i = 0; i < diName.length; i++) {
        if (diName[i] =="") {
          diName.splice(i, 1);
          i = i - 1;
        }
      }
      var bool;
      for (var j in diName) {
        if (name == diName[j]) {
          bool = "fal1";
        }
      }
       if (bool =="fal1"){
        wx.showModal({
          title: '提示',
          content: '内存名称已经存在'
        })
       } else if (name==''){
         wx.showModal({
           title: '提示',
           content: '内存名称不能为空'
         })
      }else{
        let url = app.globalData.URL + 'editDevName?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
        let data = {
          act: "alterdevname",
          code: 202,
          AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
          key: "bq6wqzasjwtkl0i21pi9fbeq4",
          bindid: username,
          bindstr: pwd,
          devs: [{ uuid: kaiguanguans.diUuid, devShowName: showname, value: name}],
          ver: "2.0"
        };
        app.wxRequest('POST', url, data, (res) => {
          console.log(res.data)
          if (res.data.code == 1) {
            var pages = getCurrentPages(); // 当前页面 
            var beforePage = pages[pages.length - 2]; // 前一个页面  
            wx.navigateBack({
              success: function () {
                beforePage.onShow(); // 执行前一个页面的方法     
              }
            });
          }else{
            wx.showToast({
              title: '修改失败',
              icon: 'none'
            })
          }
        },
          (err) => {
            console.log(err.errMsg)
          }
        )
      }
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },3000),
  //删除设备
  qingjingsc: utils.throttle(function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          let url = app.globalData.URL + 'delDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
          let data = {
            act:"deletedev",
            code:'201',
            AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
            key: "bq6wqzasjwtkl0i21pi9fbeq4",
            bindid: username,
            bindstr: pwd,
            devs: [{ uuid: kaiguanguans.diUuid, value: kaiguanguans.diIeee }],
            ver:"2.0"
          };
          app.wxRequest('POST', url, data, (res) => {
            console.log(res.data)
            if (res.data.code == 1){
              var pages = getCurrentPages(); // 当前页面 
              var beforePage = pages[pages.length - 2]; // 前一个页面  
              wx.navigateBack({
                success: function () {
                  beforePage.onShow(); // 执行前一个页面的方法     
                }
              });
            }else{
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              })
            }
          },
            (err) => {
              console.log(err.errMsg)
            }
          )
        } else if (sm.cancel) {
        }
      }
    })
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
    app.globalData.onReceiveWebsocketMessageCallback = function (res) {
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