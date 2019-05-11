// pages/areaconfig/areaadd/areaadd.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allSelect: false,
    choseImg: '/images/check-circle2.png',
    unchoseImg: '/images/check-circle.png',
    sortedDevs: '',
    arr:'',
  },
  submit: function (e) {
    var that = this
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    var name = e.detail.value.areaname;
    let arr1=that.data.arr;
    if (name == '' || arr1==''){
      wx.showModal({
        title: '提示',
        content: '请输入区域名称或者选择设备'
      })
    }else{
      let arr2 = [];
      for (let i = 0; i < arr1.length; i++) {  //获取选中设备的diDeviceuid
        arr2.push(arr1[i].diDeviceuid);
      }
      console.log(arr2);
      console.log(arr1);
      console.log(e.detail.value.areaname);
      let url = app.globalData.URL + 'addArea';
      let data = {
        actCode: "106",
        bindid: username,
        areaName: e.detail.value.areaname,
        devs: arr2,
        ver: "1"
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
        if (res.data!=null){
          wx.redirectTo({
            url: '../areaconfig',
          }, 2000)
        }
      },
        (err) => {
          console.log(err.errMsg)
        }
      )
    }
  },
  go: function(){
    wx.redirectTo({
      url: '../areaconfig',
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');
    let url = app.globalData.URL + 'getDev';
    let data = {
      bindid: username,
      bindstr: pwd
    };
    app.wxRequest('POST', url, data, (res) => {
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
      console.log(sortResult)
      wx.setStorage({
        key: "sortResult",
        data: sortResult
      });
      var arr3 = [];
      for (var i = 0; i < sortResult.length; i++) {   //显示区域添加设备
        if ((sortResult[i].diDeviceid == 2) || (sortResult[i].diDeviceid == 514 && sortResult[i].diZonetype == 0) || (sortResult[i].diDeviceid == 528 && (sortResult[i].diZonetype == 0 || sortResult[i].diZonetype == 2)) || (sortResult[i].diDeviceid == 4 && sortResult[i].diZonetype == 0) || (sortResult[i].diDeviceid == 9 && sortResult[i].diZonetype == 255)) {
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
    console.log(e.currentTarget.dataset.index);
    let infoArray = this.data.sortedDevs;
    let arr=[];
    infoArray[index].isSelect = !infoArray[index].isSelect;  //选中变为未选中，未选中变为选中
    console.log(infoArray[index]);
    for (var i = 0; i < infoArray.length; i++) { //获取选中信息
      if(infoArray[i].isSelect){
          arr.push(infoArray[i]);
          console.log(arr);
      }
    }
    this.setData({
      sortedDevs: infoArray,
      arr
    })
  },
})