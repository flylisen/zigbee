// pages/devctr/dengcolor/dengcolor.js
var dengs = '';
var S=0;
var H=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diNames: '',
    chuanglians: '',
    colorData: {
      //基础色相，即左侧色盘右上顶点的颜色，由右侧的色相条控制
      hueData: {
        colorStopRed: 255,
        colorStopGreen: 0,
        colorStopBlue: 0,
      },
      //选择点的信息（左侧色盘上的小圆点，即你选择的颜色）
      pickerData: {
        x: 0, //选择点x轴偏移量
        y: 480, //选择点y轴偏移量
        red: 0,
        green: 0,
        blue: 0,
        hex: '#000000'
      },
      //色相控制条的位置
      barY: 0,
    },
    rpxRatio: 1, //此值为你的屏幕CSS像素宽度/750，单位rpx实际像素
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var deng = decodeURIComponent(options.deng);
    dengs = JSON.parse(deng);
    this.setData({
      diNames: dengs.diName,
      chuanglians: dengs.diOnlineStatu
    });
    //设置rpxRatio
    wx.getSystemInfo({
      success(res) {
        that.setData({
          rpxRatio: res.screenWidth/750
        })
      }
    })
  },
  //选择改色时触发（在左侧色盘触摸或者切换右侧色相条）
  onChangeColor(e) {
    //返回的信息在e.detail.colorData中
    var R = e.detail.colorData.pickerData.red;
    var G = e.detail.colorData.pickerData.green;
    var B = e.detail.colorData.pickerData.blue;
    var max='';
    var min='';
    if (R>G) {
       if(R>B){
            max=R;
       }else{
           max=B;
       }
    }else{
       if(G>B){
          max=G;
       }else{
          max=B;
       }
    }
    if(R<G){
       if(R<B){
          min=R;
       }else{
          min=B;
       }
    }else{
      if(G>B){
         min=B
      }else{
        min=G
      }
    }
    var H=0;
    if (R == max) {
      H = (G - B) / (max - min);
    }
    if (G == max) {
      H = 2 + (B - R) / (max - min);
    }
    if (B == max) {
      H = 4 + (R - G) / (max - min);
    }
    H = (H / 6);
    if (H < 0) {
      H = (H / 360 + 1);
    }
     S = (max - min) / max;
     S=(S * 255).toFixed(0),
     H=(H * 255).toFixed(0)
    this.setData({
      colorData: e.detail.colorData,
    }) 
  },
picker:function(){
 console.log(dengs);
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    wx.request({
      url: 'https://localhost:8443/ctrLightColor',
      method: 'POST',
      data: {
        act:"controlhue",
        code:"214", 
        AccessID:"vlvgt9vecxti7zqy9xu0yyy7e",
        key : "bq6wqzasjwtkl0i21pi9fbeq4",
        bindid: username,
        bindstr: pwd,
        ver:"1",
        devs: [{ deviceuid: dengs.diDeviceuid, valueother: S, value: H}]
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
  listenerSlider:function(e){
    //获取滑动后的值
    console.log(e.detail.value);
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    wx.request({
      url: 'https://localhost:8443/ctrDev',
      method: 'POST',
      data: {
        actCode:"102",
        bindid: username,
        bindstr: pwd,
        ctrType: 1,
        devs: [{ deviceuid: dengs.diDeviceuid, value: e.detail.value }]
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