const Koa = require('koa'),
      cors = require('koa-cors');
      koaBody =require('koa-bodyParser');
      check =require('./verification/verificationCheck');
// const sqlInfo =require('./sqlInfo/index.js')

// 创建koa的实例app
const app = new Koa();


app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
        return "*"; // 允许来自所有域名请求
    }
    return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(koaBody({
  enableTypes:['json', 'form', 'text']
}))
// app.use(check);

const router = require('./router/index');

// 创建koa-router的实例router

app.use(router.routes()).use(router.allowedMethods())
// 监听端口
app.listen(3000, () => {
    console.log("服务器已启动，http://localhost:3000");
})