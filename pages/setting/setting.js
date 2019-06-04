// pages/setting/setting.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    skin: 'default',
    theme: 'default',
    // 缓存大小
    storageSize: '0 KB',
    // 主题列表
    list: [
      {
        name: 'default',
        title: '秋语',
        cover: '/src/theme/1.jpg',
      },
      {
        name: 'default',
        title: '樱花',
        cover: '/src/theme/2.jpg',
      },{
        name: 'default',
        title: '儿童劫',
        cover: '/src/theme/3.jpg',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var self = this;

    self.setData({
      skin: wx.getStorageSync('skin') || 'default',
      theme: wx.getStorageSync('theme') || 'default',
    });
    
    // 获取缓存大小
    wx.getStorageInfo({
      success: function(res) {
        var size = res.currentSize;
        if (size < 1024) {
          size += ' KB'
        } else {
          size = (size/1024) + ' MB';
        }
        self.setData({
          storageSize: size
        });
      },
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