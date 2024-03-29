// Promise.all并发限制指的是，每个时刻并发执行的promise数量是固定的，最终的执行结果还是保持与原来的Promise.all一致

function asyncPool(poolLimit, array, iteratorFn) {
  let i = 0;
  const ret = [];
  const executing = [];
  const enqueue = function () {
    // 边界处理，array为空数组
    if (i === array.length) {
      return Promise.resolve();
    }
    // 每调一次enqueue，初始化一个promise
    const item = array[i++];
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    // 放入promises数组
    ret.push(p);
    // promise执行完毕，从executing数组中删除
    const e = p.then(() => executing.splice(executing.indexOf(e), 1));
    // 插入executing数字，表示正在执行的promise
    executing.push(e);
    // 使用Promise.rece，每当executing数组中promise数量低于poolLimit，就实例化新的promise并执行
    let r = Promise.resolve();
    if (executing.length >= poolLimit) {
      r = Promise.race(executing);
    }
    // 递归，直到遍历完array
    return r.then(() => enqueue());
  };
  return enqueue().then(() => Promise.all(ret));
}

async function asyncPoolEs7(poolLimit, array, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

// const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
// return asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(results => {
//     ...
// })
const timeout = (i) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(i);
      resolve(i);
    }, i)
  );
const amen = asyncPoolEs7(6, [1000, 5000, 3000, 2000], timeout);
