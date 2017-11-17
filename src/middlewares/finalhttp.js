//没有匹配到任何有效处理的中间件后处理 处理 HTTP StatusCode
/* eslint no-param-reassign: 0 */

export default function finalhttp() {
    return async (ctx, next) => {
      try {
        await next();
        const status = ctx.status || 404;
        if (status === 404) ctx.throw(404);
      } catch (error) {
        await ctx.render(`error/${ctx.status}`, { error });
        ctx.app.emit('error', error, ctx);
      }
    };
  }
  