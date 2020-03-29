exports.EmployeesController = (app, dbcon, mongo, neo4j) => {
    const employeesModel = require('../models/mysql/employees.model.js').EmployeesModel(dbcon);
    const institutionModel = require('../models/mysql/institution.model.js').InstitutionModel(dbcon);
    const employeesCollection = require('../models/mongodb/employee.collection').EmployeeCollectionModel(mongo);
    const Neo4jEmployeeModel = require('../models/neo4j/employee.model').EmployeesModel(neo4j);

    app.get('/getAllEmployees', (req, res) => {
        employeesModel.getAllEmployees()
            .then((data) => {
                res.render('employees', {
                    employees: data,
                    employee: data[0]
                })
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'Error' + err
                })
            });
    });

    app.get('/getAllEmployeesByInstitution/:type_inst/:vu_id/:emp_id', (req, res) => {
        employeesModel.getAllEmployeesByInstitution(req.params.emp_id)   //Call amoel function that return all states from the database
            .then((data) => {
                res.render('employees', {
                    employees: data,
                    employee: data[0],
                    paramObject: {
                        type_inst: req.params.type_inst,
                        vu_id: req.params.vu_id,
                        emp_id: req.params.emp_id
                    }
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/addInstitution">Goback!</a>'
                });
            })
    });

    app.get('/addEmployee/:type_inst/:vu_id/:emp_id', (req, res) => {
        employeesModel.getAllEmployeesByInstitution(req.params.type_inst, req.params.vu_id, req.params.emp_id)   //Call amoel function that return all states from the database
            .then((data) => {
                res.render('addEmployee', {
                    employees: data,
                    employee: data[0],
                    paramObject: {
                        type_inst: req.params.type_inst,
                        vu_id: req.params.vu_id,
                        emp_id: req.params.emp_id
                    }
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/addInstitution">Goback!</a>'
                });
            })
    });

    app.post('/addEmployee/:type_inst/:vu_id', (req, res) => {
        let mysqlAddEmployee = employeesModel.addEmployee(req.params.type_inst, req.params.vu_id, req.body.employeeId, req.body.employeeSurname, req.body.employeeMidLetter, req.body.employeeName);
        let neo4jAddEmployee = Neo4jEmployeeModel.addEmployee(req.params.type_inst, parseInt(req.params.vu_id), req.body.employeeId, req.body.employeeSurname, req.body.employeeMidLetter, req.body.employeeName);

        Promise.all([mysqlAddEmployee, neo4jAddEmployee])
            .then((data) => {
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'Employee ' + req.body.employeeName + ' was added successfully.',   //success message
                    link: '<a href="/getAllInstitutions"> Go Back</a>',  //provide a link that provides a links to another page
                });
            })
            .catch((err) => {
                res.render('message', {      //In case the query fail. Render 'message.ejs' and display the obtained error message
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/addInstitution"> Go Back</a>'
                });
            })
    });

    app.get('/deleteEmployee/:id', (req, res) => {
        let mysqlDeleteEmployeePromise = employeesModel.deleteEmployee(req.params.id);
        let neo4jDeleteEmployeePromise = Neo4jEmployeeModel.deleteEmployeeById(req.params.id);

        Promise.all([mysqlDeleteEmployeePromise, neo4jDeleteEmployeePromise])
            .then((data) => {
                res.render('message', {
                    successMessage: 'Employee ' + req.params.id + ' was deleted successfully.',   //success message
                    link: '<a href="/getAllInstitutions/"> Go Back</a>',  //provide a link that provides a links to another page
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/addEmployee/:id/:type"> Go Back</a>'
                })
            })
    });

    app.get('/editEmployee/:type_ins/:vu_id/:emp_id', (req, res) => {
        let getAllTypes = institutionModel.getAllTypes();
        let getEmployees = employeesModel.getAllEmployeesByInstitutionAndEmployeeId(req.params.vu_id, req.params.emp_id);

        //Retrieves state's data in order to show the intinal data of the requested state to be dited
        Promise.all([getAllTypes, getEmployees]).then((data) => {
            console.log(data[1]);
            res.render('editEmployee', {
                types: data[0],
                employee: data[1][0]
            });
        })
            .catch((err) => {
                res.send('editEmployee', err);
            });
    });

    app.post('/editEmployee/:type_ins/:vu_id/:emp_id', (req, res) => {
        let mysqlEditEmployeePromise = employeesModel.editEmployee(req.params.type_ins, req.body.employeeSurname, req.body.employeeMiddleLetter, req.body.employeeName, req.params.vu_id, req.params.emp_id);
        let neo4jEditEmployeePromise = Neo4jEmployeeModel.editEmployeeId(req.params.type_ins, parseInt(req.params.vu_id), req.params.emp_id, req.body.employeeSurname, req.body.employeeMiddleLetter, req.body.employeeName);
        Promise.all([mysqlEditEmployeePromise, neo4jEditEmployeePromise])
            .then((data) => {
                console.log(data);
                res.render('message', {
                    successMessage: 'Employee ' + req.body.employeeName + ' was edited successfully!',  //success message
                    link: '<a href="/getAllInstitutions"> Go back!</a>'      //provide a link that provides a links to another page
                });
            })
            .catch((err) => {
                res.render('message', {      //In case the query fail. render 'message.ejs' and display the obtained error message
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/editEmployee/' + req.params.vu_id + "/" + req.params.emp_id + ' "> Go back!</a>'
                });
            });
    });


    app.get('/employeesDocuments', (req, res) => {
        employeesCollection.getAllEmployeeDocuments()
            .then((data) => {
                res.render('employeeDocuments', {
                    documents: data
                })
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + er,
                    link: '<a href="/getAllInstitutions"> Go Back</a>'
                })
            });
    });

    app.get('/generateEmployeeDocuments', (req, res) => {
        employeesModel.getAllEmployees()

            .then((data) => {
                return new Promise((resolve, reject) => {
                    employees = data.map(employee => {
                        return {
                            id: employee.ZAP_REDNI_BROJ,
                            surname: employee.ZAP_PREZIME,
                            name: employee.ZAP_IME
                        }
                    });

                    if (employees.length == 0) {
                        reject('No institutions!');
                    }

                    resolve({
                        created_at: JSON.stringify(new Date()),
                        numberOfEmployees: employees.length,
                        employees: employees
                    });
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllInstitutions"> Go Back</a>'
                });
            })

            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllInstitutions"> Go Back</a>'
                });
            })
            .then((employeeDocument) => {
                employeesCollection.insertEmployeeDocuments(employeeDocument)
                    .then(() => {
                        res.redirect('employeesDocuments');
                    });
            });
    });
}