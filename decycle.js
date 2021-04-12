/*
利用WeakMap消除循环引用
 */

function decycle(target) {
  const map = new WeakMap();

  function _cycle(obj) {
    if (!map.get(obj)) {
      map.set(obj, obj);
    }
    const keys = Object.keys(obj);
    
    for (let i = 0; i < keys.length; i++) {
      if (typeof obj[keys[i]] === 'object') {
        if (map.has(obj[keys[i]])) {
          obj[keys[i]] = '$';
          continue;
        } else {
          map.set(obj[keys[i]], obj[keys[i]]);
        }
        _cycle(obj[keys[i]])
      }
    }
  }
  _cycle(target);
}