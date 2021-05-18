// class A {
//   b: B;
// }

// class B {
//   c: C;
// }

// class C {
//   hello() {
//     console.log('hello world')
//   }
// }
// const container = new Container();
// const a = container.get(A);
// a.b.c.hello() === 'hello world'

class Container {

  cache = {};
  
  getName(Module) {
    return Module.name.toLowerCase();
  }

  get(Module) {
    // 缓存
    if (this.cache[this.getName(Module)]) {
      return this.cache[this.getName(Module)];
    }
    // 创建对象
    const obj = new Module();
    // 缓存使用
    this.cache[this.getName(Module)] = obj;
    // 拿到属性
    const properties = Object.getOwnPropertyNames(obj);
    for(let p of properties) {
      if(!obj[p]) {
        // 如果对象不存在，就往下创建
        if(p === 'b') {
          obj[p] = this.get(B);
        } else if(p === 'c') {
          obj[p] = this.get(C);
        } else {}
      }
    }
  }
}