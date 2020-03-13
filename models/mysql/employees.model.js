exports.Employees = (dbcon) => {
    return {
        getAllEmployees: () => {
            return new Promise((resolve, reject) => {
                let query = "SELECT * FROM EMPLOYEES;";
                dbcon.query(query, (err, data) => {
                    if (!err) {
                        console.log('resolved');
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                });
            })
        },
        getAllEmployeesByInstitution: (id) => {
            return new Promise((resolve, reject) => {
                let query = "SELECT * FROM EMPLOYEES WHERE VU_IDENTIFIKATOR LIKE ?;";
                dbcon.query(query, [id], (err, data) => {
                    if (!err) {
                        console.log('resolved');
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
        }
    }
}