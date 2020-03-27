exports.ContractHistoryModel = (dbcon) => {
    return {
        getAllContractHistoryForHeader: () => {
            return new Promise((resolve, reject) => {
                let query = "SELECT * FROM CONTRACT_HISTORY);";
                dbcon.query(query, [type, emp_vu_id, emp_id], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                });
            });
        },
        getAllContractHistory: (type, emp_vu_id, emp_id) => {
            return new Promise((resolve, reject) => {
                let query = "SELECT * FROM CONTRACT_HISTORY WHERE (TIP_UST LIKE ? AND EMP_VU_IDENTIFIKATOR LIKE ? AND ZAP_REDNI_BROJ LIKE ?);";
                dbcon.query(query, [type, emp_vu_id, emp_id], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                });
            });
        },
        addContractHistory: (type, emp_vu_id, emp_id, contract_type, contract_year, contract_id) => {
            return new Promise((resolve, reject) => {
                let query = 'INSERT INTO CONTRACT_HISTORY (TIP_UST, EMP_VU_IDENTIFIKATOR, ZAP_REDNI_BROJ, VD_OZNAKA, UG_GODINA, UG_BROJ_UGOVORA) VALUES (?,?,?,?,?,?);';
                dbcon.query(query, [type, emp_vu_id, emp_id, contract_type, contract_year, contract_id], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                })
            });
        },
        getAllContractTypes: () => {
            return new Promise((resolve, reject) => {
                let query = 'SELECT DISTINCT VD_OZNAKA FROM CONTRACT_HISTORY;';
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
        getAllContractYears: () => {
            return new Promise((resolve, reject) => {
                let query = 'SELECT UG_GODINA FROM CONTRACT_HISTORY;';
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
        getAllContractIds: () => {
            return new Promise((resolve, reject) => {
                let query = 'SELECT UG_BROJ_UGOVORA FROM CONTRACT_HISTORY;';
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
        deleteContract: (id) => {
            return new Promise((resolve, reject) => {
                let query = 'DELETE FROM CONTRACT_HISTORY WHERE UG_BROJ_UGOVORA LIKE ?;';
                dbcon.query(query, id, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                })
            });
        }

    }
}