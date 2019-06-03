//app.js
App({
  onLaunch: function () {
    // 获取历史记录
    var history = wx.getStorageSync('history') || [];
    this.globalData.history = history;
  },
  globalData: {
    userInfo: null,
    sysWidth: wx.getSystemInfoSync().windowWidth,
    history: []
  }
})