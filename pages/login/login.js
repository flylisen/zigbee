const app = getApp();
Page({
  data: {
     username:null,
     password:null,
     id_token:'',
     response:''
  },
  usernameInput:function(event){
     this.setData({
       username:event.detail.value
       })
  },
  passwordInput: function (event) {
    this.setData({
      password: event.detail.value
      })
  },
  //登录
  loginBtnClick:function(){
    var that=this
      wx.request({
        url: 'https://dev.rishuncloud.com:8443/login',
        data:{
          username:this.data.username,
          password:this.data.password,
        },
        method:'POST',
        success:function(res){
            this.setData({
                id_token:res.data.id_token,
                response:res                 
            })
            try{
              wx.setStorageSync('id_token', res.data.id_token)
            } catch (e){    
            }    
          wx.switchTab({
            url: '../index/index'
          })
          console.log(res.data);
          },
          fail:function(res){
            console.log(res.data);
            console.log('is failed')
          }
        }) 
  }
})