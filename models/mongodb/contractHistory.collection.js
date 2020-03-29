exports.ContractHistoryCollection = function (mongo) {

    return {

        getAllContractHistory: function () {
            return new Promise((resolve, reject) => {
                mongo.collection('contract_history').find((err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        insertContractHistory: function (contractHistoryDocument) {
            return new Promise((resolve, reject) => {
                mongo.collection('contract_history').insert(contractHistoryDocument, (err, result) => {
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