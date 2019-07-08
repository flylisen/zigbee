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
    ins:-1,
    rommid: '',
    hidden:false,
    pz: '/images/pzwdj.png',
  },
  pz:function(){
    if (!this.pageLoading) {
      this.pageLoading = !0;
      this.setData({
        pz: '/images/pzdj.png'
      })
      wx.navigateTo({
        url: '../scenesconfig/scenesconfig'
      })
    }
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
    var ins = event.currentTarget.id;//获得下标
      this.setData({
        ins:ins
      })
    var id = event.currentTarget.dataset['id'];
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