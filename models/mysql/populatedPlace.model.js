exports.PopulatedPlaceModel = function (dbcon) {
    return {
        getAllPopulatedPlaces: function () {
            return new Promise((resolve, reject) => {
                let query = 'SELECT POPULATED_PLACES.*, STATE.DR_IDENTIFIKATOR, STATE.DR_NAZIV FROM POPULATED_PLACES INNER JOIN STATE ON POPULATED_PLACES.DR_IDENTIFIKATOR = STATE.DR_IDENTIFIKATOR;';
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
                let query = 'SELECT * FROM POPULATED_PLACES WHERE NM_IDENTIFIKATOR = ?;';
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
        addPopulatedPlace: function (STATEId, id, name, pttCode) {
            return new Promise((resolve, reject) => {
                let query = 'INSERT INTO POPULATED_PLACES (DR_IDENTIFIKATOR, NM_IDENTIFIKATOR, NM_NAZIV, NM_PTT_CODE) VALUES (?, ?, ?, ?);';
                dbcon.query(query, [STATEId, id, name, pttCode], (err, data) => {     //[STATEId, id,name, pttCode] ia an array of arguments to be passed to the query. They must be in the same order as the name sof the columns in the query   
                    if (!err) {
                        resolve(data);
                    } else {
                        reject(err);
                    }
                });
            });
        },

        editPopulatedPlaceById: function (STATEId, newId, name, pttCode, id) {
            return new Promise((resolve, reject) => {
                let query = 'UPDATE POPULATED_PLACES SET DR_IDENTIFIKATOR = ?, NM_IDENTIFIKATOR = ?, NM_NAZIV = ?, NM_PTT_CODE = ? WHERE NM_IDENTIFIKATOR = ?;';
                dbcon.query(query, [STATEId, newId, name, pttCode, id], (err, data) => {    //newId represents the newly assigned ID when submitting the form. id represents the old ID of the populated place that needs to be edited
                    if (!err) {
                        console.log(data, [STATEId, newId, name, pttCode, id]);
                        resolve(data);      //return the query's result
                    } else {
                        reject(err);    //return error message
                    }
                });
            });
        },

        deletePopulatedPlaceById: function (id) {
            return new Promise((resolve, reject) => {
                let query = 'DELETE FROM POPULATED_PLACES WHERE NM_IDENTIFIKATOR = ?;';
                dbcon.query(query, id, (err, data) => {
                    if (!err) {
                        resolve(data);  //return the query's result
                    } else {
                        reject(err);    //return error message
                    }
                });
            });
        },

        getPopulatedPlaceByStateId: function (STATEId) {
            return new Promise((resolve, reject) => {
                query = 'SELECT * FROM POPULATED_PLACES WHERE DR_IDENTIFIKATOR LIKE ?';
                dbcon.query(query, [STATEId], (err, data) => {
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
