var deviceuid = '';
var values = '';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    collected: '',
    Industry:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')    
    var that = this; 
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
          that.setData({            
            Industry: res.data.devs
            })
          for(var index in res.data.devs) {
            if (res.data.devs[index].diDeviceid == 2 && res.data.devs[index].diZonetype == 0) {
              values = res.data.devs[index].diOnoffStatu
              deviceuid= res.data.devs[index].diDeviceid
            }
          }
          wx.setStorage({
            key: "Industry",
            data: res.data.devs,
          })
          that.setData({
            kaiguanguan: values
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
  //开关事件
  kaiguanguan: function (e) {
    var that = this
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    if (values >= 1) {
      values = 0
    } else {
      values = 1
    }
    this.setData({
      collected: values
    })
    console.log(values)
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