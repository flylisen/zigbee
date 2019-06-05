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
    localTemperature:'',
    sortedDevs:'',
    index:'',
    tmp:'',
    btn:'',
    ms:'../../../images/devctr/mswdj.png',
    fs:'../../../images/devctr/fswdj.png',
    kg:'../../../images/devctr/kgwdj.png',
    ConditionMode: [
      { name: 3, value: '制冷' },
      { name: 4, value: '制热' },
  
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
  checkboxChange: function (e) {
    console.log('模式：', e.detail.value)
    this.data.centralairConditionWindMode='';
    this.data.centralairConditionMode = e.detail.value;
  },
  checkboxChangeWindMode: function (e) {
    console.log('风速：', e.detail.value)
    this.data.centralairConditionMode = '';
    this.data.centralairConditionWindMode = e.detail.value;
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
      chuanglians: kongtiaos.diOnoffStatu,
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
        airAllState: res.data.airAllState,
        wendu: res.data.airAllState.currentTemperature,//空调温度
        localTemperature: res.data.airAllState.localTemperature, //本地温度
        centralairConditionMode: res.data.airAllState.mode,//模式
        centralairConditionWindMode: res.data.airAllState.windspeed//风速
      });
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  
  minus:function(){
    var wendu;
    if (this.data.wendu>1600){
       wendu= this.data.wendu - 100;
   }else{
      wx.showModal({
        title: '提示',
        content: '已经是最低温度了'
      })
      wendu=1600;
   }
    let url = app.globalData.URL + 'ariControlMode?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      act: "setthermostattemperature",
      code: 276,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      devs: [{ uuid: kongtiaos.diUuid, value: wendu }],
      ver: "2"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      if (res.data.code == 1) {
        this.setData({
          wendu: wendu
        })
      }
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  jia:function(){
    var wendu;
    if (this.data.wendu<3200){
       wendu = this.data.wendu + 100;
    }else{
      wx.showModal({
        title: '提示',
        content: '已经是最高温度了'
      })
      wendu=3200;
    }
    let url = app.globalData.URL + 'ariControlMode?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      act: "setthermostattemperature",
      code: 276,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      devs: [{ uuid: kongtiaos.diUuid, value: wendu }],
      ver: "2"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      if (res.data.code == 1) {
        this.setData({
          wendu: wendu
        })
      }
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  //开关事件
  kaiguanguan: function (event) {
    this.setData({
      kg: '../../../images/devctr/kgdj.png'
    })
    var centralairConditionMode = this.data.centralairConditionMode;
    if (centralairConditionMode!=0){//关闭
      let url = app.globalData.URL + 'ariControlTemp?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
      let data = {
        act: "setthermostatmode",
        code: 277,
        AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
        key: "bq6wqzasjwtkl0i21pi9fbeq4",
        bindid: username,
        bindstr: pwd,
        devs: [{ uuid: kongtiaos.diUuid, value: 0 }],
        ver: "2"
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
        if (res.data.code == 1) {
          this.setData({
            centralairConditionMode: 0,
            kg: '../../../images/devctr/kgwdj.png'
          })
        }
      },
        (err) => {
          console.log(err.errMsg)
        }
      )   
    }else{//打开
      let url = app.globalData.URL + 'ariControlTemp?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
      let data = {
        act: "setthermostatmode",
        code: 277,
        AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
        key: "bq6wqzasjwtkl0i21pi9fbeq4",
        bindid: username,
        bindstr: pwd,
        devs: [{ uuid: kongtiaos.diUuid, value: 5 }],
        ver: "2"
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
        if (res.data.code == 1) {
          this.setData({
            centralairConditionMode: 5,
            kg: '../../../images/devctr/kgwdj.png'
          })
        }
      },
        (err) => {
          console.log(err.errMsg)
        }
      )    
    }
  },
  /**
    * 弹窗
    */
  tongfeng: function () {
    this.setData({
      showModal: true,
      index:2,
      ms: '../../../images/devctr/msdj.png',
    })
  },
  actioncnt:function(){
    this.setData({
      showModal: true,
      index:3,
      fs: '../../../images/devctr/fsdj.png',
    })
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.data.centralairConditionMode = '';
    this.data.centralairConditionWindMode = '';
    this.setData({
      showModal: false,
      ms: '../../../images/devctr/mswdj.png',
      fs: '../../../images/devctr/fswdj.png',
    });
  },
  /**
 * 对话框确认按钮点击事件(温度)
 */
  onConfirm: function (e) {
    console.log(this.data.centralairConditionMode);
    console.log(this.data.centralairConditionWindMode);
    var centralairConditionMode = this.data.centralairConditionMode;
    var centralairConditionWindMode = this.data.centralairConditionWindMode;
    var index = this.data.index;
    if (index==2){
      if (centralairConditionMode != '') {//模式
        let url = app.globalData.URL + 'ariControlTemp?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
        let data = {
          act: "setthermostatmode",
          code: 277,
          AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
          key: "bq6wqzasjwtkl0i21pi9fbeq4",
          bindid: username,
          bindstr: pwd,
          devs: [{ uuid: kongtiaos.diUuid, value: centralairConditionMode}],
          ver: "2"
        };
        app.wxRequest('POST', url, data, (res) => {
          console.log(res.data)
          if(res.data.code==1){
            this.setData({
              centralairConditionMode: centralairConditionMode,
            })
          }
        },
          (err) => {
            console.log(err.errMsg)
          }
        )
      }else{
        wx.showModal({
          title: '提示',
          content: '请输入模式'
        })
      }
      this.hideModal();
    } else if (index==3){
      if (centralairConditionWindMode != '') { //风速
        let url = app.globalData.URL + 'ariControlSpeed?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
        let data = {
          act: "setthermostatwindspeed",
          code: 278,
          AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
          key: "bq6wqzasjwtkl0i21pi9fbeq4",
          bindid: username,
          bindstr: pwd,
          devs: [{ uuid: kongtiaos.diUuid, value: centralairConditionWindMode}],
          ver: "2"
        };
        app.wxRequest('POST', url, data, (res) => {
          console.log(res.data)
          if(res.data.code){
            this.setData({
              centralairConditionWindMode: centralairConditionWindMode,
            })
          }
        },
          (err) => {
            console.log(err.errMsg)
          }
        )
      }else{
        wx.showModal({
          title: '提示',
          content: '请输入风速'
        })
      }
      this.hideModal();
    }
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.data.centralairConditionMode='';
    this.data.centralairConditionWindMode='';
    this.hideModal();
    this.setData({
      ms: '../../../images/devctr/mswdj.png',
      fs: '../../../images/devctr/fswdj.png',
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
        var centralairConditionMode = curPage.data.centralairConditionMode;
         curPage.setData({
          centralairConditionMode: value
         })
       }
      if (nodeType == 101) {
        var centralairConditionWindMode = curPage.data.centralairConditionWindMode;
        curPage.setData({
          centralairConditionWindMode: value
        })
      } 
      if (nodeType == 102) {
        var wendu = curPage.data.wendu;
        curPage.setData({
          wendu:value
        })
      }
      if (nodeType == 103) {
        var localTemperature = curPage.data.wendu;
        curPage.setData({
          localTemperature: value
        })
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