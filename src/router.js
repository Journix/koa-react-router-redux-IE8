import Router from 'koa-router';
import fs from 'fs';
import slbHealthCheckCtrl from './ctrls/slbHealthCheck'
// import index from './ctrls/index'
import demo from './ctrls/demo'

// const prefix = {}
// const router = new Router(prefix);

const router = new Router();

router.get('/', demo)
router.get('/slbhealthcheck.html', slbHealthCheckCtrl);
router.get('/:param', demo)

//处理路由参数，自动加载或者校验
router.param('dirname', async function (param, ctx, next) {
    if (!param) {
        console.log('param is run and 404')
        return this.status = 404
    }
    await next()
})
    .param('filename', async function (param, ctx, next) {
        if (!param) {
            console.log('param is run and 404')
            return this.status = 404
        }
        await next()
    })
    .all('/api/:dirname/:filename', async function (ctx, next) {
        ctx.body = await new Promise((resolve, reject) => {
            fs.readFile(`mock/${ctx.params.dirname}/${ctx.params.filename}.json`, 'utf8', function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    if (ctx.query.jsonpcallback) {
                        data = `${ctx.query.jsonpcallback}(${data})`
                    }
                    resolve(data)
                }
            })
        })
    })

router.get('/*', demo)
export default router
