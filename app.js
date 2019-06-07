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
    history: [],
    // 皮肤配置
    skins: {
      'default': {
        color: '#000000',
        bgColor: '#ffffff'
      },
      'night': {
        color: '#ffffff',
        bgColor: '#313131'
      }
    },
    // 音效配置
    audio: {
      'default': {
        title: '默认音效',
        keys: {
          "normal": "normal", // 默认音效
        }
      },
      'rensheng': {
        title: '真人发音',
        keys: {
          "clearScreen": 'clearscreen',
          "backSpace": "delete",
          "normal": "normal", // 默认音效
          "1": "one",
          "2": "two",
          "3": "three",
          "4": "four",
          "5": "five",
          "6": "six",
          "7": "seven",
          "8": "eight",
          "9": "nine",
          "0": "zero",
          ".": "point",
          "+": "plus",
          "-": "minus",
          "×": "multiply",
          "÷": "divide",
          "=": "equal",
          "^": "power",
          "!": "factorial",
          "π": "pi",
          "e": "e",
          "%": "percent",
          "√": "radical",
          "(": "bracket",
          ")": "rightbracket",
          "reciprocal(": "reciprocal"
        }
      },
      // 钢琴
      "piano": {
        name: "piano",
        title: "钢琴",
        keys: {
          "clearScreen": 'a5',
          "backSpace": "b5",
          "normal": "c7", // 默认音效
          "shift": "d6",
          "deg": "e6",
          "rad": "f6",
          "inv": "g6",
          "1": "c4",
          "2": "d4",
          "3": "e4",
          "4": "f4",
          "5": "g4",
          "6": "a4",
          "7": "b4",
          "8": "c3",
          "9": "d3",
          "0": "e3",
          ".": "f3",
          "+": "c5",
          "-": "d5",
          "×": "e5",
          "÷": "f5",
          "=": "g5"
        }
      },
      // 机械键盘
      "cherry": {
        name: "piano",
        title: "机械键盘",
        keys: {
          "clearScreen": 'G80-3494_backspace',
          "backSpace": "G80-3494_space",
          "normal": "G80-3494", // 默认音效
          "shift": "G80-3494_space",
          "deg": "G80-3494_slow1",
          "rad": "G80-3494_slow1",
          "inv": "G80-3494_slow1",
          "+": "G80-3494_slow1",
          "-": "G80-3494_slow1",
          "×": "G80-3494_slow1",
          "÷": "G80-3494_slow1",
          "=": "G80-3494_enter"
        }
      },
      // 架子鼓
      "drum": {
        name: "drum",
        title: "架子鼓",
        keys: {
          "clearScreen": 'space',
          "backSpace": "backspace",
          "normal": "backspace", // 默认音效
          "+": "4",
          "-": "3",
          "×": "2",
          "÷": "1",
          "=": "enter"
        }
      },
      'shuidi': {
        name: 'shuidi',
        title: '水滴',
        keys: {
          "normal": '/normal.mp3'
        }
      }
    }
  }
})