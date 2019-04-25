// pages/devctr/devctr.js
var devss=[]
var values1=''
var values2=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    Industry:[],
    collected1: '',
    collected2:''
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
          devss = res.data.devs
          values1 = devss[14].diOnoffStatu
          values2 = devss[15].diOnoffStatu
          that.setData({            
            Industry: res.data.devs,
            collected1: res.data.devs[14].diOnoffStatu,
            collected2: res.data.devs[15].diOnoffStatu
            })
          wx.setStorage({
            key: "diOnoffStatu",
            data: res.data.devs[6].diOnoffStatu,
          })
          wx.setStorage({
            key: "diDeviceuid",
            data: res.data.devs[6].diDeviceuid
             })
          wx.setStorage({
            key: "diName",
            data: res.data.devs[6].diName
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
  kaiguanguan1: function () {
    var that = this
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    var deviceuid = devss[14].diDeviceuid; //开关Uid
    if (values1 >= 1) {
      values1 = 0
    } else {
      values1 = 1
    }
    this.setData({
      collected1: values1
    })
    console.log(values1)
    wx.request({
      url: 'https://localhost:8443/ctrDev',
      method: 'POST',
      data: {
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: deviceuid, value: values1 }]
      },
      header:
      {
        'content-type': 'application/json' // 默认值 
      },
      success:function(res) {
        console.log(res.data)
      }
    })
  },
  kaiguanguan2: function () {
    var that = this
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    var deviceuid = devss[15].diDeviceuid; //开关Uid
    if (values2 >= 1) {
      values2 = 0
    } else {
      values2 = 1
    }
    this.setData({
      collected2: values2
    })
    console.log(values2)
    wx.request({
      url: 'https://localhost:8443/ctrDev',
      method: 'POST',
      data: {
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: deviceuid, value: values2 }]
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