// pages/scenesconfig/scenesadd/scenesadd.js
const app = getApp();
var sceneVisible='';
var username;
var pwd;
var timestamp;
var token;
var sign;
var temSet;
var tp;
var thermostatControlType;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allSelect: false,
    choseImg: '/images/check-circle2.png',
    unchoseImg: '/images/check-circle.png',
    sortedDevs: '',
    showModal: false,
    diDeviceid:'',
    diZonetype:'',
    arry:[],
    items: [
      { name: 0, value: '不可见'},
      { name: 1, value: '可见'},
    ],
    ConditionMode: [
      { name: 0, value: '关' },
      { name: 3, value: '制冷' },
      { name: 4, value: '制热' },
      { name: 5, value: '开' },
    ],
    WindMode:[
      { name: 1, value: '低' },
      { name: 2, value: '中' },
      { name: 3, value: '高' },
      { name: 5, value: '自动' },
    ],
    sceneMemberArray:[],
    realsceneMemberArray :[],
    temperature:'',
    centralairConditionMode:'',
    centralairConditionWindMode:'',
    brightness:'',
    hue:'',
    saturation:'',
    CCT:'',
  },
  //温度
  temperature: function (e) {
    this.setData({
      temperature: e.detail.value
    })
  },
  //亮度
  brightness:function(e){
    this.setData({
      brightness: e.detail.value
    })
  },
  //色调
  hue: function (e) {
    this.setData({
      hue: e.detail.value
    })
  },
  //饱和度
  saturation: function (e) {
    this.setData({
      saturation: e.detail.value
    })
  },
  //灯温
  CCT: function (e) {
    this.setData({
      CCT: e.detail.value
    })
  },
  radioChange: function (e) {
    sceneVisible=e.detail.value
    console.log('可见值:', e.detail.value)
  },
  checkboxChange: function (e) {
    console.log('模式：', e.detail.value)
    this.setData({
      centralairConditionMode: e.detail.value
    })
  },
  checkboxChangeWindMode:function(e){
    console.log('风速：', e.detail.value)
    this.setData({
      centralairConditionWindMode: e.detail.value
    })
  },
  //关闭
  go: function () {
    wx.redirectTo({
      url: '../scenesconfig',
    }, 2000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    username = app.globalData.username;
    pwd = app.globalData.pwd;
    timestamp = app.globalData.timestamp;
    token = app.globalData.token;
    sign = app.globalData.sign;
    let url = app.globalData.URL + 'getDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      bindid: username,
      bindstr: pwd
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
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
      wx.setStorage({
        key: "sortResult",
        data: sortResult
      });
      var arr3 = [];
      for (var i = 0; i < sortResult.length; i++) {   //显示场景添加设备
        if ((sortResult[i].diDeviceid == 2) || (sortResult[i].diDeviceid == 514 && sortResult[i].diZonetype == 2) || (sortResult[i].diDeviceid == 528) || (sortResult[i].diDeviceid == 514 && sortResult[i].diZonetype == 1) || (sortResult[i].diDeviceid == 769 && sortResult[i].diZonetype == 1) || (sortResult[i].diDeviceid == 544 && sortResult[i].diZonetype == 255)) {
          arr3.push(sortResult[i]);
        }
      }
      console.log(arr3)
      that.setData({
        sortedDevs: arr3
      });
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
    this.addTag();
  },
  addTag() {//若是从服务器取来的数据，则需增加一个变量isSelect用来判断是否选中
    for (var i = 0; i < this.data.sortedDevs.length; i++) {
      this.data.sortedDevs[i].isSelect = false;
    }
  },
  chooseTap(e) {//单击选中或取消按钮
    let index = e.currentTarget.dataset.index;  //当前点击列表的index
     let infoArray = this.data.sortedDevs;
      let arr = [];
      infoArray[index].isSelect = !infoArray[index].isSelect;  //选中变为未选中，未选中变为选中
        for (var i = 0; i < infoArray.length; i++) { //获取选中信息
          if (infoArray[i].isSelect) {
            arr.push(infoArray[i]);
            console.log(arr);
          }
        }
        this.setData({
          sortedDevs: infoArray,
          arry:arr
        })
    this.data.sceneMemberArray = arr;

  },
  //开关事件
  kaiguanguan: function (event) {
     var that=this;
     tp = event.currentTarget.dataset['tp'];
     console.log(tp)
     temSet = '';
      if (tp.diOnoffStatu >= 1) {
        temSet = 0;
      } else {
        temSet = 1;
      }
      var index = event.currentTarget.id;//获得下标
      var tmp = 'sortedDevs[' + index + '].diOnoffStatu';
      this.setData({
        [tmp]: temSet,
      })
      console.log(temSet);
      that.chufa(tp);
  },
  /**
    * 空调弹窗
    */
  kongtiao: function (event) {
    tp = event.currentTarget.dataset['kongtiao'];
    this.setData({
      showModal: true,
      diDeviceid: tp.diDeviceid,
      diZonetype: tp.diZonetype
    })
  },
  /**
   * 灯弹窗
   */
  dengxia: function (event) {
    tp = event.currentTarget.dataset['deng'];
    this.setData({
      showModal: true,
      diDeviceid: tp.diDeviceid,
      diZonetype: tp.diZonetype
    })
  },
  /**
   * 色温灯
   */
  sewendeng: function (event) {
    tp = event.currentTarget.dataset['sewendeng'];
    this.setData({
      showModal: true,
      diDeviceid: tp.diDeviceid,
      diZonetype: tp.diZonetype
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
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    console.log(tp);
    var that=this;
    console.log(this.data.temperature);//温度
    console.log(this.data.centralairConditionMode);//模式
    console.log(this.data.centralairConditionWindMode);//风速
    console.log(this.data.brightness);//亮度
    console.log(this.data.hue);//色调
    console.log(this.data.saturation);//饱和度
    console.log(this.data.CCT);//灯温
    that.chufa(tp);
    this.hideModal();
  },
  //窗帘开关
  chuangliand: function (event) {
    var that = this;
    tp = event.currentTarget.dataset['chuangliand'];
    console.log(tp)
    temSet = '';
    if (tp.diOnoffStatu >= 1) {
      temSet = 0;
    } else {
      temSet = 1;
    }
    var index = event.currentTarget.id;//获得下标
    var tmp = 'sortedDevs[' + index + '].diOnoffStatu';
    this.setData({
      [tmp]: temSet,
    })
    console.log(temSet);
    that.chufa(tp);
  },
  //灯开关
  deng: function (event) {
    var that=this;
    var deng = event.currentTarget.dataset['deng'];
    var temSet='';
      if (deng.diOnoffStatu >= 1) {
        temSet = 0;
      } else {
        temSet = 1;
      }
      var index = event.currentTarget.id;//获得下标
      var tmp = 'sortedDevs[' + index + '].diOnoffStatu';
      this.setData({
        [tmp]: temSet
      })
    console.log(temSet);
    that.chufa(tp);
  },
  chufa: function (tp) {
    var that = this;
    for (var i = 0; i < that.data.sceneMemberArray.length; i++) {
      if (that.data.sceneMemberArray[i].diUuid == tp.diUuid) {
        if (tp.diDeviceid == 2) {//开关
          that.data.sceneMemberArray[i].status = temSet;
        }
        if (tp.diDeviceid ==514){//窗帘
          that.data.sceneMemberArray[i].status = temSet;
        }
        if (tp.diDeviceid=528){//灯
          that.data.sceneMemberArray[i].status = temSet;
        }
      }
    }
  },
  submit: function (e) {
    let Array = this.data.sceneMemberArray;
    console.log(Array);
    let sceneMemberArray=[];
    for (var i = 0; i < Array.length; i++) {
      var o = {};
      o.uuid = Array[i].diUuid;
      o.deviceid = Array[i].diDeviceid;
      o.status = Array[i].diOnoffStatu;
      if (Array[i].diDeviceid == 514){
        o.brightness =0;//窗帘的开关程度
      }
      if (Array[i].diDeviceid == 769 && Array[i].diZonetype==1){ //空调
        if (this.data.centralairConditionMode != ''){
          o.thermostatMode = this.data.centralairConditionMode;
          o.thermostatcontroltype=1;
        }else{
          o.thermostatMode = 0;
          o.thermostatcontroltype = 1;
        }
        if (this.data.centralairConditionWindMode!=''){
          o.thermostatWindMode = this.data.centralairConditionWindMode;
          o.thermostatcontroltype = 2;
        }else{
          o.thermostatWindMode =0;
          o.thermostatcontroltype = 2;
        }
        if (this.data.temperature!=''){
          o.temperature = this.data.temperature;
          o.thermostatcontroltype = 3;
        }else{
          o.temperature=0;
          o.thermostatcontroltype =3;
        } 
      }
      if (Array[i].diDeviceid ==528){//灯
        if (this.data.brightness!=''){
          o.brightness = this.data.brightness; //亮度
        }else{
          o.brightness=0;
        }
        if (this.data.hue!=''){
          o.hue = this.data.hue;//色调
        }else{
          o.hue=0;
        }
        if (this.data.saturation!=''){
        o.saturation = this.data.saturation;//饱和度
        }else{
          o.saturation=0;
        } 
      }
      if (Array[i].diDeviceid == 544 && Array[i].diZonetype ==255){//色温灯
          o.CCT = this.data.CCT;
      }
      this.data.realsceneMemberArray.push(o);
    }
    var that = this
    var name = e.detail.value.areaname;
    if (name != '' && Array != '' && sceneVisible!=''){
      let url = app.globalData.URL + 'addScene?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
      let data = {
        act: "setScenes",
        code: 603,
        AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
        key: "bq6wqzasjwtkl0i21pi9fbeq4",
        bindid: username,
        bindstr: pwd,
        ver: "2.0",
        scenes: [{
          sceneName: name,
          sceneVisible: sceneVisible,
          sceneMembers: this.data.realsceneMemberArray
        }]
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
        if (res.data != null) {
          wx.navigateTo({
            url: '../scenesconfig',
          }, 2000)
        }
      },
        (err) => {
          console.log(err.errMsg)
        }
      )
    }else{
      wx.showModal({
        title: '提示',
        content: '请输入场景名称或者选择设备和是否可见'
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
      console.log('当前新增场景');
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

