// pages/scenesconfig/scenesadd/kongtiao/kongtiao.js
var kongtiaos;
var app = getApp();
var username = wx.getStorageSync('username');//网关账号
var pwd = wx.getStorageSync('pwd'); //网关密码
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wendu: '',
    sortedDevs:'',
  },
  wendu: function (e) {
    this.setData({
      wendu: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var kongtiao = decodeURIComponent(options.kongtiao);
    kongtiaos = JSON.parse(kongtiao);
    console.log(kongtiaos);
    //获取获取温控器全部状态
    let url = app.globalData.URL + 'getAirAllState';
    let data = {
      act: "getthermostatallstate",
      code: 275,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      uuid: kongtiaos.diUuid,
      ver: '2.0'
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data.airAllState)
      this.setData({
        sortedDevs: res.data.airAllState
      })
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  /**
     * 弹窗
     */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
 * 对话框确认按钮点击事件
 */
  onConfirm: function (e) {
    console.log(this.data.wendu);
    let url = app.globalData.URL + 'ariControlMode';
    let data = {
      act: "setthermostattemperature",
      code: 276,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      devs: [{ uuid: kongtiaos.diUuid, value: this.data.wendu * 100 }],
      ver: "2"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
    this.hideModal();
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  actioncnt: function () {
    wx.showActionSheet({
      itemList: ['...', '低速', '中速', '高速', '...', '自动'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0 || res.tapIndex == 4) {
          wx.showToast({
            title: '请选择风速',
            icon: 'none',
          });
        } else {
          let url = app.globalData.URL + 'ariControlSpeed';
          let data = {
            act: "setthermostatwindspeed",
            code: 278,
            AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
            key: "bq6wqzasjwtkl0i21pi9fbeq4",
            bindid: username,
            bindstr: pwd,
            devs: [{ uuid: kongtiaos.diUuid, value: res.tapIndex }],
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
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  tongfeng: function () {
    wx.showActionSheet({
      itemList: ['关闭', '...', '...', '制冷', '制热', '打开'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 1 || res.tapIndex == 2) {
          wx.showToast({
            title: '请选择模式',
            icon: 'none',
          });
        } else {
          let url = app.globalData.URL + 'ariControlTemp';
          let data = {
            act: "setthermostatmode",
            code: 277,
            AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
            key: "bq6wqzasjwtkl0i21pi9fbeq4",
            bindid: username,
            bindstr: pwd,
            devs: [{ uuid: kongtiaos.diUuid, value: res.tapIndex }],
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
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //开关
  kaiguan: function () {
    var diOnoffStatu = kongtiaos.diOnoffStatu;
    console.log(diOnoffStatu);
    var temSet = '';
    if (diOnoffStatu >= 1) {
      temSet = 0
    } else {
      temSet = 1
    }
    console.log(temSet)
    let url = app.globalData.URL + 'ctrDev';
    let data = {
      bindid: username,
      bindstr: pwd,
      ctrType: 0,
      devs: [{ deviceuid: kongtiaos.diDeviceuid, uuid: kongtiaos.diUuid, value: temSet }]
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
        if (pageArray[j].route == 'pages/scenesconfig/scenesadd/kongtiao/kongtiao') {
          curPage = pageArray[j];
        }
      }
      console.log('curPage', curPage);
      if (nodeType ==100) {
        //温控器模式发生改变
          var tmp =this.data.sortedDevs.mode;
            curPage.setData({
              [tmp]: value
            })
        }
      }
      console.log('当前页面在空调');
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