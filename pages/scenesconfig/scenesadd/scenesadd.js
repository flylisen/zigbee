// pages/scenesconfig/scenesadd/scenesadd.js
const app = getApp();
var username;
var pwd;
var timestamp;
var token;
var sign;
var temSet;
var tp;
var name = [];
var showname = [];
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
    showView: true,
    sceneVisible:'',
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
    index:'',
    airTempArray:[],
    kgcd:'',
    ins:-1,
    ins2:-1,
    ins3:-1,
    ins4:-1,
    ins5:-1,
    hidden:false,
  },
  kindToggle: function (e) {
    var ins = e.currentTarget.id;//获得下标
    if(this.data.ins==ins){
      this.setData({
        ins:-1,
      })  
    }else{
      this.setData({
        ins: ins,
      })
    }
  },
  kindToggle2: function (e) {
    var ins2 = e.currentTarget.id;//获得下标
    if (this.data.ins2 == ins2) {
      this.setData({
        ins2: -1,
      })
    } else {
      this.setData({
        ins2: ins2,
      })
    }
  },
  kindToggle3: function (e) {
    var ins3 = e.currentTarget.id;//获得下标
    if (this.data.ins3 == ins3) {
      this.setData({
        ins3: -1,
      })
    } else {
      this.setData({
        ins3: ins3,
      })
    }
  },
  kindToggle4: function (e) {
    var ins4 = e.currentTarget.id;//获得下标
    if (this.data.ins4 == ins4) {
      this.setData({
        ins4: -1,
      })
    } else {
      this.setData({
        ins4: ins4,
      })
    }
  },
  kindToggle5: function (e) {
    var ins5 = e.currentTarget.id;//获得下标
    if (this.data.ins5 == ins5) {
      this.setData({
        ins5: -1,
      })
     } else {
      this.setData({
        ins5: ins5,
      })
    }
  },
  //窗帘开关程度
  kgcd:function(e){
     var val=e.detail.value;
     this.setData({
       kgcd:val
     })
  },
  //灯亮度
  ld:function(e){
    this.setData({
      brightness: e.detail.value
    })
  },
  //灯色调
  sd:function(e){
    this.setData({
      hue: e.detail.value
    })
  },
  //饱和度
  bhd:function(e){
    this.setData({
      saturation: e.detail.value
    })
  },
  //温度
  wd: function (e) {
    this.setData({
      temperature: e.detail.value
    })
  },
  //灯温
  dengwd: function (e) {
    this.setData({
      CCT: e.detail.value
    })
  },
  radioChange: function (e) {
    this.data.sceneVisible=e.detail.value
  },
  checkboxChange: function (e) {
    this.setData({
      centralairConditionMode: e.detail.value
    })
  },
  checkboxChangeWindMode:function(e){
    this.setData({
      centralairConditionWindMode: e.detail.value
    })
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
        sortedDevs: arr3,
        hidden:true
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
  /**
    * 空调弹窗
    */
  kongtiao: function (event) {
    tp = event.currentTarget.dataset['kongtiao'];
    this.setData({
      showModal: true,
      diDeviceid: tp.diDeviceid,
      diZonetype: tp.diZonetype,
      index:1
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
      diZonetype: tp.diZonetype,
      index: 2
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
      diZonetype: tp.diZonetype,
      index:3
    })
  },
  //开关事件
  changTap: function (e) {
    var that = this;
    var tp = e.currentTarget.dataset['tp'];
    console.log(tp)
    temSet = '';
    if (e.detail.value == true) {
      temSet = 1;
    } else {
      temSet = 0;
    }
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
      if (typeof (Array[i].status) == "undefined"){
        o.status=0;
      }else{
        o.status = Array[i].status;
      }
      if (Array[i].diDeviceid == 514){
        if (this.data.kgcd==''){
          o.brightness=0
        }else{
          o.brightness = this.data.kgcd;//窗帘的开关程度
        }
      }
      var type1 = {};
      var type2 = {};
      var type3 = {};
      if (Array[i].diDeviceid == 769 && Array[i].diZonetype==1){ //空调
        let airTempArray = [];//清空
        var funId=0;
        var nid=0;
        var type1={};
        var type2={};
        var type3={};
        if (this.data.centralairConditionMode!=''){
          type1.uuid = Array[i].diUuid;
          type1.deviceid = Array[i].diDeviceid;
          type1.status = Array[i].diOnoffStatu;
          type1.thermostatMode = this.data.centralairConditionMode;
          type1.thermostatcontroltype = 1;
          type1.sceneFunctionID = funId++;
          type1.defenseID = nid++;
          this.data.airTempArray.push(type1); 
        }
        if (this.data.centralairConditionWindMode!=''){
          type2.uuid = Array[i].diUuid;
          type2.deviceid = Array[i].diDeviceid;
          type2.status = Array[i].diOnoffStatu;
          type2.thermostatWindMode = this.data.centralairConditionWindMode;
          type2.thermostatcontroltype = 2;
          type2.sceneFunctionID = funId++;
          type2.defenseID = nid++;
          this.data.airTempArray.push(type2);
        }
        if (this.data.temperature!=''){
          type3.uuid = Array[i].diUuid;
          type3.deviceid = Array[i].diDeviceid;
          type3.status = Array[i].diOnoffStatu;
          type3.temperature = this.data.temperature*100;
          type3.thermostatcontroltype = 3;
          type3.sceneFunctionID = funId++;
          type3.defenseID = nid++;
          this.data.airTempArray.push(type3);
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
        if (this.data.CCT!=''){
          o.CCT = this.data.CCT;
          }else{
          o.CCT=0;
          }
      }
      if (Array[i].diDeviceid == 769 && Array[i].diZonetype == 1) {
         var type = {};
        if (this.data.airTempArray.length==0){
          var type={};
          type.uuid = Array[i].diUuid;
          type.deviceid = Array[i].diDeviceid;
          type.status = Array[i].diOnoffStatu;
          type.thermostatMode = 5;
          type.thermostatcontroltype = 1;
          this.data.realsceneMemberArray.push(type);       
        }else{
          for (var j = 0; j < this.data.airTempArray.length; j++) {
            this.data.realsceneMemberArray.push(this.data.airTempArray[j]);
          }
        }
      }else{
        this.data.realsceneMemberArray.push(o);
      }
    }
    var that = this
    var name = e.detail.value.areaname;
    var showname = e.detail.value.showName;
    var sceneVisible= this.data.sceneVisible;
      if (name == '' || showname == '') {
        wx.showModal({
          title: '提示',
          content: '请输入显示名称或者内存名称'
        })
      } else if (sceneVisible == '') {
        wx.showModal({
          title: '提示',
          content: '请选择场景是否可见'
        })
      } else if (Array == '') {
        wx.showModal({
          title: '提示',
          content: '请选择设备'
        })
      }else{
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
            showName: showname,
            sceneVisible: sceneVisible,
            sceneMembers: this.data.realsceneMemberArray
          }]
        };
        app.wxRequest('POST', url, data, (res) => {
          if (res.data.code == 1) {
            var pages = getCurrentPages(); // 当前页面 
            var beforePage = pages[pages.length - 2]; // 前一个页面  
            wx.navigateBack({
              success: function () {
                beforePage.onShow(); // 执行前一个页面的方法     
              }
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

