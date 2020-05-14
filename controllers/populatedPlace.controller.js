exports.PopulatedPlaceController = function (app, dbcon, mongo, neo4j) {
    const StateModel = require('../models/mysql/state.model.js').StateModel(dbcon);
    const PopulatedPlaceModel = require('../models/mysql/populatedPlace.model.js').PopulatedPlaceModel(dbcon);
    const Neo4jPopulatedPlaceModel = require('../models/neo4j/populatedPlace.model.js').PopulatedPlaceModel(neo4j);

    app.get('/getAllPopulatedPlaces', (req, res) => {
        PopulatedPlaceModel.getAllPopulatedPlaces()
            .then(data => {
                res.render('populatedPlaces', {
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
        StateModel.getAllStates()
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
                for (let populatedPlace of data[0]) {
                    if (populatedPlace.NM_IDENTIFIKATOR == parseInt(req.body.id, 10) || populatedPlace.NM_NAZIV == req.body.name) {
                        return res.render('message', {
                            errorMessage: 'Populated place ' + req.body.name + ' or ID ' + req.body.id + ', already exists, try again!',
                            link: '<a href="/addPopulatedPlace"> Go Back</a>'
                        });
                    }
                }

                res.redirect('/getAllPopulatedPlaces');
            })
            .catch((err) => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/addPopulatedPlace"> Go Back</a>'
                });
            });
    });

    app.get('/editPopulatedPlaceById/:stateId/:id', (req, res) => {

        let getAllStates = StateModel.getAllStates().then();
        let getPopulatedPlace = PopulatedPlaceModel.getPopulatedPlaceById(req.params.stateId, parseInt(req.params.id)).then();

        Promise.all([getAllStates, getPopulatedPlace]).then(data => {
            res.render('editPopulatedPlace', {
                states: data[0],
                populatedPlace: data[1][0]
            });
        })
            .catch(err => {
                res.render('message', {
                    errorMessage: 'ERROR: ' + err + '!',
                    link: '<a href="/editPopulatedPlaceById/' + req.params.id + '"> Go Back</a>'
                });
            });
    });

    app.post('/editPopulatedPlaceById/:stateId/:id', (req, res) => {
        let mysqlEditPromise = PopulatedPlaceModel.editPopulatedPlaceById(parseInt(req.body.id, 10), req.body.name, req.body.pttCode, parseInt(req.params.id), req.params.stateId);
        let neo4jEditPromise = Neo4jPopulatedPlaceModel.editPopulatedPlaceById(req.params.stateId, parseInt(req.body.id, 10), req.body.name, req.body.pttCode, parseInt(req.params.id));

        Promise.all([mysqlEditPromise, neo4jEditPromise])
            .then((data) => {
                res.redirect('/getAllPopulatedPlaces');
            })
            .catch((err) => {
                res.render('message', {
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
                res.render('message', {
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllPopulatedPlaces/' + req.params.id + '"> Go Back</a>'
                });
            })
    });
}