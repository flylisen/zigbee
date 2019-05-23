// pages/devctr/dengcolor/dengcolor.js
const app = getApp();
var dengs = '';
var S=0;
var H=0;
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
    diNames: '',
    chuanglians: '',
    colorData: {
      //基础色相，即左侧色盘右上顶点的颜色，由右侧的色相条控制
      hueData: {
        colorStopRed: 254,
        colorStopGreen: 0,
        colorStopBlue: 0,
      },
      //选择点的信息（左侧色盘上的小圆点，即你选择的颜色）
      pickerData: {
        x: 1, //选择点x轴偏移量
        y: 480, //选择点y轴偏移量
        red: 1,
        green:1,
        blue:1,
        hex: '#000000'
      },
      //色相控制条的位置
      barY: 0,
    },
    rpxRatio: 1, //此值为你的屏幕CSS像素宽度/750，单位rpx实际像素
    sortedDevs: '',
    hex:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    username = app.globalData.username;
    pwd = app.globalData.pwd;
    timestamp = app.globalData.timestamp;
    token = app.globalData.token;
    sign = app.globalData.sign;
    var deng = decodeURIComponent(options.deng);
    dengs = JSON.parse(deng);
    that.setData({
      sortedDevs: dengs
    }); 
    this.setData({
      diNames: dengs.diShowName,
      diOnoffStatu: dengs.diOnoffStatu
    });
    //设置rpxRatio
    wx.getSystemInfo({
      success(res) {
        that.setData({
          rpxRatio: res.screenWidth/750
        })
      }
    });
    //获取彩灯开关，亮度，颜色，饱和度
    let url = app.globalData.URL + 'getDevMenage?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      act: "getrgbw",
      code: 212,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      ver: "2",
      devs: [
        {
          uuid: dengs.diUuid
        }
      ]
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  //选择改色时触发（在左侧色盘触摸或者切换右侧色相条）
  onChangeColor(e) {
    //返回的信息在e.detail.colorData中
    var R = e.detail.colorData.pickerData.red;
    var G = e.detail.colorData.pickerData.green;
    var B = e.detail.colorData.pickerData.blue;
   this.setData({
     hex:e.detail.colorData.pickerData.hex
    })
    var min = R; // 定义变量min 用来存储最小值 初始值a
    var max = R; // 定义变量max 用来存储最大值 初始值a
    if (G < min) {
      min = G;
    }
    if (B < min) {
      min = B;
    }
    if (G > max) {
      max = G;
    }
    if (B > max) {
      max = B;
    }
    if (R == max) {
      H = (G - B) / (max - min);
    }
    if (G == max) {
      H = 2 + (B - R) / (max - min);
    }
    if (B == max) {
      H = 4 + (R - G) / (max - min);
    }
    H = (H*60);
    if (H < 0) 
    {
      H = (H +360);
    }
    H=(H/360)*255;
    //饱和度
    S = ((max - min) / max)*254;
    console.log(parseInt(S));
    console.log(parseInt(H));
  },
picker:function(e){
  if(this.data.hex=='#111110'){
    wx.showToast({
      title: '请选择正确的颜色',
      icon: 'none'
    })
  }else{
    let url = app.globalData.URL + 'ctrLightColor?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      act: "controlhue",
      code: "214",
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      ver: "1",
      devs: [{ deviceuid: dengs.diDeviceuid, valueother: parseInt(S), value: parseInt(H) }]
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
  listenerSlider:function(e){
    //获取滑动后的值
    let url = app.globalData.URL + 'ctrDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      actCode: "102",
      bindid: username,
      bindstr: pwd,
      ctrType: 1,
      devs: [{ deviceuid: dengs.deviceuid, uuid: dengs.diUuid, value: e.detail.value }],
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