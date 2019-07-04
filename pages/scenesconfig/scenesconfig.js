const app = getApp();
var username;
var pwd;
var timestamp;
var token;
var sign;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scenename:'',
    hidden:false,
    tp:'/images/xzwdj.png',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var changjing = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['id']));//函数可把字符串作为 URI
    if (!this.pageLoading) {
      this.pageLoading = !0;
      wx.navigateTo({
        url: 'changjing/changjing?changjing=' + changjing
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
  },
   onHide(){
     this.setData({
       tp: '/images/xzwdj.png'
     })
   }
})
