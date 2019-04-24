// pages/devctr/devctr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    Industry:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log('onLoad')    
    var that = this 
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');    
    wx.request({
      url: 'https://localhost:8443/getDev', //真实的接口地址           
      data: {
        bindid:username,
        bindstr:pwd
      },
      method:'POST',      
    header: {        
      'content-type': 'application/json'      
        },      
        success: function (res) {         
          console.log(res.data)
          console.log(res.data.devs[6].diOnoffStatu)       
          that.setData({            
            Industry: res.data.devs
            })
          wx.setStorage({
            key: "diOnoffStatu",
            data: res.data.devs[6].diOnoffStatu,
          })         
            },      
            fail: function (err) {        
              console.log(err)      
              }    
            })
  },
  chuangliandk: function () {
    wx.navigateTo({
      url:'chuanglian/chuanglian'
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
         wx.showLoading({
           title: '加载中',
         })
     wx.stopPullDownRefresh();//刷新完成停止刷新
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