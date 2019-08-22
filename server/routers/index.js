const Router = require('koa-router');

const router = new Router();
const user = new Router();

router.get('/', ( ctx, next ) => {
  const session = ctx.session;
  console.log('session----------------',session)
  if (session.user) {
    ctx.body = session.user
    return
  }
  ctx.body = '/'
})

router.get('/session', ( ctx, next ) => {
  ctx.body = 'session'
  const session = ctx.session;
  if (session.user) {
    ctx.body = session.user
  } else {
    session.user = {
      name:'ivin',
      age : 28
    }
    ctx.body = session.user
  }
})

module.exports = router