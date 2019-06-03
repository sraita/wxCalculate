// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: wx.getStorageSync('history') || []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(wx.getStorageSync('history'))
  },
  tapHistoryItem: function (event) {
    var dataset = event.currentTarget.dataset;

    wx.showActionSheet({
      itemList: ['复制表达式','复制结果'],
      success(res) {
        switch(res.tapIndex) {
          case 0:
            console.log(dataset.input);
            break;
          case 1:
            console.log(dataset.result);
            wx.setClipboardData({
              data: dataset.result+'',
              success: function (res) {
                return wx.navigateBack({
                  delta: 1
                });
                wx.getClipboardData({
                  success: function (res) {
                    wx.showToast({
                      title: '复制成功'
                    })
                  }
                })
              }
            })
            break;
          default:
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})