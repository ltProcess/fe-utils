// const timeout = (time) => new Promise(resolve => {
//   setTimeout(resolve, time)
// })

// const scheduler = new Scheduler()
// const addTask = (time, order) => {
//   scheduler.add(() => timeout(time))
//     .then(() => console.log(order))
// }

// 限制同一时刻只能执行2个task
// addTask(4000, '1')
// addTask(3500, '2')
// addTask(4000, '3')
// addTask(3000, '4')

//Scheduler ？
//4秒后打印1
//3.5秒打印2
//3进入队列

async function add(fn, max = 2) {
  const result = [];
  const promiseQueues = [];

  const p = Promise.resolve().then(() => fn());
  promiseQueues.push(p);
  for (const item of promiseQueues) {
    if (promiseQueues.length > max) {
      const ex = p().then(() => result.splice(result.indexOf(ex), 1));
      result.push(ex);
      if (result.length >= max) {
        await Promise.race(result);
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

function add(s, t) {
  let sp = s.length - 1;
  let tp = t.length - 1;
  let resArr = [];
  let p = 0;
  let sum = 0;
  while (sp >= 0 || tp >= 0 || p !== 0) {
    let sV = sp >= 0 ? Number(s[sp]) : 0;
    let tV = tp >= 0 ? Number(t[tp]) : 0;
    sum = sV + tV + p;
    resArr.unshift(sum % 10);
    p = sum >= 10 ? 1 : 0;
    sp--;
    tp--;
  }
  return resArr.join("");
}

// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
const permute = function (nums) {
  const result = [];
  const used = {};
  const len = nums.length;
  const dfs = (list) => {
    if (list.length === len) {
      result.push([...list]);
      return;
    }
    for (let i = 0; i < len; i++) {
      if (used[nums[i]]) continue;
      list.push(nums[i]);
      used[nums[i]] = true;
      dfs(list);
      list.pop();
      used[nums[i]] = false;
    }
  };
  dfs([]);
  return result;
};
// console.log(permute([1, 2, 3]));

// 输入：nums = [1,2,3]
// 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
const subsets = function (nums) {
  const res = [];
  const temp = [];
  const len = nums.length;
  const dfs = (cur) => {
    if (cur === nums.length) {
      res.push([...temp]);
      return;
    }
    temp.push(nums[cur]);
    dfs(cur + 1);
    temp.pop();
    dfs(cur + 1);
  };
  dfs(0);
  return res;
};
console.log(subsets([1, 2, 3]));

const generateParenthesis = function (n) {};
