// pages/devctr/kongtiao/kongtiao.js
var kongtiaos='';
const app = getApp();
var username;
var pwd;
var timestamp;
var token;
var sign;
const utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diNames: '',
    airAllState:'',
    showModal: false,
    wendu:'',
    localTemperature:'',
    index:'',
    tmp:'',
    btn:'',
    ms:'../../../images/devctr/mswdj.png',
    fs:'../../../images/devctr/fswdj.png',
    mstext:false,
    fstext:false,
    minus:'../../../images/devctr/minuswdj.png',
    jia:'../../../images/devctr/jiawdj.png',
    jiatext:false,
    minustext: false,
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
    loadFlag: '', 
    imageHeight:''
  },
  checkboxChange: function (e) {
    this.data.centralairConditionWindMode='';
    this.data.centralairConditionMode = e.detail.value;
  },
  checkboxChangeWindMode: function (e) {
    this.data.centralairConditionMode = '';
    this.data.centralairConditionWindMode = e.detail.value;
  },
  bindload: function (res) {
    this.setData({
      loadFlag: true,
      imageHeight: res.detail.height

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
  
  minus: utils.throttle(function(){
    this.setData({
      minus: '../../../images/devctr/minusdj.png',
      minustext:true
    })
    var wendu;
    if (this.data.wendu>1600){
       wendu= this.data.wendu - 50;
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
      devs: [{ uuid: kongtiaos.diUuid, value: wendu}],
      ver: "2"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      if (res.data.code == 1) {
        this.setData({
          wendu: wendu,
          minus:'../../../images/devctr/minuswdj.png',
          minustext:false,
        })
      }
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },1000),
  jia: utils.throttle(function(){
    this.setData({
      jia: '../../../images/devctr/jiadj.png',
      jiatext:true
    })
    var wendu = this.data.wendu;
    if (wendu<3200){
      wendu = wendu + 50;
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
          wendu: wendu,
          jia: '../../../images/devctr/jiawdj.png',
          jiatext:false
        })
      }
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },1000),
  //开关事件
  kaiguanguan: utils.throttle(function (event) {
    var centralairConditionMode = this.data.centralairConditionMode;
    if (centralairConditionMode!=0){//关闭
      let url = app.globalData.URL + 'ariControlMode?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
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
          })
        }
      },
        (err) => {
          console.log(err.errMsg)
        }
      )  
    }else{//打开
      let url = app.globalData.URL + 'ariControlMode?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
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
          })
        }
      },
        (err) => {
          console.log(err.errMsg)
        }
      ) 
    }
  },1000),
  /**
  * 模式
  */
  tongfeng: utils.throttle(function () {
    this.setData({
      ms: '../../../images/devctr/msdj.png',
      mstext: true
    })
    var centralairConditionMode = this.data.centralairConditionMode;
    if (centralairConditionMode==3){
      var centralairConditionMode=4;
    }else{
      var centralairConditionMode =3;
    }
    let url = app.globalData.URL + 'ariControlMode?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
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
      if (res.data.code == 1) {
        this.setData({
          ms: '../../../images/devctr/mswdj.png',
          mstext: false
        })
      }else{
        wx.showToast({
          title: '温度调节失败',
          icon: 'none'
        })
      }
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },1000),
  /**
   * 风速
   */
  actioncnt: utils.throttle(function () {
    this.setData({
      fs: '../../../images/devctr/fsdj.png',
      fstext:true,
    })
    var centralairConditionWindMode = this.data.centralairConditionWindMode;
    if (centralairConditionWindMode==1){
      var centralairConditionWindMode=2;
    } else if (centralairConditionWindMode==2){
      var centralairConditionWindMode =3;
    } else if (centralairConditionWindMode==3){
      var centralairConditionWindMode =5;
    } else if (centralairConditionWindMode ==5){
      var centralairConditionWindMode =1;
    }
    let url = app.globalData.URL + 'ariControlSpeed?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      act: "setthermostatwindspeed",
      code: 278,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      devs: [{ uuid: kongtiaos.diUuid, value: centralairConditionWindMode }],
      ver: "2"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      if (res.data.code==1) {
        this.setData({
          fs: '../../../images/devctr/fswdj.png',
          fstext: false,
        })
      }else{
        wx.showToast({
          title: '风速调节失败',
          icon: 'none'
        })
      }
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },1000),
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
    app.globalData.callback = function (res) {
      var nodeType;
      var diUuid;
      var value;
      var strs = new Array();
      strs = res.data.split(","); //字符分割 
      nodeType = strs[0].split('=')[1];
      diUuid = strs[1].split('=')[1];
      value = strs[2].split('=')[1];
      //找到当前页面的page
      var pageArray = getCurrentPages();
      var curPage;
      for (var j = 0; j < pageArray.length; j++){
        if (pageArray[j].route == 'pages/devctr/kongtiao/kongtiao') {
          curPage = pageArray[j];
        }
      }
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
          wendu:parseInt(value)
        })
      }
      if (nodeType == 103) {
        var localTemperature = curPage.data.localTemperature;
        curPage.setData({
          localTemperature: value
        })
      }
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