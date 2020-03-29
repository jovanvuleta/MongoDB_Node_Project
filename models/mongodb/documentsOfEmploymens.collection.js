exports.DocumentOfEmploymentCollection = function (mongo) {

    return {

        getAllDocumentsOfEmployment: function () {
            return new Promise((resolve, reject) => {
                mongo.collection('doccuments_of_employment').find((err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        insertDocumentOfEmployment: function (documentOfEmploymentDocument) {
            return new Promise((resolve, reject) => {
                mongo.collection('doccuments_of_employment').insert(documentOfEmploymentDocument, (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
            });
        }
    }

}