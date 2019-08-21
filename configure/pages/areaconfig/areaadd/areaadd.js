// pages/areaconfig/areaadd/areaadd.js
var app = getApp();
var username;
var pwd;
var timestamp;
var token;
var username;
var pwd;
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
    select: false,
    hidden:false,
    grade_name: '--请选择--',
    logs: []
  },
  submit: utils.throttle(function (e) {
    var that = this
    username = app.globalData.username;  //网关账号 
    pwd = app.globalData.pwd;  //网关密码 
    var name = e.detail.value.areaname;
    let arr1 = that.data.arr;
    let area = that.data.areatype;
    for (var i in area) {
      var atId = area[i].atId
    }
    if (name == '' || arr1 == '' || area == undefined) {
      wx.showModal({
        title: '提示',
        content: '请输入区域名称、选择设备或者选择区域类型'
      })
    }
    else {
      let arr2 = [];
      for (let i = 0; i < arr1.length; i++) {  //获取选中设备的diUuid
        arr2.push(arr1[i].diUuid);
      }
      let url = app.globalData.URL + 'addArea?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
      let data = {
        actCode: 106,
        bindid: username,
        areaName: name,
        areaTypeId: atId,
        devs: arr2,
        ver: "2"
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
        if (res.data.code = 1) {
          var pages = getCurrentPages(); // 当前页面 
          var beforePage = pages[pages.length - 2]; // 前一个页面  
          wx.navigateBack({
            success: function () {
              beforePage.onLoad(); // 执行前一个页面的方法     
            }
          })
        } else {

        }
      },
        (err) => {
          console.log(err.errMsg)
        }
      )
    }
  }, 1000),
  go: function () {
    var pages = getCurrentPages(); // 当前页面 
    var beforePage = pages[pages.length - 2]; // 前一个页面  
    wx.navigateBack({
      success: function () {
        beforePage.onLoad(); // 执行前一个页面的方法     
      }
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
    let url = app.globalData.URL + 'getAreaTypeList?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data = {
      bindid: username,
      ver: "2"
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data);
      var tmp = {};
      for (var index in res.data.areatype) {
        var tag = res.data.areatype[index].atId + '';
        if (tmp[tag] == null || tmp[tag] == undefined) {
          tmp[tag] = new Array();
        }
        tmp[tag].push(res.data.areatype[index]);
      };
      var areaTypeList = [];
      for (var key in tmp) {
        for (var j = 0; j < tmp[key].length; j++) {
          areaTypeList.push(tmp[key][j]);
        }
      }

      that.setData({
        areaTypeList: areaTypeList
      });
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
    let url1 = app.globalData.URL + 'getDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
    let data1 = {
      bindid: username,
      bindstr: pwd
    };
    app.wxRequest('POST', url1, data1, (res) => {
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
      };
      var arr3 = [];
      for (var i = 0; i < sortResult.length; i++) {   //显示区域添加设备
        if ((sortResult[i].diDeviceid == 2) || (sortResult[i].diDeviceid == 514) || (sortResult[i].diDeviceid == 528) 
        || (sortResult[i].diDeviceid == 9) || (sortResult[i].diDeviceid == 769) || (sortResult[i].diDeviceid == 544 )
          || (sortResult[i].diDeviceid == 337)) {
          arr3.push(sortResult[i]);
        }
      };
      console.log(arr3);
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
      }
    }
    this.setData({
      sortedDevs: infoArray,
      arr
    })
  },

  /**
*  点击下拉框 */

  bindShowMsg() {
    this.setData({

      select: !this.data.select

    })

  },
  /**

* 已选下拉框 */

  mySelect(e) {

    var name = e.currentTarget.dataset.name
    let typeinfo = this.data.areaTypeList;
    let areatype = [];
    for (var i = 0; i < typeinfo.length; i++) {
      if (typeinfo[i].atName == name) {
        areatype.push(typeinfo[i])
      }
    }
    this.setData({

      grade_name: name,
      areatype,
      select: false

    })

  },
})