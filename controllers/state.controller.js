exports.StateController = function(app, dbcon) {

    const StateModel = require('../models/mysql/state.model.js').StateModel(dbcon);
    // const StateCollectionModel = require('../models/mongodb/state.model.js').StateCollectionModel(mongo);

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
}
