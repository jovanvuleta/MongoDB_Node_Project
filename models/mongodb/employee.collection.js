exports.EmployeeCollectionModel = (mongo) => {
    return {
        getAllEmployeeDocuments: () => {
            return new Promise((resolve, reject) => {
                mongo.collection('employees').find((err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        insertEmployeeDocuments: (employeeDocument) => {
            return new Promise((resolve, reject) => {
                mongo.collection('employees').insert(employeeDocument, (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                })
            })
        }

    }
}