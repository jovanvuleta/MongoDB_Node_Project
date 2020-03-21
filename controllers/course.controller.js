exports.CourseController = function(app, dbcon) {
    const courseModel = require('../models/mysql/course.model.js').CourseModel(dbcon);
    const institutionModel = require('../models/mysql/institution.model.js').InstitutionModel(dbcon);
    
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

    
    app.get('/deleteCourse/:id', (req, res) => {
        courseModel.deleteCourse(req.params.id)
            .then((data) => {
                res.render('message', {
                    successMessage: 'Course ' + req.params.id + ' was deleted successfully.',   //success message
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

    app.get('/editCourse/:type_ins/:vu_id/:np_predmet/:np_verzija', (req, res) => {
        let getAllTypes = institutionModel.getAllTypes().then();
        let getAllCourses = courseModel.getAllCoursesByInstitutionAndCourseId(req.params.vu_id, req.params.np_predmet,req.params.np_verzija).then();

        //Retrieves state's data in order to show the intinal data of the requested state to be dited
        Promise.all([getAllTypes, getAllCourses]).then((data) => {
            console.log("logged data:");
            console.log(data[1][0]);
            res.render('editCourse', {
                types: data[0],
                course: data[1][0]
            });
        })
            .catch((err) => {
                res.send('editCourse', err);
            });
    });

    app.post('/editCourse/:type_ins/:vu_id/:np_predmet/:np_verzija', (req, res) => {
        courseModel.editCourse(req.params.type_ins, req.body.courseName, req.params.vu_id, req.params.np_predmet, req.params.np_verzija)
            .then((data) => {
                console.log(data);
                res.render('message', {
                    successMessage: 'Course ' + req.body.courseName+ ' was edited successfully!',  //success message
                    link: '<a href="/getAllInstitutions"> Go back!</a>'      //provide a link that provides a links to another page
                });
            })
            .catch((err) => {
                res.render('message', {      //In case the query fail. render 'message.ejs' and display the obtained error message
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/editCourse/' + req.params.vu_id + "/" + req.params.emp_id + ' "> Go back!</a>'
                });
            });
    });

}