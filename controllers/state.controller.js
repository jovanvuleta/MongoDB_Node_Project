exports.StateController = function(app, dbcon, mongo) {
    console.log('Pravljenje kontrolera. Mongo je: ', mongo);

    const StateModel = require('../models/mysql/state.model.js').StateModel(dbcon);
    const StateCollectionModel = require('../models/mongodb/state.model.js').StateCollectionModel(mongo);

    app.get('/getAllStates', (req, res) => {
        StateModel.getAllStates()
        .then((data) => {
            console.log("data");
            res.render('states', {  //render the states.ejs view
                states : data,   //send the retrieved data to the view as an object called 'states'
                successMessage : ''
            });
        })
        .catch(err => {     //in case of error executing the query, render the 'states.ejs' view and display the obtained error message
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
        StateModel.addState(req.body.stateId, req.body.stateName)
        .then((data) => {
            res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                successMessage : 'State ' + req.body.stateName + ' was added successfully.',   //success message
                link : '<a href="/getAllStates"> Go Back</a>'   //provide a link that provides a links to another page
            });
        })
        .catch((err) => {
            res.render('message', {      //In case the query fail. Render 'message.ejs' and display the obtained error message
                errorMessage : 'ERROR: ' + err,
                link : '<a href="/addState"> Go Back</a>'
            });
        });
    });
    
    app.get('/editStateById/:id', (req, res) => {
        StateModel.getStateById(req.params.id)  //Retrieves state's data in order to show the intinal data of the requested state to be dited
        .then((data) => {
            res.render('editState', {
                state : data[0]
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
                successMessage : 'State ' + req.body.stateName + ' was edited successfully!',  //success message
                link : '<a href="/getAllStates"> Go back!</a>'      //provide a link that provides a links to another page
            });
        })
        .catch((err) => {
            res.render('message', {      //In case the query fail. render 'message.ejs' and display the obtained error message
                errorMessage : 'ERROR: ' + err,
                link : '<a href="/editStateById/' + req.body.stateId + ' "> Go back!</a>'   //This link will redirect to the edit page of the state with the ID submitted in the form
            });
        });
    });
    
    app.get('/deleteStateById/:id', (req, res) => {
        StateModel.deleteStateById(req.params.id)
        .then((data) => {
            res.render('message', {
                successMessage : 'State ' + req.params.id + ' was deleted successfully!',  //success message
                link : '<a href="/getAllStates"> Go back!</a>'      //provide a link that provides a links to another page
            });
        })
        .catch((err) => {
            res.render('message', {      //In case the query fail. Render 'message.ejs' and display the obtained error message
                errorMessage : 'ERROR: ' + err,
                link : '<a href="/getAllStates"> Go Back</a>'
            });
        });
    });
}
