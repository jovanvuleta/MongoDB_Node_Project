exports.ContractHistoryController = (app, dbcon, mongo, neo4j) => {
    const contractHistoryModel = require('../models/mysql/contract_history.model').ContractHistoryModel(dbcon);
    const Neo4jDocumentOfEmploymentModel = require('../models/neo4j/contractHistory.model').ContractHistoryModel(neo4j);
    const contractHistoryCollection = require('../models/mongodb/contractHistory.collection').ContractHistoryCollection(mongo);
    const documentOfEmployementModel = require('../models/mysql/documentOfEmployement.model.js').DocumentOfEmployementModel(dbcon);

    app.get('/getAllContractHistory', (req, res) => {
        contractHistoryModel.getAllContractHistoryForHeader()
            .then((data) => {
                res.render('contractHistory', {
                    contracts: data,
                    contract: data[0]
                })
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'Error' + err
                })
            });
    });

    app.get('/getContractHistoryByEmployeeId/:type/:emp_vu_id/:emp_id', (req, res) => {
        contractHistoryModel.getAllContractHistory(req.params.type, req.params.emp_vu_id, req.params.emp_id)
            .then((data) => {
                res.render('contractHistory', {
                    contracts: data,
                    contract: data[0],
                    first_object: {
                        type: req.params.type,
                        emp_vu_id: req.params.emp_vu_id,
                        emp_id: req.params.emp_id
                    }
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/getAllStates">Go back to states page!</a>'
                });
            });
    });

    app.get('/addContractHistory/:type/:emp_vu_id/:emp_id', (req, res) => {
        let getAllContractTypes = contractHistoryModel.getAllContractTypes().then();
        let getAllContractYears = contractHistoryModel.getAllContractYears().then();
        let getAllContractIds = contractHistoryModel.getAllContractIds().then();
        let getAllContractHistory = contractHistoryModel.getAllContractHistory(req.params.type, req.params.emp_vu_id, req.params.emp_id);

        Promise.all([getAllContractTypes, getAllContractYears, getAllContractIds, getAllContractHistory])
            .then(data => {
                res.render('addContract', {
                    contractTypes: data[0],
                    contractYears: data[1],
                    contractIds: data[2],
                    contracts: data[3],
                    contract: data[3][0],
                    first_object: {
                        type: req.params.type,
                        emp_vu_id: req.params.emp_vu_id,
                        emp_id: req.params.emp_id
                    }
                });
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/getAllStates">Go back to states page!</a>'
                });
            });
    });

    app.post('/addContract/:type/:emp_vu_id/:emp_id', (req, res) => {
        let mysqlAddContractPromise = contractHistoryModel.addContractHistory(req.params.type, req.params.emp_vu_id, req.params.emp_id, req.body.contractType, req.body.contractYear, req.body.contractID);
        let neo4jAddContractPromise = Neo4jDocumentOfEmploymentModel.addContract(req.params.type, req.params.emp_vu_id, req.params.emp_id, req.body.contractType, req.body.contractYear, req.body.contractID);

        Promise.all([mysqlAddContractPromise, neo4jAddContractPromise])
            .then((data) => {
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'Contract under id: ' + req.body.contractID + ', was added successfully.',   //success message
                    link: '<a href="/getAllStates"> Go Back</a>',  //provide a link that provides a links to another page
                });
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/getAllStates">Goback!</a>'
                });
            });
    });

    app.get('/deleteContractById/:id', (req, res) => {
        let mysqlContractDelete = contractHistoryModel.deleteContract(req.params.id);
        let neo4jContractDelete = Neo4jDocumentOfEmploymentModel.deleteContractById(req.params.id);

        Promise.all([mysqlContractDelete, neo4jContractDelete])
            .then(data => {
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'Contract History with the id of: ' + req.params.id + ' was deleted successfully.',   //success message
                    link: '<a href="/getAllStates"> Go to states page</a>'   //provide a link that provides a links to another page
                });
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/getAllStates">Go back to states page!</a>'
                });
            });
    });

    app.get('/contractHistoryDocuments', (req, res) => {
        contractHistoryCollection.getAllContractHistory()
            .then((data) => {
                res.render('contractHistoryDocuments', {
                    contracts: data
                })
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllStates"> Go Back to states page!</a>'
                })
            });
    });

    app.get('/generateContractHistoryDocument', (req, res) => {
        const allContractHistory = contractHistoryModel.getAllContractHistoryForHeader();
        const allDocumentsOfEmployment = documentOfEmployementModel.getAllDocumentOfEmployement();

        Promise.all([allContractHistory, allDocumentsOfEmployment])
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllStates"> Go Back to states page!</a>'
                })
            })
            .then(([contracts, documents]) => {
                return new Promise((resolve, reject) => {
                    contracts = contracts.map(contract => {
                        return {
                            id: contract.UG_BROJ_UGOVORA,
                            institution_type: contract.TIP_UST,
                            employee_id: contract.EMP_VU_IDENTIFIKATOR,
                            number_of_document_employments: documents.filter(document => document.UG_BROJ_UGOVORA == contract.UG_BROJ_UGOVORA).length,
                            documents: documents.filter(document => document.UG_BROJ_UGOVORA == contract.UG_BROJ_UGOVORA)
                                .map(document => {
                                    return {
                                        id: document.UG_BROJ_UGOVORA,
                                        contract_year: document.UG_GODINA,
                                        contract_start_date: document.UG_DATIM,
                                        contract_end_date: document.UG_DATUM_VAZENJA
                                    }
                                })
                        }
                    });
                    if (contracts.length == 0) {
                        reject('No contracts!');
                    }

                    resolve({
                        created_at: JSON.stringify(new Date()),
                        numberOfContracts: contracts.length,
                        contracts: contracts
                    });
                });
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllInstitutions"> Go Back</a>'
                });
            })
            .then((contractDocument) => {
                contractHistoryCollection.insertContractHistory(contractDocument)
                    .then(() => {
                        res.redirect('contractHistoryDocuments');
                    });
            });
    })

}