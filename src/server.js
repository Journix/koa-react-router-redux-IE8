import path from 'path';
import Koa from 'koa';
import session from 'koa-session';
import views from 'koa-views';
import convert from 'koa-convert';
import serve from 'koa-static';
import koaBody from 'koa-body';
import koaMount from 'koa-mount';

import router from './router';
import finalhttp from './middlewares/finalhttp';



import {syncConfig} from '../config';

const app = new Koa();
const mount = (middleware) => koaMount(syncConfig.vd || '/', middleware)

app.use(koaBody());
app.use(finalhttp());
//ctx.render会获取对应路径下的html，并使用dot模板引擎
app.use(views(path.join(`${__dirname}`, '..', '/views'), {
    map: {html: 'dot'},
    default: "dot"
  }));

app.use(convert(session(syncConfig.session, app)));

//直接通过***.html访问的页面
app.use(mount(serve(path.join(`${__dirname}`, '..', '/static/dist'),  {gzip: true, autogz: true})));

app
.use(router.routes())
.use(router.allowedMethods());

export default app;