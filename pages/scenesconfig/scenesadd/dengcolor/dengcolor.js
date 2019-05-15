// pages/scenesconfig/scenesadd/dengcolor/dengcolor.js
var dengcolor;
var app=getApp();
var username = wx.getStorageSync('username');//网关账号
var pwd = wx.getStorageSync('pwd'); //网关密码
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var deng = decodeURIComponent(options.deng);
    dengcolor = JSON.parse(deng);
  },
  submit:function(e){
    if (e.detail.value.valueother == '' || e.detail.value.value=='') {
      wx.showToast({
        title: '请输入饱和度值或者色调值',
        icon: 'none'
      })
     }else{
      let url = app.globalData.URL + 'ctrLightColor';
      let data = {
        act: "controlhue",
        code: "214",
        AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
        key: "bq6wqzasjwtkl0i21pi9fbeq4",
        bindid: username,
        bindstr: pwd,
        ver: "1",
        devs: [{ deviceuid: dengcolor.diDeviceuid, valueother: e.detail.value.valueother, value: e.detail.value.value }]
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
      },
        (err) => {
          console.log(err.errMsg)
        }
      )
     }
  },
  listenerSlider: function (e) {
    //获取滑动后的值
    let url = app.globalData.URL + 'ctrDev';
    let data = {
      actCode: "102",
      bindid: username,
      bindstr: pwd,
      ctrType: 1,
      devs: [{ deviceuid: dengcolor.deviceuid, uuid: dengcolor.diUuid, value: e.detail.value }],
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
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