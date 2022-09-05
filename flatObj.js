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
      let tmp = isArray ? key + "[" + k + "]" : key + k;
      betterFlatObj(v, tmp, res, true);
    } else if (typeof v === "object") {
      let tmp = isArray ? key + "[" + k + "]." : key + k + ".";
      betterFlatObj(v, tmp, res, false);
    } else {
      let tmp = isArray ? key + "[" + k + "]" : key + k;
      res[tmp] = v;
    }
  }
  return res;
}
console.log(flatObj(testObj));
console.log(betterFlatObj(testObj));
