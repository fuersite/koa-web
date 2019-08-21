const Koa = require('koa')
const path = require('path')
const router = require('./routers/index')
const bodyParser = require('koa-bodyparser')
const loggerMiddleware = require('./middleware/logger.js')
const koaLogger = require('koa-logger')
const kaoStatic = require('koa-static') // 静态文件访问
const session = require('koa-session-minimal') // session
const views = require('koa-views') // 视图操作
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://admin:123456@localhost:27017/user?authSource=admin')
// const Cat = mongoose.model('animals', { name: String },'animal')
const app = new Koa()

// 使用session中间件
let cookie = {
  domain: 'localhost',  // 写cookie所在的域名
  path: '/',       // 写cookie所在的路径
  maxAge: 100*1000, // cookie有效时长
  expires: new Date('2019-08-20'),  // cookie失效时间
  httpOnly: true,  // 是否只用于http请求中获取
  overwrite: true,  // 是否允许重写
  store: true,
  sameSite: '',
  signed: '',
}

// 开启cookie-session
app.use(session({key: 'SESSION_ID', cookie: cookie}))

// 配置控制台日志中间件
app.use(convert(koaLogger()))

// 请求数据解析
app.use(bodyParser());

// 静态文件处理
app.use(kaoStatic(path.join( __dirname,  './static/')))

// 加载模板引擎
app.use(views(path.join(__dirname, './views/ejs'), {extension: 'ejs'}))

// 初始化路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 监听端口
app.listen(3000,()=> {
  console.log('app is starting at port 3000')
})

module.exports = app