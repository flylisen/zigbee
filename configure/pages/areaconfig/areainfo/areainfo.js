// pages/areaconfig/areainfo/areainfo.js
var app = getApp();
var Industrys;
var username //网关账号
var pwd  //网关密码
var timestamp;
var token;
var sign;
const utils = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allSelect: false,
    choseImg: '/images/changjing/xz.png',
    unchoseImg: '/images/changjing/wxz.png',
    sortedDevs: '',
    arr: '',
    hidden: false,
    sortedDevs: '',
    aiNames: '',
    atImg: '',
    logs: []
  },
  submit: utils.throttle(function (e) {  //删除设备
    var that = this
    username = app.globalData.username;  //网关账号 
    pwd = app.globalData.pwd;  //网关密码 
    var areaId = Industrys.aiId;
    var arr1 = that.data.arr;
    if (arr1 == '') {
      wx.showToast({
        title: '请选择设备！'
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '确定删除该设备吗？',
        success: function (msg) {
          if (msg.confirm) {
            let arr2 = [];
            for (let i = 0; i < arr1.length; i++) {  //获取选中设备的diId
              arr2.push(arr1[i].diId);
            }
            let url = app.globalData.URL + 'delDevFromArea?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
            let data = {
              actCode: "109",
              bindid: username,
              areaId: areaId,
              devIds: arr2,
              ver: "2"
            };
            app.wxRequest('POST', url, data, (res) => {
              console.log(res.data);
              wx.showToast({
                title: '删除成功',
                duration: 1000
              });
              var pages = getCurrentPages()    //获取加载的页面
              var currentPage = pages[pages.length - 1]    //获取当前页面的对象
              var options = currentPage.options
              that.onLoad(options);
              arr =[];
              that.setData({
                arr
              });
            },
              (err) => {
                console.log(err.errMsg)
              }
            )
          } else if (msg.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },1000),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var aiid = decodeURIComponent(options.aiid);
    Industrys = JSON.parse(aiid);
    this.setData({
      aiNames: Industrys.aiName,
      atImg: Industrys.atImg
    })
    var that = this;
    username = app.globalData.username;  //网关账号 
    pwd = app.globalData.pwd;  //网关密码 
    timestamp = app.globalData.timestamp;
    token = app.globalData.token;
    sign = app.globalData.sign;
    let url = app.globalData.URL + 'getAreaDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
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
      that.setData({
        sortedDevs: sortResult,
        hidden: true
      });
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
    app.globalData.callback = function (res) {
      console.log('接收到服务器信息', res);
      console.log('当前页面在areaadd');
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

  },
  chooseTap(e) {//单击选中或取消按钮
    let index = e.currentTarget.dataset.index;  //当前点击列表的index
    let infoArray = this.data.sortedDevs;
    let arr = [];
    infoArray[index].isSelect = !infoArray[index].isSelect;  //选中变为未选中，未选中变为选中
    for (var i = 0; i < infoArray.length; i++) { //获取选中信息
      if (infoArray[i].isSelect) {
        arr.push(infoArray[i]);
      }
    }
    console.log(arr);
    this.setData({
      sortedDevs: infoArray,
      arr
    })
  },
  delete: utils.throttle(function (e) {  //删除区域
    var that = this;
    username = app.globalData.username;  //网关账号 
    pwd = app.globalData.pwd;  //网关密码 
    wx.showModal({
      title: '提示',
      content: '确定删除该区域吗？',
      success: function (msg) {
        if (msg.confirm) {
          let url = app.globalData.URL + 'delArea?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
          let data = {
            actCode: "108",
            bindid: username,
            areaId: Industrys.aiId,
            ver: "2"
          };
          app.wxRequest('POST', url, data, (res) => {
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
            })
          },
            (err) => {
              console.log(err.errMsg)
            }
          )
        } else if (msg.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },1000),
})