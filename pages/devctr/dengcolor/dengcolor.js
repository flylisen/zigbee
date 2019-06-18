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
    diOnoffStatu:''
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
  },
  //打开
  kg:function(e){
    let url = app.globalData.URL + 'ctrDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    var value;
    console.log(dengs.diOnoffStatu);
    if (dengs.diOnoffStatu==0){
      value=1;
      dengs.diOnoffStatu=1;
     }else{
      value=0;
      dengs.diOnoffStatu=0;
     }
    let data = {
      bindid: username,
      bindstr: pwd,
      ctrType: 0,
      devs: [{ deviceuid: dengs.deviceuid, uuid: dengs.diUuid, value: value }],
      var: "2.0"
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
  },
picker:function(e){
  if(this.data.hex=='#111110'){
    wx.showToast({
      title: '请选择正确的颜色',
      icon: 'none'
    })
  }else{
    if (this.data.diOnoffStatu>=1){
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
    }else{
      wx.showToast({
        title:'灯是关闭状态',
        icon:'none'
      })
    }
  }
  },
  listenerSlider:function(e){
    if (this.data.diOnoffStatu >= 1){
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
    }else{
      wx.showToast({
        title: '灯是关闭状态',
        icon: 'none'
      })
    } 
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
    //回调
    app.globalData.onReceiveWebsocketMessageCallback = function (res) {
      console.log('接收到服务器信息', res);
      var nodeType;
      var uuid;
      var value;
      var showname;
      var strs = new Array();
      strs = res.data.split(","); //字符分割 
      nodeType = strs[0].split('=')[1];
      uuid = strs[1].split('=')[1];
      value = strs[2].split('=')[1];
      showname = strs[3].split('=')[1];
      console.log('nodeType', nodeType);
      console.log('uuid', uuid);
      console.log('value', value);
      console.log('showname', showname);
      //找到当前页面的page
      var pageArray = getCurrentPages();
      var curPage;
      for (var j = 0; j < pageArray.length; j++) {
        if (pageArray[j].route == 'pages/devctr/dengcolor/dengcolor') {
          curPage = pageArray[j];
        }
      }
      console.log('curPage', curPage);
      if (nodeType == 4) {
        //设备开关状态发生改变
        var diOnoffStatu = curPage.data.diOnoffStatu;
        curPage.setData({
          diOnoffStatu: value
        })
      } 
      console.log('当前页面在设备详情');
    }
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
    var pages = getCurrentPages(); // 当前页面 
    var beforePage = pages[pages.length - 2]; // 前一个页面
    beforePage.onLoad();
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