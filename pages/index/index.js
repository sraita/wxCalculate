//index.js
const Util = require('../../utils/util');
const { Stack } = require('../../utils/stack.js');
const { Queue } = require('../../utils/queue.js');
const { Calculate } = require('../../utils/calculate.js');
//获取应用实例
const app = getApp();
const calc = new Calculate();

let history = new Queue(100, app.globalData.history);

const backSpace = function (event, self) {
  var input = self.data.inputText;
  if (self.data.status == 2 || input.length < 2) {
    self.setData({
      status: 1,
      inputText: '',
      resultText: '0',
    })
  } else {
    self.setData({
      inputText: input.slice(0, -1)
    })
  }
}

// 按键效果
const buttonEffects = function (sceneMode) {
  if (sceneMode == 'mute') {
    return;
  }
  // 震动
  if (sceneMode == 'vibrate') {
    return wx.vibrateShort();
  }
  // 音效
  const innerAudioContext = wx.createInnerAudioContext()
  innerAudioContext.autoplay = true
  // innerAudioContext.src = 'http://file.52lishi.com/file/yinxiao/ly-17-03-02-31.mp3'
  innerAudioContext.src = 'http://s.aigei.com/pvaud_mp3/aud/mp3/52/5211993fcda34493ae73b183fdc45869.mp3?download/%E6%8C%89%E9%92%AE12%28Button12%29_%E7%88%B1%E7%BB%99%E7%BD%91_aigei_com.mp3&optLogId=d21b41eec1744d2788b91ced3394d443&e=1559501820&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:M7MjucN48l3BYCUmW5aO1AIvTGE=';
  innerAudioContext.onPlay(() => {
    console.log('开始播放')
  })
  innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  })
}
Page({
  data: {
    skin: 'default',// 夜间模式 & 日间模式切换
    theme: 'default',
    sceneMode: 'standard', // 情景模式. mute:静音, vibrate: 震动, standard: 标准
    status: 1,
    calcMode: 'deg',
    funcMode: 1,
    invMode: false,
    mem: 0,
    voice: wx.getStorageSync('voice'), // 是否开启震动
    vibrate: wx.getStorageSync('vibrate'), // 是否开启声音
    inputText: '',
    resultText: '',
    memButtonList: [
      {
        name: 'MC',
        onTap: 'clearMem'
      },
      {
        name: 'MR',
        onTap: 'getMem'
      },
      {
        name: 'M+',
        onTap: 'memPlus'
      },
      {
        name: 'M-',
        onTap: 'memMinus'
      },
      // {
      //   name: 'HIS',
      //   onTap: 'showHistory'
      // },
      // {
      //   name: 'SET',
      //   onTap: 'openSetting'
      // },
      // {
      //   name: 'MOD',
      //   onTap: 'changeSkin'
      // }
    ],
    buttonList: [
      {
        name: 'Inv',
        value: 'inv',
        className: 'btn-second',
      },
      {
        name: 'ln',
        value: 'ln(',
        className: 'btn-second'
      },
      {
        name: 'sin',
        value: 'sin(',
        className: 'btn-second',
        itemClassName: 'func-1-btn non-inv-mode-btn'
      },
      {
        name: 'sin',
        sup: '-1',
        value: 'asin(',
        className: 'btn-second',
        itemClassName: 'func-1-btn inv-mode-btn'
      },
      {
        name: 'sinh',
        value: 'sinh(',
        className: 'btn-second',
        itemClassName: 'func-2-btn non-inv-mode-btn'
      },
      {
        name: 'sinh',
        sup: '-1',
        value: 'asinh(',
        className: 'btn-second',
        itemClassName: 'func-2-btn inv-mode-btn'
      },
      {
        name: 'cos',
        value: 'cos(',
        className: 'btn-second',
        itemClassName: 'func-1-btn non-inv-mode-btn'
      },
      {
        name: 'cos',
        value: 'acos(',
        sup: '-1',
        className: 'btn-second',
        itemClassName: 'func-1-btn inv-mode-btn'
      },
      {
        name: 'cosh',
        value: 'cosh(',
        className: 'btn-second',
        itemClassName: 'func-2-btn non-inv-mode-btn'
      },
      {
        name: 'cosh',
        sup: '-1',
        value: 'acosh(',
        className: 'btn-second',
        itemClassName: 'func-2-btn inv-mode-btn'
      },
      {
        name: 'tan',
        value: 'tan(',
        className: 'btn-second',
        itemClassName: 'func-1-btn non-inv-mode-btn'
      },
      {
        name: 'tan',
        sup: '-1',
        value: 'atan(',
        className: 'btn-second',
        itemClassName: 'func-1-btn inv-mode-btn'
      },
      {
        name: 'tanh',
        value: 'tanh(',
        className: 'btn-second',
        itemClassName: 'func-2-btn non-inv-mode-btn'
      },
      {
        name: 'tanh',
        sup: '-1',
        value: 'atanh(',
        className: 'btn-second',
        itemClassName: 'func-2-btn inv-mode-btn'
      },

      {
        name: '2',
        top: 'nd',
        value: 'shift',
        className: 'btn-second'
      },
      {
        name: 'log',
        value: 'log(',
        className: 'btn-second'
      },
      {
        name: 'log',
        sub: '2',
        value: 'log_2(',
        className: 'btn-second',
        itemClassName: ' func-1-btn'
      },
      {
        name: 'log',
        sub: '10',
        value: 'log_10(',
        className: 'btn-second',
        itemClassName: ' func-2-btn'
      },
      {
        name: 'π',
        value: 'π',
        className: 'btn-second'
      },
      {
        name: 'AC',
        value: 'clearScreen',
        className: 'btn-primary',
      },


      {
        name: '1/x',
        value: 'reciprocal(',
        className: 'btn-second',
        itemClassName: ' func-1-btn'
      },
      {
        name: '%',
        value: '%',
        className: 'btn-second',
        itemClassName: ' func-2-btn'
      },
      {
        name: '(',
        value: '(',
        className: 'btn-second'
      },
      {
        name: ')',
        value: ')',
        className: 'btn-second'
      },
      {
        name: 'e',
        value: 'e',
        className: 'btn-second'
      },
      {
        name: 'C',
        value: 'backSpace',
        className: 'btn-primary',
      },

      {
        name: 'x',
        sup: 'y',
        value: '^',
        className: 'btn-second'
      },

      {
        name: '7',
        value: 7
      },
      {
        name: '8',
        value: 8
      },
      {
        name: '9',
        value: 9
      },
      {
        name: '÷',
        value: '÷',
        className: 'btn-primary'
      },

      {
        name: 'n!',
        value: '!',
        className: 'btn-second'
      },
      {
        name: '4',
        value: 4
      },
      {
        name: '5',
        value: 5
      },
      {
        name: '6',
        value: 6
      },
      {
        name: '×',
        value: '×',
        className: 'btn-primary'
      },

      
      {
        name: '√',
        value: '√',
        className: 'btn-second'
      },
      {
        name: '1',
        value: 1
      },
      {
        name: '2',
        value: 2
      },
      {
        name: '3',
        value: 3
      },
      {
        name: '-',
        value: '-',
        className: 'btn-primary'
      },

      
      {
        name: 'Rad',
        value: 'rad',
        className: 'btn-second',
        itemClassName: 'mode-deg-item'
      },
      {
        name: 'Deg',
        value: 'deg',
        className: 'btn-second',
        itemClassName: 'mode-rad-item'
      },
      {
        name: '·',
        value: '.'
      },
      {
        name: '0',
        value: 0
      },
      {
        name: '=',
        value: '='
      },
      {
        name: '+',
        value: '+',
        className: 'btn-primary'
      },
    ]
  },
  onLoad: function() {
    this.setData({
      skin: wx.getStorageSync('skin') || 'default',
      theme: wx.getStorageSync('theme') || 'default',
      btnHeight: Math.floor(app.globalData.sysWidth / 5),
    });
  },
  onShow: function () {
    Util.skinHook();
  },
  tapButton: function(event) {
    var self = this;
    console.log(event.currentTarget.dataset);

    buttonEffects(self.data.sceneMode);

    var val = event.currentTarget.dataset.value;
    var input = self.data.inputText;
    switch (val) {
      case 'clearScreen':
        return self.setData({
          status: 1,
          inputText: '',
          resultText: '0',
        })
        break;
      case 'backSpace':
        return backSpace(event, self);
        break;
      // 切换三角函数模式
      case 'inv':
        return self.setData({
          invMode: !self.data.invMode
        })
        break;
      // 切换第二功能
      case 'shift':
        return self.setData({
          funcMode: (self.data.funcMode == 1) ? 2 : 1
        });
        break;
      case 'deg':
        calc.setMode('deg');
        return self.setData({ calcMode: 'deg'});
        break;
      case 'rad':
        calc.setMode('rad');
        return self.setData({ calcMode: 'rad' });
        break;
      case '=':
        var result = calc.getResult(input);
        var resultText = !isNaN(result) ? result : '错误';
        history.push({
          input: input,
          result: resultText
        });
        wx.setStorage({
          key: "history",
          data: history.queue()
        })
        console.log(history.queue())
        return self.setData({
          status: 2,
          resultText: resultText
        })
        break;
        // 切换到 deg 计算模式
      case 'deg':
        calc.changeMode('deg');
        break;
      default:
        if (this.data.status == 2) {
          input = '';
        }
        input += val;
    }

    self.setData({
      status: 1,
      inputText: input,
      resultText: '0'
    });
  },
  // 显示历史记录
  showHistory: function (event) {
    buttonEffects(this.data.sceneMode);
    wx.navigateTo({
      url: '../history/history'
    })
  },
  openSetting: function (event) {
    buttonEffects(this.data.sceneMode);
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  // 切换日间模式和夜间模式
  changeSkin: function (event) {
    let skin = this.data.skin == 'default' ? 'night' : 'default';
    this.setData({
      skin: skin
    });
    wx.setStorageSync('skin', skin);
    Util.skinHook();
  },
  // 情景模式切换
  changeSceneMode: function (event) {
    var mode = 'standard';
    switch (this.data.sceneMode) {
      case 'standard':
        mode = 'vibrate';
        break;
      case 'vibrate':
        mode = 'mute';
        break;
      case 'mute':
        mode = 'standard';
        break;
      default:
        break;
    }
    this.setData({
      sceneMode: mode
    });
  },

  // Memory
  memPlus: function (event) {
    buttonEffects(this.data.sceneMode);
    let mem = this.data.mem;
    let result = Number(this.data.resultText);
    if (result && !isNaN(result)) {
      mem += result;
    }
    this.setData({ mem: mem });
  },
  memMinus: function (event) {
    buttonEffects(this.data.sceneMode);
    let mem = this.data.mem;
    let result = Number(this.data.resultText);
    if (result && !isNaN(result)) {
      mem -= result;
    }
    this.setData({ mem: mem });
  },
  getMem: function (event) {
    buttonEffects(this.data.sceneMode);
    let mem = this.data.mem;
    if (mem){
      var inputText = this.data.inputText;
      if (this.data.status == 2) {
        inputText = '';
      }
      inputText += mem;
      this.setData({
        status: 1,
        inputText: inputText
      });
    }
  },
  clearMem: function (event) {
    buttonEffects(this.data.sceneMode);
    this.setData({ mem: 0});
  }
})