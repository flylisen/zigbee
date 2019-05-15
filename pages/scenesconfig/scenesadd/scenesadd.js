// pages/scenesconfig/scenesadd/scenesadd.js
const app = getApp();
var sceneVisible='';
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
    items: [
      { name: 0, value: '不可见'},
      { name: 1, value: '可见'},
    ],
    sceneArray : []
  },
  radioChange(e) {
    sceneVisible = e.detail.value;
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  submit: function (e) {
    var that = this
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    var name = e.detail.value.areaname;
    console.log(name);
    let arr1 = that.data.arr;
    console.log(arr1);
    if (name == '' || arr1 == '' || sceneVisible==''){
      wx.showModal({
        title: '提示',
        content: '请输入场景名称和选择设备与是否可见'
      })
    }else{
      for (let i = 0; i < arr1.length; i++) { 
        var sceneDev = {};
        if (arr1[i].diDeviceid==2){//开关
          console.log(arr1[i].diUuid);
          console.log(arr1[i].diDeviceid);
          console.log(arr1[i].diOnoffStatu);
          sceneDev.uuid = arr1[i].diUuid;
          sceneDev.deviceid = arr1[i].diDeviceid;
          sceneDev.status = arr1[i].diOnoffStatu;
          sceneDev.brightness = 0;
          sceneDev.hue = 0;
          sceneDev.saturation = 0;
          sceneDev.IRID = 0;  
        }
         if (arr1[i].diDeviceid = 514){ //窗帘
           console.log(arr1[i].diUuid);
           console.log(arr1[i].diDeviceid);
           console.log(arr1[i].diOnoffStatu);
           sceneDev.uuid = arr1[i].diUuid;
           sceneDev.deviceid = arr1[i].diDeviceid;
           sceneDev.status = arr1[i].diOnoffStatu;
           sceneDev.brightness = 0;
           sceneDev.hue = 0;
           sceneDev.saturation = 0;
         }
        if (arr1[i].diDeviceid =528){   //灯
          console.log(arr1[i].diUuid);
          console.log(arr1[i].diDeviceid);
          console.log(arr1[i].diOnoffStatu);
          sceneDev.uuid = arr1[i].diUuid;
          sceneDev.deviceid = arr1[i].diDeviceid;
          sceneDev.status = arr1[i].diOnoffStatu;
          sceneDev.brightness = 0;
          sceneDev.hue = 0;
          sceneDev.saturation = 0;
         }
        if (arr1[i].diDeviceid == 769 && arr1[i].diZonetype == 1){//空调
          sceneDev.uuid = arr1[i].diUuid;
          sceneDev.deviceid = arr1[i].diDeviceid;
          sceneDev.status = arr1[i].diOnoffStatu;
          sceneDev.brightness = 0;
          sceneDev.hue = 0;
          sceneDev.saturation = 0;
          
         }
        if (arr1[i].diDeviceid == 544 && arr1[i].diZonetype == 255) {//色温（CCT）灯
          sceneDev.uuid = arr1[i].diUuid;
          sceneDev.deviceid = arr1[i].diDeviceid;
          sceneDev.status = arr1[i].diOnoffStatu;
          sceneDev.brightness = 0;
          sceneDev.hue = 0;
          sceneDev.saturation = 0;
         }
        sceneDev.IRID = 0;
        sceneDev.delayTime = 0;
        this.data.sceneArray.push(sceneDev);
      }  
      
      let url = app.globalData.URL + 'addScene';
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
          sceneVisible:sceneVisible,
          sceneMembers: this.data.sceneArray
        }]
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
        if (res.data!=null){
          wx.redirectTo({
            url: '../scenesconfig',
          }, 2000)
        }
      },
        (err) => {
          console.log(err.errMsg)
        }
      )
    }
  },
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
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');
    let url = app.globalData.URL + 'getDev';
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
    console.log(e.currentTarget.dataset.index);
    let infoArray = this.data.sortedDevs;
    let arr = [];
    infoArray[index].isSelect = !infoArray[index].isSelect;  //选中变为未选中，未选中变为选中
    console.log(infoArray[index]);
    for (var i = 0; i < infoArray.length; i++) { //获取选中信息
      if (infoArray[i].isSelect) {
        arr.push(infoArray[i]);
        console.log(arr);
      }
    }
    this.setData({
      sortedDevs: infoArray,
      arr
    })
  },
  //开关事件
  kaiguanguan: function (event) {
    var tp = event.currentTarget.dataset['tp'];
    console.log(tp)
    if (tp.diOnlineStatu > 0) {
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
        [tmp]: temSet
      })
      let url = app.globalData.URL + 'ctrDev';
      let data = {
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: tp.deviceuid, uuid: tp.diUuid, value: temSet }],
        var: "2.0"
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
      },
        (err) => {
          console.log(err.errMsg)
        }
      )
    } else {
      wx.showToast({
        title: '设备不在线',
        icon: 'none'
      })
    }
  },
  //灯事件
  deng: function (event) {
    var deng = event.currentTarget.dataset['deng'];
    if (deng.diOnlineStatu > 0) {
      console.log(deng)
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
      let url = app.globalData.URL + 'ctrDev';
      let data = {
        actCode: 102,
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: deng.deviceuid, uuid: deng.diUuid, value: temSet }],
        ver: "1"
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
      },
        (err) => {
          console.log(err.errMsg)
        }
      )
    } else {
      wx.showToast({
        title: '设备不在线',
        icon: 'none'
      })
    }
  },
  xia: function (event) {
    var deng = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['deng']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'dengcolor/dengcolor?deng=' + deng
    })
  },
  kongtiao: function (event) {
    var kongtiao = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['kongtiao']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'kongtiao/kongtiao?kongtiao=' + kongtiao
    })
  },
  sewendeng: function (event) {
    var sewendeng = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['sewendeng']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'sewendeng/sewendeng?sewendeng=' + sewendeng
    })
  },
  chuangliandk: function (event) {
    var deviceuid = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['deviceuid']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'chuanglian/chuanglian?deviceuid=' + deviceuid
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
      var nodeType;
      var diUuid;
      var value;
      var strs = new Array();
      strs = res.data.split(","); //字符分割 
      nodeType = strs[0].split('=')[1];
      diUuid = strs[1].split('=')[1];
      value = strs[2].split('=')[1];
      console.log('nodeType', nodeType);
      console.log('diUuid', diUuid);
      console.log('value', value);
      //找到当前页面的page
      var pageArray = getCurrentPages();
      var curPage;
      for (var j = 0; j < pageArray.length; j++) {
        if (pageArray[j].route == 'pages/scenesconfig/scenesadd/scenesadd') {
          curPage = pageArray[j];
        }
      }
      console.log('curPage', curPage);
      if (nodeType == 4) {
        //设备开关状态发生改变
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          if (diUuid == curPage.data.sortedDevs[i].diUuid) {
            var tmp = 'sortedDevs[' + i + '].diOnoffStatu';
            curPage.setData({
              [tmp]: value
            })
          }
        }
      } else if (nodeType == 1) {
        //设备新入网
        //刷新当前页面
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
      } else if (nodeType == 2) {
        //判断设备是否在线
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          if (diUuid == curPage.data.sortedDevs[i].diUuid) {
            var tmp = 'sortedDevs[' + i + '].diOnlineStatu';
            curPage.setData({
              [tmp]: 1
            })
          }
        }
      } else if (nodeType == 5) {
        //修改名称
        console.log(curPage.data.sortedDevs);
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          if (diUuid == curPage.data.sortedDevs[i].diUuid) {
            console.log('i=' + i);
            var tmp = 'sortedDevs[' + i + '].diName';
            curPage.setData({
              [tmp]: value
            })
          }
        }
      } else if (nodeType == 3) {
        //删除设备
        //刷新当前页面
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
      } else if (nodeType == 6) {
        var that = this;
        var username = wx.getStorageSync('username');
        var pwd = wx.getStorageSync('pwd');
        let url = app.globalData.URL + 'getSensorAttrValue';
        let data = {
          actCode: "110",
          bindid: username,
          bindstr: pwd,
          uuid: diUuid,
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
      console.log('当前页面在设备控制');
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