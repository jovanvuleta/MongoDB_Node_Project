exports.ContractHistoryController = (app, dbcon, mongo) => {
    const contractHistoryModel = require('../models/mysql/contract_history.model').ContractHistoryModel(dbcon);

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
                    link: 'ERROR: ' + err + ' <a href="/getAllInstitutions">Goback!</a>'
                });
            });
    });

    app.get('/addContractHistory/:type/:emp_vu_id/:emp_id', (req, res) => {
        let getAllContractTypes = contractHistoryModel.getAllContractTypes().then();
        let getAllContractYears = contractHistoryModel.getAllContractYears().then();
        let getAllContractIds = contractHistoryModel.getAllContractIds().then();
        let getAllContractHistory = contractHistoryModel.getAllContractHistory(req.params.type, req.params.emp_vu_id, req.params.emp_id).then();

        Promise.all([getAllContractTypes, getAllContractYears, getAllContractIds, getAllContractHistory])
            .then(data => {
                console.log('here: ');
                console.log(data[3]);
                console.log(data[3][0]);
                res.render('addContract', {
                    contractTypes: data[0],
                    contractYears: data[1],
                    contractIds: data[2],
                    contract: data[3],
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
                    link: 'ERROR: ' + err + ' <a href="/getAllInstitutions">Goback!</a>'
                });
            });

        // contractHistoryModel.getAllContractHistory(req.params.type, req.params.emp_vu_id, req.params.emp_id)
        //     .then((data) => {
        //         res.render('addContract', {
        //             contracts: data,
        //             contract: data[0]
        //         });
        //     })
        //     .catch(err => {
        //         res.render('message', {
        //             errorMessage: 'ERROR: ' + err + '!',
        //             link: 'ERROR: ' + err + ' <a href="/getAllInstitutions">Goback!</a>'
        //         });
        //     });
    });

    app.post('/addContract/:type/:emp_vu_id/:emp_id', (req, res) => {
        contractHistoryModel.addContractHistory(req.params.type, req.params.emp_vu_id, req.params.emp_id, req.body.contractType, req.body.contractYear, req.body.contractID)
            .then((data) => {
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'Contract under id: ' + req.body.contractID + ', was added successfully.',   //success message
                    link: '<a href="/getAllInstitutions"> Go Back</a>',  //provide a link that provides a links to another page
                });
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/getAllInstitutions">Goback!</a>'
                });
            });
    });

}