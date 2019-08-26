const Router = require('koa-router');
const router = new Router();
const home = require('./home')
const admin = require('./admin')
const work = require('./work')
const error = require('./error')
const notFund = require('./404')
const api = require('./api')

router.use('/', home.routes(), home.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/work', work.routes(), work.allowedMethods())
router.use('/error', error.routes(), error.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())

router.use('/', notFund.routes(), notFund.allowedMethods())

module.exports = router
