// pages/setting/setting.js
const Util = require('../../utils/util');

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
        cover: '/src/theme/1.jpg'
      },
      {
        name: 'yinhua',
        title: '樱花',
        cover: '/src/theme/2.jpg'
      },{
        name: 'ertongjie',
        title: '儿童劫',
        cover: '/src/theme/3.jpg'
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    Util.skinHook();
  },
  clearStrage: function (event) {
    let self = this;
    wx.clearStorage({
      success: function () {
        wx.showToast({
          title: '已清理',
          icon: 'success',
        });
        self.setData({
          storageSize: '0 KB'
        });
      },
      fail: function () {
        wx.showToast({
          title: '清理失败!',
          icon: 'none'
        });
      }
    })
  }
})