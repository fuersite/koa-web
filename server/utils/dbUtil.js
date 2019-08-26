const mongoose = require('mongoose')
let mongoConnection = null
class dbUtil {
    static  getMongodbConnection() {
        if (!this.mongoConnection) {
            console.log('init this.mongoConnection===================',this.mongoConnection)
            this.mongoConnection = mongoose.connect('mongodb://admin:123456@localhost:27017/user?authSource=admin', {'useNewUrlParser': true, 'useCreateIndex':true})
            return mongoose
        } else {
            console.log('this.mongoConnection===================',this.mongoConnection)
            return mongoose
        }
    }
}

module.exports = dbUtil