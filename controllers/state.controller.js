exports.StateController = function (app, dbcon, mongo) {
    console.log('Pravljenje kontrolera. Mongo je: ', mongo);

    const StateModel = require('../models/mysql/state.model.js').StateModel(dbcon);
    const StateCollectionModel = require('../models/mongodb/state.collection.js').StateCollectionModel(mongo);
    const InstitutionModel = require('../models/mysql/institution.model.js').InstitutionModel(dbcon);

    app.get('/getAllStates', (req, res) => {
        StateModel.getAllStates()
            .then((data) => {
                console.log("data");
                res.render('states', {  //render the states.ejs view
                    states: data,   //send the retrieved data to the view as an object called 'states'
                    successMessage: ''
                });
            })
            .catch(err => {     //in case of error executing the query, render the 'states.ejs' view and display the obtained error message
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/addState"> Go Back</a>'
                });
            });
    });

    app.get('/addState', (req, res) => {
        res.render('addState');
    });

    app.post('/addState', (req, res) => {
        StateModel.addState(req.body.stateId, req.body.stateName)
            .then((data) => {
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'State ' + req.body.stateName + ' was added successfully.',   //success message
                    link: '<a href="/getAllStates"> Go Back</a>'   //provide a link that provides a links to another page
                });
            })
            .catch((err) => {
                res.render('message', {      //In case the query fail. Render 'message.ejs' and display the obtained error message
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/addState"> Go Back</a>'
                });
            });
    });

    app.get('/editStateById/:id', (req, res) => {
        StateModel.getStateById(req.params.id)  //Retrieves state's data in order to show the intinal data of the requested state to be dited
            .then((data) => {
                res.render('editState', {
                    state: data[0]
                });
            })
            .catch((err) => {
                res.send('editState', err);
            });
    });

    app.post('/editStateById/:id', (req, res) => {
        StateModel.editStateById(req.body.stateId, req.body.stateName, req.params.id)
            .then((data) => {
                res.render('message', {
                    successMessage: 'State ' + req.body.stateName + ' was edited successfully!',  //success message
                    link: '<a href="/getAllStates"> Go back!</a>'      //provide a link that provides a links to another page
                });
            })
            .catch((err) => {
                res.render('message', {      //In case the query fail. render 'message.ejs' and display the obtained error message
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/editStateById/' + req.body.stateId + ' "> Go back!</a>'   //This link will redirect to the edit page of the state with the ID submitted in the form
                });
            });
    });

    app.get('/deleteStateById/:id', (req, res) => {
        StateModel.deleteStateById(req.params.id)
            .then((data) => {
                res.render('message', {
                    successMessage: 'State ' + req.params.id + ' was deleted successfully!',  //success message
                    link: '<a href="/getAllStates"> Go back!</a>'      //provide a link that provides a links to another page
                });
            })
            .catch((err) => {
                res.render('message', {      //In case the query fail. Render 'message.ejs' and display the obtained error message
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllStates"> Go Back</a>'
                });
            });
    });

    app.get('/statesDocuments', (req, res) => {
        StateCollectionModel.getAllStatesDocuments()
            .then((data) => {
                res.render('statesDocuments', {
                    documents: data
                })
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllStates"> Go Back</a>'
                })
            });
    });
    app.get('/generateStatesDocument', (req, res) => {
        const allStates = StateModel.getAllStates();
        const allInstitutions = InstitutionModel.getAllInstitutions();

        // make these document availabe at the same time. 
        Promise.all([allStates, allInstitutions])
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllStates"> Go Back</a>'
                })
            })
            .then(([states, institutions]) => {
                return new Promise((resolve, reject) => {
                    // use .map to rename your document if you wan to make it readable
                    states = states.map(state => {
                        return {
                            id: state.DR_IDENTIFIKATOR,
                            name: state.DR_NAZIV,
                            number_of_institutions: institutions.filter(institution => institution.DR_IDENTIFIKATOR == state.DR_IDENTIFIKATOR).length,
                            institutions: institutions.filter(institution => institution.DR_IDENTIFIKATOR == state.DR_IDENTIFIKATOR)
                                .map(institution => {
                                    return {
                                        id: institution.VU_IDENTIFIKATOR,
                                        name: institution.VU_NAZIV
                                    }
                                })
                        }
                    });

                    if (states.length == 0) {
                        console.log('rejected!');
                        reject('No states!');
                    }

                    resolve({
                        created_at: JSON.stringify(new Date()),
                        numberOfStates: states.length,
                        states: states
                    });
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllStates"> Go Back</a>'
                });
            })
            // Assign this to the database, after the previous is conformed
            .then((statesDocuments) => {
                StateCollectionModel.insertStatesDocuments(statesDocuments)
                    .then(() => {
                        res.render('message', {
                            successMessage: "State Document was generated successfully",
                            link: '<a href="/getAllStates"> Go Back</a>'
                        });
                    });
            });
    });
}
