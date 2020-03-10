exports.StateModel = function(dbcon) {
    return {
        getAllStates : function() {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM state;';
                dbcon.query(query, (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        getStateById : function(id) {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM state WHERE DR_IDENTIFIKATOR LIKE ?;';
                dbcon.query(query, [id], (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        addState : function(stateId, stateName){
            return new Promise((resolve, reject) => {
                let query = 'INSERT INTO state (DR_IDENTIFIKATOR, DR_NAZIV) VALUES (?, ?);';
                dbcon.query(query, [stateId, stateName], (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        editStateById : function(stateId, stateName, id) {
            return new Promise((resolve, reject) => {
                let query = 'UPDATE state SET DR_IDENTIFIKATOR = ?, DR_NAZIV = ? WHERE DR_IDENTIFIKATOR = ?;';
                dbcon.query(query, [stateId, stateName, id], (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        deleteStateById : function(id) {
            return new Promise((resolve, reject) => {
                let query = 'DELETE FROM state WHERE DR_IDENTIFIKATOR LIKE ?;';
                dbcon.query(query, [id], (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        }
    }
}