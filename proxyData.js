let obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
};

let handler = {
  get(target, key) {
    if (typeof target[key] === "object") {
      return new Proxy(target[key], handler);
    }
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    let oldValue = target[key];
    if (oldValue !== value) {
      return Reflect.set(target, key, value);
    }
    return true;
  },
};
