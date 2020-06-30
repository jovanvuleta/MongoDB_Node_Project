exports.EmployeesController = (app, dbcon, mongo, neo4j) => {
    const employeesModel = require('../models/mysql/employees.model.js').EmployeesModel(dbcon);
    const institutionModel = require('../models/mysql/institution.model.js').InstitutionModel(dbcon);
    const employeesCollection = require('../models/mongodb/employee.collection').EmployeeCollectionModel(mongo);
    const Neo4jEmployeeModel = require('../models/neo4j/employee.model').EmployeesModel(neo4j);
    const contractHistoryModel = require('../models/mysql/contract_history.model').ContractHistoryModel(dbcon);

    app.get('/getAllEmployees', (req, res) => {
        employeesModel.getAllEmployees()
            .then((data) => {
                res.render('allEmployees', {
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

    app.get('/getAllEmployeesByInstitution/:type_inst/:vu_id', (req, res) => {
        employeesModel.getAllEmployeesByInstitution(req.params.vu_id, req.params.type_inst)
            .then((data) => {
                res.render('employees', {
                    employees: data,
                    employee: data[0],
                    paramObject: {
                        type_inst: req.params.type_inst,
                        vu_id: req.params.vu_id
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

    app.get('/addEmployee/:type/:vu_id', (req, res) => {
        employeesModel.getAllEmployeesByInstitution(req.params.vu_id, req.params.type)   //Call amoel function that return all states from the database
            .then((data) => {
                res.render('addEmployee', {
                    employees: data,
                    employee: data[0],
                    paramObject: {
                        type_inst: req.params.type,
                        vu_id: req.params.vu_id
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
        let getEmployees = employeesModel.getAllEmployeesByInstitutionAndEmployeeId(req.params.emp_id, req.params.vu_id);

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
        let allEmployees = employeesModel.getAllEmployees();
        let allContracts = contractHistoryModel.getAllContractHistoryForHeader();
        let allInstitution = institutionModel.getAllInstitutions();

        Promise.all([allEmployees, allContracts, allInstitution])
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllStates"> Go Back to states page!</a>'
                })
            })

            .then(([employees, contracts, institutions]) => {
                return new Promise((resolve, reject) => {
                    institutions = institutions.map(institution => {
                        return {
                            name: institution.VU_NAZIV,
                            employees: employees.filter(employee => (employee.VU_IDENTIFIKATOR == institution.VU_IDENTIFIKATOR && employee.TIP_UST === institution.TIP_UST))
                                .map(employee => {
                                    return {
                                        id: employee.ZAP_REDNI_BROJ,
                                        surname: employee.ZAP_PREZIME,
                                        name: employee.ZAP_IME,
                                        contracts: contracts.filter(contract => contract.ZAP_REDNI_BROJ == employee.ZAP_REDNI_BROJ)
                                            .map(contract => {
                                                return {
                                                    id: contract.UG_BROJ_UGOVORA,
                                                    contract_year: contract.UG_GODINA,
                                                    contract_institution: contract.TIP_UST,
                                                    contract_emp_id: contract.ZAP_REDNI_BROJ
                                                }
                                            })
                                    }
                                })
                        }
                    })
                    // employees = employees.map(employee => {
                    //     return {
                    //         id: employee.ZAP_REDNI_BROJ,
                    //         surname: employee.ZAP_PREZIME,
                    //         name: employee.ZAP_IME,
                    //         number_of_contracts: contracts.filter(contract => contract.ZAP_REDNI_BROJ == employee.ZAP_REDNI_BROJ).length,
                    //         contracts: contracts.filter(contract => contract.ZAP_REDNI_BROJ == employee.ZAP_REDNI_BROJ)
                    //             .map(contract => {
                    //                 return {
                    //                     id: contract.UG_BROJ_UGOVORA,
                    //                     contract_year: contract.UG_GODINA,
                    //                     contract_institution: contract.TIP_UST,
                    //                     contract_emp_id: contract.ZAP_REDNI_BROJ
                    //                 }
                    //             })
                    //     }
                    // });

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
            .then((employeeDocument) => {
                employeesCollection.insertEmployeeDocuments(employeeDocument)
                    .then(() => {
                        res.redirect('employeesDocuments');
                    });
            });
    });
}