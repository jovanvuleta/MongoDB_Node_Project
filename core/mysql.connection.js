exports.MysqlConnection = function () {
    const mysql = require('mysql');

    let dbcon = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'NonDB_schema'
    });

    dbcon.connect((err) => {
        if (!err) {
            console.log('MySQL database is successfully connected!');
        } else {
            console.log(err);
        }
    });

    return dbcon;
}