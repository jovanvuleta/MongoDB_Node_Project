exports.InstitutionController = function(app, dbcon) {
    const institutionModel = require('../models/mysql/institution.model.js').InstitutionModel(dbcon);
    
    app.get('/getAllInstitutions', (req, res) => {
        institutionModel.getAllInstitutions()
        .then((data) => {
            res.render('institutions', {
                institutions : data,
                successMessage : ''
            });
        })
        .catch(err => {
            res.render('message', {
                errorMessage : 'ERROR: ' + err,
            });  
        });
    });

    app.get('/addInstitution', (req, res) => {

        let getAllStates = institutionModel.getAllStates().then();
        let getAllTypes = institutionModel.getAllTypes().then();
        let getAllOwnerships = institutionModel.getAllOwnerships().then();
        
        Promise.all([getAllStates, getAllTypes, getAllOwnerships])
        .then((data) => {
                res.render('addInstitution', {
                    states : data[0],
                    types : data[1],
                    ownerships : data[2]
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/addInstitution">Goback!</a>'
                });
            })
    });
    
    app.post('/addInstitution', (req, res) => {

        let getAllInstitutions = institutionModel.getAllInstitutions().then();
        let getInstitution = institutionModel.addInstitution(req.body.institutionId, req.body.institutionName, req.body.institutionType, req.body.stateId, req.body.ownershipType).then();

        Promise.all([getAllInstitutions, getInstitution])
        .then((data) => {
            res.redirect('/getAllInstitutions');
        })
        .catch((err) => {
            res.render('message', {
                errorMessage : 'ERROR: ' + err,
                link : '<a href="/addInstitution"> Go Back</a>'
            });
        });
    });
    
    app.get('/editInstitutionById/:id', (req, res) => {
        let getAllStates = institutionModel.getAllStates().then();
        let getAllTypes = institutionModel.getAllTypes().then();
        let getAllOwnerships = institutionModel.getAllOwnerships().then();
        let getInstitution = institutionModel.getInstitutionById(req.params.id).then();
        
        Promise.all([getAllStates, getAllTypes, getAllOwnerships, getInstitution]).then((data) => {
            res.render('editInstitution', {
                states : data[0],
                types : data[1],
                ownerships : data[2],
                institution : data[3][0]
            });
        })
        .catch((err) => {
            res.send('editInstitution', err);
        });
    });
    
    app.post('/editInstitutionById/:id', (req, res) => {
        institutionModel.editInstitutionById(req.body.institutionType, req.body.institutionName, req.body.stateId, req.body.ownershipType, req.params.id)
        .then((data) => {
            res.redirect('/getAllInstitutions');
        })
        .catch((err) => {
            res.render('message', {
                errorMessage : 'ERROR: ' + err,
                link : '<a href="/editInstitutionById/' + req.body.institutionId + ' "> Go back!</a>'
            });
        });
    });
    
    app.get('/deleteInstitutionById/:id', (req, res) => {
        institutionModel.deleteInstitutionById(req.params.id)
        .then((data) => {
            res.redirect('/getAllInstitutions');
        })
        .catch((err) => {
            res.render('message', {
                errorMessage : 'ERROR: ' + err,
                link : '<a href="/getAllInstitutions"> Go Back</a>'
            });
        });
    });
}
