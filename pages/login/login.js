const app = getApp();

Page({

  data: {
     username:null,
     password:null
  },
  usernameInput:function(event){
     this.setData({username:event.detail.value})
  },
  passwordInput: function (event) {
    this.setData({password: event.detail.value})
  },
  //登录
  loginBtnClick:function(){
    var that=this
    if (this.data.username == null || this.data.password==null){
       wx.showToast({
         title: '用户名或者密码不能为空',
         icon:'loading',
         duration:2000
       })
    }else{
      wx.request({
        url: 'https://dev.rishuncloud.com:8443/login',
        data:{
          username:this.data.username,
          password:this.data.password,
        },
        method:'GET'
      })
      wx.showToast({
        title: '登录成功',
        icon:'success',
        duration:2000
      })
      app.appData.userInfo = { username: this.data.username }
      wx.switchTab({
        url: '../index/index'
      })
    }
  }
})