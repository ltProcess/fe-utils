// Promise.all([A, B, C, D])
// 4 个请求完成后发现 AD 请求失败了，如果让 AD 请求重试 

function createMockRequest(name) {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve(`${name}success`);
        } else {
          reject(`${name}fail`);
        }
      }, Math.floor(Math.random() * 1000))
    });
  }
}

function tryRequest(request, times = 0, time = 1) {
  return request().catch(e => {
    if (time <= times) {
      console.log(e.message, `第${time}次重试`);
      tryRequest(request, times, ++time);
    } else {
      return Promise.reject(e);
    }
  });
}

let requests = ['A', 'B', 'C', 'D'].map(item => {
  return tryRequest(createMockRequest(item), 3)
})

Promise.all(requests).then(res => {
  console.log('成功了：', res)
}).catch(e => {
  console.log('失败了：', e.message)
})