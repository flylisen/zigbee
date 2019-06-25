// pages/areaconfig/areaadd/areaadd.js
var app = getApp();
var username;
var pwd;
var timestamp;
var token;
var username;
var pwd;
var sign;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allSelect: false,
    choseImg: '/images/check-circle2.png',
    unchoseImg: '/images/check-circle.png',
    sortedDevs: '',
    arr: '',
    select: false,
    hidden:false,
    grade_name: '--请选择--'
  },
  submit: function (e) {
    var that = this
    username = app.globalData.username;  //网关账号 
    pwd = app.globalData.pwd;  //网关密码 
    var name = e.detail.value.areaname;
    let arr1 = that.data.arr;
    let area = that.data.areatype;
    console.log(area);
    for (var i in area) {
      var atId = area[i].atId
    }
    console.log(atId)
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
      console.log(name);
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
  },
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
    console.log(url);
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
      console.log(areaTypeList);

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
        if ((sortResult[i].diDeviceid == 2) || (sortResult[i].diDeviceid == 514 && sortResult[i].diZonetype == 2) || (sortResult[i].diDeviceid == 528) || (sortResult[i].diDeviceid == 514 && sortResult[i].diZonetype == 1) || (sortResult[i].diDeviceid == 769 && sortResult[i].diZonetype == 1) || (sortResult[i].diDeviceid == 544 && sortResult[i].diZonetype == 255)) {
          arr3.push(sortResult[i]);
        }
      };
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
      var nodeType;
      var uuid;
      var value;
      var showname;
      var strs = new Array();
      strs = res.data.split(","); //字符分割 
      nodeType = strs[0].split('=')[1];
      uuid = strs[1].split('=')[1];
      value = strs[2].split('=')[1];
      showname = strs[3].split('=')[1];
      console.log('nodeType', nodeType);
      console.log('uuid', uuid);
      console.log('value', value);
      console.log('showname', showname);
      //找到当前页面的page
      var pageArray = getCurrentPages();
      var curPage;
      for (var j = 0; j < pageArray.length; j++) {
        if (pageArray[j].route == 'pages/areaconfig/areaadd/areaadd') {
          curPage = pageArray[j];
        }
      }
      console.log('curPage', curPage);
      if (nodeType == 4) {
        //设备开关状态发生改变
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          if (uuid == curPage.data.sortedDevs[i].diUuid) {
            var tmp = 'sortedDevs[' + i + '].diOnoffStatu';
            curPage.setData({
              [tmp]: value
            })
          }
        }
      } else if (nodeType == 1) {
        //设备新入网
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
      } else if (nodeType == 2) {
        //判断设备是否在线
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          if (uuid == curPage.data.sortedDevs[i].diUuid) {
            var tmp = 'sortedDevs[' + i + '].diOnlineStatu';
            curPage.setData({
              [tmp]: 1
            })
          }
        }
      } else if (nodeType == 5) {
        //修改名称
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          if (uuid == curPage.data.sortedDevs[i].diUuid) {
            console.log('i=' + i);
            var tmp = 'sortedDevs[' + i + '].diShowName';
            var dname = 'sortedDevs[' + i + '].diName';
            curPage.setData({
              [dname]: value,
              [tmp]: showname
            })
          }
        }
      } else if (nodeType == 3) {
        //删除设备
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
      } else if (nodeType == 6) {
        var that = this;
        let url = app.globalData.URL + 'getSensorAttrValue';
        let data = {
          actCode: "110",
          bindid: username,
          bindstr: pwd,
          uuid: uuid,
          ver: "2.0"
        };
        app.wxRequest('POST', url, data, (res) => {
          console.log(res.data)
        },
          (err) => {
            console.log(err.errMsg)
          }
        )
      }
      console.log('当前页面在区域新增');
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

    console.log(e);
    var name = e.currentTarget.dataset.name
    console.log(name)
    let typeinfo = this.data.areaTypeList;
    let areatype = [];
    console.log(this.data.areaTypeList);
    for (var i = 0; i < typeinfo.length; i++) {
      if (typeinfo[i].atName == name) {
        areatype.push(typeinfo[i])
      }
    }
    console.log(areatype);
    this.setData({

      grade_name: name,
      areatype,
      select: false

    })

  },
})