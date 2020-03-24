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
        }
    }
};