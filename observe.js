const queueObservers = new Set();

const observe = (fn) => queueObservers.add(fn);

const observable = (obj) => new Proxy(obj, { set });

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queueObservers.forEach((cb) => cb());
  return result;
}

const bmen = { name: "1" };
const amen = () => console.log("amen");
observe(amen);

const as = observable(bmen);
