exports.InstitutionController = function (app, dbcon, mongo, neo4j) {
    const institutionModel = require('../models/mysql/institution.model.js').InstitutionModel(dbcon);
    const employeesModel = require('../models/mysql/employees.model.js').EmployeesModel(dbcon);
    const courseModel = require('../models/mysql/course.model.js').CourseModel(dbcon);
    const institutionCollection = require('../models/mongodb/institution.collection.js').InstitutionCollectionModel(mongo);
    const Neo4jInstitutionModel = require('../models/neo4j/institution.model.js').InstitutionModel(neo4j);

    app.get('/getAllInstitutions', (req, res) => {

        institutionModel.getAllInstitutions()
            .then((data) => {
                res.render('allInstitutions', {
                    institutions: data,
                    successMessage: ''
                });
            });
    });

    app.get('/getInstitutionsByStateId/:id', (req, res) => {

        let getAllTypes = InstitutionModel.getAllTypes().then();
        let institutions = InstitutionModel.getInstitutionsByStateId(req.params.id).then();
        let state = StateModel.getStateById(req.params.id).then();

        Promise.all([getAllTypes, institutions, state])
            .then((data) => {
                res.render('institutions', {
                    types: data[0],
                    institutions: data[1],
                    state: data[2][0],
                    successMessage: ''
                });
            });
    });

    app.get('/getEmployeeByInstitutionId/:id/:type', (req, res) => {
        employeesModel.getAllEmployeesByInstitution(req.params.id, req.params.type)
            .then((data) => {
                res.render('employees', {
                    employees: data,
                    employee: data[0]
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllInstitutions"> Go Back</a>'
                });
            });
    });

    app.get('/getCoursesByInstitutionId/:id/:type', (req, res) => {
        institutionModel.getCourses(req.params.id, req.params.type)
            .then((data) => {
                res.render('courses', {
                    courses: data,
                    course: data[0],
                    vu_id: req.params.id,
                    tip_ust: req.params.type,
                    successMessage: ''
                });
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                });
            });
    });

    app.get('/addInstitution/:state', (req, res) => {

        // let getAllStates = institutionModel.getAllStates().then();
        let getAllTypes = institutionModel.getAllTypes().then();
        let getAllOwnerships = institutionModel.getAllOwnerships().then();

        Promise.all([req.params.state, getAllTypes, getAllOwnerships])
            .then((data) => {
                res.render('addInstitution', {
                    state: data[0],
                    types: data[1],
                    ownerships: data[2]
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/addInstitution">Goback!</a>'
                });
            })
    });

    app.post('/addInstitution/:state', (req, res) => {

        let getAllInstitutions = institutionModel.getAllInstitutions().then();
        let getInstitution = institutionModel.addInstitution(req.body.institutionId, req.body.institutionName, req.body.institutionType, req.params.state, req.body.ownershipType).then();
        let neoInstitution = Neo4jInstitutionModel.addInstitution(req.params.state, parseInt(req.body.institutionId), req.body.institutionName, req.body.institutionType, req.body.ownershipType).then();

        Promise.all([getAllInstitutions, getInstitution, neoInstitution])
            .then((data) => {
                res.redirect('/getInstitutionsByStateId/' + req.params.state);
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/addInstitution"> Go Back</a>'
                });
            });
    });

    app.get('/editInstitutionById/:state/:id/:type', (req, res) => {
        let getAllStates = institutionModel.getAllStates().then();
        let getAllTypes = institutionModel.getAllTypes().then();
        let getAllOwnerships = institutionModel.getAllOwnerships().then();
        let getInstitution = institutionModel.getInstitutionById(req.params.id, req.params.type).then();

        Promise.all([getInstitution, getAllStates, getAllTypes, getAllOwnerships])
            .then(data => {
                console.log(data);
                res.render('editInstitution', {
                    states: data[1],
                    types: data[2],
                    ownerships: data[3],
                    institution: data[0][0]
                });
            })
    });

    app.post('/editInstitutionById/:state/:id/:type', (req, res) => {

        let editInstitutionSQL = institutionModel.editInstitutionById(req.body.institutionType, req.body.institutionName, req.body.ownershipType, req.params.id, req.params.type).then();
        let editInstitutionNeo = Neo4jInstitutionModel.editInstitutionById(req.params.state, req.params.id, req.params.type, req.body.institutionName, req.body.institutionType, req.body.ownershipType).then();

        Promise.all([editInstitutionSQL, editInstitutionNeo])
            .then((data) => {
                res.redirect('/getInstitutionsByStateId/' + req.params.state);
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/editInstitutionById/' + req.body.institutionId + ' "> Go back!</a>'
                });
            });
    });

    app.get('/deleteInstitutionById/:state/:id/:type', (req, res) => {

        let mysqlDeletePromise = institutionModel.deleteInstitutionById(req.params.id, req.params.type);
        let neo4jDeletePromise = Neo4jInstitutionModel.deleteInstitutionById(req.params.id, req.params.type);

        Promise.all([mysqlDeletePromise, neo4jDeletePromise])
            .then((data) => {
                res.redirect('/getInstitutionsByStateId/' + req.params.state);
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllInstitutions"> Go Back</a>'
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
        const allCourses = courseModel.allCourses();

        Promise.all([allInstitutions, allEmployees, allCourses])
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllInstitutions"> Go Back</a>'
                })
            })
            .then(([institutions, employees, courses]) => {
                return new Promise((resolve, reject) => {
                    institutions = institutions.map(institution => {
                        return {
                            id: institution.VU_IDENTIFIKATOR,
                            name: institution.VU_NAZIV,
                            number_of_employees: employees.filter(employee => employee.VU_IDENTIFIKATOR == institution.VU_IDENTIFIKATOR).length,
                            employees: employees.filter(employee => employee.VU_IDENTIFIKATOR == institution.VU_IDENTIFIKATOR)
                                .map(employee => {
                                    return {
                                        id: employee.ZAP_REDNI_BROJ,
                                        surname: employee.ZAP_PREZIME,
                                        name: employee.ZAP_IME
                                    }
                                }),
                            number_of_courses: courses.filter(course => course.VU_IDENTIFIKATOR == institution.VU_IDENTIFIKATOR).length,
                            courses: courses.filter(course => course.VU_IDENTIFIKATOR == institution.VU_IDENTIFIKATOR)
                                .map(course => {
                                    return {
                                        code: course.NP_PREDMET,
                                        version: course.NP_VERZIJA,
                                        name: course.NP_NAZIV_PREDMETA
                                    }
                                })
                        }
                    });

                    if (institutions.length == 0) {
                        reject('No institutions!');
                    }

                    resolve({
                        created_at: JSON.stringify(new Date()),
                        numberOfInstitutions: institutions.length,
                        institutions: institutions
                    });
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllInstitutions"> Go Back</a>'
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
