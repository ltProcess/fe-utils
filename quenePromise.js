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