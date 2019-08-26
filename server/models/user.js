const dbUtils = require('./../utils/dbUtil')
const mongodbConnection = dbUtils.getMongodbConnection()
// 表名
const collectionName = 'user_info'
// 对象属性名
const properties = ['id', 'userName', 'password', 'createTime']
// 表字段名
const schemaData = {
  user_name: String,
  password: String,
  create_time:  {
    default: new Date(),
    type: Date
},
};
class UserModel {
  constructor () {
    const { Schema } = mongodbConnection;
    this.connection = mongodbConnection.model(collectionName, new Schema(schemaData), collectionName);
  }
  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  static async create ( model ) {
    let modelDB =  this.connection(model)
    const result = await modelDB.save()
    return result
  }

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne(options ) {
    let _sql = `
    SELECT * from user_info
      where email="${options.email}" or name="${options.name}"
      limit 1`
    let result = await dbUtils.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }

  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  static async getOneByUserNameAndPassword( options ) {
    let _sql = `
    SELECT * from user_info
      where password="${options.password}" and name="${options.name}"
      limit 1`
    let result = await dbUtils.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }

  /**
   * 根据用户名查找用户信息
   * @param  {string} userName 用户账号名称
   * @return {object|null}     查找结果
   */
  static async getUserInfoByUserName( userName ) {

    let result = await dbUtils.select(
      'user_info',
      ['id', 'email', 'name', 'detail_info', 'create_time', 'modified_time', 'modified_time' ])
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  }
}

module.exports = UserModel