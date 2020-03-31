exports.DocumentOfEmployementModel = (dbcon) => {
    return {

        getAllDocumentOfEmployement: () => {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM DOCCUMENTS_OF_EMPLOYMENT;';
                dbcon.query(query, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
            });
        },
        getDocumentOfEmployementByContractId: (id) => {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM DOCCUMENTS_OF_EMPLOYMENT WHERE UG_BROJ_UGOVORA LIKE ?;';
                dbcon.query(query, id, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        getContractsByDocuments: (id) => {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM CONTRACT_HISTORY WHERE UG_BROJ_UGOVORA LIKE ?;';
                dbcon.query(query, id, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        editDocumentOfEmployment: (type, vu_id, contract_type, contract_year, contract_date, contract_date_duration, id) => {
            return new Promise((resolve, reject) => {
                let query = 'UPDATE DOCCUMENTS_OF_EMPLOYMENT SET TIP_UST = ?, VU_IDENTIFIKATOR = ?, VD_OZNAKA = ?, UG_GODINA = ?, UG_DATIM = ?, UG_DATUM_VAZENJA = ? WHERE (UG_BROJ_UGOVORA = ?);';
                dbcon.query(query, [type, vu_id, contract_type, contract_year, contract_date, contract_date_duration, id], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        getAllContractTypes: () => {
            return new Promise((resolve, reject) => {
                let query = 'SELECT DISTINCT * FROM DOCUMENT_TYPE;';
                dbcon.query(query, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        addDocument: (type, vu_id, cnt_type, cnt_year, cnt_id, cnt_start_date, cnt_end_date) => {
            return new Promise((resolve, reject) => {
                let query = 'INSERT INTO DOCCUMENTS_OF_EMPLOYMENT (TIP_UST, VU_IDENTIFIKATOR, VD_OZNAKA, UG_GODINA, UG_BROJ_UGOVORA, UG_DATIM, UG_DATUM_VAZENJA) VALUES (?, ?, ?, ?, ?, ?, ?);';
                dbcon.query(query, [type, vu_id, cnt_type, cnt_year, cnt_id, cnt_start_date, cnt_end_date], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },
        deleteDocument: (id) => {
            return new Promise((resolve, reject) => {
                let query = 'DELETE FROM DOCCUMENTS_OF_EMPLOYMENT WHERE UG_BROJ_UGOVORA LIKE ?;';
                dbcon.query(query, [id], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                        console.log(err);
                    }
                })
            });
        }
    }
};