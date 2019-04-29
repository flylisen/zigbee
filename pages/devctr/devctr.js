
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    chuanglians: '',
    sortedDevs: '',
     
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
  chuangliandk: function (event) {
   console.log(event.currentTarget.dataset['deviceuid']);
    var deviceuid = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['deviceuid']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'chuanglian/chuanglian?deviceuid='+ deviceuid
    })
  },
  shuijink: function(event){
    console.log(event.currentTarget.dataset['shuijin']);
    var shuijin = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['shuijin']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'shuijin/shuijin?shuijin=' + shuijin
    })
  },
  jinjian : function(event){
    console.log(event.currentTarget.dataset['jinjian']);
    var jinjian = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['jinjian']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'jinjian/jinjian?jinjian=' + jinjian
    })
  },
  anfangyaokongqi: function (event){
    console.log(event.currentTarget.dataset['anfangyaokongqi']);
    var anfangyaokongqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['anfangyaokongqi']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'anfangyaokongqi/anfangyaokongqi?anfangyaokongqi=' + anfangyaokongqi
    })
  },
  deng: function (event){
    console.log(event.currentTarget.dataset['deng']);
    var deng = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['deng']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'deng/deng?deng=' + deng
    })
  },
  rentichuanganqi: function (event){
    console.log(event.currentTarget.dataset['rentichuanganqi']);
    var rentichuanganqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['rentichuanganqi']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'rentichuanganqiicon/rentichuanganqiicon?rentichuanganqi=' + rentichuanganqi
    })
  },
  yiyanghuatanchuanganqi: function (event){
    console.log(event.currentTarget.dataset['yiyanghuatanchuanganqi']);
    var yiyanghuatanchuanganqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['yiyanghuatanchuanganqi']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'yiyanghuatanchuanganqi/yiyanghuatanchuanganqi?yiyanghuatanchuanganqi=' + yiyanghuatanchuanganqi
    })
  },
  mencichuanganqi: function (event){
    console.log(event.currentTarget.dataset['mencichuanganqi']);
    var mencichuanganqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['mencichuanganqi']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'mencichuanganqi/mencichuanganqi?mencichuanganqi=' + mencichuanganqi
    })
  },
  wenshiduchuanganqi: function (event) {
    console.log(event.currentTarget.dataset['wenshiduchuanganqi']);
    var wenshiduchuanganqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['wenshiduchuanganqi']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'wenshiduchuanganqi/wenshiduchuanganqi?wenshiduchuanganqi=' + wenshiduchuanganqi
    })
  },

  qingjingkaiguan: function (event){
    console.log(event.currentTarget.dataset['qingjingkaiguan']);
    var qingjingkaiguan = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['qingjingkaiguan']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'qingjingkaiguan/qingjingkaiguan?qingjingkaiguan=' + qingjingkaiguan
    })
  },
  hongwaiyaokongqi: function (event) {
    console.log(event.currentTarget.dataset['hongwaiyaokongqi']);
    var hongwaiyaokongqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['hongwaiyaokongqi']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'hongwaiyaokongqi/hongwaiyaokongqi?hongwaiyaokongqi=' + hongwaiyaokongqi
    })
  },
  yanwubaojingqi: function (event) {
    console.log(event.currentTarget.dataset['yanwubaojingqi']);
    var yanwubaojingqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['yanwubaojingqi']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'yanwubaojingqi/yanwubaojingqi?yanwubaojingqi=' + yanwubaojingqi
    })
  },
  wenkongqi: function (event) {
    console.log(event.currentTarget.dataset['wenkongqi']);
    var wenkongqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['wenkongqi']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'wenkongqi/wenkongqi?wenkongqi=' + wenkongqi
    })
  },
  shuibiao: function (event) {
    console.log(event.currentTarget.dataset['shuibiao']);
    var shuibiao = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['shuibiao']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'shuibiao/shuibiao?shuibiao=' + shuibiao
    })
  },
  mensuo: function (event) {
    console.log(event.currentTarget.dataset['mensuo']);
    var mensuo = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['mensuo']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'mensuo/mensuo?mensuo=' + mensuo
    })
  },
  shengguangbaojingqi: function (event){
    console.log(event.currentTarget.dataset['shengguangbaojingqi']);
    var shengguangbaojingqi = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['shengguangbaojingqi']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'shengguangbaojingqi/shengguangbaojingqi?shengguangbaojingqi=' + shengguangbaojingqi
    })
  },
  keranqiti: function (event) {
    console.log(event.currentTarget.dataset['keranqiti']);
    var keranqiti = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['keranqiti']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'keranqiti/keranqiti?keranqiti=' + keranqiti
    })
  },
  mianban: function (event) {
    console.log(event.currentTarget.dataset['mianban']);
    var mianban = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['mianban']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'mianban/mianban?mianban=' + mianban
    })
  },
  chazuo: function (event) {
    console.log(event.currentTarget.dataset['chazuo']);
    var chazuo = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['chazuo']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'chazuo/chazuo?chazuo=' + chazuo
    })
  },
  zhongjiqizhongwen: function (event) {
    console.log(event.currentTarget.dataset['zhongjiqizhongwen']);
    var zhongjiqizhongwen = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['zhongjiqizhongwen']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'zhongjiqizhongwen/zhongjiqizhongwen?zhongjiqizhongwen=' + zhongjiqizhongwen
    })
  },
  sewendeng: function (event) {
    console.log(event.currentTarget.dataset['sewendeng']);
    var sewendeng = encodeURIComponent(JSON.stringify(event.currentTarget.dataset['sewendeng']));//函数可把字符串作为 URI
    wx.navigateTo({
      url: 'sewendeng/sewendeng?sewendeng=' + sewendeng
    })
  },
  //开关事件
  kaiguanguan: function (event) {
    console.log(event.currentTarget.dataset['tp']);
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
    console.log(tp.diOnoffStatu);
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
          devs: [{ deviceuid: tp.diDeviceuid, value: tp.diOnoffStatu }]
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