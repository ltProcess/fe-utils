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

const globby = require('globby');
const path = require('path');
class Container {

  cwd = process.cwd();
  classTable = {};
  cache = {};
  
  getName(Module) {
    return Module.name.toLowerCase();
  }

  init() {
    const fileResults = globby.sync(['**/**.ts', '**/**.js'], {
      cwd: this.cwd,
      ignore: [
        '**/node_modules/**'
      ],
    });
    for (const name of fileResults) {
      const exports = require(`${this.cwd}/${name}`);
      this.classTable[this.getName[exports]] = exports;
    }
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
        if (this.classTable[p]) {
          obj[p] = this.get(this.classTable[p]);
        }
      }
    }
  }
}