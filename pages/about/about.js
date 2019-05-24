var app=getApp();
var username;
var pwd;
Page({
  data: {
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    username = app.globalData.username;
    this.setData({
      username: username
    });
  },
 logout:function(){
   wx.reLaunch({
     url: '../login/login',
   })
 },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  }     
})