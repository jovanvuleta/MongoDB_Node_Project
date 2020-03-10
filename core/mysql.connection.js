//MysqlConnection module is imported in the AppConfig module to provide MySQL connection parameters to the AppConfig module
exports.MysqlConnection = function () {
    //require MySQL package
    const mysql = require('mysql');

    //Set MySQL database connection parameters
    let dbcon = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'crud'
    });

    //Create connection to the database
    dbcon.connect((err) => {
        if ( !err ) {
            console.log('MySQL database is successfully connected!');
        } else {
            console.log(err);
        }
    });

    return dbcon;
}