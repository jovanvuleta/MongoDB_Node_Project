exports.CourseModel = function(dbcon) {
    return {
        getAllCourses : function(id) {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM COURSE WHERE VU_IDENTIFIKATOR LIKE ?;';

                dbcon.query(query,[id], (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        getAllTypes : function() {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM TYPES_OF_INSTITUTIONS;';
                dbcon.query(query, (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                });
            });
        },

        getInstitutionById : function(id) {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM HIGH_EDUCATION_INSTITUTION WHERE VU_IDENTIFIKATOR LIKE ?;';
                dbcon.query(query, [id], (err, data) => {
                    if ( !err ) {
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
        


        editCourseById : function( courseVersion,courseName,courseSubject) {
            return new Promise((resolve, reject) => {
                let query = 'UPDATE COURSE SET NP_VERZIJA = ?, NP_NAZIV_PREDMETA = ? WHERE NP_PREDMET LIKE ?;';
                 
                dbcon.query(query, [courseVersion,courseName,courseSubject], (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        
        deleteCourse: (id) => {
            return new Promise((resolve, reject) => {
                let query = 'DELETE FROM COURSE WHERE NP_PREDMET LIKE ?;';
                dbcon.query(query, [id], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                })
            });
        },
        editCourse: (type,  name, vu_id, predmet, version) => {
            return new Promise((resolve, reject) => {
                let query = "UPDATE COURSE SET TIP_UST = ?, NP_NAZIV_PREDMETA = ? WHERE (VU_IDENTIFIKATOR = ? AND NP_PREDMET = ? AND NP_VERZIJA = ?);";
                dbcon.query(query, [type, name, vu_id, predmet, version], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                })
            })
        },
        getAllCoursesByInstitutionAndCourseId: (vu_id, np_predmet, np_verzija) => {
            return new Promise((resolve, reject) => {
                let query = "SELECT * FROM COURSE WHERE VU_IDENTIFIKATOR LIKE ? AND NP_PREDMET LIKE ? AND NP_VERZIJA LIKE ?;";
                dbcon.query(query, [vu_id, np_predmet,np_verzija], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                });
            })
        },

        


    }
    
    
}