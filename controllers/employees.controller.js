exports.EmployeesController = (app, dbcon, mongo) => {
    const employeesModel = require('../models/mysql/employees.model.js').Employees(dbcon);

    app.get('/getAllEmployees', (req, res) => {
        employeesModel.getAllEmployees()
            .then((data) => {
                res.render('employees', {
                    employees: data
                })
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'Error' + err
                })
            });
    });

    app.get('/getAllEmployeesByInstitution/:id', (req, res) => {

        let getInstitution = employeesModel.getInstitutionById(req.params.id).then();
        let getAllEmployeesByInstitution = employeesModel.getAllEmployeesByInstitution(req.params.id);

        Promise.all([getInstitution, getAllEmployeesByInstitution]).then((data) => {
            res.render('employees', {
                    employees: data[1],
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
        let getInstitution = employeesModel.getInstitutionById(req.params.id).then();
        let getAllEmployeesByInstitution = employeesModel.getAllEmployeesByInstitution(req.params.id);

        Promise.all([getInstitution, getAllEmployeesByInstitution]).then((data) => {
                res.render('addEmployee', {
                    employees: data[1],
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

    app.post('/addEmployee/:id', (req, res) => {
        employeesModel.addEmployee(req.body.info_type, req.body.info_id, req.body.employeeId, req.body.employeeSurname, req.body.employeeMidLetter, req.body.employeeName)
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

}