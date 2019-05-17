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
    sortedDevs: '',
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
      diNames: dengs.diName,
      diOnoffStatu: dengs.diOnlineStatu
    });
    //设置rpxRatio
    wx.getSystemInfo({
      success(res) {
        that.setData({
          rpxRatio: res.screenWidth/750
        })
      }
    });
    console.log(dengs.diDeviceuid);
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
          deviceuid: dengs.diDeviceuid
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
    var max=R;
    var min=R;
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
    H = (H / 6);
    if (H < 0) {
      H = (H / 360 + 1);
    }
    S = (max - min) / max;
    this.setData({
      colorData: e.detail.colorData,
    }) 
  },
picker:function(){
  let url = app.globalData.URL + 'ctrLightColor?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
  let data = {
    act: "controlhue",
    code: "214",
    AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
    key: "bq6wqzasjwtkl0i21pi9fbeq4",
    bindid: username,
    bindstr: pwd,
    ver: "1",
    devs: [{ deviceuid: dengs.diDeviceuid, valueother: S, value: H }]
  };
  app.wxRequest('POST', url, data, (res) => {
    console.log(res.data)
  },
    (err) => {
      console.log(err.errMsg)
    }
  )
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
  //灯事件
  deng: function (event) {
    if (dengs.diOnlineStatu > 0) {
      console.log(dengs)
      var username = wx.getStorageSync('username');//网关账号
      var pwd = wx.getStorageSync('pwd'); //网关密码
      var temSet;
      if (dengs.diOnoffStatu >= 1) {
        temSet = 0;
      } else {
        temSet = 1;
      }
      console.log(temSet);
      let url = app.globalData.URL + 'ctrDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
      let data = {
        actCode: 102,
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: dengs.deviceuid, uuid: dengs.diUuid, value: temSet }],
        ver: "2"
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
      },
        (err) => {
          console.log(err.errMsg)
        }
      )
    } else {
      wx.showToast({
        title: '设备不在线',
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
      var diUuid;
      var value;
      var strs = new Array();
      strs = res.data.split(","); //字符分割 
      nodeType = strs[0].split('=')[1];
      diUuid = strs[1].split('=')[1];
      value = strs[2].split('=')[1];
      console.log('nodeType', nodeType);
      console.log('diUuid', diUuid);
      console.log('value', value);
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
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          if (diUuid == curPage.data.sortedDevs[i].diUuid) {
            var tmp = 'sortedDevs[' + i + '].diOnoffStatu';
            curPage.setData({
              [tmp]: value
            })
          }
        }
      } else if (nodeType == 1) {
        //设备新入网
        /*
        //刷新当前页面
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
        */
      } else if (nodeType == 2) {
        //判断设备是否在线
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          if (diUuid == curPage.data.sortedDevs[i].diUuid) {
            var tmp = 'sortedDevs[' + i + '].diOnlineStatu';
            curPage.setData({
              [tmp]: 1
            })
          }
        }
      } else if (nodeType == 5) {
        //修改名称
        console.log(curPage.data.sortedDevs);
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          if (diUuid == curPage.data.sortedDevs[i].diUuid) {
            console.log('i=' + i);
            var tmp = 'sortedDevs[' + i + '].diName';
            curPage.setData({
              [tmp]: value
            })
          }
        }
      } else if (nodeType == 3) {
        //删除设备
        /*
        //刷新当前页面
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
        */
      } else if (nodeType == 6) {
        var that = this;
        var username = wx.getStorageSync('username');
        var pwd = wx.getStorageSync('pwd');
        let url = app.globalData.URL + 'getSensorAttrValue';
        let data = {
          actCode: "110",
          bindid: username,
          bindstr: pwd,
          uuid: diUuid,
          ver: "2"
        };
        app.wxRequest('POST', url, data, (res) => {
          console.log(res.data)
        },
          (err) => {
            console.log(err.errMsg)
          }
        )
      }
      console.log('当前页面在彩灯色调控制');
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