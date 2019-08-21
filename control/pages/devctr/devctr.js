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
  data: {
    flag: 0,
    currentTab: 0,
    chuanglians: '',
    sortedDevs: '',
    ins: -1,
    rommid: '',
    hidden: false,
    pz: '/images/pzwdj.png',
     arr1:'',//开关
     arr2:'',//灯
     arr3:'',//窗帘
     arr4:'',//空调
     arr5:'',//传感器
     arr6:'',//其他设备
     statu:'',
  },
  switchNav:function (e) {
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({
        currentTab: id
      });
    }
    page.setData({
      flag: id
    });
  },
  catchTouchMove: function (res) {
    return false
  },
  pz: function () {
    if (!this.pageLoading) {
      this.pageLoading = !0;
      this.setData({
        pz: '/images/pzdj.png'
      })
      wx.navigateTo({
        url: '../../../configure/pages/devconfig/devconfig'
      })
    }
  },
  stopTouchMove:function(){
     
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
    let url = app.globalData.URL + 'getDev?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
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
      var arr1=[];//开关
      var arr2=[];//灯
      var arr3=[];//窗帘
      var arr4=[];//空调
      var arr5=[];//传感器
      var arr6=[];//其他设备
      for (var i in sortResult){
        if (sortResult[i].diDeviceid==2){
          arr1.push(sortResult[i]);
        } else if ((sortResult[i].diDeviceid == 528) || (sortResult[i].diDeviceid == 544 && sortResult[i].diZonetype == 255)){
          arr2.push(sortResult[i]);
        } else if ((sortResult[i].diDeviceid == 514 && sortResult[i].diZonetype == 2) || (sortResult[i].diDeviceid == 514 && sortResult[i].diZonetype ==1)){
          arr3.push(sortResult[i]);
        }else if (sortResult[i].diDeviceid == 769 && sortResult[i].diZonetype ==1) {
          arr4.push(sortResult[i]);
        } else if ((sortResult[i].diDeviceid == 1026 && sortResult[i].diZonetype == 13) || (sortResult[i].diDeviceid == 1026 && sortResult[i].diZonetype == 42) || (sortResult[i].diDeviceid == 1026 && sortResult[i].diZonetype == 32769) || (sortResult[i].diDeviceid == 1026 && sortResult[i].diZonetype == 21) || (sortResult[i].diDeviceid == 770 && sortResult[i].diZonetype == 0) || (sortResult[i].diDeviceid == 1026 && sortResult[i].diZonetype == 40) || (sortResult[i].diDeviceid == 1026 && sortResult[i].diZonetype ==43)){
          arr5.push(sortResult[i]);
        } else if ((sortResult[i].diDeviceid == 1026 && sortResult[i].diZonetype == 44) || (sortResult[i].diDeviceid == 1026 && sortResult[i].diZonetype == 277) || (sortResult[i].diDeviceid == 4 && sortResult[i].diZonetype == 0) || (sortResult[i].diDeviceid == 353 && sortResult[i].diZonetype == 0) || (sortResult[i].diDeviceid == 83 && sortResult[i].diZonetype == 258) || (sortResult[i].diDeviceid == 10 && sortResult[i].diZonetype == 255) || (sortResult[i].diDeviceid == 1027 && sortResult[i].diZonetype == 549) || (sortResult[i].diDeviceid == 771 && sortResult[i].diZonetype == 255) || (sortResult[i].diDeviceid == 9 && sortResult[i].diZonetype == 255) || (sortResult[i].diDeviceid == 337&& sortResult[i].diZonetype == 0)) {
          arr6.push(sortResult[i]);
        }
      }
      that.setData({
        sortedDevs: sortResult,//所有设备
        arr1:arr1,
        arr2:arr2,
        arr3:arr3,
        arr4: arr4,
        arr5:arr5,
        arr6:arr6,
        hidden: true,
      });
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
  },
  //设备的开关
  changTap: utils.throttle(function (e) {
    var ins = e.currentTarget.id;//获得下标
    var tp = e.currentTarget.dataset['tp'];
    var value;
    if (tp.diOnoffStatu == 0) {
      value = 1;
    } else {
      value = 0;
    }
    this.setData({
      ins: ins
    })
    if (tp.diOnlineStatu == 0) {
      wx.showModal({
        title: '提示',
        content: '设备不在线'
      })
      this.setData({
        ins: -1
      })
    } else {
      if (app.globalData.callback!=''){
        for (var i = 0; i < this.data.sortedDevs.length; i++) {
          if (tp.diUuid == this.data.sortedDevs[i].diUuid) {
            var tmp = 'sortedDevs[' + i + '].diOnoffStatu';
            this.setData({
              [tmp]: value
            })
          }
        }
        for (var i = 0; i < this.data.arr1.length; i++) {
          if (tp.diUuid == this.data.arr1[i].diUuid) {
            var tmp1 = 'arr1[' + i + '].diOnoffStatu';
            this.setData({
              [tmp1]: value
            })
          }
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
        if (res.data.code != 1) {
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
  }, 500),
  device: utils.throttle(function (event) {
    var ins = event.currentTarget.id;//获得下标
    this.setData({
      ins: ins
    })
    if (event.currentTarget.dataset['device'].diOnlineStatu > 0) {
      var device = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['device']));//函数可把字符串作为 URI
      if (!this.pageLoading) {
        this.pageLoading = !0;
        wx.navigateTo({
          url: '../devctr/kaiguanguan/kaiguanguan?kaiguanguan=' + device
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '设备不在线'
      })
      this.setData({
        ins: -1
      })
    }
  }, 1000),
  xia: utils.throttle(function (event) {
    var ins = event.currentTarget.id;//获得下标
    this.setData({
      ins: ins
    })
    console.log(event.currentTarget.dataset['deng']);
    if (event.currentTarget.dataset['deng'].diOnlineStatu > 0) {
      var deng = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['deng']));//函数可把字符串作为 URI
      if (!this.pageLoading) {
        this.pageLoading = !0;
        wx.navigateTo({
          url: '../devctr/dengcolor/dengcolor?deng=' + deng
        })
      }
      this.setData({
        deng: false
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '设备不在线'
      })
      this.setData({
        ins: -1
      })
    }
  }, 1000),
  kongtiao: utils.throttle(function (event) {
    var ins = event.currentTarget.id;//获得下标
    this.setData({
      ins: ins
    })
    if (event.currentTarget.dataset['kongtiao'].diOnlineStatu > 0) {
      var kongtiao = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['kongtiao']));//函数可把字符串作为 URI
      if (!this.pageLoading) {
        this.pageLoading = !0;
        wx.navigateTo({
          url: '../devctr/kongtiao/kongtiao?kongtiao=' + kongtiao
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '设备不在线'
      })
      this.setData({
        ins: -1
      })
    }
  }, 1000),
  sewendeng: utils.throttle(function (event) {
    var ins = event.currentTarget.id;//获得下标
    this.setData({
      ins: ins
    })
    if (event.currentTarget.dataset['sewendeng'].diOnlineStatu > 0) {
      var sewendeng = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['sewendeng']));//函数可把字符串作为 URI
      if (!this.pageLoading) {
        this.pageLoading = !0;
        wx.navigateTo({
          url: '../devctr/sewendeng/sewendeng?sewendeng=' + sewendeng
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '设备不在线'
      })
      this.setData({
        ins: -1
      })
    }
  }, 1000),
  //窗帘
  chuanglian: utils.throttle(function (event) {
    var ins = event.currentTarget.id;//获得下标
    this.setData({
      ins: ins
    })
    if (event.currentTarget.dataset['chuanglian'].diOnlineStatu > 0) {
      var deviceuid = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['chuanglian']));//函数可把字符串作为 URI
      if (!this.pageLoading) {
        this.pageLoading = !0;
        wx.navigateTo({
          url: '../devctr/chuanglian/chuanglian?deviceuid=' + deviceuid
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '设备不在线'
      })
      this.setData({
        ins: -1
      })
    }
  }, 1000),
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
    if(this.data.hidden==false){
      this.onLoad();
    }
   //回调
    app.globalData.callback = function (res) {
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
      //找到当前页面的page
      var pageArray = getCurrentPages();
      var curPage;
      for (var j = 0; j < pageArray.length; j++) {
        if (pageArray[j].route == 'control/pages/devctr/devctr') {
          curPage = pageArray[j];
        }
      }
      if (nodeType == 4) {
        //设备开关状态发生改变
        console.log("设备开关状态发生改变"+new Date);
        for (var i = 0; i <curPage.data.sortedDevs.length; i++) {
          if (uuid == curPage.data.sortedDevs[i].diUuid) {
            var tmp ='sortedDevs[' + i + '].diOnoffStatu';
            curPage.setData({
              [tmp]: value
            })
          }
        }
        for (var i = 0; i <curPage.data.arr1.length; i++) {
          if (uuid == curPage.data.arr1[i].diUuid) {
            var tmp1 = 'arr1[' + i + '].diOnoffStatu';
            curPage.setData({
               [tmp1]:value
            }) 
          }
        }
        for (var i = 0; i <curPage.data.arr2.length; i++) {
          if (uuid == curPage.data.arr2[i].diUuid) {
            var tmp2 = 'arr2[' + i + '].diOnoffStatu';
            curPage.setData({
              [tmp2]: value
            })
          }
        }
        for (var i = 0; i < curPage.data.arr3.length; i++) {
          if (uuid == curPage.data.arr3[i].diUuid) {
            var tmp3 = 'arr3[' + i + '].diOnoffStatu';
            curPage.setData({
              [tmp3]: value
            })
          }
        }
        for (var i = 0; i < curPage.data.arr4.length; i++) {
          if (uuid == curPage.data.arr4[i].diUuid) {
            var tmp4 = 'arr4[' + i + '].diOnoffStatu';
            curPage.setData({
              [tmp4]: value
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
            if (curPage.data.sortedDevs[i].diOnlineStatu == 0) {
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
        for (var i = 0; i < curPage.data.arr1.length; i++) {
          if (uuid == curPage.data.arr1[i].diUuid) {
            var tmp1 = 'arr1[' + i + '].diOnlineStatu';
            if (curPage.data.arr1[i].diOnlineStatu == 0) {
              curPage.setData({
                [tmp1]: 0
              })
            } else {
              curPage.setData({
                [tmp1]: 1
              })
            }
          }
        }
        for (var i = 0; i < curPage.data.arr2.length; i++) {
          if (uuid == curPage.data.arr2[i].diUuid) {
            var tmp2 = 'arr2[' + i + '].diOnlineStatu';
            if (curPage.data.arr2[i].diOnlineStatu == 0) {
              curPage.setData({
                [tmp2]: 0
              })
            } else {
              curPage.setData({
                [tmp2]: 1
              })
            }
          }
       }
        for (var i = 0; i < curPage.data.arr3.length; i++) {
          if (uuid == curPage.data.arr3[i].diUuid) {
            var tmp3 = 'arr3[' + i + '].diOnlineStatu';
            console.log(curPage.data.arr3[i].diOnlineStatu);
            if (curPage.data.arr3[i].diOnlineStatu == 0) {
              curPage.setData({
                [tmp3]: 0
              })
            } else {
              curPage.setData({
                [tmp3]: 1
              })
            }
          }
        }
        for (var i = 0; i < curPage.data.arr4.length; i++) {
          if (uuid == curPage.data.arr4[i].diUuid) {
            var tmp4 = 'arr4[' + i + '].diOnlineStatu';
            console.log(curPage.data.arr4[i].diOnlineStatu);
            if (curPage.data.arr4[i].diOnlineStatu == 0) {
              curPage.setData({
                [tmp4]: 0
              })
            } else {
              curPage.setData({
                [tmp4]: 1
              })
            }
          }
        }
        for (var i = 0; i < curPage.data.arr5.length; i++) {
          if (uuid == curPage.data.arr5[i].diUuid) {
            var tmp5 = 'arr5[' + i + '].diOnlineStatu';
            console.log(curPage.data.arr5[i].diOnlineStatu);
            if (curPage.data.arr5[i].diOnlineStatu == 0) {
              curPage.setData({
                [tmp5]: 0
              })
            } else {
              curPage.setData({
                [tmp5]: 1
              })
            }
          }
        }
        for (var i = 0; i < curPage.data.arr6.length; i++) {
          if (uuid == curPage.data.arr6[i].diUuid) {
            var tmp6 = 'arr6[' + i + '].diOnlineStatu';
            console.log(curPage.data.arr6[i].diOnlineStatu);
            if (curPage.data.arr6[i].diOnlineStatu == 0) {
              curPage.setData({
                [tmp6]: 0
              })
            } else {
              curPage.setData({
                [tmp6]: 1
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
            console.log(curPage.data.sortedDevs[i]);
          }
        }
        for (var i = 0; i < curPage.data.arr1.length; i++) {
          if (uuid == curPage.data.arr1[i].diUuid) {
            var tmp1 = 'arr1[' + i + '].diShowName';
            var dname1 = 'arr1[' + i + '].diName';
            curPage.setData({
              [dname1]: value,
              [tmp1]: showname
            })
          }
        }
        for (var i = 0; i < curPage.data.arr2.length; i++) {
          if (uuid == curPage.data.arr2[i].diUuid) {
            var tmp2 = 'arr2[' + i + '].diShowName';
            var dname2 = 'arr2[' + i + '].diName';
            curPage.setData({
              [dname2]: value,
              [tmp2]: showname
            })
          }
        }
        for (var i = 0; i < curPage.data.arr3.length; i++) {
          if (uuid == curPage.data.arr3[i].diUuid) {
            var tmp3 = 'arr3[' + i + '].diShowName';
            var dname3 = 'arr3[' + i + '].diName';
            curPage.setData({
              [dname3]: value,
              [tmp3]: showname
            })
          }
        }
        for (var i = 0; i < curPage.data.arr4.length; i++) {
          if (uuid == curPage.data.arr4[i].diUuid) {
            var tmp4 = 'arr4[' + i + '].diShowName';
            var dname4 = 'arr4[' + i + '].diName';
            curPage.setData({
              [dname4]: value,
              [tmp4]: showname
            })
          }
        }
        for (var i = 0; i < curPage.data.arr5.length; i++) {
          if (uuid == curPage.data.arr5[i].diUuid) {
            var tmp5 = 'arr5[' + i + '].diShowName';
            var dname5 = 'arr5[' + i + '].diName';
            curPage.setData({
              [dname5]: value,
              [tmp5]: showname
            })
          }
        }
        for (var i = 0; i < curPage.data.arr6.length; i++) {
          if (uuid == curPage.data.arr6[i].diUuid) {
            var tmp6 = 'arr6[' + i + '].diShowName';
            var dname6 = 'arr6[' + i + '].diName';
            curPage.setData({
              [dname6]: value,
              [tmp6]: showname
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
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      ins: -1,
      pz: '/images/pzwdj.png',
      hidden: false
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
