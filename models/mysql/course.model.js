exports.CourseModel = function (dbcon) {
    return {
        getAllCoursesForHeader: function (id) {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM COURSE';

                dbcon.query(query, [id], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        getAllCourses: function (id) {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM COURSE WHERE VU_IDENTIFIKATOR LIKE ?;';

                dbcon.query(query, [id], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        getCourseById: function (np_predmet, vu_id, type_inst) {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM COURSE WHERE NP_PREDMET LIKE ? AND VU_IDENTIFIKATOR LIKE ? AND TIP_UST LIKE ?;';

                dbcon.query(query, [np_predmet, vu_id, type_inst], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        getAllTypes: function () {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM TYPES_OF_INSTITUTIONS;';
                dbcon.query(query, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                });
            });
        },

        getInstitutionById: function (id) {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM HIGH_EDUCATION_INSTITUTION WHERE VU_IDENTIFIKATOR LIKE ?;';
                dbcon.query(query, [id], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },



        addCourse: (TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA, NP_NAZIV_PREDMETA) => {
            return new Promise((resolve, reject) => {
                let query = "INSERT INTO COURSE(TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA, NP_NAZIV_PREDMETA) VALUES (?, ?, ?, ?, ?);";
                dbcon.query(query, [TIP_UST, VU_IDENTIFIKATOR, NP_PREDMET, NP_VERZIJA, NP_NAZIV_PREDMETA], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                });
            });
        },



        editCourseById: function (courseVersion, courseName, courseSubject) {
            return new Promise((resolve, reject) => {
                let query = 'UPDATE COURSE SET NP_VERZIJA = ?, NP_NAZIV_PREDMETA = ? WHERE NP_PREDMET LIKE ?;';

                dbcon.query(query, [courseVersion, courseName, courseSubject], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        deleteCourseById: function (id) {
            return new Promise((resolve, reject) => {
                let query = 'DELETE FROM COURSE WHERE NP_PREDMET LIKE ?;';
                dbcon.query(query, [id], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        }
    }
}