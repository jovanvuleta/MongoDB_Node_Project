exports.StateModel = function(dbcon) {
    return {
        getAllStates : function() {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM STATE;';
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
                let query = 'SELECT * FROM STATE WHERE DR_IDENTIFIKATOR LIKE ?;';
                dbcon.query(query, [id], (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        addState : function(stateId, stateName, stateDate){
            return new Promise((resolve, reject) => {
                let query = 'INSERT INTO STATE (DR_IDENTIFIKATOR, DR_NAZIV, DR_DATUM_OSNIVANJA) VALUES (?, ?, ?);';
                dbcon.query(query, [stateId, stateName, stateDate], (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        editStateById : function(stateId, stateName, date, id) {
            return new Promise((resolve, reject) => {
                let query = 'UPDATE STATE SET DR_IDENTIFIKATOR = ?, DR_NAZIV = ?, DR_DATUM_OSNIVANJA = ? WHERE DR_IDENTIFIKATOR = ?;';
                dbcon.query(query, [stateId, stateName, date, id], (err, data) => {
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
                let query = 'DELETE FROM STATE WHERE DR_IDENTIFIKATOR LIKE ?;';
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