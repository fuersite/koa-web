const Router = require('koa-router');
const HomeAction = require('../controllers/HomeController');

const router = new Router();
const user = new Router();

user.get('404', async ( ctx )=>{
  ctx.body = '404!'
}).get('helloworld', async ( ctx )=>{
  ctx.body = 'helloworld!'
})

router.get('/', ( ctx, next ) => {
  console.log('root=============')
  let html = `/root`
  ctx.body = html
})

router.use('/', user.routes(), user.allowedMethods())

module.exports = router