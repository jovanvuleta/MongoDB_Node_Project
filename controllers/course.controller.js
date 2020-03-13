exports.CourseController = function(app, dbcon) {
    const courseModel = require('../models/mysql/course.model.js').CourseModel(dbcon);
    
    app.get('/getAllCourses/:id', (req, res) => {
        courseModel.getAllCourses(req.params.id)
        .then((data) => {
            res.render('courses', {
                courses : data,
                course: data[0],
                successMessage : ''
            });
        })
        .catch(err => {
            res.render('message', {
                errorMessage : 'ERROR: ' + err,
            });  
        });
    });

    // app.get('/addCourse/:id', (req, res) => {

        
        
    //     let getInstitutionById = institutionModel.getInstitutionById(req.params.id).then();
        
    //     Promise (getInstitutionById)
    //     .then((data) => {
    //             res.render('addCourse', {
                    
    //                 institution : data
                    
    //             });
    //         })
    //         .catch((err) => {
    //             res.render('message', {
    //                 errorMessage: 'ERROR: ' + err + '!',
    //                 link: 'ERROR: ' + err + ' <a href="/addCourse">Goback!</a>'
    //             });
    //         })
    // });
    app.get('/addCourse/:id', (req, res) => {
        courseModel.getAllCourses(req.params.id)   //Call amoel function that return all states from the database
            .then((data) => {
                res.render('addCourse', {
                    courses: data,
                    course: data[0]
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/addInstitution">Goback!</a>'
                });
            })
    });

    
    app.post('/addCourse/:id', (req, res) => {
        courseModel.addCourse(req.body.info_type, req.body.info_id, req.body.courseCode, req.body.coursVersion, req.body.coursName)
            .then((data) => {
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'Course ' + req.body.courseCode + ' was added successfully.',   //success message
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
