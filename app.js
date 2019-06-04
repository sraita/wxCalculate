//app.js
App({
  onLaunch: function () {
    // 获取历史记录
    var history = wx.getStorageSync('history') || [];
    var skin = wx.getStorageSync('skin') || 'default';
    this.globalData.history = history;
    this.globalData.skin = skin;
  },
  globalData: {
    userInfo: null,
    sysWidth: wx.getSystemInfoSync().windowWidth,
    skin: 'default',
    history: []
  }
})