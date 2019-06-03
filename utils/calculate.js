const { Stack } = require('./stack.js'); 
const { Queue } = require('./queue.js');

/**
 * 计算阶乘
 * @param {number} num 
 */
function recursiveFac(n) {
  if (n == 0) {
    return 1;
  } else {
    return n * recursiveFac(n - 1);
  }
}

// 输入表达式预处理
function prev_input(text) {
  text = text.replace(/，/gim, ',');
  return text.match(/(\b[a-z]+\b|\b[a-z]+_\d+|[~@#%^*×÷()\-+!π√,]|[\d\.]+)/g);
}

/**
 * 是不是左单目运算符
 * @param {*} str 
 */
function isSingleOperate(str) {
  return ['~', '@', '!', '√'].indexOf(str) > -1;
}

/**
 * 是否是函数名
 * @param {*} str 
 */
function isFuncName(str) {
  return [
    'sin','asin','sinh','asinh', 
    'cos','acos','cosh','acosh',
    'tan','atan','tanh','atanh',
    'ln', 'log', 'log_2', 'log_10',
    'reciprocal'
  ].indexOf(str) > -1;
}

// 判断是不是操作符 (函数也是操作符)
function is_opt_str(str) {
  var opt_arr = ['+', '-', '×', '*', '÷', '/', '(', ')', '√', '!', '^', '%'];
  return opt_arr.indexOf(str) > -1;
}

var OPT_FUNCS = {
  'sin': function (num, mode) {
    if (mode == 'deg') {
      num = num * (2 * Math.PI / 360);
    }
    return Math.sin(num);
  },
  'asin': function (num, mode) {
    if (mode == 'deg') {
      num = num * (2 * Math.PI / 360);
    }
    return Math.asin(num);
  },
  'sinh': function (num, mode) {
    if (mode == 'deg') {
      num = num * (2 * Math.PI / 360);
    }
    return Math.sinh(num);
  },
  'asinh': function (num, mode) {
    if (mode == 'deg') {
      num = num * (2 * Math.PI / 360);
    }
    return Math.asinh(num);
  },
  'cos': function (num, mode) {
    if (mode == 'deg') {
      num = num * (2 * Math.PI / 360);
    }
    return Math.cos(num);
  },
  'acos': function (num, mode) {
    if (mode == 'deg') {
      num = num * (2 * Math.PI / 360);
    }
    return Math.acos(num);
  },
  'cosh': function (num, mode) {
    if (mode == 'deg') {
      num = num * (2 * Math.PI / 360);
    }
    return Math.cosh(num);
  },
  'acosh': function (num, mode) {
    if (mode == 'deg') {
      num = num * (2 * Math.PI / 360);
    }
    return Math.acosh(num);
  },
  'tan': function (num, mode) {
    if (mode == 'deg') {
      num = num * (2 * Math.PI / 360);
    }
    return Math.tan(num, mode);
  },
  'atan': function (num, mode) {
    if (mode == 'deg') {
      num = num * (2 * Math.PI / 360);
    }
    return Math.atan(num, mode);
  },
  'tanh': function (num, mode) {
    if (mode == 'deg') {
      num = num * (2 * Math.PI / 360);
    }
    return Math.tanh(num);
  },
  'atanh': function (num, mode) {
    if (mode == 'deg') {
      num = num * (2 * Math.PI / 360);
    }
    return Math.atanh(num);
  },
  // 倒数
  'reciprocal': function (num) {
    return 1 / num;
  },
  'log': function (num) {
    return Math.log(num);
  },
  'log_2': function (num) {
    return Math.log2(num);
  },
  'log_10': function (num) {
    return Math.log10(num);
  },
  'ln': function (num) {
    return Math.log(num);
  }
}
var OPT_WIGGHT = {
  '#': 0,
  '(': 1,
  ',': 2,
  '+': 3,
  '-': 3,
  '×': 4,
  '÷': 4,
  '~': 5,
  '@': 5,
  '!': 6,
  '√': 6,
  '^': 6,
  '%': 6,
  'func': 7,
  ')': 8,
}
function opt_widght(a, b) {
  if (isFuncName(a)) {
    a = 'func';
  }
  if (isFuncName(b)) {
    b = 'func';
  }
  return OPT_WIGGHT[a] >= OPT_WIGGHT[b];
}

function cover_rpn(text) {
  var arr = prev_input(text);
  console.log(arr)
  var result = [];
  var sta = new Stack();
  var num_sta = new Stack();

  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];
    if (str == 'π') {
      sta.push(Math.PI);
    } else if (str == 'e') {
      sta.push(Math.E);
    } else if (is_opt_str(str) || isFuncName(str)) {
      if (str == '(') {
        sta.push(str);
      } else if (str == ')') {
        for (var j = sta.length(); j > 0; j--) {
         var peek_str = sta.peek();
          if (peek_str != '(') {
            // result += peek_str;
            result.push(peek_str);
            sta.pop();
          } else {
            break;
          }
        }
        sta.pop();
      } else {
        // 这里是个坑，如果 Stack 栈中存在 比 str 小的， 需要不断取出，继续比较
        while (opt_widght(sta.peek(), str)) {
          // result += sta.peek();
          result.push(sta.peek());
          sta.pop();
        }
        sta.push(str);
      }
    } else {
      result.push(str);
    }
  }
  while (sta.length() > 0) {
    result.push(sta.peek());
    sta.pop();
  }
  console.log(result);
  return result;
}

function calculate(text, mode) {
  var rpn = cover_rpn(text);
  var str_arr = [];
  var sta = new Stack();
  var result = 0;

  for (var i = 0; i < rpn.length; i++) {
    var str = rpn[i];
    if (isFuncName(str)) {
      var num = 0;
      var a = Number(sta.peek());
      sta.pop();
      num = OPT_FUNCS[str](a, mode);
      sta.push(num);
    } else if (is_opt_str(str)) {
      var num = 0;
      var a = Number(sta.peek());
      sta.pop();
      if (isSingleOperate(str)) {
        switch (str) {
          case '!':
            num = recursiveFac(a);
            break;
          case '√':
            var b = sta.peek();
            if ((/\d+/).test(b)){
              sta.pop();
              num = Math.pow(a, 1/Number(b));
            } else {
              num = Math.sqrt(a);
            }
            break;
          default:
            break;
        }
      } else {
        var b = Number(sta.peek());
        sta.pop();
        switch (rpn[i]) {
          case '*':
          case '×':
            num = a * b;
            break;
          case '+':
            num = a + b
            break;
          case '-':
            if (b){
              num = b - a;
            } else {
              num = 0 - a;
            }
            break;
          case '/':
          case '÷':
            num = b / a;
            break;
          case '^':
            num = Math.pow(b, a);
            break;
          case '%':
            num = b % a;
          default:
            break;
        }
      }
      sta.push(num);
    } else {
      sta.push(str);
    }
  }
  var result = sta.peek();
  sta.pop();
  return result;
}

class Calculate {
  constructor () {
    this.version = '1.0';

    this.histry = new Queue(100); // 历史记录[队列]
    // 基本配置项
    this.decimal_length = 15; // 小数位数(0-15)
    this.mode = 'deg'; // 计算模式(环境): rad: 弧度制, deg: 角度制
  }

  // 计算模式切换
  setMode (str) {
    this.mode = str;
  }
  // 获取计算结果
  getResult (text) {
    return calculate(text, this.mode);
  }
}

export { Calculate }