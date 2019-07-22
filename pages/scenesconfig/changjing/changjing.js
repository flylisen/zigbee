// pages/scenesconfig/changjing/changjing.js
var changjing;
var app=getApp();
var username;
var pwd;
var timestamp;
var token;
var sign;
var siName=[];
var siShowName=[];
const utils = require('../../../utils/util.js')
const winHeight = wx.getSystemInfoSync().windowHeight
Page({

  /**
   * 页面的初始数据
   */
  data: {
    siShowName:'',
    sortedDevss:[],
    sortedDevs:[],
    allSelect: false,
    choseImg: '/images/changjing/xz.png',
    unchoseImg: '/images/changjing/wxz.png',
    arr:'',
    siName:'',
    sceneVisible: '',
    siSceneVisibal:'',
    items: [
      { name: 0, value: '不可见', checked:''},
      { name: 1, value: '可见', checked: ''},
     ],
    uidarry:[],
    sceneMembers:[],
    hidden: false,
    logs: []
  },
  radioChange: function (e) {
    this.data.sceneVisible = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      winH: wx.getSystemInfoSync().windowHeight,
      opacity: 1,
      //这个是微信官方给的获取logs的方法 看了收益匪浅
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    username = app.globalData.username;
    pwd = app.globalData.pwd;
    timestamp = app.globalData.timestamp;
    token = app.globalData.token;
    sign = app.globalData.sign;
    var changjings = decodeURIComponent(options.changjings);
    changjing = JSON.parse(changjings);
    console.log(changjing);
    this.setData({
      siShowName: changjing.siShowName,
      siName: changjing.siName,
      siSceneVisibal:changjing.siSceneVisibal,
    })
    if (changjing.siSceneVisibal==0){
      var index = 0;
      this.data.items[index].checked = "true"; 
    }else{
      var index = 1;
      this.data.items[index].checked = "true"; 
    }
    this.setData({
      items: this.data.items
    }) 
    let url = app.globalData.URL + 'gerSceneMem?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      act: "getscenemembersbydetail",
      code: 602,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      ver: "2.0",
      scenes: [{ sceneID: changjing.siSceneId, sceneName: changjing.siName }]

    };
    app.wxRequest('POST', url, data, (res) => {
      for (var i in res.data.scenes) {
        var sceneMembers = res.data.scenes[i].sceneMembers;
        var len = sceneMembers.length;
        var ret = [];
        for (var i = 0; i < len; i++) {
          for (var j = i + 1; j < len; j++) {
            if (sceneMembers[i].uuid === sceneMembers[j].uuid) {
              j = ++i;
            }
          }
          ret.push(sceneMembers[i]);
        }
        this.setData({
          sortedDevs: ret,
          sceneMembers: sceneMembers,
          hidden:true
        })
      }
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  chooseTap:function(e) {//单击选中或取消按钮
    let index = e.currentTarget.dataset.index;  //当前点击列表的index
    let infoArray = this.data.sortedDevs;
    let arr = [];
    let sceneMembers=[];
    infoArray[index].isSelect = !infoArray[index].isSelect;  //选中变为未选中，未选中变为选中
    for (var i = 0; i < infoArray.length; i++) { //获取选中信息
      var uuid = infoArray[i].uuid;
      if (infoArray[i].isSelect) { //选中
        sceneMembers = this.data.sceneMembers;
        for (var j in sceneMembers){
          if (uuid == sceneMembers[j].uuid){
            arr.push(sceneMembers[j]);
          }
        }
      }
    }
    this.setData({
      sortedDevs: infoArray,
      arr:arr
    })
    console.log(this.data.arr);
  },
  submit: utils.throttle(function(){
    var that = this;
    let arr1 = that.data.arr;
    for (var i in arr1) {
      var uuids ={}; 
      uuids.uuid = arr1[i].uuid;
      uuids.sceneFunctionID = arr1[i].sceneFunctionID;
      this.data.uidarry.push(uuids);
    }
    let uidarrys = this.data.uidarry;
    console.log(uidarrys);
    wx.showModal({
      title: '提示',
      content: '确定删除该场景的设备吗？',
      success: function (msg) {
        if (uidarrys.length ===0){
          wx.showToast({
            title:'请选择你要删除的设备',
            icon:'none'
          })
          }else{
            if (msg.confirm) {
            let url = app.globalData.URL + 'delSceneMem?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
            let data = {
              act: "deleteScenemembers",
              code: 605,
              AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
              key: "bq6wqzasjwtkl0i21pi9fbeq4",
              bindid: username,
              bindstr: pwd,
              ver: "2",
              scenes: [{
                sceneID: changjing.siSceneId, sceneName: changjing.siName,
                sceneMembers: uidarrys
              }]
            };
            app.wxRequest('POST', url, data, (res) => {
              console.log(res.data)
              wx.showToast({
                title: '删除成功',
                duration: 2000
              });
              var pages = getCurrentPages(); // 当前页面 
              var beforePage = pages[pages.length - 2]; // 前一个页面  
              wx.navigateBack({
                success: function () {
                  beforePage.onLoad(); // 执行前一个页面的方法     
                }
              });
            },
              (err) => {
                console.log(err.errMsg)
              }
            )
          }else if (msg.cancel) {
            console.log('用户点击取消')
              that.data.arr=[];
              that.data.uidarry=[];
          }
        }
      }
    })
  },1000),
  //修改场景名称
  aiNames: utils.throttle(function(e){
    var sceneName = e.detail.value.sceneName;
    var sceneShowName = e.detail.value.sceneShowName;
    let url = app.globalData.URL + 'getSceneInfo?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      act: "getScenes",
      code: 601,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      option: 2,
      ver: "2.0"
    };
    app.wxRequest('POST', url, data, (res) => {
      var sceneVisible = this.data.sceneVisible;//是否可见
      if (sceneVisible==''){
         sceneVisible = this.data.siSceneVisibal;
      }else{
         sceneVisible = this.data.sceneVisible;//是否可见
      }
      var siShowNames = this.data.siShowName;
      var siNames= this.data.siName;
      var siName=[];
      var siShowName=[];
      for (var i in res.data.scenes){
        if (res.data.scenes[i].siName != siNames){
          siName.push(res.data.scenes[i].siName);
        }
        if (res.data.scenes[i].siShowName != siShowNames){
          siShowName.push(res.data.scenes[i].siShowName);
        }
      }
      for (var i = 0; i < siName.length; i++) {
        if (siName[i] == "") {
          siName.splice(i, 1);
          i = i - 1;
        }
      }
      for (var i = 0; i < siShowName.length; i++) {
        if (siShowName[i] == "") {
          siShowName.splice(i, 1);
          i = i - 1;
        }
      }
      var bool;
      for (var j in siName) {
        if (sceneName == siName[j]) {
          bool = "fal1";
        }
      }
      for (var k in siShowName) {
        if (sceneShowName == siShowName[k]) {
          bool = "fal2";
        }
      }
      if (sceneName == '' || sceneShowName == '') {
        wx.showModal({
          title: '提示',
          content: '请输入你要修改的名称'
        })
      } else if (bool =="fal1") {
        wx.showModal({
          title: '提示',
          content: '内存名称已经存在'
        })
      } else if (bool =="fal2") {
        wx.showModal({
          title: '提示',
          content: '展示名称已经存在'
        })
      } else {
        let url = app.globalData.URL + 'alterSceneName?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
        let data = {
          act: "resetSceneName",
          code: 606,
          AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
          key: "bq6wqzasjwtkl0i21pi9fbeq4",
          bindid: username,
          bindstr: pwd,
          ver: "2.0",
          scenes: [{ 
            sceneName: e.detail.value.sceneName, 
            sceneID: changjing.siSceneId, 
            sceneShowName: e.detail.value.sceneShowName,
            sceneVisible: sceneVisible,
            }]
        };
        app.wxRequest('POST', url, data, (res) => {
          console.log(res.data);
          var pages = getCurrentPages(); // 当前页面 
          var beforePage = pages[pages.length - 2]; // 前一个页面  
          wx.navigateBack({
            success: function () {
              beforePage.onShow(); // 执行前一个页面的方法     
            }
          });
        },
          (err) => {
            console.log(err.errMsg)
          }
        )
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
    this.hide()
  },
  //核心方法，线程与setData
  hide: function () {
    var vm = this
    var interval = setInterval(function () {
      if (vm.data.winH > 0) {
        //清除interval 如果不清除interval会一直往上加
        clearInterval(interval)
        vm.setData({ winH: vm.data.winH - 5, opacity: vm.data.winH / winHeight })
        vm.hide()
      }
    }, 10);
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