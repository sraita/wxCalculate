class Stack {
  constructor () {
    this.dataStore = []; // 保存栈内元素
    this.top = 0; // 栈顶位置， 初始化为0 
  }

  push (element) {
    this.dataStore[this.top++] = element;
  }

  pop () {
    this.top--;
    this.dataStore.pop();
  }

  peek () {
    return this.dataStore[this.top - 1];
  }

  toString() {
    return this.dataStore.join("");
  }

  length () {
    return this.top;
  }

  clear () {
    this.top = 0;
    this.dataStore = [];
  }
}

export { Stack }