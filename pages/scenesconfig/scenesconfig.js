// pages/scenesconfig/scenesconfig.js
var data1 = '';
var chuan = '';
var sortResult = wx.getStorageSync('sortResult');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortResult:'',
    selectData: ['0','10', '20', '30','40','50','60','70','80','90','100'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    noSelect: '../../images/check-circle.png', 
    hasSelect: '../../images/check-circle2.png',
     repContent: [{ message: '广告内容' }, 
     { message: '不友善内容' }, 
     { message: '垃圾内容' }, 
     { message: '违法违规内容'}, 
     { message: '其他' }], 
     selectIndex: [
      { sureid: false },
      { sureid: false },
      { sureid: false },
      { sureid: false },
      { sureid: false },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(sortResult)
    for (var chuangliand in sortResult){
      if (sortResult[chuangliand].diDeviceid == 514 && sortResult[chuangliand].diZonetype == 0){
        chuan=sortResult[chuangliand] 
      }
    }
    this.setData({
      sortResult:chuan
    })
  },
  selectRep: function (e) {
    let index = e.currentTarget.dataset.selectindex;  //当前点击元素的自定义数据，这个很关键
    let selectIndex = this.data.selectIndex;    //取到data里的selectIndex
    selectIndex[index].sureid = !selectIndex[index].sureid;   //点击就赋相反的值
    this.setData({
      selectIndex: selectIndex   //将已改变属性的json数组更新
    })
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow
    });
  },
  changeSwitch1: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    if (e.detail.value == true) {
      chuan.diOnoffStatu=1
    }else{
      chuan.diOnoffStatu = 0
    }
    data1 = chuan.diOnoffStatu
  },
  submit: function (e) {
    var that = this
    var username = wx.getStorageSync('username');//网关账号
    var pwd = wx.getStorageSync('pwd'); //网关密码
    wx.request({
      url: 'https://dev.rishuncloud.com:8443/addScene',
      method: 'POST',
      data: {
        act:"setscene",
        code:"253",
        AccessID :"vlvgt9vecxti7zqy9xu0yyy7e",
        key : "bq6wqzasjwtkl0i21pi9fbeq4",
        bindid: username,
        bindstr: pwd,
        scene: [{ scenename: e.detail.value.scenename,
               scenemem:[{
                  deviceuid:e.detail.value.deviceuid,
                  deviceid:e.detail.value.deviceid,
                  data1:data1,
                  data2: e.detail.value.data2,
                  data3: e.detail.value.data3,
                  data4:e.detail.value.data4,
                  IRID:e.detail.value.IRID,
                  delaytime:0
                   }]
               }]
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