const app = getApp();
Page({

  data: {
    
  },
  submit: function (e) {
    let url = app.globalData.URL + 'login';
    let data = {
      loginName: e.detail.value.username,
      loginPwd: e.detail.value.pwd 
      }; 
    wx.setStorageSync('username', e.detail.value.username);
    wx.setStorageSync('pwd', e.detail.value.pwd);
     app.wxRequest('POST', url, data, (res) => { 
       console.log(res.data)
       if (res.data.giOnlineStatus == 1 && res.data.code==1){
         wx.showToast({
           title: "登录成功",
           icon: "Yes",
           duration: 2000,
           success: function () {
             //建立websocket连接 
             if (res.data.gwId != -1) {
               app.initWebSocket(res.data.gwId);
             }
             setTimeout(function () {
               wx.switchTab({
                 url: '../index/index',
               }, 2000)
             })
           }
          })
        } 
    }, 
     (err) => { 
       console.log(err.errMsg) 
      }
     )
  }
})