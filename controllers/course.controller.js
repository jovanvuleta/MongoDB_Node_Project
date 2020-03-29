exports.CourseController = function (app, dbcon, mongo) {
    const courseModel = require('../models/mysql/course.model.js').CourseModel(dbcon);
    const institutionModel = require('../models/mysql/institution.model.js').InstitutionModel(dbcon);

    app.get('/getAllCourses', (req, res) => {
        courseModel.getAllCoursesForHeader()
            .then((data) => {
                res.render('courses', {
                    courses: data,
                    course: data[0],
                    successMessage: ''
                });
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                });
            });
    });

    app.get('/getAllCourses/:id', (req, res) => {
        courseModel.getAllCourses(req.params.id)
            .then((data) => {
                res.render('courses', {
                    courses: data,
                    course: data[0],
                    successMessage: ''
                });
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                });
            });
    });

    app.get('/addCourse/:id', (req, res) => {
        let getAllTypes = institutionModel.getAllDistinctTypes();
        let getAllCourses = courseModel.getAllCourses(req.params.id);
        Promise.all([getAllCourses, getAllTypes])
            .then((data) => {
                res.render('addCourse', {
                    courses: data,
                    course: data[0],
                    types: data[1]
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


    app.get('/editCourseById/:type_inst/:vu_id/:np_version/:np_predmet', (req, res) => {
        let getCourse = courseModel.getCourseById(req.params.np_predmet, req.params.vu_id, req.params.type_inst);
        let getAllTypes = institutionModel.getAllDistinctTypes();

        Promise.all([getCourse, getAllTypes]).then((data) => {
            console.log(data);
            console.log(data[0]);
            console.log(data[1]);
            res.render('editCourse', {
                course: data[0][0],
                types: data[1]
            });
        })
            .catch((err) => {
                res.send('editInstitution', err);
            });
    });

    app.post('/editCourseById/:id', (req, res) => {
        institutionModel.editInstitutionById(req.body.institutionType, req.body.institutionName, req.body.stateId, req.body.ownershipType, req.params.id)
            .then((data) => {
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'Course with the name: ' + req.params.id + ' was deleted successfully.',   //success message
                    link: '<a href="/getAllPopulatedPlaces"> Go Back</a>'   //provide a link that provides a links to another page
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/editInstitutionById/' + req.body.institutionId + ' "> Go back!</a>'
                });
            });
    });

    app.get('/deleteCourseById/:id', (req, res) => {
        courseModel.deleteCourseById(req.params.id)
            .then((data) => {
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'Course with the name: ' + req.params.id + ' was deleted successfully.',   //success message
                    link: '<a href="/getAllPopulatedPlaces"> Go Back</a>'   //provide a link that provides a links to another page
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllInstitutions"> Go Back</a>'
                });
            });
    });
}
