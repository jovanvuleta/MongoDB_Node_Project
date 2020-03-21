exports.EmployeesControler = (app, dbcon) => {
    const employeesModel = require('../models/mysql/employees.model.js').Employees(dbcon);
    const institutionModel = require('../models/mysql/institution.model.js').InstitutionModel(dbcon);

    app.get('/getAllEmployeesByInstitution/:id', (req, res) => {
        employeesModel.getAllEmployeesByInstitution(req.params.id)   //Call amoel function that return all states from the database
            .then((data) => {
                res.render('employees', {
                    employees: data,
                    employee: data[0]
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/addInstitution">Goback!</a>'
                });
            })
    });

    app.get('/addEmployee/:id', (req, res) => {
        employeesModel.getAllEmployeesByInstitution(req.params.id)   //Call amoel function that return all states from the database
            .then((data) => {
                res.render('addEmployee', {
                    employees: data,
                    employee: data[0]
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/addInstitution">Goback!</a>'
                });
            })
    });

    app.post('/addEmployee/:id/:type', (req, res) => {
        employeesModel.addEmployee(req.params.type, req.params.id, req.body.employeeId, req.body.employeeSurname, req.body.employeeMidLetter, req.body.employeeName)
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
        employeesModel.deleteEmployee(req.params.id)
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
        let getAllTypes = institutionModel.getAllTypes().then();
        let getEmployees = employeesModel.getAllEmployeesByInstitutionAndEmployeeId(req.params.vu_id, req.params.emp_id).then();

        //Retrieves state's data in order to show the intinal data of the requested state to be dited
        Promise.all([getAllTypes, getEmployees]).then((data) => {
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
        employeesModel.editEmployee(req.params.type_ins, req.body.employeeSurname, req.body.employeeMiddleLetter, req.body.employeeName, req.params.vu_id, req.params.emp_id)
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

}