var sortResult = wx.getStorageSync('sortResult')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scenename:''
  },
  //获取用户输入的场景名称
  scenename: function (e) {
    this.setData({
      scenename: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // console.log(sortResult);
  },
  submit: function (e) {
    var that = this
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    wx.request({
      url: 'https://localhost:8443/addScene',
      method: 'POST',
      data: {
        act: "setscene",
        code: "253",
        AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
        key: "bq6wqzasjwtkl0i21pi9fbeq4",
        bindid: username,
        bindstr: pwd,
        ver:"1",
        scene: [{
          scenename:this.data.scenename,
          scenemem: [{
            deviceuid: 1082222,
            deviceid: 2,
            data1: 0,
            data2: 0,
            data3: 0,
            data4:0,
            IRID: 0,
            delaytime: 0
          }]
        }]
      },
      header:
      {
        'content-type': 'application/json' // 默认值 
      },
      success: function (res) {
        console.log(res.data)
      }
    });
    wx.navigateTo({
      url: '../scenesctr/scenesctr'
    })
  }
})
