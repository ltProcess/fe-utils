// const Koa = require('koa');
// const app = new Koa();

// app.use(async (ctx, next) => {
//   console.log(1);
//   await next();
//   console.log(2);
// });

// app.use(async (ctx, next) => {
//   console.log(3);
//   await next();
//   console.log(4);
// });

// app.use(async (ctx, next) => {
//   ctx.body = 'Hello, Koa';
// });

// app.listen(3001);

// use(fn) {
//   // 省略部分代码...
//   this.middleware.push(fn);
//   return this;
// }

// listen(...args) {
//   const server = http.createServer(this.callback());
//   return server.listen(...args);
// }

// callback() {
//   // compose 为中间件运行的核心
//   const fn = compose(this.middleware);

//   // handleRequest 就是 callback 函数返回的函数
//   const handleRequest = (req, res) => {
//     const ctx = this.createContext(req, res);
//     return this.handleRequest(ctx, fn);
//   };
//   return handleRequest;
// }

// handleRequest(ctx, fn) {
//   // 省略无关代码...
//   const onerror = err => ctx.onerror(err);
//   const handleResponse = () => respond(ctx);
//   // 省略无关代码...
//   return fn(ctx).then(handleResponse).catch(onerror);
// }

function compose(middleware) {
  if (!Array.isArray(middleware))
    throw new TypeError("Middleware stack must be an array!");
  for (const fn of middleware) {
    if (typeof fn !== "function")
      throw new TypeError("Middleware must be composed of functions!");
  }

  /**
   * @param {Object} ctx
   * @return {Promise}
   * @api public
   */
  return function fn(ctx, next) {
    // 简化了部分代码
    return dispatch(0);
    function dispatch(i) {
      let middlewareFn = middleware[i];
      try {
        return Promise.resolve(middlewareFn(ctx, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}
