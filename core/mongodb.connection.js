//MysqlConnection module is imported in the AppConfig module to provide MySQL connection parameters to the AppConfig module
exports.MongodbConnection = function () {
    //require MySQL package
    const mongodb = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/Crud";

    mongodb.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Database initiated!");
        db.close();
      });

    return mongodb;
}