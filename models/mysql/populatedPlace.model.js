exports.PopulatedPlaceModel = function(dbcon) {
    return {
        getAllPopulatedPlaces : function(){
            return new Promise((resolve, reject) => {
                let query = 'SELECT POPULATED_PLACES.*, STATE.DR_IDENTIFIKATOR, STATE.DR_NAZIV FROM POPULATED_PLACES INNER JOIN STATE ON POPULATED_PLACES.DR_IDENTIFIKATOR = STATE.DR_IDENTIFIKATOR;';
                dbcon.query(query, (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        getPopulatedPlaceById : function(id){
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM POPULATED_PLACES WHERE NM_IDENTIFIKATOR = ?;';
                dbcon.query(query, id, (err, data) => {
                    if(!err) {
                        resolve(data);  //return the query's result
                    } else {
                        reject(err);    //return error message
                    }
                });
            });
        },

        addPopulatedPlace : function(stateId, id, name, pttCode) {
            return new Promise((resolve, reject) => {
                let query = 'INSERT INTO POPULATED_PLACES (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR, NM_NAZIV, NM_PTT_CODE) VALUES (?, ?, ?, ?);';
                dbcon.query(query, [stateId, id,name, pttCode], (err, data) => {
                    if ( !err ) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        editPopulatedPlaceById : function(newId, name, pttCode, id){
            return new Promise((resolve, reject) => {
                let query = 'UPDATE POPULATED_PLACES SET NM_IDENTIFIKATOR = ?, NM_NAZIV = ?, NM_PTT_CODE = ? WHERE NM_IDENTIFIKATOR = ?;';
                dbcon.query(query, [newId, name, pttCode, id], (err, data) => {
                    if(!err) {
                        resolve(data);      //return the query's result
                    } else {
                        reject(err);    //return error message
                    }
                });
            });
        },

        deletePopulatedPlaceById : function(id){
            return new Promise((resolve, reject) => {
                let query = 'DELETE FROM POPULATED_PLACES WHERE NM_IDENTIFIKATOR = ?;';
                dbcon.query(query, id, (err, data) => {
                    if(!err) {
                        resolve(data);  //return the query's result
                    } else {
                        reject(err);    //return error message
                    }
                });
            });
        }
    }
}
