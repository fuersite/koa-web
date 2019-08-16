const Koa = require('koa')
const path = require('path')
const router = require('./routes/index')
const bodyParser = require('koa-bodyparser')
const loggerMiddleware = require('./middleware/logger.js')
const kaoStatic = require('koa-static') // 静态文件访问
const session = require('koa-session-minimal') // session
const views = require('koa-views') // 视图操作
const jsonp = require('koa-jsonp')
const { uploadFile } = require('./utils/upload')
const app = new Koa()

// 使用session中间件
let cookie = {
  domain: 'localhost',  // 写cookie所在的域名
  path: '/',       // 写cookie所在的路径
  maxAge: 60*1000, // cookie有效时长
  expires: new Date('2019-08-15'),  // cookie失效时间
  httpOnly: true,  // 是否只用于http请求中获取
  overwrite: true,  // 是否允许重写
  sameSite: '',
  signed: '',
}

app.use(jsonp())

// 加载模板引擎
app.use(views(path.join(__dirname, './views/ejs'), {
  extension: 'ejs'
}))

app.use(session({
  key: 'SESSION_ID',
  cookie: cookie
}))

app.use(bodyParser());
app.use(kaoStatic(
    path.join( __dirname,  './static/')
))

app.use( async ( ctx ) => {
    if ( ctx.url === '/setCookie' ) {
        ctx.cookies.set(
          'cid', 
          'hello world',
          {
            domain: 'localhost',  // 写cookie所在的域名
            path: '/',       // 写cookie所在的路径
            maxAge: 60*1000, // cookie有效时长
            expires: new Date('2019-08-15'),  // cookie失效时间
            httpOnly: true,  // 是否只用于http请求中获取
            overwrite: true  // 是否允许重写
          }
        )
        ctx.body = 'cookie is ok'
      } else if ( ctx.url === '/setSession' ) {
        console.log(ctx.session)
        if (ctx.session.count) {
          ctx.session.count = ctx.session.count + 1
          ctx.body = ctx.session
        } else {
          ctx.session = {
            user_id: Math.random().toString(36).substr(2),
            count: 1
          }
          ctx.body = ctx.session
        }
      } 

      if ( ctx.url === '/view') {
        await ctx.render('index', {
          title: '香港是中国的'
        })
      }

      if ( ctx.url === '/upload') {
        let serverFilePath = path.join( __dirname, 'static/images' )
        // 上传文件事件
        result = await uploadFile( ctx, {
          fileType: 'jpeg',
          path: serverFilePath
        })
        ctx.body = result
      }

      if ( ctx.url === '/jsonp') {
        // jsonp的script字符串
        let jsonpStr = `;alert('hello)`
        // 用text/javascript，让请求支持跨域获取
        ctx.type = 'text/javascript'
        ctx.body = jsonpStr
      }


      if ( ctx.url === '/getString.json' ) {
        ctx.body = {data:'this is string data'}
      } else if ( ctx.url === '/getNumber.json' ) {
        ctx.body = {data: 234234}
      } else {
        ctx.body = { success: false }
      }
      
})
  
app.listen(3000,()=> {
  console.log('is starting at port 3000')
})

module.exports = app