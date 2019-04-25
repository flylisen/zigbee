var Industrys = wx.getStorageSync('Industrys');
var deviceuid='';
var values='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Industry:[],
    chuanglians:''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(Industrys)
    this.setData({
      Industry: Industrys
    })
    for (var index in Industrys) {
       console.log(Industrys[index])
      if (Industrys[index].diDeviceid ==514 && Industrys[index].diZonetype==0){
        values=Industrys[index].diOnoffStatu
        deviceuid=Industrys[index].diDeviceid
       }
    }
    this.setData({
      chuanglians:values
    })
  },
  chuangliang: function () {
    var that = this
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    if (values >= 1) {
      values = 0
    } else {
      values = 1
    }
    console.log(values)
    this.setData({
      chuanglians: values
    })
    wx.request({
      url: 'https://localhost:8443/ctrDev',
      method: 'POST',
      data: {
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: deviceuid, value: values }]
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