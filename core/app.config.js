//AppConfig module will be imported in the main index.js to provide application parameters
exports.AppConfig = function() {
    const dbcon = require('./mysql.connection.js').MysqlConnection();   //import the MysqlConnection module in order to pass the connection parameters to index.js
    const mongo = require('./mongodb.connection.js').MongodbConnection();   //import the MongodbConnection module in order to pass the connection parameters to index.js  

    //require Node.js exrepss server package
    const express = require('express');
    let app = express();

    // Require body-parser package in order to encode URL IN jaon format
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));

    // Set EJS as a template engine (Enables passing from the back-end side to the front-end)
    app.set('view engine', 'ejs');

    //Start express application at the port 3000
    app.listen(3000, (err) => {
        if ( !err ) {
            console.log('Aplication is running at port 3000.');
        } else {
            console.log(err);
        }
    });

    return {    //return app, dbcon and mongodb
        app, dbcon, mongo
    };
}
