 // Promise.all并发限制指的是，每个时刻并发执行的promise数量是固定的，最终的执行结果还是保持与原来的Promise.all一致

 function asyncPool(poolLimit, array, iteratorFn) {
  let i = 0;
  const ret = [];
  const excuting = [];
  const enqueue = function() {
    if (array.length === 0) {
      return Promise.resolve();
    }
    const item = array[i++];
    const p = Promise.resolve().then(() => iteratorFn(item, array));

    ret.push(p);
    const e = p.then(() => excuting.splice(excuting.indexOf(e), 1));
    excuting.push(e);

    let r = Promise.resolve();
    if (excuting.length >= poolLimit) {
      r = Promise.race(excuting);
    }
    return r.then(() => enqueue());
  };
  return enqueue().then(() => Promise.all(ret));
 }


// const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
// return asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(results => {
//     ...
// })