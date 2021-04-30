const mySetTimeout = (cb, time) => {
  const timer = setInterval(() => {
    clearInterval(timer);
    cb();
  }, time);
}