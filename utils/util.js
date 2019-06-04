const app = getApp();

const skinHook = () => {
  var skin = wx.getStorageSync('skin') || 'default';
  wx.setNavigationBarColor({
    frontColor: app.globalData.skins[skin].color, // 必写项
    backgroundColor: app.globalData.skins[skin].bgColor, // 必写项  对应如上配置
  });
  wx.setBackgroundTextStyle({
    textStyle: skin == 'night' ? 'dark' : 'light' // 下拉背景字体、loading 图的样式
  });
  wx.setBackgroundColor({
    backgroundColor: app.globalData.skins[skin].bgColor,
    backgroundColorTop: app.globalData.skins[skin].bgColor, // 顶部窗口的背景色
    backgroundColorBottom: app.globalData.skins[skin].bgColor, // 底部窗口的背景色
  });
}

module.exports = {
  skinHook: skinHook
}
