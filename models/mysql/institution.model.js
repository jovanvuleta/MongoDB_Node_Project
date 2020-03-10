exports.InstitutionModel = function(dbcon) {
    return {
        getAllInstitutions : function() {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM HIGH_EDUCATION_INSTITUTION;';
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

        addInstitution : function(institutionId, institutionName, institutionType){
            return new Promise((resolve, reject) => {
                let query = 'INSERT INTO HIGH_EDUCATION_INSTITUTION (VU_IDENTIFIKATOR, VU_NAZIV, TIP_UST) VALUES (?, ?, ?);';
                dbcon.query(query, [institutionId, institutionName, institutionType], (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        editInstitutionById : function(institutionId, institutionName, institutionType) {
            return new Promise((resolve, reject) => {
                let query = 'UPDATE HIGH_EDUCATION_INSTITUTION SET TIP_UST = ?, VU_NAZIV = ? WHERE VU_IDENTIFIKATOR = ?;';
                dbcon.query(query, [institutionType, institutionName, institutionId], (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        deleteInstitutionById : function(id) {
            return new Promise((resolve, reject) => {
                let query = 'DELETE FROM HIGH_EDUCATION_INSTITUTION WHERE VU_IDENTIFIKATOR LIKE ?;';
                dbcon.query(query, [id], (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        }
    }
}