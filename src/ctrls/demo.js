


export default async (ctx, next) => { //new RegExp(syncConfig.vd+'\/\S{3}-\S{3}.+')
//console.log(ctx.params.paramStr, ctx.request.body, getUserInfo(ctx), 'url Params')
// console.log(ctx.cookies.get(), 'cookie')
    await ctx.render('demo.html')
}