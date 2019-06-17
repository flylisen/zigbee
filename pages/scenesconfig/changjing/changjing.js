// pages/scenesconfig/changjing/changjing.js
var changjing;
var app=getApp();
var username;
var pwd;
var timestamp;
var token;
var sign;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    siShowName:'',
    sortedDevss:[],
    sortedDevs:[],
    allSelect: false,
    choseImg: '/images/check-circle2.png',
    unchoseImg: '/images/check-circle.png',
    arr: '',
    uidarry:[],
    sceneMembers:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    username = app.globalData.username;
    pwd = app.globalData.pwd;
    timestamp = app.globalData.timestamp;
    token = app.globalData.token;
    sign = app.globalData.sign;
    var changjings = decodeURIComponent(options.changjing);
    changjing = JSON.parse(changjings);
    console.log(changjing);
    this.setData({
      siShowName: changjing.siShowName
    })
    let url = app.globalData.URL + 'gerSceneMem?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
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
      for (var i in res.data.scenes) {
        var sceneMembers = res.data.scenes[i].sceneMembers;
        console.log(sceneMembers);
        this.data.sceneMembers = sceneMembers;
        const filterListResult = sceneMembers.filter((item, index, self) => index === self.findIndex((t) => (t.uuid === item.uuid)));
        filterListResult.forEach((item) => {
          //这里需要截取的内容
          item.deviceName = item.deviceName.substring(0, 5)
        })
        this.setData({
          sortedDevs: filterListResult
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
      var uuid = infoArray[i].uuid;
      if (infoArray[i].isSelect) { //选中
        var sceneMembers = this.data.sceneMembers;
        for (var j in sceneMembers){
          if (uuid == sceneMembers[j].uuid){
            arr.push(sceneMembers[j]);
          }
        }
      }
    }
    console.log(arr);
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
      uuids.sceneFunctionID = arr1[i].sceneFunctionID;
      this.data.uidarry.push(uuids);
    }
    var uidarry = this.data.uidarry;
    wx.showModal({
      title: '提示',
      content: '确定删除该场景的设备吗？',
      success: function (msg) {
        if (uidarry.length ===0){
          wx.showToast({
            title:'请选择你要删除的设备',
            icon:'none'
          })
          }else{
            if (msg.confirm) {
            let url = app.globalData.URL + 'delSceneMem?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
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
                sceneMembers: uidarry
              }]
            };
            app.wxRequest('POST', url, data, (res) => {
              console.log(res.data)
              wx.showToast({
                title: '删除成功',
                duration: 2000
              });
              var pages = getCurrentPages(); // 当前页面 
              var beforePage = pages[pages.length - 2]; // 前一个页面  
              wx.navigateBack({
                success: function () {
                  beforePage.onLoad(); // 执行前一个页面的方法     
                }
              });
            },
              (err) => {
                console.log(err.errMsg)
              }
            )
          }else if (msg.cancel) {
            console.log('用户点击取消')
          }
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
          let url = app.globalData.URL + 'delSceneMem?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
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
            var pages = getCurrentPages(); // 当前页面 
            var beforePage = pages[pages.length - 2]; // 前一个页面  
            wx.navigateBack({
              success: function () {
                beforePage.onLoad(); // 执行前一个页面的方法     
                }
              });
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
    console.log(e.detail.value.sceneShowName);
    console.log(e.detail.value.sceneName);
    if (e.detail.value.sceneShowName == '' && e.detail.value.sceneName==''){
      wx.showModal({
        title: '提示',
        content: '请输入你要修改的名称'
      })
    }else{
      let url = app.globalData.URL + 'alterSceneName?timestamp=' + timestamp + '&token=' + token + '&sign=' + sign;
      let data = {
        act: "resetSceneName",
        code: 606,
        AccessID: "vlvgt9vecxti7zqy9xu0yyy7e",
        key: "bq6wqzasjwtkl0i21pi9fbeq4",
        bindid: username,
        bindstr: pwd,
        ver: "2.0",
        scenes: [{ sceneName: e.detail.value.sceneName, sceneID: changjing.siSceneId, sceneShowName: e.detail.value.sceneShowName }]
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
        var pages = getCurrentPages(); // 当前页面 
        var beforePage = pages[pages.length - 2]; // 前一个页面  
        wx.navigateBack({
          success: function () {
            beforePage.onLoad(); // 执行前一个页面的方法     
          }
        });
      },
        (err) => {  
          console.log(err.errMsg)
        }
      )
    } 
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
    var pages = getCurrentPages(); // 当前页面 
    var beforePage = pages[pages.length - 2]; // 前一个页面
    beforePage.onLoad();
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