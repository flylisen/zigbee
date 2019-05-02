const app = getApp();
Page({

  data: {
    
  },
  submit: function (e) {
    wx.request({
      url: 'https://localhost:8443/login',
      data: {
        loginName: e.detail.value.username,
        loginPwd: e.detail.value.pwd
      },
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.setStorage({
          key: "gwId",
          data: res.data.gwId,
        })
        if (res.statusCode == 200) {
          if(res.data.code==1){
            if (res.data.error == true) {
              wx.showToast({
                title: '网络错误',
                icon: 'none',
                duration: 2000
              })
            } else {
              wx.setStorage({
                key: "username",
                data: e.detail.value.username,
              })
              wx.setStorage({
                key: "pwd",
                data: e.detail.value.pwd
              })
              wx.showToast({
                title: "登录成功",
                icon: "Yes",
                duration: 2000,
                success: function () {
                  setTimeout(function () {
                    wx.switchTab({
                      url: '../index/index',
                    }, 2000)
                  })
                }
              })
            }
          }else{
            wx.showToast({
              title: "登录失败",
              icon: "No",
              duration: 2000,
            })
          }
        }
      }
    })
  }
})