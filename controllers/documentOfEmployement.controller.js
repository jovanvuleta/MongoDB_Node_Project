exports.DocumentOfEmployementController = (app, dbcon, mongo, neo4j) => {
    const DocumentOfEmployementModel = require('../models/mysql/documentOfEmployement.model.js').DocumentOfEmployementModel(dbcon);
    var moment = require('moment');

    app.get('/getDocumentOfEmployement', (req, res) => {
        DocumentOfEmployementModel.getAllDocumentOfEmployement()
            .then(data => {
                res.render('documentsOfEmployement', {
                    documents: data,
                    document: data[0],
                    moment: moment
                });
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/addInstitution">Goback!</a>'
                });
            })
    });
};