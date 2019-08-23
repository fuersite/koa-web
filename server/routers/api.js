    
/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userController = require('./../controllers/user')

const routers = router
  .get('/user/getUserInfo.json', userController.getLoginUserInfo)
  .post('/user/signIn.json', userController.signIn)
  .post('/user/signUp.json', userController.signUp)
  
module.exports = routers