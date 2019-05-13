// pages/areaconfig/areainfo/areainfo.js
var Industrys;
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortedDevs: '',
    aiNames:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var aiid = decodeURIComponent(options.aiid);
    Industrys = JSON.parse(aiid);
    console.log("id="+Industrys)
     this.setData({
       aiNames: Industrys.aiName
     })
    console.log('onLoad')
    var that = this;
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');
    let url = app.globalData.URL + 'getAreaDev';
    let data = {
      actCode: "108",
      bindid: username,
      areaId: Industrys.aiId,
      ver: "2"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data);
      var tmp = {};
      for (var index in res.data.devs) {
        var tag = res.data.devs[index].diDeviceid + res.data.devs[index].diZonetype + '';
        if (tmp[tag] == null || tmp[tag] == undefined) {
          tmp[tag] = new Array();
        }
        tmp[tag].push(res.data.devs[index]);
      };
      var sortResult = [];
      for (var key in tmp) {
        for (var j = 0; j < tmp[key].length; j++) {
          sortResult.push(tmp[key][j]);
        }
      }
      console.log(sortResult);
      that.setData({
        sortedDevs: sortResult
      });
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  //开关事件
  kaiguanguan: function (event) {
    var tp = event.currentTarget.dataset['tp'];
    console.log(tp)
    if (tp.diOnlineStatu > 0) {
      var username = wx.getStorageSync('username');//网关账号
      var pwd = wx.getStorageSync('pwd'); //网关密码
      var temSet;
      var dd = tp.diOnoffStatu;
      if (tp.diOnoffStatu >= 1) {
        temSet = 0;
      } else {
        temSet = 1;
      }
      console.log(temSet);
      var index = event.currentTarget.id;//获得下标
      var tmp = 'sortedDevs[' + index + '].diOnoffStatu';
      this.setData({
        [tmp]: temSet
      })
      let url = app.globalData.URL + 'ctrDev';
      let data = {
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: tp.deviceuid, uuid: tp.diUuid, value: temSet }],
        var: "2.0"
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
  //灯事件
  deng: function (event) {
    var deng = event.currentTarget.dataset['deng'];
    if (deng.diOnlineStatu > 0) {
      console.log(deng)
      var username = wx.getStorageSync('username');//网关账号
      var pwd = wx.getStorageSync('pwd'); //网关密码
      var temSet;
      if (deng.diOnoffStatu >= 1) {
        temSet = 0;
      } else {
        temSet = 1;
      }
      console.log(temSet);
      var index = event.currentTarget.id;//获得下标
      var tmp = 'sortedDevs[' + index + '].diOnoffStatu';
      this.setData({
        [tmp]: temSet
      })
      let url = app.globalData.URL + 'ctrDev';
      let data = {
        actCode: 102,
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: deng.deviceuid, uuid: deng.diUuid, value: temSet }],
        ver: "1"
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
  xia: function (event) {
    console.log(event.currentTarget.dataset['deng']);
    var deng = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['deng']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: '../../devctr/dengcolor/dengcolor?deng=' + deng
    })
  },
  kongtiao: function (event) {
    console.log(event.currentTarget.dataset['kongtiao']);
    var kongtiao = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['kongtiao']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: '../../devctr/kongtiao/kongtiao?kongtiao=' + kongtiao
    })
  },
  sewendeng: function (event) {
    console.log(event.currentTarget.dataset['sewendeng']);
    var sewendeng = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['sewendeng']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: '../../devctr/sewendeng/sewendeng?sewendeng=' + sewendeng
    })
  },
  chuangliandk: function (event) {
    var curtain = event.currentTarget.dataset['curtain'];
    console.log(curtain)
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    var temSet;
    var dd = curtain.diOnoffStatu;
    if (curtain.diOnoffStatu >= 1) {
      temSet = 0;
    } else {
      temSet = 1;
    }
    console.log(temSet);
    var index = event.currentTarget.id;//获得下标
    var tmp = 'sortedDevs[' + index + '].diOnoffStatu';
    this.setData({
      [tmp]: temSet
    })
    let url = app.globalData.URL + 'ctrDev';
    let data = {
      bindid: username,
      bindstr: pwd,
      ctrType: 0,
      devs: [{ deviceuid: curtain.diDeviceuid, uuid: curtain.diUuid, value: curtain.diOnoffStatu }],
      var: '2.0'
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
        if (pageArray[j].route == 'pages/areactr/areainfo/areainfo') {
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
        //刷新当前页面
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
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
        //刷新当前页面
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
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
      console.log('当前页面在区域设备控制');
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