function compose(...funcs) {
  if (funcs.length === 0) return (arg) => arg;
  if (funcs.length === 1) return funcs[0];
  //  (...args) => fn1(fn2(fn3(fn4(...args))))
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
// 详解：https://segmentfault.com/a/1190000015801987
