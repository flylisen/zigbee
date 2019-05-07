
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scenename:''
  },
  bindAdd:function(){
    wx.redirectTo({
      url: '../scenesconfig/scenesadd/scenesadd',
    }, 2000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log(sortResult);
    var that = this;
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');
    wx.request({
      url: 'https://dev.rishuncloud.com:8443/getSceneInfo', //真实的接口地址           
      data: {
        act: "getscenes",
        code: "251",
        AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
        key: "bq6wqzasjwtkl0i21pi9fbeq4",
        bindid: username,
        bindstr: pwd,
        ver: "1"
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
})
