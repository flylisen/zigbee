var app=getApp();
var username;
var pwd;
var rommid;
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
  onShow: function () {
    if (app.globalData.index==1){
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    } else if (app.globalData.index==2){
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
    
  }     
})