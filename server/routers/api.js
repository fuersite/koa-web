    
/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userController = require('./../controllers/user')

const routers = router
  .post('/user/signIn.json', userController.signIn)
  .post('/user/signUp.json', userController.signUp)
  .get('/user/getUserInfo.json', userController.getLoginUserInfo)
module.exports = routers