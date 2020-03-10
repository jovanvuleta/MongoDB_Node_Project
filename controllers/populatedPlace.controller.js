exports.PopulatedPlaceController = function (app, dbcon) {
    const StateModel = require('../models/mysql/state.model.js').StateModel(dbcon);
    const PopulatedPlaceModel = require('../models/mysql/populatedPlace.model.js').PopulatedPlaceModel(dbcon);

    app.get('/getAllPopulatedPlaces', (req, res) => {
        PopulatedPlaceModel.getAllPopulatedPlaces()
            .then(data => {
                res.render('populatedPlaces', {     //after successfully excuting the query, render the 'message.ejs' view in order to display the message
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
    //adding comments just so branch can be visiblee


    app.get('/addPopulatedPlace', (req, res) => {
        StateModel.getAllStates()   //Call amoel function that return all states from the database
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
        /*
        Because all functins in the models are Promises, their result must pended using a promise.
        In this case we acquiring two promises, and their results cannot be retrieved traditionally, because retrieved data can be used only inside the promise.
        So, what we need to do is to store the promises procedures in variables and then pend the result of all promises using Promise.all();
        to be continued...
        */
        let getAllPopulatedPlaces = PopulatedPlaceModel.getAllPopulatedPlaces().then();
        let getPopulatedPlace = PopulatedPlaceModel.addPopulatedPlace(req.body.stateId, parseInt(req.body.id, 10), req.body.name, req.body.pttCode).then();

        /*
        Promise.all() as arguments takes an array of promises. And as a result, return an array of objects. Each object represents the data retrieved by the passed promises in order.
        The below Promis.all() call is simillar to:
        Promise.all([PopulatedPlaceModel.getAllPopulatedPlaces().then(), PopulatedPlaceModel.addPopulatedPlace(req.body.stateId, parseInt(req.body.id, 10), req.body.name, req.body.pttCode).then()])...
        By doing so, we will get the same result.
        */
        Promise.all([getAllPopulatedPlaces, getPopulatedPlace])
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
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'Populated place ' + req.body.name + ' was added successfully.',   //success message
                    link: '<a href="/getAllPopulatedPlaces"> Go Back</a>'   //provide a link that provides a links to another page
                });
            })
            .catch((err) => {
                res.render('message', {  //In case the query fail. Render 'message.ejs' and display the obtained error message
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/addPopulatedPlace"> Go Back</a>'   //provide a link that provides a links to another page
                });
            });
    });


    app.get('/editPopulatedPlaceById/:id', (req, res) => {
        /*
        Because all functins in the models are Promises, their result must pended using a promise.
        In this case we acquiring two promises, and their results cannot be retrieved traditionally, because retrieved data can be used only inside the promise.
        So, what we need to do is to store the promises procedures in variables and then pend the result of all promises using Promise.all();
        to be continued...
        */
        let getAllStates = StateModel.getAllStates().then();   //get all states by calling the function getAllStates() from the StateModel{}
        let getPopulatedPlace = PopulatedPlaceModel.getPopulatedPlaceById(req.params.id).then();   ////get all states by calling the function getPopulatedPlaceById() from the PopulatedPlaceModel{}

        /*
        Promise.all() as arguments takes an array of promises. And as a result, return an array of objects. Each object represents the data retrieved by the passed promises in order.
        The below Promis.all() call is simillar to:
        Promise.all([StateModel.getAllStates().then(), PopulatedPlaceModel.getPopulatedPlaceById(req.params.id).then()])...
        By doing so, we will get the same result.
        */
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

    app.post('/editPopulatedPlaceById/:id', (req, res) => {
        PopulatedPlaceModel.editPopulatedPlaceById(req.body.stateId, parseInt(req.body.id, 10), req.body.name, req.body.pttCode, req.params.id)
            .then((data) => {
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'Populated place ' + req.body.name + ' was edited successfully.',   //success message
                    link: '<a href="/getAllPopulatedPlaces"> Go Back</a>'   //provide a link that provides a links to another page
                });
            })
            .catch((err) => {
                res.render('message', {      //In case the query fail. Render 'message.ejs' and display the obtained error message
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/editPopulatedPlaceById/' + req.params.id + '"> Go Back</a>'
                });
            });
    });

    app.get('/deletePopulatedPlaceById/:id', (req, res) => {
        PopulatedPlaceModel.deletePopulatedPlaceById(req.params.id)
            .then((data) => {
                res.render('message', {  //after successfully excuting the query, render the 'message.ejs' view in order to display the message
                    successMessage: 'Populated place ' + req.body.name + ' was deleted successfully.',   //success message
                    link: '<a href="/getAllPopulatedPlaces"> Go Back</a>'   //provide a link that provides a links to another page
                });
            })
            .catch((err) => {
                res.render('message', {      //In case the query fail. Render 'message.ejs' and display the obtained error message
                    errorMessage: 'ERROR: ' + err,
                    link: '<a href="/getAllPopulatedPlaces/' + req.params.id + '"> Go Back</a>'
                });
            })
    });
}