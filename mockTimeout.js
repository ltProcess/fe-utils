const mySetTimeout = (cb, time) => {
  const timer = setInterval(() => {
    clearInterval(timer);
    cb();
  }, time);
}

const mySetInterval = (cb, time) => {
  (function innerDo() {
    const timer = setTimeout(() => {
      cb();
      clearInterval(timer);
      innerDo();
    }, time);
  })()
}