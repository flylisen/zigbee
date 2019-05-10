// pages/devconfig/devconfig.js
const app = getApp();
var sortResult = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortedDevs:''
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
      sortResult.forEach((item) => {
        //这里需要截取的内容
        item.diName = item.diName.substring(0, 3)
      })
      that.setData({
        sortedDevs: sortResult
      });
      console.log(sortResult)
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  kaiguanguan: function (event){
    console.log(event.currentTarget.dataset['kaiguanguan']);
    var kaiguanguan = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['kaiguanguan']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'kaiguanguan/kaiguanguan?kaiguanguan=' + kaiguanguan
    })
  },

  bindAdd:function(){
    
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
      var deviceuId;
      var value;
      var strs = new Array();
      strs = res.data.split(","); //字符分割 
      nodeType = strs[0].split('=')[1];
      deviceuId = strs[1].split('=')[1];
      value = strs[2].split('=')[1];
      console.log('nodeType', nodeType);
      console.log('deviceuId', deviceuId);
      console.log('value', value);
      //找到当前页面的page
      var pageArray = getCurrentPages();
      var curPage;
      for (var j = 0; j < pageArray.length; j++) {
        if (pageArray[j].route == 'pages/devconfig/devconfig') {
          curPage = pageArray[j];
        }
      }
      console.log('curPage', curPage);
      if (nodeType == 4) {
        //设备开关状态发生改变
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          if (deviceuId == curPage.data.sortedDevs[i].diDeviceuid) {
            var tmp = 'sortedDevs[' + i + '].diOnoffStatu';
            curPage.setData({
              [tmp]: value
            })
          }
        }
      } else if (nodeType == 1) {
        //设备新入网
        /*
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
        */
      } else if (nodeType == 2) {
        //判断设备是否在线
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          if (deviceuId == curPage.data.sortedDevs[i].diDeviceuid) {
            var tmp = 'sortedDevs[' + i + '].diOnlineStatu';
            curPage.setData({
              [tmp]: 1
            })
          }
        }
      } else if (nodeType == 5) {
        //修改名称
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          if (deviceuId == curPage.data.sortedDevs[i].diDeviceuid) {
            console.log('i=' + i);
            var tmp = 'sortedDevs[' + i + '].diName';
            curPage.setData({
              [tmp]: value
            })
          }
        }
      } else if (nodeType == 3) {
        //删除设备
        console.log("删除")
      } else if (nodeType == 6) {
        var that = this;
        var username = wx.getStorageSync('username');
        var pwd = wx.getStorageSync('pwd');
        let url = app.globalData.URL + 'getSensorAttrValue';
        let data = {
          actCode: "110",
          bindid: username,
          bindstr: pwd,
          deviceuid: deviceuId,
          ver: "1"
        };
        app.wxRequest('POST', url, data, (res) => {
          console.log(res.data) 
        },
          (err) => {
            console.log(err.errMsg)
          }
        )
      }
      console.log('当前页面在设备配置');
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