exports.PopulatedPlaceController = function (app, dbcon, mongo, neo4j) {
    const StateModel = require('../models/mysql/state.model.js').StateModel(dbcon);
    const PopulatedPlaceModel = require('../models/mysql/populatedPlace.model.js').PopulatedPlaceModel(dbcon);
    const Neo4jPopulatedPlaceModel = require('../models/neo4j/populatedPlace.model.js').PopulatedPlaceModel(neo4j);

    app.get('/getAllPopulatedPlaces', (req, res) => {
        PopulatedPlaceModel.getAllPopulatedPlaces()
            .then(data => {
                res.render('populatedPlaces', {     //After obtaining all populated [laces successfully, render the populatedPlaces.ejs view and pass to it the obtained data in order ro display into the view
                    populatedPlaces: data
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: ''
                });
            })
    });

    app.get('/addPopulatedPlace', (req, res) => {
        StateModel.getAllStates()   //Call models's function that return all states from the database
            .then((data) => {
                res.render('addPopulatedPlace', {
                    states: data,
                });
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: 'ERROR: ' + err + ' <a href="/addPopulatedPlace">Goback!</a>'
                });
            })
    });

    app.post('/addPopulatedPlace', (req, res) => {

        let getAllPopulatedPlaces = PopulatedPlaceModel.getAllPopulatedPlaces();
        let mysqlAddPromise = PopulatedPlaceModel.addPopulatedPlace(req.body.stateId, parseInt(req.body.id), req.body.name, req.body.pttCode);
        let neo4jAddPromise = Neo4jPopulatedPlaceModel.addPopulatedPlace(req.body.stateId, parseInt(req.body.id), req.body.name, req.body.pttCode);

        Promise.all([getAllPopulatedPlaces, mysqlAddPromise, neo4jAddPromise])
            .then((data) => {
                //Check whether a populated place with the same ID exists or no
                for (let populatedPlace of data[0]) {   //data[0] represents the element of the array returned by Promise.all(), which is an array of objects of all populated places
                    if (populatedPlace.NM_IDENTIFIKATOR == parseInt(req.body.id, 10) || populatedPlace.NM_NAZIV == req.body.name) {
                        return res.render('message', {
                            errorMessage: 'Populated place ' + req.body.name + ' or ID ' + req.body.id + ', already exists, try again!',
                            link: '<a href="/addPopulatedPlace"> Go Back</a>'   //provide a link that provides a links to another page
                        });
                    }
                }

                res.redirect('/getAllPopulatedPlaces');
            })
            .catch((err) => {
                res.render('message', {  //In case the query fail. Render 'message.ejs' and display the obtained error message
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/addPopulatedPlace"> Go Back</a>'   //provide a link that provides a links to another page
                });
            });
    });

    app.get('/editPopulatedPlaceById/:stateId/:id', (req, res) => {

        let getAllStates = StateModel.getAllStates().then();   //get all states by calling the function getAllStates() from the StateModel{}
        let getPopulatedPlace = PopulatedPlaceModel.getPopulatedPlaceById(req.params.stateId, parseInt(req.params.id)).then();   ////get all states by calling the function getPopulatedPlaceById() from the PopulatedPlaceModel{}

        Promise.all([getAllStates, getPopulatedPlace]).then(data => {
            res.render('editPopulatedPlace', {
                states: data[0],   //Because Promise.all() returns two arrays, the first one '[0]' will be the result of promise 'getAllStates'
                populatedPlace: data[1][0]  //and the second one '[1]' will be the result of the promise getPopulatedPlace, which in turn returns only one row
            });
        })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: '<a href="/editPopulatedPlaceById/' + req.params.id + '"> Go Back</a>'
                });
            });
    });

    //This functio will be executed when the edit populated place form is submitted. 
    //POST FUNCTIONS ARE EXECUTED WHEN A FORM WITH URL OF THE FUNCTION IS SUBMITTED
    app.post('/editPopulatedPlaceById/:stateId/:id', (req, res) => {
        let mysqlEditPromise = PopulatedPlaceModel.editPopulatedPlaceById(parseInt(req.body.id, 10), req.body.name, req.body.pttCode, parseInt(req.params.id), req.params.stateId);
        let neo4jEditPromise = Neo4jPopulatedPlaceModel.editPopulatedPlaceById(req.params.stateId, parseInt(req.body.id, 10), req.body.name, req.body.pttCode, parseInt(req.params.id));

        Promise.all([mysqlEditPromise, neo4jEditPromise])
            .then((data) => {
                res.redirect('/getAllPopulatedPlaces');
            })
            .catch((err) => {
                res.render('message', {      //In case the query fail. Render 'message.ejs' and display the obtained error message
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/editPopulatedPlaceById/' + req.params.id + '"> Go Back</a>'
                });
            });
    });

    app.get('/deletePopulatedPlaceById/:stateId/:id', (req, res) => {
        let mysqlDeletePromise = PopulatedPlaceModel.deletePopulatedPlaceById(req.params.id, req.params.stateId);
        let neo4jDeletePromise = Neo4jPopulatedPlaceModel.deletePlaceById(req.params.stateId, parseInt(req.params.id));

        Promise.all([mysqlDeletePromise, neo4jDeletePromise])
        .then((data) => {
                res.redirect('/getAllPopulatedPlaces');
            })
            .catch((err) => {
                res.render('message', {      //In case the query fail. Render 'message.ejs' and display the obtained error message
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllPopulatedPlaces/' + req.params.id + '"> Go Back</a>'
                });
            })
    });
}