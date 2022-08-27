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
