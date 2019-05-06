// pages/areaconfig/areainfo/areainfo.js
var Industrys;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortedDevs: '',
    aiNames:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var aiid = decodeURIComponent(options.aiid);
    Industrys = JSON.parse(aiid);
    console.log("id="+Industrys)
     this.setData({
       aiNames: Industrys.aiName
     })
    console.log('onLoad')
    var that = this;
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');
    wx.request({
      url: 'https://localhost:8443/getAreaDev', //真实的接口地址            
      data: {
        actCode:"108",
        bindid: username,
        areaId: Industrys.aiId,
        ver: "1"
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var tmp = {};
        for (var index in res.data.devs) {
          var tag = res.data.devs[index].diDeviceid + res.data.devs[index].diZonetype + '';
          if (tmp[tag] == null || tmp[tag] == undefined) {
            tmp[tag] = new Array();
          }
          tmp[tag].push(res.data.devs[index]);
        };
        var sortResult = [];
        for (var key in tmp) {
          for (var j = 0; j < tmp[key].length; j++) {
            sortResult.push(tmp[key][j]);
          }
        }
        console.log(sortResult);
        that.setData({
          sortedDevs: sortResult
        });
       
      },
      fail: function (err) {
        console.log(err)
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