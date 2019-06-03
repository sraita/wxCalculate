class Queue {
  constructor (size, list) {
    if (!size) {
      throw Error('队列长度必须设置');
    }
    this.size = size;
    if (list) {
      list = list.splice(0,size);
      this.list = list;
    } else {
      this.list = [];
    }
  }

  //向队列中添加数据
  push (data) {
    if (data == null) {
      return false;
    }

    if (this.list.length == this.size) {
      this.pop();
    }
    this.list.unshift(data);
    return true;
  }

  pop (index) {
    if (index) {
      this.list.splice(index, 1);
    } else {
      this.list.pop();
    }
    return true;
  }
  //返回队列的大小
  size () {
    return this.list.length;
  }
  maxSize () {
    return this.size;
  }
  //返回队列的内容
  queue () {
    return this.list;
  }
}

export { Queue }