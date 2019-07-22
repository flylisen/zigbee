const app = getApp();
var username;
var pwd;
var timestamp;
var token;
var sign;
const utils = require('../../utils/util.js')
const winHeight = wx.getSystemInfoSync().windowHeight
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scenename:'',
    hidden:false,
    tp:'/images/xzwdj.png',
    bindsc:'',
    xz:false,
    sc:'/images/scwdj.png',
    bji:'/images/bjiwdj.png',
    bj:false,
    logs: []
  },
  bindAdd:function(){
    if (!this.pageLoading) {
      this.pageLoading = !0;
      this.setData({
        tp: '/images/xzdj.png'
      })
      wx.navigateTo({
        url: '../scenesconfig/scenesadd/scenesadd',
      }, 2000)
    }
  },
  binddji:function(){
    var bji=this.data.bji;
    if (bji == '/images/bjiwdj.png') {
      this.setData({
        bji: '/images/bjidj.png',
        bj: true
      })
    } else {
      this.setData({
        bji: '/images/bjiwdj.png',
        bj: false
      })
    }
  },
  //删除
  bindsc:function(){
    var sc = this.data.sc;
    if (sc=='/images/scwdj.png'){
      this.setData({
        sc: '/images/scdj.png',
        xz: true
      })
    }else{
      this.setData({
        sc: '/images/scwdj.png',
        xz: false
      })
    } 
  },
  changjingadd: function (event){
    var changjings = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['changjings']));//函数可把字符串作为 URI
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({
        url: 'changjingadd/changjingadd?changjings=' + changjings
      })
    }
  },
  deletes: function (event){
    var changjings=event.currentTarget.dataset['changjings'];
    wx.showModal({
      title: '提示',
      content: '确定要删除吗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let url = app.globalData.URL + 'delSceneMem?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
          let data = {
            act: "deleteScenemembers",
            code: 605,
            AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
            key: "bq6wqzasjwtkl0i21pi9fbeq4",
            bindid: username,
            bindstr: pwd,
            ver: "2",
            scenes: [{ sceneID: changjings.siSceneId, sceneName: changjings.siName}]
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
    var that = this;
    username = app.globalData.username;
    pwd = app.globalData.pwd;
    timestamp = app.globalData.timestamp;
    token = app.globalData.token;
    sign = app.globalData.sign;
    let url = app.globalData.URL + 'getSceneInfo?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      act: "getScenes",
      code: 601,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      option: 2,
      ver: "2.0"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      this.setData({
        scenes: res.data.scenes,
        hidden:true
      })
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  changjing: function (event){
    var changjings = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['changjings']));//函数可把字符串作为 URI
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({
        url: 'changjing/changjing?changjings=' + changjings
      })
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
  onShow(){
    this.pageLoading = !1;
    this.hide()
    console.log("onShow()======================");
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
    }, 5);
  },
   onHide(){
     this.setData({
       tp: '/images/xzwdj.png'
     })
   }
})
