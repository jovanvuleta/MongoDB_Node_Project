exports.PopulatedPlaceModel = function(dbcon) {
    return {
        getAllPopulatedPlaces : function(){
            return new Promise((resolve, reject) => {
                let query = 'SELECT populated_places.*, state.DR_IDENTIFIKATOR, state.DR_NAZIV FROM populated_places INNER JOIN state ON populated_places.DR_IDENTIFIKATOR = state.DR_IDENTIFIKATOR;';
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
                let query = 'SELECT * FROM populated_places WHERE NM_IDENTIFIKATOR = ?;';
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
                let query = 'INSERT INTO populated_places (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR, NM_NAZIV, NM_PTT_CODE) VALUES (?, ?, ?, ?);';
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
                let query = 'UPDATE populated_places SET NM_IDENTIFIKATOR = ?, NM_NAZIV = ?, NM_PTT_CODE = ? WHERE NM_IDENTIFIKATOR = ?;';
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
                let query = 'DELETE FROM populated_places WHERE NM_IDENTIFIKATOR = ?;';
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
