const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    chuanglians: '',
    sortedDevs: '',
     
  },
  bindAdd: function () {
    this.setData({
      showModal: true
    })
  },
  go: function () {
    this.setData({
      showModal: false
    })
  },
  scenesctr: function () {
    wx.navigateTo({
      url: '../devconfig/devconfig'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this; 
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');    
    wx.request({
      url: 'https://localhost:8443/getDev', //真实的接口地址           
      data: {
        bindid:username,
        bindstr:pwd
      },
      method:'POST',      
    header: {        
      'content-type': 'application/json'      
        },      
        success: function (res) {         
          var tmp = {};
          for(var index in res.data.devs) {         
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
          that.setData({
            sortedDevs: sortResult
           });        
            },      
            fail: function (err) {        
              console.log(err)      
              }    
            })
    
  },
  //开关事件
  kaiguanguan: function (event) {
    var tp = event.currentTarget.dataset['tp'];
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    var temSet;
    var dd = tp.diOnoffStatu;
    if (tp.diOnoffStatu >= 1) {
        temSet = 0;
      } else {
        temSet = 1;
      }
    console.log(temSet);
    var index = event.currentTarget.id;//获得下标
    var tmp = 'sortedDevs[' + index + '].diOnoffStatu';
    this.setData({
      [tmp] : temSet
    })
      wx.request({
        url: 'https://localhost:8443/ctrDev',
        method: 'POST',
        data: {
          bindid: username,
          bindstr: pwd,
          ctrType: 0,
          devs: [{ deviceuid: tp.diDeviceuid, value: temSet }]
        },
        header:
        {
          'content-type': 'application/json' // 默认值 
        },
        success: function (res) {
          console.log(res.data)
        }
      })
  },
  //灯事件
  deng: function (event){
    var deng = event.currentTarget.dataset['deng'];
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    var temSet;
    if (deng.diOnoffStatu >= 1) {
      temSet = 0;
    } else {
      temSet = 1;
    }
    console.log(temSet);
    var index = event.currentTarget.id;//获得下标
    var tmp = 'sortedDevs[' + index + '].diOnoffStatu';
    this.setData({
      [tmp]: temSet
    })
    wx.request({
      url: 'https://localhost:8443/ctrDev',
      method: 'POST',
      data: {
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: deng.diDeviceuid, value: temSet }]
      },
      header:
      {
        'content-type': 'application/json' // 默认值 
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  xia: function (event){
    console.log(event.currentTarget.dataset['deng']);
    var deng = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['deng']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'dengcolor/dengcolor?deng=' + deng
    })
  },
  kongtiao:function(event){
    console.log(event.currentTarget.dataset['kongtiao']);
    var kongtiao = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['kongtiao']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'kongtiao/kongtiao?kongtiao=' + kongtiao
    })
  },
  shuijinchuang:function(event){
    console.log(event.currentTarget.dataset['shuijinchuang']);
    var shuijinchuang = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['shuijinchuang']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'shuijinchuang/shuijinchuang?shuijinchuang=' + shuijinchuang
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
        if (pageArray[j].route == 'pages/devctr/devctr') {
          curPage = pageArray[j];
        }
      }
      console.log('curPage', curPage);
      if (nodeType == 4) {
        //设备开关状态发生改变
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          console.log(curPage.data.sortedDevs[i].diDeviceuid);
          if (deviceuId == curPage.data.sortedDevs[i].diDeviceuid) {
            console.log('i=' + i);
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
      } else if (nodeType==2){
         //判断设备是否在线
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          console.log(curPage.data.sortedDevs[i].diDeviceuid);
          if (deviceuId == curPage.data.sortedDevs[i].diDeviceuid) {
            console.log('i=' + i);
            var tmp = 'sortedDevs[' + i + '].diOnlineStatu';
            curPage.setData({
              [tmp]: 0
            })
          }
        }
      }
      console.log('当前页面在设备控制');
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
         wx.showLoading({
           title: '加载中',
         })
     wx.stopPullDownRefresh();//刷新完成停止刷新
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