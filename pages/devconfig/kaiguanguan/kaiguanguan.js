// pages/devconfig/kaiguanguan/kaiguanguan.js
var kaiguanguans=null;
var app=getApp();
var username;
var pwd;
var timestamp;
var token;
var sign;
var diName=[];
var diShowName=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diNames: '',
    chuanglians: '',
    diDeviceid:'',
    diZonetype:'',
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
    var kaiguanguan = decodeURIComponent(options.kaiguanguan);
    kaiguanguans = JSON.parse(kaiguanguan);
    this.setData({
      diNames: kaiguanguans.diShowName,
      chuanglians: kaiguanguans.diOnlineStatu,
      diDeviceid: kaiguanguans.diDeviceid,
      diZonetype: kaiguanguans.diZonetype
    })
    //获得获取传感器属性值
    var that = this;
    let url = app.globalData.URL + 'getSensorAttrValue?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      actCode: "110",
      bindid: username,
      bindstr: pwd,
      uuid: kaiguanguans.diUuid,
      ver: "2.0"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      that.setData({
        points: res.data.points
      });
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  //修改设备名称
  submit: function (e) {
    var that = this;
    var name = e.detail.value.name;//内存名称
    var showname = e.detail.value.showname;//显示名称    
    let url = app.globalData.URL + 'getDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      bindid: username,
      bindstr: pwd
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      var diName=[];
      var diShowName=[];
      for (var i in res.data.devs){
        diName.push(res.data.devs[i].diName);
        diShowName.push(res.data.devs[i].diShowName);
      }
      for (var i = 0; i < diName.length; i++) {
        if (diName[i] =="") {
          diName.splice(i, 1);
          i = i - 1;
        }
      }
      for (var i = 0; i < diShowName.length; i++) {
        if (diShowName[i] == "") {
          diShowName.splice(i, 1);
          i = i - 1;
        }
      }
      var bool;
      for (var j in diName) {
        if (name == diName[j]) {
          bool = "fal1";
        }
      }
      for (var k in diShowName) {
        if (showname == diShowName[k]) {
          bool = "fal2";
        }
      }
      if (showname == '' || name == '') {
        wx.showModal({
          title: '提示',
          content: '请输入内存名或者展示名称'
        })
      } else if (bool =="fal1"){
        wx.showModal({
          title: '提示',
          content: '内存名称已经存在'
        })
      }else if(bool=="fal2"){
        wx.showModal({
          title: '提示',
          content: '展示名称已经存在'
        })
      }else{
        let url = app.globalData.URL + 'editDevName?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
        let data = {
          act: "alterdevname",
          code: 202,
          AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
          key: "bq6wqzasjwtkl0i21pi9fbeq4",
          bindid: username,
          bindstr: pwd,
          devs: [{ uuid: kaiguanguans.diUuid, devShowName: showname, value: name }],
          ver: "2.0"
        };
        app.wxRequest('POST', url, data, (res) => {
          console.log(res.data)
          if (res.data.code == 1) {
            wx.showToast({
              title: '修改成功',
              duration: 2000
            });
            var pages = getCurrentPages(); // 当前页面 
            var beforePage = pages[pages.length - 2]; // 前一个页面  
            wx.navigateBack({
              success: function () {
                beforePage.onShow(); // 执行前一个页面的方法     
              }
            });
          }
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
  },
  //删除设备
  qingjingsc: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          console.log(kaiguanguans.diUuid);
          console.log(kaiguanguans.diIeee);
          let url = app.globalData.URL + 'delDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
          let data = {
            act:"deletedev",
            code:'201',
            AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
            key: "bq6wqzasjwtkl0i21pi9fbeq4",
            bindid: username,
            bindstr: pwd,
            devs: [{ uuid: kaiguanguans.diUuid, value: kaiguanguans.diIeee }],
            ver:"2.0"
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
                beforePage.onShow(); // 执行前一个页面的方法     
              }
            });
          },
            (err) => {
              console.log(err.errMsg)
            }
          )
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
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
      console.log('当前页面在kaiguanguan');
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