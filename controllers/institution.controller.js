exports.InstitutionController = function(app, dbcon, mongo) {
    const institutionModel = require('../models/mysql/institution.model.js').InstitutionModel(dbcon);
    const employeesModel = require('../models/mysql/employees.model.js').Employees(dbcon);
    const institutionCollection = require('../models/mongodb/institution.collection.js').InstitutionCollectionModel(mongo);

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

    app.get('/getEmployeeByInstitutionId/:id', (req, res) => {
        employeesModel.getAllEmployeesByInstitution(req.params.id)
        .then((data) => {
            res.render('employees', {
                employees: data,
                employee: data[0]
            });
        })
        .catch((err) => {
            res.render('message', {
                errorMessage : 'ERROR: ' + err,
                link : '<a href="/getAllInstitutions"> Go Back</a>'
            });
        });
    });

    app.get('/addInstitution', (req, res) => {
        institutionModel.getAllTypes()   //Call amoel function that return all states from the database
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
        let getInstitution = institutionModel.addInstitution(req.body.institutionId, req.body.institutionName, req.body.institutionType).then();

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
        let getAllTypes = institutionModel.getAllTypes().then();
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

    app.get('/institutionsDocuments', (req, res) => {
        institutionCollection.getAllInstitutionDocuments()
            .then((data) => {
                res.render('institutionDocuments', {
                    documents: data
                })
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllInstitutions"> Go Back</a>'
                })
            });
    });

    app.get('/generateInstitutionsDocument', (req, res) => {
        const allInstitutions = institutionModel.getAllInstitutions();
        const allEmployees = employeesModel.getAllEmployees();

        Promise.all([allInstitutions, allEmployees])
        .catch((err) => {
            res.render('message', {
                errorMessage : 'ERROR: '+err,
                link : '<a href="/getAllInstitutions"> Go Back</a>'
            })
        })
        .then(([institutions, employees]) => {
            return new Promise((resolve, reject) => {
                institutions = institutions.map(institution => {
                return {
                    id : institution.VU_IDENTIFIKATOR,
                    name : institution.VU_NAZIV,
                    number_of_employees: employees.filter(employee => employee.VU_IDENTIFIKATOR == institution.VU_IDENTIFIKATOR).length,
                    employees : employees.filter(employee => employee.VU_IDENTIFIKATOR == institution.VU_IDENTIFIKATOR)
                    .map(employee => {
                        return{
                            id : employee.ZAP_REDNI_BROJ,
                            surname : employee.ZAP_PREZIME,
                            name : employee.ZAP_IME
                        }
                    })
                }
            });

            if(institutions.length == 0){
                reject('No institutions!');
            }
           
            resolve({
                created_at : JSON.stringify(new Date()),
                numberOfInstitutions : institutions.length,
                institutions : institutions
            });
        });
    })
    .catch((err) => {
        res.render('message', {
            errorMessage : 'ERROR: '+err,
            link : '<a href="/getAllInstitutions"> Go Back</a>'
        });
    })
    .then((institutionDocument) => {
        institutionCollection.insertInstitutionDocuments(institutionDocument)
        .then(() => {
            res.redirect('institutionsDocuments');
        });
    });
});
}
