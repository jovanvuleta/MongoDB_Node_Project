exports.StateCollectionModel = function (mongo) {

    return {

        getAllStatesDocuments: function () {
            return new Promise((resolve, reject) => {
                mongo.collection('states').find((err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        insertStatesDocuments: function (statesDocument) {
            return new Promise((resolve, reject) => {
                mongo.collection('states').insert(statesDocument, (err, result) => {
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