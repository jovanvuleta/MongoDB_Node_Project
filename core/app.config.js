//AppConfig module will be imported in the main index.js to provide application parameters
exports.AppConfig = function () {
    const dbcon = require('./mysql.connection.js').MysqlConnection();   //import the MysqlConnection module in order to pass the connection parameters to index.js
    const mongo = require('./mongodb.connection.js').MongodbConnection();   //import the MongodbConnection module in order to pass the connection parameters to index.js  
    const neo4j = require('./neo4j.connection.js').Neo4jConnection();

    //require Node.js exrepss server package
    const express = require('express');
    let app = express();

    // Require body-parser package in order to encode URL IN jaon format
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/public', express.static('public'));

    // Set EJS as a template engine (Enables passing from the back-end side to the front-end)
    app.set('view engine', 'ejs');

    app.listen(3000, (err) => {
        if (!err) {
            console.log('Aplication is running at port 3000.');
        } else {
            console.log(err);
        }
    });

    return {
        app, dbcon, mongo, neo4j
    };
}