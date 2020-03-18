//MysqlConnection module is imported in the AppConfig module to provide MySQL connection parameters to the AppConfig module
exports.MongodbConnection = function () {
  const mongo = require('mongojs')('localhost:27017/crud');
  return mongo;
}