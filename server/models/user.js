const dbUtils = require('./../utils/dbUtil')
const mongodbConnection = dbUtils.connection()
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
}

const { Schema } = mongodbConnection;
const userConnection = mongodbConnection.model(collectionName, new Schema(schemaData), collectionName);
console.log('init userConnection =============', typeof userConnection)
class UserModel {
  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  static async create ( model ) {
    let modelDB =  new userConnection(model)
    const result = await modelDB.save()
    return result
  }

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne(options ) {
  }

  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  static async getOneByUserNameAndPassword( userName, password ) {
    let result = await userConnection.findOne({user_name: userName, password:password })
    return result
  }

  /**
   * 根据用户名查找用户信息
   * @param  {string} userName 用户账号名称
   * @return {object|null}     查找结果
   */
  static async getUserInfoByUserName( userName ) {
  }
}

module.exports = UserModel