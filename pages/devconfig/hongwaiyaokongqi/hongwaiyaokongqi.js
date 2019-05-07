// pages/devctr/hongwaiyaokongqi/hongwaiyaokongqi.js
var hongwaiyaokongqis='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diNames: '',
    chuanglians: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var hongwaiyaokongqi = decodeURIComponent(options.hongwaiyaokongqi);
     hongwaiyaokongqis = JSON.parse(hongwaiyaokongqi);
    this.setData({
      diNames: hongwaiyaokongqis.diName,
      chuanglians: hongwaiyaokongqis.diOnlineStatu
    })
  },
  //修改设备名称
  submit: function (e) {
    var that = this;
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');
    if (e.detail.value.username == '') {
      wx.showModal({
        title: '提示',
        content: '请输入名称'
      })
    } else {
      wx.request({
        url: 'https://dev.rishuncloud.com:8443/editDevName', //真实的接口地址           
        data: {
          bindid: username,
          bindstr: pwd,
          devs: [{ deviceuid: hongwaiyaokongqis.diDeviceuid, value: e.detail.value.username }]
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          wx.showToast({
            title: '修改成功',
            duration: 2000
          });
          wx.navigateTo({
            url: '../../devconfig/devconfig'
          });
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
  },
  //删除设备
  qingjingsc: function () {
    var that = this;
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: 'https://dev.rishuncloud.com:8443/editDevName', //真实的接口地址           
            data: {
              bindid: username,
              bindstr: pwd,
              ctrType: 0,
              devs: [{ deviceuid: hongwaiyaokongqis.diDeviceuid, value: hongwaiyaokongqis.diIeee }]
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              wx.showToast({
                title: '修改成功',
                duration: 2000
              });
              wx.navigateTo({
                url: '../../devconfig/devconfig'
              })
            },
            fail: function (err) {
              console.log(err)
            }
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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