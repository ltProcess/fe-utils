

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印
function createFlow(effects = []) {
  let sources = effects.slice().flat();
  function run(callback) {
    while (sources.length) {
      const task = sources.shift();
      const next = () => createFlow(sources).run(callback);
      if (typeof task === 'function') {
        const res = task();
        if (res?.then) {
          res.then(next);
          return;
        }
      } else if (task?.isFlow) {
        task.run(next);
        return;
      }
    }
    callback?.();
  }

  return {
    run,
    isFlow: true
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => console.log("c"))]);
createFlow([
  () => console.log("a"),
  () => console.log("b"),
  subFlow,
  [() => delay(1000).then(() => console.log("d")), () => console.log("e")],
]).run(() => {
  console.log("done");
});

const createFlow2 = (flow) => {
  const runner = {};
  runner.run = async(fn) => {
    while (flow.length) {
      const effects = flow.shift();
      const type = Object.prototype.toString.call(effects).slice(8,-1);
      if (type === 'Function') await effects();
      if (type === 'Object') flow.unshift(...effects.flow);
      if (type === 'Arrary') flow.unshift(...effects);
    }
    fn();
  }
  return runner;
}