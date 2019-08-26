const Koa = require('koa')
const path = require('path')
const convert = require('koa-convert')
const router = require('./routers/index')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const kaoStatic = require('koa-static') // 静态文件访问
const session = require('koa-session') // session
const views = require('koa-views') // 视图操作
const sessionStore = require('./utils/sessionStore') // 视图操作
const dbUtil = require('./utils/dbUtil') // 视图操作
const app = new Koa()

let store =  new sessionStore({
  collection: 'sessions',   // 数据库集合
  connection: dbUtil.getMongodbConnection(),     // 数据库链接实例
})

app.keys = ['session_key'];

const sessionConfig = {
  domain: 'localhost',  // 写cookie所在的域名
  path: '/',            // 写cookie所在的路径
  key: 'SESSION_ID',
  maxAge: 60000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  store: store
};

// 开启cookie-session
app.use(session(sessionConfig,app));

// 配置控制台日志中间件
app.use(convert(koaLogger()))

// 请求数据解析
app.use(bodyParser());

// 静态文件处理
app.use(kaoStatic(path.join( __dirname,  './../static/')))

// 加载模板引擎
app.use(views(path.join(__dirname, './views/'), {extension: 'ejs'}))

// 初始化路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 监听端口
app.listen(3000,()=> {
  console.log('app is starting at port 3000')
})

module.exports = app