exports.StateController = function(app, dbcon, mongo) {

    const StateModel = require('../models/mysql/state.model.js').StateModel(dbcon);
    const StateCollection = require('../models/mongodb/state.collection.js').StateCollectionModel(mongo);
    const InstitutionModel = require('../models/mysql/institution.model.js').InstitutionModel(dbcon);
    var moment = require('moment');

    app.get('/getAllStates', (req, res) => {
        StateModel.getAllStates()
        .then((data) => {
            res.render('states', { 
                states : data,
                successMessage : '',
                moment : moment
            });
        })
        .catch(err => {
            res.render('message', {
                errorMessage : 'ERROR: ' + err,
                link : '<a href="/addState"> Go Back</a>'
            });  
        });
    });
    
    app.get('/addState', (req, res) => {
        res.render('addState');
    });
    
    app.post('/addState', (req, res) => {
        StateModel.addState(req.body.stateId, req.body.stateName, req.body.date)
        .then((data) => {
            res.redirect('/getAllStates');
        })
        .catch((err) => {
            res.render('message', {
                errorMessage : 'ERROR: ' + err,
                link : '<a href="/addState"> Go Back</a>'
            });
        });
    });
    
    app.get('/editStateById/:id', (req, res) => {
        StateModel.getStateById(req.params.id)
        .then((data) => {
            res.render('editState', {
                state : data[0],
                moment : moment
            });
        })
        .catch((err) => {
            res.send('editState', err);
        });
    });
    
    app.post('/editStateById/:id', (req, res) => {
        StateModel.editStateById(req.body.stateId, req.body.stateName, req.body.date, req.params.id)
        .then((data) => {
            res.redirect('/getAllStates');
        })
        .catch((err) => {
            res.render('message', {
                errorMessage : 'ERROR: ' + err,
                link : '<a href="/editStateById/' + req.body.stateId + ' "> Go back!</a>'
            });
        });
    });
    
    app.get('/deleteStateById/:id', (req, res) => {
        StateModel.deleteStateById(req.params.id)
        .then((data) => {
            res.redirect('/getAllStates');
        })
        .catch((err) => {
            res.render('message', {
                errorMessage : 'ERROR: ' + err,
                link : '<a href="/getAllStates"> Go Back</a>'
            });
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

        // make these document availabe at the same time. 
        Promise.all([allStates, allInstitutions])
        .catch((err) => {
            res.render('message', {
                errorMessage : 'ERROR: '+err,
                link : '<a href="/getAllStates"> Go Back</a>'
            })
        })
        .then(([states, institutions]) => {
            return new Promise((resolve, reject) => {
                // use .map to rename your document if you wan to make it readable
            states = states.map(state => {
                return {
                    id : state.DR_IDENTIFIKATOR,
                    name : state.DR_NAZIV,
                    number_of_institutions: institutions.filter(institution => institution.DR_IDENTIFIKATOR == state.DR_IDENTIFIKATOR).length,
                    institutions : institutions.filter(institution => institution.DR_IDENTIFIKATOR == state.DR_IDENTIFIKATOR)
                    .map(institution => {
                        return{
                            id : institution.VU_IDENTIFIKATOR,
                            name : institution.VU_NAZIV
                        }
                    })
                }
            });

            if(states.length == 0){
                reject('No states!');
            }
           
            resolve({
                created_at : JSON.stringify(new Date()),
                numberOfStates : states.length,
                states : states
            });
        });
    })
    .catch((err) => {
        res.render('message', {
            errorMessage : 'ERROR: '+err,
            link : '<a href="/getAllStates"> Go Back</a>'
        });
    })
    .then((statesDocuments) => {
        StateCollection.insertStateDocuments(statesDocuments)
        .then(() => {
            res.render('message', {
                successMessage: "State Document was generated successfully",
                link : '<a href="/getAllStates"> Go Back</a>'
            });
        });
    });
});
}
