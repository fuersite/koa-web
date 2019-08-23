const router = require('koa-router')()
const routers = router.get('*',  async ( ctx, next ) => {
  console.log('*=========================')
  if(parseInt(ctx.status) === 404){
    console.log('status----------:',ctx.status)
    ctx.body = '404';
  }
})

module.exports = routers