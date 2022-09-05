const testObj = {
  a: {
    b: {
      c: {
        dd: "abcdd",
      },
    },
    d: {
      xx: "adxx",
    },
    e: "ae",
  },
  f: "sa",
};
const source = { n: [1, 2] };
function flatObj(obj) {
  const res = {};
  function keyToStr(keyStr, value) {
    if (typeof value !== "object" || value === null) {
      res[keyStr.slice(1)] = value;
      return;
    }
    const keys = Object.keys(value);
    for (let key of keys) {
      keyToStr(`${keyStr}.${key}`, value[key]);
    }
  }
  keyToStr("", obj);
  return res;
}

function betterFlatObj(obj, key = "", res = {}, isArray = false) {
  for (let [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      let tmp = isArray ? `${key}[${k}]` : `${key}${k}`;
      betterFlatObj(v, tmp, res, true);
    } else if (typeof v === "object") {
      let tmp = isArray ? `${key}[${k}].` : `${key}${k}.`;
      betterFlatObj(v, tmp, res, false);
    } else {
      let tmp = isArray ? `${key}[${k}]` : `${key}${k}`;
      res[tmp] = v;
    }
  }
  return res;
}
console.log(betterFlatObj(source));

const flatenList = (list) => {
  const len = list.length;
  const result = [];
  for (let i = 0; i < len; i++) {
    if (Array.isArray(list[i])) {
      result.push(...flatenList(list[i]));
    } else {
      result.push(list[i]);
    }
  }
  return result;
};

const flatenList2 = (list) => {
  const len = list.length;
  const stack = [...list];
  const result = [];
  while (stack.length > 0) {
    const cur = stack.pop();
    if (Array.isArray(cur)) {
      stack.push(...cur);
    } else {
      result.push(cur);
    }
  }
  return result.reverse();
};
console.log(flatenList([1, 2, [3, [4, [5, 6]]]]));
