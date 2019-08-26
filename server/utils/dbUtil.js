const mongoose = require('mongoose')
const mongoConnection = mongoose.connect('mongodb://admin:123456@localhost:27017/user?authSource=admin', {'useNewUrlParser': true, 'useCreateIndex':true})
console.log('init mongodb =============', mongoConnection)
class dbUtil {
    static  connection() {
        return mongoose
    }
}

module.exports = dbUtil