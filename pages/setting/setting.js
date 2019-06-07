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
    audioEffect: '默认音效',
    // 缓存大小
    storageSize: '0 KB',
    // 主题列表
    list: [
      {
        name: 'default',
        title: '默认',
        cover: '/src/theme/1.jpg'
      },
      {
        name: 'white',
        title: '简·白',
        cover: '/src/theme/2.jpg'
      },{
        name: 'tech',
        title: '科技',
        cover: '/src/theme/3.jpg'
      },
      {
        name: 'kitty',
        title: 'Kitty',
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
    let effect = wx.getStorageSync('audioEffect') || 'default'
    this.setData({
      audioEffect: app.globalData.audio[effect].title,
    })
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
  },
  // 主题切换
  changeTheme: function (event) {
    var theme = event.currentTarget.dataset.theme;
    console.log(theme);
    this.setData({
      theme: theme
    });
    wx.setStorageSync('theme', theme);
  },
  // 音效设置
  changeAudioEffect: function (event) {
    console.log('修改音效')
    let effect = 'default';
    var itemList = ['默认音效','真人发声','钢琴','机械键盘','架子鼓']
    wx.showActionSheet({
      itemList: itemList,
      success(res) {
        switch (res.tapIndex) {
          case 0:
            effect = 'default';
            break;
          case 1:
            effect = 'rensheng';
            break;
          case 2: 
            effect = 'piano';
            break;
          case 3:
            effect = 'cherry';
            break;
          case 4:
            effect = 'drum';
            break;
          default:
            break;
        }
        wx.setStorageSync('audioEffect', effect);
        this.setData({
          audioEffect: app.globalData.audio[effect].title,
        });

      },
      fail(res) {
        console.log(res.errMsg)
      }
    });
  }
})