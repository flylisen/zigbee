const app = getApp();
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
    let url = app.globalData.URL + 'getSceneInfo';
    let data = {
      act: "getscenes",
      code: "251",
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      ver: "1"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
})
