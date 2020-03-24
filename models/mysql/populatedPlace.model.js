exports.PopulatedPlaceModel = function (dbcon) {
    return {
        getAllPopulatedPlaces: function () {
            return new Promise((resolve, reject) => {
                let query = 'SELECT populated_places.*, state.DR_IDENTIFIKATOR, state.DR_NAZIV FROM populated_places INNER JOIN state ON populated_places.DR_IDENTIFIKATOR = state.DR_IDENTIFIKATOR;';
                dbcon.query(query, (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        getPopulatedPlaceById: function (id) {
            return new Promise((resolve, reject) => {
                let query = 'SELECT * FROM populated_places WHERE NM_IDENTIFIKATOR = ?;';
                dbcon.query(query, id, (err, data) => {
                    if (!err) {
                        resolve(data);  //return the query's result
                    } else {
                        reject(err);    //return error message
                    }
                });
            });
        },

        //A function that adds a populated place to the database. The funciton takes few arguments to add them. These arguments are then  passed to the function in the controller where this funciton will be called
        addPopulatedPlace: function (stateId, id, name, pttCode) {
            return new Promise((resolve, reject) => {
                let query = 'INSERT INTO populated_places (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR, NM_NAZIV, NM_PTT_CODE) VALUES (?, ?, ?, ?);';
                dbcon.query(query, [stateId, id, name, pttCode], (err, data) => {     //[stateId, id,name, pttCode] ia an array of arguments to be passed to the query. They must be in the same order as the name sof the columns in the query   
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        editPopulatedPlaceById: function (stateId, newId, name, pttCode, id) {
            return new Promise((resolve, reject) => {
                let query = 'UPDATE populated_places SET DR_IDENTIFIKATOR = ?, NM_IDENTIFIKATOR = ?, NM_NAZIV = ?, NM_PTT_CODE = ? WHERE NM_IDENTIFIKATOR = ?;';
                dbcon.query(query, [stateId, newId, name, pttCode, id], (err, data) => {    //newId represents the newly assigned ID when submitting the form. id represents the old ID of the populated place that needs to be edited
                    if (!err) {
                        console.log(data, [stateId, newId, name, pttCode, id]);
                        resolve(data);      //return the query's result
                    } else {
                        reject(err);    //return error message
                    }
                });
            });
        },

        deletePopulatedPlaceById: function (id) {
            return new Promise((resolve, reject) => {
                let query = 'DELETE FROM populated_places WHERE NM_IDENTIFIKATOR = ?;';
                dbcon.query(query, id, (err, data) => {
                    if (!err) {
                        resolve(data);  //return the query's result
                    } else {
                        reject(err);    //return error message
                    }
                });
            });
        },

        getPopulatedPlaceByStateId: function (stateId) {
            return new Promise((resolve, reject) => {
                query = 'SELECT * FROM populated_places WHERE DR_IDENTIFIKATOR LIKE ?';
                dbcon.query(query, [stateId], (err, data) => {
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        }
    }
}
