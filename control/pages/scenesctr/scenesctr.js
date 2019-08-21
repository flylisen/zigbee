// pages/scenesctr/scenesctr.js
const app = getApp();
var username;
var pwd;
var timestamp;
var token;
var sign;
var rommid;
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scenes:'',
    rommid: '',
    choseImg:'/images/scenesctr/scenebj.jpg',
    unchoseImg:'/images/scenesctr/scenewdj.jpg',
    hidden:false,
    pz: '/images/pzwdj.png',
    sx: '/images/sx.png',
  },
  pz:function(){
    if (!this.pageLoading) {
      this.pageLoading = !0;
      this.setData({
        pz: '/images/pzdj.png'
      })
      wx.navigateTo({
        url: '../../../configure/pages/scenesconfig/scenesconfig'
      })
    }
    logs: []
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
    username = app.globalData.username;
    pwd = app.globalData.pwd;
    timestamp = app.globalData.timestamp;
    rommid = app.globalData.rommid;
    that.setData({
      rommid
    })
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
      option:2,
      ver: "2.0"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      var scenes = res.data.scenes;
      let sceness=[];
      for (var i in scenes){
        if (scenes[i].siSceneVisibal==1){
          sceness.push(scenes[i]);
        }
      }
      sceness.forEach((r) => {  //array是后台返回的数据
        r.upshow = false;   //r = array[0]的所有数据，这样直接 r.新属性 = 属性值 即可
      })
      that.setData({ //这里划重点 需要重新setData 下才能js 和 wxml 同步，wxml才能渲染新数据
        sceness: that.data.scenes
      })
      console.log(sceness);
      this.setData({
        scenes: sceness,
        hidden: true
      })

    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  //触发场景
  chang:function(event){
    let index = event.currentTarget.dataset.index;  //当前点击列表的index
    let scenes = this.data.scenes;
    var id = event.currentTarget.dataset['id'];
    var that = this;
    var up = "scenes[" + index + "].upshow";
     that.setData({
        [up]:true
    })
    var siSceneId=id.siSceneId
    var that = this;
    let url = app.globalData.URL + 'triggerScene?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      act: "triggerScene",
      code: 604,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      ver: "2.0",
      scenes: [{sceneID: siSceneId}]
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      if(res.data.code!=1){
        wx.showModal({
          title: '提示',
          content: '触发场景失败'
        })
      }
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
    this.pageLoading = !1;
    //回调
    app.globalData.callback = function (res) {
      console.log('当前页面在scenesctr');
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      pz: '/images/pzwdj.png'
    })    
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