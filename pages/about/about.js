var app=getApp();
Page({
  data: {
   username:''
  },
   onShow: function () {
     this.setData({
       username: app.appData.userInfo.username
     })
  },
 
})