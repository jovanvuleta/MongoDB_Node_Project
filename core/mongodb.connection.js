// //MysqlConnection module is imported in the AppConfig module to provide MySQL connection parameters to the AppConfig module
// exports.MongodbConnection = function () {
//   //require MySQL package
//   const mongodb = require('mongodb').MongoClient;
//   // var url = "mongodb://localhost:3000/FinalProject_MongoDB";
//   var url = 'mongodb://localhost:27017/FinalProject_MongoDB';

//   mongodb.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log("Database initiated!");
//     db.close();
//   });

//   return mongodb;
// }


//MysqlConnection module is imported in the AppConfig module to provide MySQL connection parameters to the AppConfig module
exports.MongodbConnection = function () {
  const mongo = require('mongojs')('localhost:27017/crud');
  return mongo;
}