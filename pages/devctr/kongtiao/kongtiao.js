// pages/devctr/kongtiao/kongtiao.js
var kongtiaos='';
const app = getApp();
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
    airAllState:'',
    showModal: false,
    wendu:'',
    sortedDevs:'',
    index:'',
    ConditionMode: [
      { name: 0, value: '关' },
      { name: 3, value: '制冷' },
      { name: 4, value: '制热' },
      { name: 5, value: '开' },
    ],
    WindMode: [
      { name: 1, value: '低' },
      { name: 2, value: '中' },
      { name: 3, value: '高' },
      { name: 5, value: '自动'},
    ],
    centralairConditionMode:'',
    centralairConditionWindMode:'',
  },
  wendu:function(e){
    this.setData({
      wendu: e.detail.value
    })
  },
  checkboxChange: function (e) {
    console.log('模式：', e.detail.value)
    this.setData({
      centralairConditionMode: e.detail.value
    })
  },
  checkboxChangeWindMode: function (e) {
    console.log('风速：', e.detail.value)
    this.setData({
      centralairConditionWindMode: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    username = app.globalData.username;
    pwd = app.globalData.pwd;
    timestamp = app.globalData.timestamp;
    token = app.globalData.token;
    sign = app.globalData.sign;
    var kongtiao = decodeURIComponent(options.kongtiao);
    kongtiaos = JSON.parse(kongtiao);
    this.setData({
      diNames: kongtiaos.diShowName,
      chuanglians: kongtiaos.diOnlineStatu,
      sortedDevs: kongtiaos 
    });
    //获取获取温控器全部状态
    let url = app.globalData.URL + 'getAirAllState?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      act: "getthermostatallstate",
      code:275,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      uuid: kongtiaos.diUuid,
      ver:'2.0'
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      this.setData({
        airAllState: res.data.airAllState
      })
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  reduce:function(){
     
  },
  /**
    * 弹窗
    */
  showDialogBtn: function () {
    this.setData({
      showModal: true,
      index:1
    })
  },
  tongfeng: function () {
    this.setData({
      showModal: true,
      index:2
    })
  },
  actioncnt:function(){
    this.setData({
      showModal: true,
      index:3
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
 * 对话框确认按钮点击事件(温度)
 */
  onConfirm: function (e) {
    if (this.data.wendu!=''){
      let url = app.globalData.URL + 'ariControlMode?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
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
    } else if (this.data.centralairConditionMode!=''){
      let url = app.globalData.URL + 'ariControlSpeed?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
      let data = {
        act: "setthermostatwindspeed",
        code: 278,
        AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
        key: "bq6wqzasjwtkl0i21pi9fbeq4",
        bindid: username,
        bindstr: pwd,
        devs: [{ uuid: kongtiaos.diUuid, value: this.data.centralairConditionMode}],
        ver: "2"
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
      },
        (err) => {
          console.log(err.errMsg)
        }
      )
    } else if (this.data.centralairConditionWindMode!=''){
      let url = app.globalData.URL + 'ariControlTemp?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
      let data = {
        act: "setthermostatmode",
        code: 277,
        AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
        key: "bq6wqzasjwtkl0i21pi9fbeq4",
        bindid: username,
        bindstr: pwd,
        devs: [{ uuid: kongtiaos.diUuid, value: this.data.centralairConditionWindMode }],
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
    this.hideModal();
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
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
      for (var j = 0; j < pageArray.length; j++){
        if (pageArray[j].route == 'pages/devctr/kongtiao/kongtiao') {
          curPage = pageArray[j];
        }
      }
      console.log('curPage', curPage); 
       if (nodeType==100){
        for (var i = 0; i < curPage.data.airAllState.length;i++){
          var tmp = 'airAllState[' + i + '].mode';
          curPage.setData({
            [tmp]: value
          })   
        }
      }
      if (nodeType == 101) {
        for (var i = 0; i < curPage.data.airAllState.length; i++) {
          var tmp = 'airAllState[' + i + '].windspeed';
          curPage.setData({
            [tmp]: value
          })
        }
      } 
      if (nodeType == 102) {
        for (var i = 0; i < curPage.data.airAllState.length; i++) {
          var tmp = 'airAllState[' + i + '].currentTemperature';
          curPage.setData({
            [tmp/100]: value
          })
        }
      }
      if (nodeType == 103) {
        for (var i = 0; i < curPage.data.airAllState.length; i++) {
          var tmp = 'airAllState[' + i + '].localTemperature';
          curPage.setData({
            [tmp / 100]: value
          })
        }
      }
      console.log('当前页面在空调');
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