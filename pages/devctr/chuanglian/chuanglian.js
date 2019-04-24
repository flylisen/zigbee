
var values = wx.getStorageSync('diOnoffStatu'); //窗帘类型
var diName = wx.getStorageSync('diName'); //窗帘名称
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected: '',
    name: diName
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      collected: values
    })
    console.log(diName)
  },
  chuangliang:function(){
    var that = this
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    var deviceuid = wx.getStorageSync('diDeviceuid'); //开关Uid
    if (values>=1){
      values=0
     }else{
      values=1
     }
    this.setData({
      collected: values
    })
     wx.request({ 
       url: 'https://localhost:8443/ctrDev', 
      method: 'POST',
      data: {
        bindid: username,
        bindstr: pwd,
        ctrType:0,
        devs: [{ deviceuid: deviceuid, value: values}]
        }, 
        header: 
        { 
          'content-type': 'application/json' // 默认值 
        }, 
        success(res){ 
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