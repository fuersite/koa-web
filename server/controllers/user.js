const userService = require('./../services/user')
const userMessage = require('./../messages/user')

class UserController {
  /**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
  static async signIn( ctx ) {
    let formData = ctx.request.body
    let result = {
      success: false,
      message: '',
      data: null,
      code: ''
    }

    let userResult = await userService.signIn( formData )

    if (userResult && userResult.user_name ) {
      result.success = true
    } else {
      result.code = 'FAIL_USER_NO_EXIST',
      result.message = userMessage.FAIL_USER_NO_EXIST
    }

    if ( formData.source === 'form' && result.success === true ) {
      let session = ctx.session
      session.isLogin = true
      session.userName = userResult.name
      session.userId = userResult._id
      ctx.redirect('/work')
    } else {
      ctx.body = result
    }
  }

  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象
   */
  static async signUp( ctx ) {
    let formData = ctx.request.body
    let userResult = await userService.create({
      password: formData.password,
      user_name: formData.userName,
      create_time: new Date().getTime(),
    })

    ctx.body = userResult
  }

  /**
   * 获取用户信息
   * @param    {obejct} ctx 上下文对象
   */
  static async getLoginUserInfo( ctx ) {
    let session = ctx.session
    let isLogin = session.isLogin
    let userName = session.userName

    console.log( 'session=', session )

    let result = {
      success: false,
      message: '',
      data: null,
    }
    if ( isLogin === true && userName ) {
      let userInfo = await userService.getUserInfoByUserName( userName )
      if ( userInfo ) {
        result.data = userInfo
        result.success = true
      } else {
        result.message = userMessage.FAIL_USER_NO_LOGIN
      }
    } else {
      // TODO
    }

    ctx.body = result
  }

  /**
   * 校验用户是否登录
   * @param  {obejct} ctx 上下文对象
   */
  static validateLogin( ctx ) {
    let result = {
      success: false,
      message: userMessage.FAIL_USER_NO_LOGIN,
      data: null,
      code: 'FAIL_USER_NO_LOGIN',
    } 
    let session = ctx.session
    if( session && session.isLogin === true  ) {
      result.success = true
      result.message = ''
      result.code = ''
    }
    return result
  }
}

module.exports = UserController