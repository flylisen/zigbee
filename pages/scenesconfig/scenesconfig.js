const app = getApp();
var username = wx.getStorageSync('username');
var pwd = wx.getStorageSync('pwd');
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
    var that = this;
    let url = app.globalData.URL + 'getSceneInfo';
    let data = {
      act: "getScenes",
      code: 601,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      option: 2,
      ver: "2.0"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      this.setData({
        scenes: res.data.scenes
      })
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  changjing: function (event){
    var changjing = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['id']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'changjing/changjing?changjing=' + changjing
    })
   }
})
