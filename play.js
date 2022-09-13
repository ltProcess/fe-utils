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

// console.log(subsets([1, 2, 3]));

const generateParenthesis = function (n) {};

// 输入：nums = [1,1,1], k = 2
// 输出：2
const subarraySum = function (nums, k) {
  // const len = nums.length;
  // const result = [];
  // const dfs = (list, cur) => {
  //   // if (list.length === 0) return;
  //   for (let i = 0; i < len; i++) {
  //     list.push(nums[i]);
  //     console.log("result", result);
  //     // dfs(nums.slice(i + 1));
  //     // list.shifft();
  //   }
  // };
  // dfs(result, 0);
  // console.log("result", result);
  const len = nums.length;
  let cur = 0;
  let res = 0;
  for (let i = 0; i < len; i++) {
    cur = 0;
    for (let j = i; j >= 0; j--) {
      cur += nums[j];
      if (cur === k) res += 1;
    }
  }
  return res;
};
// console.log(subarraySum([1, 1, 1], 2));

const maxSubArray = function (nums) {
  const len = nums.length;
  if (len <= 1) return len;
  let result = 0;
  for (let i = 0; i < len; i++) {
    let cur = nums[i];
    for (let j = 1; j < len; j++) {
      if (nums[j]) cur += nums[j];
    }
  }
};

// 输入：s = "3[a]2[bc]"
// 输出："aaabcbc"
const decodeString = function (s) {
  const len = s.length;
  const timesStack = [];
  const resStack = [];
  let res = "";
  let times = 0;
  for (let i = 0; i < len; i++) {
    const cur = s[i];
    const n = s.charCodeAt(i);
    if (cur === "[") {
      timesStack.push(times);
      resStack.push(res);
      times = 0;
      res = "";
    } else if (cur === "]") {
      let temp = "";
      let count = timesStack.pop();
      let curRes = resStack.pop();
      for (let j = 0; j < count; j++) {
        temp += res;
      }
      res = curRes + temp;
    } else if (n >= 48 && n <= 57) {
      times = times * 10 + (cur - "0");
    } else {
      res += cur;
    }
  }
  return res;
};

console.log("decodeString", decodeString("100[leetcode]"));
