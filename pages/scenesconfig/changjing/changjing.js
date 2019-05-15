// pages/scenesconfig/changjing/changjing.js
var changjing;
var app=getApp();
var username = wx.getStorageSync('username');//网关账号
var pwd = wx.getStorageSync('pwd'); //网关密码
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aiNames:'',
    sortedDevs:[],
    allSelect: false,
    choseImg: '/images/check-circle2.png',
    unchoseImg: '/images/check-circle.png',
    arr: '',
    uidarry:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var changjings = decodeURIComponent(options.changjing);
    changjing = JSON.parse(changjings);
    this.setData({
      aiNames: changjing.siName
    })
    let url = app.globalData.URL + 'gerSceneMem';
    let data = {
      act: "getscenemembersbydetail",
      code: 602,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      ver: "2.0",
      scenes: [{ sceneID: changjing.siSceneId, sceneName: changjing.siName }]

    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
      for (var i in res.data.scenes){
        this.setData({
          sortedDevs: res.data.scenes[i].sceneMembers
        })
      }
    },
      (err) => {
        console.log(err.errMsg)
      }
    )
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
  submit:function(){
    var that = this;
    let arr1 = that.data.arr;
    for (var i in arr1) {
      var uuids ={}; 
      uuids.uuid = arr1[i].uuid;
      this.data.uidarry.push(uuids);
    }
    wx.showModal({
      title: '提示',
      content: '确定删除该场景的设备吗？',
      success: function (msg) {
        if (msg.confirm) {
          let url = app.globalData.URL + 'delSceneMem';
          console.log(that.data.uidarry);
          let data = {
            act: "deleteScenemembers",
            code: 605,
            AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
            key: "bq6wqzasjwtkl0i21pi9fbeq4",
            bindid: username,
            bindstr: pwd,
            ver: "2",
            scenes: [{
              sceneID: changjing.siSceneId, sceneName: changjing.siName, 
              sceneMembers: that.data.uidarry
            }] 
          };
          app.wxRequest('POST', url, data, (res) => {
            console.log(res.data)
            wx.showToast({
              title: '删除成功',
              duration: 2000
            });
            wx.redirectTo({
              url: '../../scenesconfig/scenesconfig'
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
  },
  delete: function (e) {  //删除场景
    var that = this;
    console.log(changjing.siId);
    console.log(changjing.siName);
    wx.showModal({
      title: '提示',
      content: '确定删除该场景吗？',
      success: function (msg) {
        if (msg.confirm) {
          let url = app.globalData.URL + 'delSceneMem';
          let data = {
            act:"deleteScenemembers",
            code: 605,
            AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
            key: "bq6wqzasjwtkl0i21pi9fbeq4",
            bindid: username,
            bindstr: pwd,
            ver: "2",
            scenes: [{ sceneID: changjing.siSceneId, sceneName: changjing.siName}]
          };
          app.wxRequest('POST', url, data, (res) => {
            console.log(res.data)
            wx.showToast({
              title: '删除成功',
              duration: 2000
            });
            wx.redirectTo({
              url: '../../scenesconfig/scenesconfig'
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
  },
  //修改场景名称
  aiNames:function(e){
    console.log(e.detail.value.aiNames);
    let url = app.globalData.URL + 'alterSceneName';
    let data = {
      act: "resetSceneName",
      code:256,
      AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
      key: "bq6wqzasjwtkl0i21pi9fbeq4",
      bindid: username,
      bindstr: pwd,
      ver: "2.0",
      scenes: [{ sceneID: changjing.siSceneId,sceneName: e.detail.value.aiNames}]

    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res.data)
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