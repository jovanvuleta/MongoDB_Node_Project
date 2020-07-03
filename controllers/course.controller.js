exports.CourseController = function (app, dbcon, mongo, neo4j) {

    const CourseCollection = require('../models/mongodb/course.collection.js').CourseCollectionModel(mongo)
    const courseModel = require('../models/mysql/course.model.js').CourseModel(dbcon);
    const institutionModel = require('../models/mysql/institution.model.js').InstitutionModel(dbcon);
    const NeoCourseModel = require('../models/neo4j/course.model.js').CourseModel(neo4j);
    const StateModel = require('../models/mysql/state.model.js').StateModel(dbcon);

    app.get('/getAllCourses', (req, res) => {
        courseModel.allCourses()
            .then((data) => {
                res.render('allCourses', {
                    courses: data,
                    course: data[0],
                    successMessage: ''
                });
            });
    });


    app.get('/getAllCourses/:id/:type', (req, res) => {
        courseModel.getAllCourses(req.params.id, req.params.type)
            .then((data) => {
                res.render('courses', {
                    courses: data,
                    course: data[0],
                    successMessage: ''
                });
            });
    });

    app.get('/addCourse/:id/:type', (req, res) => {

        courseModel.getAllCourses(req.params.id, req.params.type)   //Call amoel function that return all states from the database
            .then((data) => {
                res.render('addCourse', {
                    courses: data,
                    vu_id: req.params.id,
                    tip_ust: req.params.type
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/addInstitution">Goback!</a>'
                });
            })
    });


    app.post('/addCourse/:id/:type', (req, res) => {

        const NeoAddCourse = NeoCourseModel.addCourse(req.params.type, parseInt(req.params.id), req.body.courseCode, req.body.coursVersion, req.body.coursName).then();
        const SQLAddCourse = courseModel.addCourse(req.params.type, req.params.id, req.body.courseCode, req.body.coursVersion, req.body.coursName).then();
        Promise.all([NeoAddCourse, SQLAddCourse])
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
        let mysqlDeleteCoursePromise = courseModel.deleteCourse(req.params.id);
        let neo4jDeleteCoursePromise = NeoCourseModel.deleteCourseById(req.params.id);

        Promise.all([mysqlDeleteCoursePromise, neo4jDeleteCoursePromise])
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
        let getAllCourses = courseModel.getAllCoursesByInstitutionAndCourseId(req.params.vu_id, req.params.np_predmet, req.params.type_ins).then();

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

        const NeoEditCourse = NeoCourseModel.editCourseById(req.params.type_ins, req.params.vu_id, req.params.np_predmet, req.params.np_verzija, req.body.courseName).then();
        const SQLEditCourse = courseModel.editCourse(req.params.type_ins, req.body.courseName, req.params.vu_id, req.params.np_predmet, req.params.np_verzija).then();
        Promise.all([NeoEditCourse, SQLEditCourse])
            .then((data) => {
                console.log(data);
                res.render('message', {
                    successMessage: 'Course ' + req.body.courseName + ' was edited successfully!',  //success message
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
    app.get('/coursesDocuments', (req, res) => {
        CourseCollection.getAllCourseDocuments()
            .then((data) => {
                res.render('coursesDocuments', {
                    documents: data
                })
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllCourses"> Go Back</a>'
                })
            });
    });

    app.get('/generateCoursesDocument', (req, res) => {

        const allStates = StateModel.getAllStates();
        const allInstitutions = institutionModel.getAllInstitutions();
        const allCourses = courseModel.allCourses();


        Promise.all([allStates,allInstitutions, allCourses])
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllCourses"> Go Back</a>'
                })
            })
            .then(([states,institutions, courses]) => {
                return new Promise((resolve, reject) => {
                    states = states.map(state => {
                        return {
                            id:state.DR_IDENTIFIKATOR,
                            name: state.DR_NAZIV,
                            number_of_institutions: institutions.filter(institution => institution.DR_IDENTIFIKATOR == state.DR_IDENTIFIKATOR).length,
                            institutions: institutions.filter(institution => institution.DR_IDENTIFIKATOR == state.DR_IDENTIFIKATOR)
                            .map(institution => {
                                return {
                                    id: institution.VU_IDENTIFIKATOR,
                                    name: institution.VU_NAZIV,
                                    courses: courses.filter(course =>course.VU_IDENTIFIKATOR == institution.VU_IDENTIFIKATOR && course.TIP_UST == institution.TIP_UST)
                                    .map(course=>{
                                        return{
                                            id:course.NP_PREDMET,
                                            courseCode: course.NP_NAZIV_PREDMETA
                                        }
                                    }

                                    )
                                }
                                })
                        }
                    });

                    if (states.length == 0) {
                        reject('No states!');
                    }

                    resolve({
                        created_at: JSON.stringify(new Date()),
                        numberOfStates: states.length,
                        states: states
                    });
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllStates"> Go Back</a>'
                });
            })
            .then((coursesDocuments) => {
                CourseCollection.insertCourseDocuments(coursesDocuments)
                    .then(() => {
                        res.redirect('coursesDocuments');
                    });
            });
    });
   

}