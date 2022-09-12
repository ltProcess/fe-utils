function deepClone(origin) {
  let result = null;
  if (typeof origin === "object" && origin !== null) {
    // 【类型判断】引用类型，进行递归拷贝（用typeof判断类型要剔除null的情况）
    if (Object.prototype.toString.call(origin) === "[object Array]") {
      // 【类型判断】数组类型，创建一个新数组
      result = [];
      // 【遍历赋值】
      origin.forEach((el) => {
        result.push(deepClone(el)); // 【递归】
      });
    } else {
      // 【类型判断】对象类型，创建一个新对象
      result = {};
      for (const key in origin) {
        // 【遍历赋值】对象这里特殊处理了，不遍历拷贝原型链上的属性
        if (origin.hasOwnProperty(key)) {
          result[key] = deepClone(origin[key]); // 【递归】
        }
      }
    }
  } else {
    // 【类型判断】原始类型直接返回
    return origin;
  }
  return result;
}
