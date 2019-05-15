// pages/scenesctr/scenesctr.js
const app = getApp();
var username = wx.getStorageSync('username');
var pwd = wx.getStorageSync('pwd');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,
    scenes:'',
  },
  bindAdd: function () {
    this.setData({
      showModal: true
    })
  },
  go: function () {
    this.setData({
      showModal: false
    })
    wx.redirectTo({
      url: '../scenesctr/scenesctr',
    }, 2000)
  },
  scenesctr:function(){
    wx.navigateTo({
      url: '../scenesconfig/scenesconfig'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let url = app.globalData.URL + 'getSceneInfo';
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
      this.setData({
        scenes: res.data.scenes
      })
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  //触发场景
  chang(event){
    var id = event.currentTarget.dataset['id'];
    var siSceneId=id.siSceneId
    var that = this;
    let url = app.globalData.URL + 'triggerScene';
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
    //回调
    app.globalData.onReceiveWebsocketMessageCallback = function (res) {
      console.log('接收到服务器信息', res);
      console.log('当前页面在scenesctr');
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