// pages/devctr/devctr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindAdd: function () {
    this.setData({
      showModal: true
    })
  },
  go: function () {
    this.setData({
      showModal: false
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
    console.log('onLoad')
    var that = this   
     wx.request({
        url: 'https://www.100txy.com/weixin/getdownlist', //真实的接口地址      
        data: {},      
        header: {        
          'content-type': 'application/json'      
          },      
          success: function (res) {         
            console.log(res.data)        
            that.setData({            
              Industry: res.data //设置数据        
              })        
              },      
              fail: function (err) {        
                console.log(err)      
                }    
            })
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