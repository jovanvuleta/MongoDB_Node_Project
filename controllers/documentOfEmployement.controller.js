exports.DocumentOfEmployementController = (app, dbcon, mongo, neo4j) => {

    const DocumentOfEmployementModel = require('../models/mysql/documentOfEmployement.model.js').DocumentOfEmployementModel(dbcon);
    const institutionModel = require('../models/mysql/institution.model.js').InstitutionModel(dbcon);
    const Neo4jDocumentOfEmploymentModel = require('../models/neo4j/documentOfEmployment.model').DocumentOfEmployementModel(neo4j);
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
                    link: 'ERROR: ' + err + ' <a href="/getAllStates">Go to states page!</a>'
                });
            })
    });

    app.get('/getDocumentOfEmployementByContractId/:id', (req, res) => {
        DocumentOfEmployementModel.getDocumentOfEmployementByContractId(req.params.id)
            .then(data => {
                console.log(data);
                res.render('documentsOfEmployement', {
                    documents: data,
                    document: data[0],
                    moment: moment
                })
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/getAllStates">Go to states page!</a>'
                });
            })
    });

    app.get('/getContractsByDocuments/:id', (req, res) => {
        DocumentOfEmployementModel.getContractsByDocuments(req.params.id)
            .then(data => {
                console.log(data);
                res.render('contractHistory', {
                    contracts: data,
                    contract: data[0],
                    moment: moment
                })
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/getAllStates">Go to states page!</a>'
                });
            })
    })

    app.get('/editDocumentById/:type/:vu_id/:ct_type/:year/:ct_id', (req, res) => {
        DocumentOfEmployementModel.getDocumentOfEmployementByContractId(req.params.ct_id)
            .then(data => {
                console.log(data);
                res.render('editDocumentEmployment', {
                    documents: data,
                    document: data[0],
                    moment: moment
                })
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/getAllStates">Go back to states page!</a>'
                });
            })
    });

    app.post('/editDocumentById/:type/:vu_id/:ct_type/:year/:ct_id', (req, res) => {
        DocumentOfEmployementModel.editDocumentOfEmployment(req.params.type, req.params.vu_id, req.params.ct_type, req.params.year, req.params.ct_id)
            .then(data => {
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'Document with the id of: ' + req.params.ct_id + ' was edited successfully.',   //success message
                    link: '<a href="/getAllPopulatedPlaces"> Go Back</a>'   //provide a link that provides a links to another page
                });
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/getAllStates">Go back to states page!</a>'
                });
            })
    });

    app.get('/addDocumentById/:type/:vu_id/:ct_type/:year/:ct_id', (req, res) => {
        let mysqlAddDocumentByIdPromise = DocumentOfEmployementModel.getDocumentOfEmployementByContractId(req.params.ct_id);
        let mysqlGetContractTypes = DocumentOfEmployementModel.getAllContractTypes();

        Promise.all([mysqlAddDocumentByIdPromise, mysqlGetContractTypes])
            .then(data => {
                console.log(data);
                res.render('addDocumentOfEmployment', {
                    documents: data,
                    document: data[0][0],
                    contract_types: data[1]
                })
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/getAllStates">Go back to states page!</a>'
                });
            })
    });

    app.post('/addDocumentById/:type/:vu_id/:cnt_type/:year/:cnt_id', (req, res) => {
        let mysqlEditDocumentPromise = DocumentOfEmployementModel.addDocument(req.params.type, req.params.vu_id, req.body.cnt_type, req.body.cnt_year, req.body.cnt_id, req.body.cnt_start_date, req.body.cnt_end_date);
        let neo4jEditDocumentByIdPromise = Neo4jDocumentOfEmploymentModel.addDocument(req.params.type, req.params.vu_id, req.body.cnt_type, req.body.cnt_year, req.body.cnt_id, req.body.cnt_start_date, req.body.cnt_end_date);

        Promise.all([mysqlEditDocumentPromise, neo4jEditDocumentByIdPromise])
            .then(data => {
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'Document with the id of: ' + req.params.cnt_id + ' was edited successfully.',   //success message
                    link: '<a href="/getAllStates"> Go Back</a>'   //provide a link that provides a links to another page
                });
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/getAllStates">Go back to states page!</a>'
                });
            })
    });

    app.get('/deleteDocumentById/:id', (req, res) => {
        let mysqlDocumentDeletePromise = DocumentOfEmployementModel.deleteDocument(req.params.id);
        let neo4jDocumentDeletePromise = Neo4jDocumentOfEmploymentModel.deleteDocumentById(req.params.id);

        Promise.all([mysqlDocumentDeletePromise, neo4jDocumentDeletePromise])
            .then(data => {
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'Document with the id of: ' + req.params.ct_id + ' was deleted successfully.',   //success message
                    link: '<a href="/getAllPopulatedPlaces"> Go Back</a>'   //provide a link that provides a links to another page
                });
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/getAllStates">Go back to states page!</a>'
                });
            })
    })


};