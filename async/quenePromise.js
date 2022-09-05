// 页面上有三个按钮，分别为 A、B、C，点击各个按钮都会发送异步请求且互不影响，每次请求回来的数据都为按钮的名字。
// 请实现当用户依次点击 A、B、C、A、C、B 的时候，最终获取的数据为 ABCACB。
class Queue {
  promise = Promise.resolve();

  excute(promise) {
    this.promise = this.promise.then(() => promise);
    return this.promise;
  }
}

const delay = (params) => {
  const ms = Math.floor(Math.random() * 5);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(params);
    }, ms * 500);
  });
}

const queue = new Queue();

const handleTest = async (name) => {
  const res = await queue.excute(delay(name));
  console.log(res);
}
handleTest('A');
handleTest('B');
handleTest('C');
handleTest('A');
handleTest('C');
handleTest('B');