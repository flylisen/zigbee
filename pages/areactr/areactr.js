// pages/areactr/areactr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false
  },
  /**
   * 区域1的点击事件
   */
  jumpPagePY1:function(){
    
    wx.switchTab({   
    }) 
  },
  bindAdd: function () {
     this.setData({
       showModal:true
     })
  },
  go:function(){
    this.setData({
      showModal:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //回调
    app.globalData.onReceiveWebsocketMessageCallback = function (res) {
      console.log('接收到服务器信息', res);
      var nodeType;
      var deviceId;
      var value;
      var strs = new Array();
      strs = res.data.split(","); //字符分割 
      nodeType = strs[0].split('=')[1];
      deviceId = strs[1].split('=')[1];
      value = strs[2].split('=')[1];

      if (noteType == 4) {
        //区域删除
        //触发重新加载本页面
      }
      console.log('当前页面在设备控制');

    }
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