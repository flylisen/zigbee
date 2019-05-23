const app =getApp();
Component({
  data: {
    selected: 0,
    "color": "#666",
    "selectedColor": "#56abe4", 
  },
  lifetimes: {
    //组件的生命周期函数
    attached() {
      this.setData({
        list: app.globalData.list
      })
    },
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})