exports.AppConfig = function() {
    const dbcon = require('./mysql.connection.js').MysqlConnection();
    // const mongo = require('./mongodb.connection.js').MongodbConnection();
    
    const express = require('express');
    let app = express();

    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));

    app.set('view engine', 'ejs');

    app.listen(3000, (err) => {
        if ( !err ) {
            console.log('Aplication is running at port 3000.');
        } else {
            console.log(err);
        }
    });

    return {
        app, dbcon
    };
}
