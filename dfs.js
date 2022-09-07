// fn([['a', 'b'], ['n', 'm'], ['0', '1']]) => ['an0', 'am0', 'an1', 'am1', 'bn0', 'bm0', 'bn1', 'bm0']
const format = (list) => {
  const result = [];
  const len = list.length;
  if (len === 0) return result;
  function dfs(res, curr) {
    if (res.length === len) {
      result.push(res.join(""));
      return;
    }
    for (let i = 0; i < list[curr].length; i++) {
      res.push(list[curr][i]);
      dfs(res, curr + 1);
      res.pop();
    }
  }
  dfs([], 0);
  return result;
};
console.log(
  format([
    ["a", "b"],
    ["n", "m", "h"],
    ["0", "1"],
  ])
);

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
console.log(permute([1, 2, 3]));

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
