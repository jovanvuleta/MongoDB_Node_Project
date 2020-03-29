exports.InstitutionModel = function (dbcon) {
    return {
        getAllInstitutions: function () {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM HIGH_EDUCATION_INSTITUTION;';
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

        getInstitutionsByStateId: function (id) {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM HIGH_EDUCATION_INSTITUTION WHERE DR_IDENTIFIKATOR LIKE ?;';
                dbcon.query(query, [id], (err, data) => {
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

        getAllDistinctTypes: function () {
            return new Promise((resolve, reject) => {
                let query = 'SELECT DISTINCT * FROM TYPES_OF_INSTITUTIONS ;';
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

        getAllStates: function () {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM STATE;';
                dbcon.query(query, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        getAllOwnerships: function () {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM OWNERSHIP_TYPE;';
                dbcon.query(query, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        getInstitutionById: function (id, type) {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM HIGH_EDUCATION_INSTITUTION WHERE (VU_IDENTIFIKATOR = ? AND TIP_UST = ?);';
                dbcon.query(query, [id, type], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        getCourses: function (id, type) {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM COURSE WHERE VU_IDENTIFIKATOR LIKE ? AND TIP_UST LIKE ?;';
                dbcon.query(query, [id, type], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        addInstitution: function (institutionId, institutionName, institutionType, stateId, ownershipType) {
            return new Promise((resolve, reject) => {
                let query = 'INSERT INTO HIGH_EDUCATION_INSTITUTION (VU_IDENTIFIKATOR, VU_NAZIV, TIP_UST, DR_IDENTIFIKATOR, VV_OZNAKA) VALUES (?, ?, ?, ?, ?);';
                dbcon.query(query, [institutionId, institutionName, institutionType, stateId, ownershipType], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        editInstitutionById: function (institutionType, institutionName, ownershipType, id, type) {
            return new Promise((resolve, reject) => {
                let query = 'UPDATE HIGH_EDUCATION_INSTITUTION SET TIP_UST = ?, VU_NAZIV = ?, VV_OZNAKA = ? WHERE VU_IDENTIFIKATOR LIKE ? AND TIP_UST LIKE ?;';

                dbcon.query(query, [institutionType, institutionName, ownershipType, id, type], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        deleteInstitutionById: function (id, type) {
            return new Promise((resolve, reject) => {
                let query = 'DELETE FROM HIGH_EDUCATION_INSTITUTION WHERE VU_IDENTIFIKATOR LIKE ? AND TIP_UST LIKE ?;';
                dbcon.query(query, [id, type], (err, data) => {
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