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
 logout:function(){
   var that = this;
   rommid = app.globalData.rommid
   console.log(rommid)
   if(rommid == 888){
     wx.reLaunch({
       url: '../romm/romm',
     })
   }else{
   wx.reLaunch({
     url: '../login/login',
   })
   }
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