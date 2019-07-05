const app = getApp();
var sortResult = [];
var username;
var pwd;
var timestamp;
var token;
var sign;
var rommid;
const utils = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  path:'pages/devctr/devctr',
  data: {
    chuanglians: '',
    sortedDevs: '',
    ins:-1,
    rommid:'',
    hidden:false,
    pz:'/images/pzwdj.png',
  },
  pz: function () {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      this.setData({
        pz: '/images/pzdj.png'
      })
      wx.navigateTo({
        url: '../devconfig/devconfig'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     username = app.globalData.username;
     pwd = app.globalData.pwd;
    rommid = app.globalData.rommid;
    that.setData({
      rommid
    })
     timestamp = app.globalData.timestamp;
     token = app.globalData.token;
     sign = app.globalData.sign;
    let url = app.globalData.URL + 'getDev?timestamp='+timestamp +'&token='+token+'&sign='+sign;
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
      console.log(sortResult);
      that.setData({
        sortedDevs: sortResult,
        hidden:true,
      });
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  //设备的开关
  changTap:function(e){
    var ins = e.currentTarget.id;//获得下标
    var tp = e.currentTarget.dataset['tp'];
    var value; 
    if (tp.diOnoffStatu==0){
      value=1;
    }else{
      value =0; 
    }
    this.setData({
      ins: ins
    })
    if (tp.diOnlineStatu==0){
      wx.showModal({
        title: '提示',
        content: '设备不在线'
      })
      this.setData({
        ins: -1
      })
     }else{
      for (var i = 0; i < this.data.sortedDevs.length; i++) {
        if (tp.diUuid == this.data.sortedDevs[i].diUuid) {
          console.log('找到匹配', i);
          var tmp = 'sortedDevs[' + i + '].diOnoffStatu';
          this.setData({
            [tmp]: value
          })
        }
      }
      this.setData({
        ins: -1
      })
      let url = app.globalData.URL + 'ctrDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
      let data = {
        bindid: username,
        bindstr: pwd,
        ctrType: 0,
        devs: [{ deviceuid: tp.deviceuid, uuid: tp.diUuid, value: value }],
        var: "2.0"
      };
      app.wxRequest('POST', url, data, (res) => {
         console.log(res.data)
        if (res.data.code!=1){
          this.setData({
            ins: -1
          })
        }
      },
        (err) => {
          console.log(err.errMsg)
        }
      )
     }
  },
  device: utils.throttle(function (event) {
    var ins = event.currentTarget.id;//获得下标
    this.setData({
      ins: ins
    })
    if (event.currentTarget.dataset['device'].diOnlineStatu>0){
      var device = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['device']));//函数可把字符串作为 URI
      if (!this.pageLoading) {
        this.pageLoading = !0;
        wx.navigateTo({
          url: 'kaiguanguan/kaiguanguan?kaiguanguan=' + device
        })
      }
    }else{
      wx.showModal({
        title: '提示',
        content: '设备不在线'
      })
      this.setData({
        ins:-1
      })
    }
  },1000),
  xia: utils.throttle(function (event){
    var ins = event.currentTarget.id;//获得下标
    this.setData({
      ins: ins
    })
    if (event.currentTarget.dataset['deng'].diOnlineStatu>0){
      var deng = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['deng']));//函数可把字符串作为 URI
      if (!this.pageLoading) {
        this.pageLoading = !0;
        wx.navigateTo({
          url: 'dengcolor/dengcolor?deng=' + deng
        })
      }
      this.setData({
        deng: false
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '设备不在线'
      })
      this.setData({
        ins: -1
      })
    }
  },1000),
  kongtiao: utils.throttle(function(event){
    var ins = event.currentTarget.id;//获得下标
    this.setData({
      ins: ins
    })
    if (event.currentTarget.dataset['kongtiao'].diOnlineStatu>0){
      var kongtiao = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['kongtiao']));//函数可把字符串作为 URI
      if (!this.pageLoading) {
        this.pageLoading = !0;
        wx.navigateTo({
          url: 'kongtiao/kongtiao?kongtiao=' + kongtiao
        })
      }
    }else{
      wx.showModal({
        title: '提示',
        content: '设备不在线'
      })
      this.setData({
        ins: -1
      })
    }
  },1000),
  sewendeng: utils.throttle(function (event){
    var ins = event.currentTarget.id;//获得下标
    this.setData({
      ins: ins
    })
    if (event.currentTarget.dataset['sewendeng'].diOnlineStatu>0){
      var sewendeng = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['sewendeng']));//函数可把字符串作为 URI
      if (!this.pageLoading) {
        this.pageLoading = !0;
        wx.navigateTo({
          url: 'sewendeng/sewendeng?sewendeng=' + sewendeng
        })
      }
    }else{
      wx.showModal({
        title: '提示',
        content: '设备不在线'
      })
      this.setData({
        ins: -1
      })
    }   
  },1000),
  //窗帘
  chuanglian: utils.throttle(function (event) {
    var ins = event.currentTarget.id;//获得下标
    this.setData({
      ins: ins
    })
    if (event.currentTarget.dataset['chuanglian'].diOnlineStatu>0){
      var deviceuid = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['chuanglian']));//函数可把字符串作为 URI
      if (!this.pageLoading) {
        this.pageLoading = !0;
        wx.navigateTo({
          url: 'chuanglian/chuanglian?deviceuid=' + deviceuid
        })
      }
    }else{
      wx.showModal({
        title: '提示',
        content: '设备不在线'
      })
      this.setData({
        ins: -1
      })
    }
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
    this.pageLoading = !1;
    //回调
    app.globalData.callback= function (res) {
      var nodeType;
      var uuid;
      var value;
      var showname;
      var strs = new Array();
      strs = res.data.split(","); //字符分割
      console.log(strs); 
      nodeType = strs[0].split('=')[1];
      uuid = strs[1].split('=')[1];
      value = strs[2].split('=')[1];
      showname = strs[3].split('=')[1];
      //找到当前页面的page
      var pageArray = getCurrentPages();
      var curPage;
      for (var j = 0; j < pageArray.length; j++) {
        if (pageArray[j].route == 'pages/devctr/devctr') {
          curPage = pageArray[j];
        }
      }
      if (nodeType == 4) {
        //设备开关状态发生改变
        console.log("设备开关状态发生改变");
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
        console.log("设备在线状态发生改变");
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          if (uuid == curPage.data.sortedDevs[i].diUuid) {
            var tmp = 'sortedDevs[' + i + '].diOnlineStatu';
            if (curPage.data.sortedDevs[i].diOnlineStatu==0){
              curPage.setData({
                [tmp]: 1
              })
            }else{
              curPage.setData({
                [tmp]: 0
              })
            }
           
          }
        }
      } else if (nodeType == 5) {
        //修改名称
        for (var i = 0; i < curPage.data.sortedDevs.length; i++) {
          if (uuid == curPage.data.sortedDevs[i].diUuid) {
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
      console.log('当前页面在设备配置');
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      ins: -1,
      pz: '/images/pzwdj.png'
    })
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