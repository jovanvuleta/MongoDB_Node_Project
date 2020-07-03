exports.EmployeesModel = (dbcon) => {
    return {
        getAllEmployees: () => {
            return new Promise((resolve, reject) => {
                let query = "SELECT * FROM EMPLOYEES;";
                dbcon.query(query, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                });
            })
        },
        getAllEmployeesByInstitution: (id, type) => {
            return new Promise((resolve, reject) => {
                let query = "SELECT * FROM EMPLOYEES WHERE VU_IDENTIFIKATOR LIKE ? AND TIP_UST LIKE ?;";
                dbcon.query(query, [id, type], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                });
            })
        },
        getAllEmployeesByInstitutionAndEmployeeId: (vu_id, emp_id) => {
            return new Promise((resolve, reject) => {
                let query = "SELECT * FROM EMPLOYEES WHERE ZAP_REDNI_BROJ LIKE ? AND VU_IDENTIFIKATOR LIKE ?;";
                dbcon.query(query, [vu_id, emp_id], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                });
            })
        },

        addEmployee: (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ, ZAP_PREZIME, ZAP_SREDNJE_SLOVO, ZAP_IME) => {
            return new Promise((resolve, reject) => {
                let query = "INSERT INTO EMPLOYEES (TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ, ZAP_PREZIME, ZAP_SREDNJE_SLOVO, ZAP_IME) VALUES (?, ?, ?, ?, ?, ?);";
                dbcon.query(query, [TIP_UST, VU_IDENTIFIKATOR, ZAP_REDNI_BROJ, ZAP_PREZIME, ZAP_SREDNJE_SLOVO, ZAP_IME], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                });
            });
        },

        getInstitutionInfo: (id) => {
            return new Promise((resolve, reject) => {
                let query = "SELECT * FROM EMPLOYEES WHERE VU_IDENTIFIKATOR LIKE ";
                dbcon.query(query, id, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                });
            });
        },
        deleteEmployee: (id) => {
            return new Promise((resolve, reject) => {
                let query = 'DELETE FROM EMPLOYEES WHERE ZAP_REDNI_BROJ LIKE ?;';
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
        editEmployee: (type, surname, middleLetter, name, vu_id, emp_id) => {
            return new Promise((resolve, reject) => {
                let query = "UPDATE EMPLOYEES SET TIP_UST = ?, ZAP_PREZIME = ?, ZAP_SREDNJE_SLOVO = ?, ZAP_IME = ? WHERE (VU_IDENTIFIKATOR = ? AND ZAP_REDNI_BROJ = ?);";
                dbcon.query(query, [type, surname, middleLetter, name, vu_id, emp_id], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                })
            })
        }
    }
}