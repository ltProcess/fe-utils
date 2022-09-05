const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}

// 限制同一时刻只能执行2个task
addTask(4000, '1')
addTask(3500, '2')
addTask(4000, '3')
addTask(3000, '4')

//Scheduler ？
//4秒后打印1
//3.5秒打印2
//3进入队列

function add(fn, max = 2) {
  const result = [];
  const promiseQueues = [];
  
  const p = Promise.resolve().then(() => fn());
  promiseQueues.push(p);
  for (const item of promiseQueues) {
    if (promiseQueues.length > max) {
      const ex = p().then(() => result.splice(result.indexOf(ex),1));
      result.push(ex);
      if (result.length >= max) {
        await Promise.race(result)
      }
    }
  }
  // if (max > promiseQueues.length) {
  //   const ex = p().then(() => result.splice(result.indexOf(ex),1));
  //   result.push(ex);
  //   if (result.length ) {
  //     await Promise.race(result);
  //   }

  // }
  return Promise.all(promiseQueues);
}



function add (s, t) {
  let sp = s.length-1
  let tp = t.length-1
  let resArr = []
  let p = 0
  let sum = 0
  while (sp >= 0 || tp >=0 || p!== 0) {
    let sV = sp >= 0 ? Number(s[sp]) : 0
    let tV = tp >= 0 ? Number(t[tp]) : 0
    sum = sV + tV + p
    resArr.unshift(sum % 10)
    p = sum >= 10 ? 1 : 0
    sp--
    tp--
  }
  return resArr.join("")
}
