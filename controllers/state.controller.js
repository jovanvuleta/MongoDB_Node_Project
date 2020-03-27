exports.StateController = function (app, dbcon, mongo, neo4j) {

    const StateModel = require('../models/mysql/state.model.js').StateModel(dbcon);
    const StateCollection = require('../models/mongodb/state.collection.js').StateCollectionModel(mongo);
    const InstitutionModel = require('../models/mysql/institution.model.js').InstitutionModel(dbcon);
    const Neo4jStateModel = require('../models/neo4j/state.model.js').StateModel(neo4j);
    var moment = require('moment');

    app.get('/getAllStates', (req, res) => {
        StateModel.getAllStates()
            .then((data) => {
                res.render('states', {
                    states: data,
                    successMessage: '',
                    moment: moment
                });
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/addState"> Go Back</a>'
                });
            });
    });

    app.get('/getInstitutionsByStateId/:id', (req, res) => {

        let getAllTypes = InstitutionModel.getAllTypes().then();
        let institutions = InstitutionModel.getInstitutionsByStateId(req.params.id).then();
        
        Promise.all([getAllTypes, institutions])
        .then((data) => {
            res.render('institutions', {
                types : data[0],
                institutions : data[1],
                successMessage : ''
            });
        });
    });


    app.get('/addState', (req, res) => {
        res.render('addState');
    });

    app.post('/addState', (req, res) => {

        let mysqlAddPromise = StateModel.addState(req.body.stateId, req.body.stateName);
        let neo4jAddPromise = Neo4jStateModel.addState(req.body.stateId, req.body.stateName);

        Promise.all([mysqlAddPromise, neo4jAddPromise])
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
        StateModel.getStateById(req.params.id)
            .then((data) => {
                res.render('editState', {
                    state: data[0],
                    moment: moment
                });
            })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                });
            });
    });

    app.post('/editStateById/:id', (req, res) => {
        //After submitting the form, the function editStateById from the model state will be called to added the new state
        let mysqlEditPromise = StateModel.editStateById(req.body.stateId, req.body.stateName, req.body.date, req.params.id);
        let neo4jEditPromise = Neo4jStateModel.editStateById(req.body.stateId, req.body.stateName, req.params.id);

        Promise.all([mysqlEditPromise, neo4jEditPromise])
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
        let mysqlDeletePromise = StateModel.deleteStateById(req.params.id);
        let neo4jDeletePromise = Neo4jStateModel.deleteStateById(req.params.id);

        Promise.all([mysqlDeletePromise, neo4jDeletePromise])
            .then((data) => {
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'State ' + req.params.name + ' was deleted successfully.',   //success message
                    link: '<a href="/getAllStates"> Go Back</a>'
                });
            })
            .catch((err) => {
                res.render('message', {      //In case the query fail. Render 'message.ejs' and display the obtained error message
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllStates/' + req.params.id + '"> Go Back</a>'
                });
            })
    });
    app.get('/getStatesDocuments', (req, res) => {
        StatesCollection.getAllStatesDocuments()
            .then((data) => {
                res.render('statesDocuments', {
                    documents: data
                });
            })
            .catch((err) => {

            });
    });



    app.get('/statesDocuments', (req, res) => {
        StateCollection.getAllStatesDocuments()
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

        Promise.all([allStates, allInstitutions])
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllStates"> Go Back</a>'
                })
            })
            .then(([states, institutions]) => {
                return new Promise((resolve, reject) => {
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
            .then((statesDocuments) => {
                StateCollection.insertStateDocuments(statesDocuments)
                    .then(() => {
                        res.redirect('statesDocuments');
                    });
            });
    });
}
