/**
 * 用户业务操作
 */

const validator = require('validator')
const userModel = require('./../models/user')
const userMessage = require('./../messages/user')

class user {

  /**
   * 创建用户
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
  static async create( user ) {
    let result = await userModel.create(user)
    return result
  }


  /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
  static async signIn( formData ) {
    let resultData = await userModel.getOneByUserNameAndPassword(formData.userName, formData.password)
    return resultData
  }

  /**
   * 根据用户名查找用户业务操作
   * @param  {string} userName 用户名
   * @return {object|null}     查找结果
   */
  static async getUserInfoByUserName( userName ) {
    
    let resultData = await userModel.getUserInfoByUserName( userName ) || {}
    let userInfo = {
      userName: resultData.user_name,
      createTime: resultData.create_time
    }
    return userInfo
  }


  /**
   * 检验用户注册数据
   * @param  {object} userInfo 用户注册数据
   * @return {object}          校验结果
   */
  static validatorSignUp( userInfo ) {
    let result = {
      success: false,
      message: '',
    }

    if ( /[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false ) {
      result.message = userMessage.ERROR_USER_NAME
      return result
    }
    if ( !validator.isEmail( userInfo.email ) ) {
      result.message = userMessage.ERROR_EMAIL
      return result
    }
    if ( !/[\w+]{6,16}/.test( userInfo.password )  ) {
      result.message = userMessage.ERROR_PASSWORD
      return result
    }
    if ( userInfo.password !== userInfo.confirmPassword ) {
      result.message = userMessage.ERROR_PASSWORD_CONFORM
      return result
    }

    result.success = true

    return result
  }

}

module.exports = user