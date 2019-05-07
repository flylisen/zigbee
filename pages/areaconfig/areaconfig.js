// pages/areaconfig/areaconfig.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortedAreas: '',
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function (options) {

    console.log('onLoad')
    var that = this;
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');
    wx.request({
      url: 'https://dev.rishuncloud.com:8443/areaList', //真实的接口地址            
      data: {
        bindid: username,
        bindstr: pwd
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
          var tmp = {};
          for (var index in res.data.areas) {
            var tag = res.data.areas[index].aiId + res.data.areas[index].aiName + '';
            if (tmp[tag] == null || tmp[tag] == undefined) {
              tmp[tag] = new Array();
            }
            tmp[tag].push(res.data.areas[index]);
          };
          var sortResult = [];
          for (var key in tmp) {
            for (var j = 0; j < tmp[key].length; j++) {
              sortResult.push(tmp[key][j]);
            }
          }
          console.log(sortResult)
          wx.setStorage({
            key: "sortResult",
            data: sortResult
          });
          that.setData({
            sortedAreas: sortResult
          });
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  bindAdd: function () {
    wx.redirectTo({
      url: '../areaconfig/areaadd/areaadd',
    }, 2000)
  },

  /** 
   * 生命周期函数--监听页面初次渲染完成 
   */ 
  onShareAppMessage: function () {

  },
  areainfo:function(event){
    // var aiId = event.currentTarget.id;
    console.log(event.currentTarget.dataset['id']);
    var aiid = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['id']));//函数可把字符串作为 URI
    console.log(aiid)
    wx.navigateTo({
      url: 'areainfo/areainfo?aiid=' + aiid
    })
  }
})