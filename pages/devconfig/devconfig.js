// pages/devconfig/devconfig.js
const app = getApp();
var sortResult = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var username = wx.getStorageSync('username');
    var pwd = wx.getStorageSync('pwd');
    wx.request({
      url: 'https://dev.rishuncloud.com:8443/getDev', //真实的接口地址           
      data: {
        bindid: username,
        bindstr: pwd
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var tmp = {};
        for (var index in res.data.devs) {
          var tag = res.data.devs[index].diDeviceid + res.data.devs[index].diZonetype + '';
          if (tmp[tag] == null || tmp[tag] == undefined) {
            tmp[tag] = new Array();
          }
          tmp[tag].push(res.data.devs[index]);
        };
        for (var key in tmp) {
          for (var j = 0; j < tmp[key].length; j++) {
            sortResult.push(tmp[key][j]);
          }
        }
        sortResult.forEach((item) => {
          //这里需要截取的内容
          item.diName = item.diName.substring(0, 3)
        })
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
  chuangliandk: function (event) {
    console.log(event.currentTarget.dataset['deviceuid']);
    var deviceuid = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['deviceuid']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'chuanglian/chuanglian?deviceuid=' + deviceuid
    })
  },
  shuijink: function (event) {
    console.log(event.currentTarget.dataset['shuijin']);
    var shuijin = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['shuijin']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'shuijin/shuijin?shuijin=' + shuijin
    })
  },
  jinjian: function (event) {
    console.log(event.currentTarget.dataset['jinjian']);
    var jinjian = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['jinjian']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'jinjian/jinjian?jinjian=' + jinjian
    })
  },
  anfangyaokongqi: function (event) {
    console.log(event.currentTarget.dataset['anfangyaokongqi']);
    var anfangyaokongqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['anfangyaokongqi']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'anfangyaokongqi/anfangyaokongqi?anfangyaokongqi=' + anfangyaokongqi
    })
  },
  deng: function (event) {
    console.log(event.currentTarget.dataset['deng']);
    var deng = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['deng']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'deng/deng?deng=' + deng
    })
  },
  rentichuanganqi: function (event) {
    console.log(event.currentTarget.dataset['rentichuanganqi']);
    var rentichuanganqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['rentichuanganqi']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'rentichuanganqiicon/rentichuanganqiicon?rentichuanganqi=' + rentichuanganqi
    })
  },
  yiyanghuatanchuanganqi: function (event) {
    console.log(event.currentTarget.dataset['yiyanghuatanchuanganqi']);
    var yiyanghuatanchuanganqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['yiyanghuatanchuanganqi']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'yiyanghuatanchuanganqi/yiyanghuatanchuanganqi?yiyanghuatanchuanganqi=' + yiyanghuatanchuanganqi
    })
  },
  mencichuanganqi: function (event) {
    console.log(event.currentTarget.dataset['mencichuanganqi']);
    var mencichuanganqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['mencichuanganqi']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'mencichuanganqi/mencichuanganqi?mencichuanganqi=' + mencichuanganqi
    })
  },
  wenshiduchuanganqi: function (event) {
    console.log(event.currentTarget.dataset['wenshiduchuanganqi']);
    var wenshiduchuanganqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['wenshiduchuanganqi']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'wenshiduchuanganqi/wenshiduchuanganqi?wenshiduchuanganqi=' + wenshiduchuanganqi
    })
  },

  qingjingkaiguan: function (event) {
    console.log(event.currentTarget.dataset['qingjingkaiguan']);
    var qingjingkaiguan = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['qingjingkaiguan']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'qingjingkaiguan/qingjingkaiguan?qingjingkaiguan=' + qingjingkaiguan
    })
  },
  hongwaiyaokongqi: function (event) {
    console.log(event.currentTarget.dataset['hongwaiyaokongqi']);
    var hongwaiyaokongqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['hongwaiyaokongqi']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'hongwaiyaokongqi/hongwaiyaokongqi?hongwaiyaokongqi=' + hongwaiyaokongqi
    })
  },
  yanwubaojingqi: function (event) {
    console.log(event.currentTarget.dataset['yanwubaojingqi']);
    var yanwubaojingqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['yanwubaojingqi']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'yanwubaojingqi/yanwubaojingqi?yanwubaojingqi=' + yanwubaojingqi
    })
  },
  wenkongqi: function (event) {
    console.log(event.currentTarget.dataset['wenkongqi']);
    var wenkongqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['wenkongqi']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'wenkongqi/wenkongqi?wenkongqi=' + wenkongqi
    })
  },
  shuibiao: function (event) {
    console.log(event.currentTarget.dataset['shuibiao']);
    var shuibiao = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['shuibiao']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'shuibiao/shuibiao?shuibiao=' + shuibiao
    })
  },
  mensuo: function (event) {
    console.log(event.currentTarget.dataset['mensuo']);
    var mensuo = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['mensuo']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'mensuo/mensuo?mensuo=' + mensuo
    })
  },
  shengguangbaojingqi: function (event) {
    console.log(event.currentTarget.dataset['shengguangbaojingqi']);
    var shengguangbaojingqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['shengguangbaojingqi']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'shengguangbaojingqi/shengguangbaojingqi?shengguangbaojingqi=' + shengguangbaojingqi
    })
  },
  keranqiti: function (event) {
    console.log(event.currentTarget.dataset['keranqiti']);
    var keranqiti = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['keranqiti']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'keranqiti/keranqiti?keranqiti=' + keranqiti
    })
  },
  mianban: function (event) {
    console.log(event.currentTarget.dataset['mianban']);
    var mianban = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['mianban']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'mianban/mianban?mianban=' + mianban
    })
  },
  chazuo: function (event) {
    console.log(event.currentTarget.dataset['chazuo']);
    var chazuo = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['chazuo']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'chazuo/chazuo?chazuo=' + chazuo
    })
  },
  zhongjiqizhongwen: function (event) {
    console.log(event.currentTarget.dataset['zhongjiqizhongwen']);
    var zhongjiqizhongwen = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['zhongjiqizhongwen']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'zhongjiqizhongwen/zhongjiqizhongwen?zhongjiqizhongwen=' + zhongjiqizhongwen
    })
  },
  sewendeng: function (event) {
    console.log(event.currentTarget.dataset['sewendeng']);
    var sewendeng = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['sewendeng']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'sewendeng/sewendeng?sewendeng=' + sewendeng
    })
  },
  kaiguanguan: function (event){
    console.log(event.currentTarget.dataset['kaiguanguan']);
    var kaiguanguan = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['kaiguanguan']));//函数可把字符串作为 URI
    wx.redirectTo({
      url: 'kaiguanguan/kaiguanguan?kaiguanguan=' + kaiguanguan
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
          if (getCurrentPages().length != 0) {
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
          }
        } else if (nodeType == 2) {
          //判断设备是否在线
          if (deviceuId == curPage.data.sortedDevs[i].diDeviceuid) {
            var tmp = 'sortedDevs[' + i + '].diOnlineStatu';
            curPage.setData({
              [tmp]: 1
            })
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
          //刷新当前页面的数据
          if (getCurrentPages().length != 0) {
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
          }
        } else if (nodeType == 6) {
          var that = this;
          var username = wx.getStorageSync('username');
          var pwd = wx.getStorageSync('pwd');
          wx.request({
            url: 'https://dev.rishuncloud.com:8443/getSensorAttrValue', //真实的接口地址       
            data: {
              actCode: "110",
              bindid: username,
              bindstr: pwd,
              deviceuid: deviceuId,
              ver: "1"
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
            },
            fail: function (err) {
              console.log(err)
            }
          })
        }
      console.log('当前页面在设备配置');
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