var Industrys;
const app = getApp();
var username;
var pwd;
var timestamp;
var token;
var sign;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diNames:'',
    chuanglians:''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    username = app.globalData.username;
    pwd = app.globalData.pwd;
    timestamp = app.globalData.timestamp;
    token = app.globalData.token;
    sign = app.globalData.sign;
    var deviceuid = decodeURIComponent(options.deviceuid);
    Industrys = JSON.parse(deviceuid);
    this.setData({
      diNames: Industrys.diShowName,
      chuanglians: Industrys.diOnoffStatu
    })
  },
  chuangliang: function (a) {
    var that = this
    if (Industrys.diOnoffStatu >= 1) {
      Industrys.diOnoffStatu = 0
    } else {
      Industrys.diOnoffStatu = 1
    }
    console.log(Industrys.diOnoffStatu)
    this.setData({
      chuanglians:Industrys.diOnoffStatu
    })
    let url = app.globalData.URL + 'ctrDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      bindid: username,
      bindstr: pwd,
      ctrType: 0,
      devs: [{ deviceuid: Industrys.diDeviceuid, uuid: Industrys.diUuid, value: Industrys.diOnoffStatu}],
      var:'2.0'
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      if(res.data.code==1){
        var pages = getCurrentPages(); // 当前页面 
        var beforePage = pages[pages.length - 2]; // 前一个页面  
        wx.navigateBack({
          success: function () {
            beforePage.onShow(); // 执行前一个页面的方法     
          }
        });
      }
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
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