// pages/devctr/kongtiao/kongtiao.js
var kongtiaos='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diNames: '',
    chuanglians: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var kongtiao = decodeURIComponent(options.kongtiao);
    kongtiaos = JSON.parse(kongtiao);
    this.setData({
      diNames: kongtiaos.diName,
      chuanglians: kongtiaos.diOnlineStatu
    });
  },
  kaiguan:function(){
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    var diOnoffStatu = kongtiaos.diOnoffStatu;
    var temSet='';
    if (diOnoffStatu>=1){
      temSet=0
     }else{
      temSet =1
     }
    console.log(temSet)
    wx.request({
      url: 'https://dev.rishuncloud.com:8443/ctrDev',
      method: 'POST',
      data: {
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: kongtiaos.diDeviceuid, value: temSet}]
      },
      header:
      {
        'content-type': 'application/json' // 默认值 
      },
      success: function (res) {
        console.log(res.data)
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